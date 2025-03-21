import random
from fastapi import APIRouter
from sqlalchemy.orm import joinedload
from starlette import status
from typing import List

from auth import get_current_user_dependency
from database import db_dependency
from modal import ResponseModel
from schema import Wallpaper, WallpaperCategory

router = APIRouter(prefix='/api', tags=['APIs'])


@router.get('/explore', status_code=status.HTTP_200_OK, response_model=List[ResponseModel])
def explore(skip: int, limit: int, db: db_dependency, user: get_current_user_dependency):
    # Use synchronous query API
    wallpapers = db.query(Wallpaper).options(
        joinedload(Wallpaper.uploader), joinedload(Wallpaper.categories).joinedload(WallpaperCategory.category)
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
