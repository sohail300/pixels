from pydantic import BaseModel
from typing import List, Optional


class ImageSchema(BaseModel):
    id: str
    name: str
    image: str
    downloads: int
    likes: int
    uploader_name: Optional[str] = None
    has_liked: bool
    categories: List[str]

    class Config:
        from_attributes = True  # Use this for Pydantic v2


class SuccessSchema(BaseModel):
    success: bool
    message: str

    class Config:
        from_attributes = True

