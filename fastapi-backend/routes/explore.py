from fastapi import APIRouter
from starlette import status

from database import db_dependency
from modal import ResponseModel

router = APIRouter(prefix='/api', tags=['APIs'])


@router.get('/explore', response_model=ResponseModel, status_code=status.HTTP_200_OK)
async def explore(skip: int, limit: int, db: db_dependency):
    # get the latest photos from the db
    return {"message": "Explore"}
