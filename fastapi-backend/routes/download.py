from fastapi import APIRouter, HTTPException
from starlette import status

from auth import get_current_user_dependency
from database import db_dependency
from modal import SuccessResponseModel
from schema import Liked, Wallpaper, Downloaded

router = APIRouter(prefix='/api', tags=['APIs'])


@router.get('/download/{wallpaper_id}', response_model=SuccessResponseModel, status_code=status.HTTP_200_OK)
async def download(wallpaper_id: str, db: db_dependency, user: get_current_user_dependency):
    try:

        wallpaper = db.query(Wallpaper).filter(Wallpaper.id == wallpaper_id).first()

        if wallpaper is None:
            raise HTTPException(status_code=404, detail="Wallpaper not found")

        user_id = user.get('user_id')

        already_downloaded = db.query(Downloaded).filter(Downloaded.wallpaper_id == wallpaper_id, Downloaded.user_id == user_id).first()
        print(already_downloaded)

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
        print(e)
        raise HTTPException(status_code=500, detail="Error")
