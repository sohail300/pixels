from fastapi import APIRouter, HTTPException
from starlette import status

from auth import get_current_user_dependency
from database import db_dependency
from modal import SuccessResponseModel
from schema import Liked, Wallpaper

router = APIRouter(prefix='/api', tags=['APIs'])


@router.get('/like/{wallpaper_id}', response_model=SuccessResponseModel, status_code=status.HTTP_200_OK)
async def like(wallpaper_id: str, db: db_dependency, user: get_current_user_dependency):
    try:

        wallpaper = db.query(Wallpaper).filter(Wallpaper.id == wallpaper_id).first()

        if wallpaper is None:
            raise HTTPException(status_code=404, detail="Wallpaper not found")

        user_id = user.get('user_id')

        already_liked = db.query(Liked).filter(Liked.wallpaper_id == wallpaper_id, Liked.user_id == user_id).first()

        if already_liked is None:
            like_wallpaper = Liked(user_id=user_id, wallpaper_id=wallpaper_id)
            db.add(like_wallpaper)
            db.commit()

            return {
                "success": True,
                "message": "Liked Photo"
            }
        else:
            db.delete(already_liked)
            db.commit()

            return {
                "success": True,
                "message": "Unliked Photo"
            }

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error")
