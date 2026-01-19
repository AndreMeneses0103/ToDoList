import jwt
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

load_dotenv()

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    to_encode.update({
        "exp": datetime.utcnow() + (expires_delta if expires_delta else timedelta(minutes=15)),
        "type": "access"})
    encoded_jwt = jwt.encode(to_encode, os.getenv("SECRET_KEY"), algorithm=os.getenv("ALGORITHM"))
    return encoded_jwt

def create_refresh_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    to_encode.update({
        "exp": datetime.utcnow() + (expires_delta if expires_delta else timedelta(minutes=15)),
        "type": "refresh"})
    encoded_jwt = jwt.encode(to_encode, os.getenv("SECRET_KEY"), algorithm=os.getenv("ALGORITHM"))
    return encoded_jwt