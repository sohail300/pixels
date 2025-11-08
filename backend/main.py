from fastapi import FastAPI
from starlette import status
from typing import Dict
from fastapi.middleware.cors import CORSMiddleware
from db import engine, Base
from dotenv import load_dotenv
import os
from routes import explore, search, liked_wallpapers, suggested, upload, like, download
from auth import AuthMiddleware

# Import models to ensure Base metadata is populated
from db.models import User, Wallpaper, Category, WallpaperCategory, Liked, Downloaded

Base.metadata.create_all(bind=engine)

load_dotenv()

app = FastAPI(
    title="Pixels",
    description="Wallpapers tailored for you",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://pixels.heysohail.xyz"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(AuthMiddleware)


# Configure OpenAPI schema to include Bearer token authentication
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    
    from fastapi.openapi.utils import get_openapi
    
    openapi_schema = get_openapi(
        title=app.title,
        version=app.version,
        description=app.description,
        routes=app.routes,
    )
    
    # Add security scheme
    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT",
            "description": "Enter your JWT token (Bearer token)"
        }
    }
    
    # Add security requirements to all API endpoints (those starting with /api)
    # This will show the lock icon in Swagger UI for authenticated endpoints
    if "paths" in openapi_schema:
        for path, methods in openapi_schema["paths"].items():
            # Skip the root endpoint
            if path != "/":
                for method in methods.values():
                    if isinstance(method, dict):
                        # Add security requirement to this endpoint
                        method["security"] = [{"BearerAuth": []}]
    
    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = custom_openapi


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

PORT = int(os.getenv('PORT'))

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=PORT, reload=True)
