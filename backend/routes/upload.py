from typing import Annotated, List, Dict
from fastapi import Form, UploadFile, HTTPException, Request
from fastapi import APIRouter
from sqlalchemy import func
from starlette import status
from dotenv import load_dotenv
from db import User, Wallpaper, Category, WallpaperCategory, db_dependency
from auth import get_current_user_dependency
import os
import uuid
from util.file_upload import upload_file
from util.logger import logger

load_dotenv()
router = APIRouter(prefix='/api', tags=['Upload'])

SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_SECRET = os.getenv('SUPABASE_SECRET')

MAX_UPLOAD_SIZE = 20 * 1024 * 1024  # 20 MB


@router.post('/upload', status_code=status.HTTP_200_OK, response_model=Dict)
async def upload(request: Request, name: Annotated[str, Form()],
                 categories: Annotated[List[str], Form()], file: UploadFile, db: db_dependency,
                 user: get_current_user_dependency):
    try:
        found_user = db.query(User).filter(User.id == user.get('user_id')).first()

        print(found_user)
        if not found_user or not found_user.upload_permission:
            raise HTTPException(status_code=400, detail="You do not have permission to upload")

        if not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")

        # Get file contents, capped so a huge upload can't exhaust server memory
        contents = await file.read(MAX_UPLOAD_SIZE + 1)
        if len(contents) > MAX_UPLOAD_SIZE:
            raise HTTPException(status_code=400, detail="File too large (max 20MB)")

        # Generate unique filename
        unique_filename = f"{uuid.uuid4().hex}_{file.filename}"

        # Use service role key for storage uploads to bypass RLS policies
        response = await upload_file(
            supabase_url=SUPABASE_URL,
            bucket_name="images",
            file_name=unique_filename,
            file=contents,
            access_token=SUPABASE_SECRET,
            content_type=file.content_type,
        )

        # Check if upload failed
        if 'error' in response:
            error_msg = response.get('error', 'Upload failed')
            error_details = response.get('details', '')
            logger.error(f"Upload failed: {error_msg} - {error_details}")
            raise HTTPException(status_code=400, detail=f"Upload failed: {error_msg}")

        # Get the image key from response
        image_key = response.get('Key')
        if not image_key:
            logger.error(f"Upload response missing Key: {response}")
            raise HTTPException(status_code=500, detail="Upload succeeded but response missing file key")

        # DB Operations
        wallpaper = Wallpaper(name=name, image=image_key, uploaded_by=user.get('user_id'))

        db.add(wallpaper)
        db.flush()

        seen_categories = set()
        for category_item in categories:
            normalized = category_item.strip().lower()
            if not normalized or normalized in seen_categories:
                continue
            seen_categories.add(normalized)

            category = db.query(Category).filter(func.lower(Category.name) == normalized).first()

            if not category:
                category = Category(name=normalized)
                db.add(category)
                db.flush()

            wallpaper_category = WallpaperCategory(wallpaper_id=wallpaper.id, category_id=category.id)
            db.add(wallpaper_category)

        db.commit()
        return {"message": "File Uploaded!", "success": True}

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Upload error: {str(e)}")
        db.rollback()
        raise HTTPException(status_code=500, detail="Error")
