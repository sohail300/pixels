import datetime
from typing import Annotated, List, Dict
from fastapi import Form, UploadFile, HTTPException, Request
from fastapi import APIRouter
from sqlalchemy import func
from starlette import status
from dotenv import load_dotenv
from supabase import create_client
from schema import User, Wallpaper, Category, WallpaperCategory
from auth import get_current_user_dependency
from database import db_dependency
import os

from util.current_time import get_time_hh_mm_ss
from util.file_upload import upload_file

load_dotenv()
router = APIRouter(prefix='/api', tags=['Upload'])

SUPABASE_URL=os.getenv('SUPABASE_URL')
SUPABASE_SECRET=os.getenv('SUPABASE_SECRET')

supabase = create_client(SUPABASE_URL, SUPABASE_SECRET)

@router.post('/upload', status_code=status.HTTP_200_OK, response_model=Dict)
async def upload(request: Request,name: Annotated[str, Form()],
                 categories: Annotated[List[str], Form()], file: UploadFile, db: db_dependency,
                 user: get_current_user_dependency):
    try:
        found_user = db.query(User).filter(User.id == user.get('user_id')).first()

        if not found_user or not found_user.upload_permission:
            raise HTTPException(status_code=400, detail="You do not have permission to upload")

        if not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")

        # Get token
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            raise HTTPException(status_code=401, detail="Invalid authorization header")
        access_token = auth_header.split(" ")[1]

        # Get file contents
        contents = await file.read()

        # Generate unique filename
        unique_filename = f"{get_time_hh_mm_ss()}_{file.filename}"

        response = await upload_file(
            supabase_url=SUPABASE_URL,
            bucket_name="images",
            file_name=unique_filename,
            file=contents,
            access_token=access_token,
        )

        print(response)

        # DB Operations
        wallpaper = Wallpaper(name=name, image=response.get('Key'), uploaded_by=user.get('user_id'))

        db.add(wallpaper)
        db.flush()

        for category_item in categories:
            category = db.query(Category).filter(func.lower(Category.name) == category_item.lower()).first()

            if not category:
                print()
                category = Category(name=category_item.lower())
                db.add(category)
                db.flush()

            wallpaper_category = WallpaperCategory(wallpaper_id=wallpaper.id, category_id=category.id)
            db.add(wallpaper_category)

        db.commit()
        return {"message": "File Uploaded!", "success": True}

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error")