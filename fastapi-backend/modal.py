from pydantic import BaseModel
from typing import List

class ResponseModel(BaseModel):
    id: str
    name: str
    image: str
    downloaded: int
    liked: int
    uploaded_by: str
    categories: List[str]

    class Config:
        from_attributes = True  # Use this for Pydantic v2
