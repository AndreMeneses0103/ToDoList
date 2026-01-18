from pydantic import BaseModel
from datetime import datetime

class Task(BaseModel):
    id: int
    title: str
    completed: bool = False
    user_id: int
    created_at: datetime
    updated_at: datetime | None = None
    
class NewTask(BaseModel):
    title: str
    user_id: int
    
class UpdateTask(BaseModel):
    id: int
    

class LoginSchema(BaseModel):
    email: str
    password: str