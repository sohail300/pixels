from fastapi import APIRouter, HTTPException
from starlette import status

from auth import get_current_user_dependency
from db import db_dependency, Liked, Wallpaper, Downloaded, User
from schema import SuccessSchema
from util.logger import logger

router = APIRouter(prefix='/api', tags=['APIs'])


@router.get('/download/{wallpaper_id}', response_model=SuccessSchema, status_code=status.HTTP_200_OK)
async def download(wallpaper_id: str, db: db_dependency, user: get_current_user_dependency):
    try:
        if user is None:
            raise HTTPException(status_code=401, detail="Not Authorized")

        user_id = user.get('user_id')

        user = db.query(User).filter(User.id == user_id).first()

        if user is None:
            raise HTTPException(status_code=404, detail="User not found")

        wallpaper = db.query(Wallpaper).filter(Wallpaper.id == wallpaper_id).first()

        if wallpaper is None:
            raise HTTPException(status_code=404, detail="Wallpaper not found")

        already_downloaded = db.query(Downloaded).filter(Downloaded.wallpaper_id == wallpaper_id,
                                                         Downloaded.user_id == user_id).first()

        if already_downloaded is None:
            download_wallpaper = Downloaded(user_id=user_id, wallpaper_id=wallpaper_id)
            db.add(download_wallpaper)
            db.commit()

            return {
                "success": True,
                "message": "Downloaded Photo"
            }
        else:
            return {
                "success": True,
                "message": "Already Downloaded"
            }

    except Exception as e:
        logger.error(f"Upload error: {str(e)}")
        raise HTTPException(status_code=500, detail="Error")
