from pydantic import BaseModel

class ResponseModel(BaseModel):
    id: str
    name: str
    image: str
    downloaded: int
    liked: int
    uploaded_by: str
    categories: list

class UploadModal(BaseModel):
    name: str
    image: str
    categories: list