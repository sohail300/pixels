from fastapi import FastAPI
from starlette import status
from typing import Dict
from fastapi.middleware.cors import CORSMiddleware
from database import engine
import schema
from dotenv import load_dotenv
import os
from routes import explore, search, liked_wallpapers, suggested, upload, like, download
from auth import AuthMiddleware

schema.Base.metadata.create_all(bind=engine)

load_dotenv()

app = FastAPI(
    title="Pixels",
    description="Wallpapers tailored for you",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://pixels.heysohail.me/upload"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(AuthMiddleware)


@app.get('/', status_code=status.HTTP_200_OK, response_model=Dict)
async def root():
    return {"message": "Healthy Server!"}


app.include_router(explore.router)
app.include_router(search.router)
app.include_router(liked_wallpapers.router)
app.include_router(suggested.router)
app.include_router(upload.router)
app.include_router(like.router)
app.include_router(download.router)

PORT = int(os.getenv('PORT', '8000'))

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=PORT, reload=True)
