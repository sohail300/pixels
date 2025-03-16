from fastapi import APIRouter
from starlette import status

from database import db_dependency
from modal import ResponseModel

router = APIRouter(prefix='/api', tags=['APIs'])


@router.get('/suggested', response_model=ResponseModel, status_code=status.HTTP_200_OK)
async def suggested(skip: int, limit: int, db: db_dependency):
    # convert token to user id
    # if userid exists, then SEE WHAT CATEGORIES POSTS HAS USER LIKED, AND GET THOSE CATEGORY PHOTOS FROM BACKEND
    return {"message": "Explore"}

