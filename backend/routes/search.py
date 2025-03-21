from fastapi import APIRouter
from starlette import status

from database import db_dependency
from modal import ResponseModel

router = APIRouter(prefix='/api', tags=['APIs'])


@router.get('/search', response_model=ResponseModel, status_code=status.HTTP_200_OK)
async def search(skip: int, limit: int, query: str, db: db_dependency):
    # get the photos that have the query in their name or their categories
    return {"message": "Explore"}
