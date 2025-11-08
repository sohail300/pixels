from fastapi import APIRouter, HTTPException
from starlette import status
from auth import get_current_user_dependency
from db import db_dependency, Liked, Wallpaper, User
from schema import SuccessSchema
from util.logger import logger

router = APIRouter(prefix='/api', tags=['APIs'])


@router.get('/like/{wallpaper_id}', response_model=SuccessSchema, status_code=status.HTTP_200_OK)
async def like(wallpaper_id: str, db: db_dependency, user: get_current_user_dependency):
    try:

        if user is None:
            raise HTTPException(status_code=401, detail="Not Authorized")

        user_id = user.get('user_id')

        user = db.query(User).filter(User.id == user_id).first()
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")

        wallpaper = db.query(Wallpaper).filter(Wallpaper.id == wallpaper_id).first()

        if wallpaper is None:
            raise HTTPException(status_code=404, detail="Wallpaper not found")

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
        logger.error(f"Upload error: {str(e)}")
        raise HTTPException(status_code=500, detail="Error")
