from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import joinedload
from starlette import status

from auth import get_current_user_dependency
from database import db_dependency
from modal import ResponseModel
from schema import Liked

router = APIRouter(prefix='/api', tags=['APIs'])


@router.get('/liked', response_model=ResponseModel, status_code=status.HTTP_200_OK)
async def liked(skip: int, limit: int, db: db_dependency, user: get_current_user_dependency):
    if not user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Not Authorized')

# Use synchronous query API
    wallpapers = db.query(Liked).options(
        joinedload(Liked.wallpaper), joinedload(Wallpaper.categories).joinedload(WallpaperCategory.category)
    ).order_by(Wallpaper.created_at.desc()).offset(skip).limit(limit).all()

    # Transform to match ResponseModel
    return [
        {
            "id": w.id,
            "name": w.name,
            "image": w.image,
            "downloaded": w.downloaded,
            "liked": w.liked,
            "uploaded_by": w.uploader.name or "Unknown",
            "categories": [wc.category.name for wc in w.categories]
        }
        for w in wallpapers
    ]
