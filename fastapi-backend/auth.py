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
        print(auth_header)
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

        if not token:
            return {"user_id": None}

        try:
            payload = jwt.decode(token, SUPABASE_JWT_SECRET, algorithms=[ALGORITHM], options={"verify_aud": False})
            user_id = payload.get("sub")

            if user_id:
                return {"user_id": user_id}
            else:
                return {"user_id": None}
        except Exception as e:
            print(f"JWT decode error: {str(e)}")
            return {"user_id": None}
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        return {"user_id": None}


get_current_user_dependency = Annotated[Dict, Depends(get_current_user)]
