from typing import Annotated, Dict
import jwt
from fastapi import Request, Depends
from starlette.middleware.base import BaseHTTPMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

SUPABASE_JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET")
ALGORITHM = os.getenv("ALGORITHM")

class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header.split(" ")[1]
            request.state.token = token
        else:
            request.state.token = None

        response = await call_next(request)
        return response

async def get_current_user(request: Request):
    try:
        token = getattr(request.state, "token", None)

        payload = jwt.decode(token, SUPABASE_JWT_SECRET, algorithms='HS256')
        user_id = payload.get("sub")

        if token and payload and user_id:
            return {"user_id": user_id}
        else:
            return {"user_id": None}
    except:
        return {"user_id": None}

get_current_user_dependency = Annotated[Dict, Depends(get_current_user)]