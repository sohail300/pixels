from fastapi import APIRouter
from starlette import status

from database import db_dependency
from modal import ResponseModel

router = APIRouter(prefix='/api', tags=['APIs'])


@router.get('/liked', response_model=ResponseModel, status_code=status.HTTP_200_OK)
async def liked(skip: int, limit: int, db: db_dependency):
    # convert token to user id
    # if userid exists, then return liked else nothing
    return {"message": "Explore"}
