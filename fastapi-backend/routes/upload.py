from fastapi import APIRouter
from starlette import status

from auth import get_current_user_dependency
from database import db_dependency
from modal import ResponseModel

router = APIRouter(prefix='/api', tags=['Upload'])


@router.get('/upload', status_code=status.HTTP_200_OK)
async def suggested(skip: int, limit: int, db: db_dependency, user: get_current_user_dependency):
    print(user)
    if user.get('user_id') is None:
        return {"message": "You are not logged in"}
    else:
        return {"message": "Upload"}
