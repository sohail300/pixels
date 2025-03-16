from fastapi import FastAPI
from starlette import status
from typing import Dict
from fastapi.middleware.cors import CORSMiddleware
from database import engine
import schema
from routes import explore, search, liked, suggested, upload
from auth import AuthMiddleware

schema.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Pixels",
    description="Wallpapers tailored for you",
    version="1.0.0",

)

app.add_middleware(AuthMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/', status_code=status.HTTP_200_OK, response_model=Dict)
async def root():
    return {"message": "Healthy Server!"}


app.include_router(explore.router)
app.include_router(search.router)
app.include_router(liked.router)
app.include_router(suggested.router)
app.include_router(upload.router)

# async def get_current_user(token: Annotated[str, Depends(root)]):
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
#
#         user_id: int = payload.get("user_id")
#         role: int = payload.get("role")
#
#         if not user_id:
#             raise HTTPException(
#                 status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Credentials"
#             )
#
#         return {"user_id": user_id, "role": role}
#
#     except JWTError as exc:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Credentials"
#         ) from exc
#
#
# db_dependency = Annotated[Session, Depends(get_db)]
# user_dependency = Annotated[dict, Depends(get_current_user)]


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
