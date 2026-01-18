from typing import Union
from typing import List
from schemas import Task, NewTask, UpdateTask
from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import get_db_connection

app = FastAPI(title="ToDoList API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/tasks", response_model=List[Task])
def get_tasks(id: int | None = Query(None, description="User ID to get tasks")):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    if id:
        cursor.execute(
            "SELECT id, title, completed, user_id, created_at, updated_at FROM tasks WHERE user_id = %s;",
            (id,)
        )
    else:
        cursor.execute(
            "SELECT id, title, completed, user_id, created_at, updated_at FROM tasks;"
        )
    
    rows = cursor.fetchall()
    tasks = [
        Task(
            id=row[0],
            title=row[1],
            completed=row[2],
            user_id=row[3],
            created_at=row[4],
            updated_at=row[5]
        ) for row in rows
    ]
    cursor.close()
    conn.close()
    return tasks

@app.get("/to-do-tasks", response_model=List[Task])
def get_todo_tasks(id: int | None = Query(None, description="User ID to get to do tasks")):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    if id:
        cursor.execute(
            "SELECT id, title, completed, user_id, created_at, updated_at FROM tasks WHERE user_id = %s AND completed = false;",
            (id,)
        )
    else:
        cursor.execute(
            "SELECT id, title, completed, user_id, created_at, updated_at FROM tasks WHERE completed = false;"
        )
    
    rows = cursor.fetchall()
    tasks = [
        Task(
            id=row[0],
            title=row[1],
            completed=row[2],
            user_id=row[3],
            created_at=row[4],
            updated_at=row[5]
        ) for row in rows
    ]
    cursor.close()
    conn.close()
    return tasks

@app.get("/completed-tasks", response_model=List[Task])
def get_completed_tasks(id: int | None = Query(None, description="User ID to get completed tasks")):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    if id:
        cursor.execute(
            "SELECT id, title, completed, user_id, created_at, updated_at FROM tasks WHERE user_id = %s AND completed = true;",
            (id,)
        )
    else:
        cursor.execute(
            "SELECT id, title, completed, user_id, created_at, updated_at FROM tasks WHERE completed = true;"
        )
    
    rows = cursor.fetchall()
    tasks = [
        Task(
            id=row[0],
            title=row[1],
            completed=row[2],
            user_id=row[3],
            created_at=row[4],
            updated_at=row[5]
        ) for row in rows
    ]
    cursor.close()
    conn.close()
    return tasks

@app.post("/new-task", response_model=NewTask, status_code=201)
def post_new_task(task: NewTask):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute(
        "INSERT INTO tasks (user_id, title) VALUES (%s, %s) RETURNING id, completed, created_at;",
        (task.user_id, task.title)
    )
    
    row = cursor.fetchone()
    conn.commit()
    
    cursor.close()
    conn.close()
    
    print(row)
    return {
        "id": row[0],
        "user_id": task.user_id,
        "title": task.title,
        "completed": row[1],
        "created_at": row[2],
    }
    
@app.put("/update-task/{task_id}", response_model=Task)
def complete_task(task_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute(
        """
        UPDATE tasks
        SET completed = NOT completed,
            updated_at = NOW()
        WHERE id = %s
        RETURNING user_id, title, completed, created_at;
        """,
        (task_id,)
    )
    
    row = cursor.fetchone()
    conn.commit()
    
    cursor.close()
    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail="Task not found")

    return {
        "id": task_id,
        "user_id": row[0],
        "title": row[1],
        "completed": row[2],
        "created_at": row[3],
    }
    
@app.delete("/delete-task/{task_id}", status_code=204)
def delete_task(task_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute(
        "DELETE FROM tasks WHERE id = %s RETURNING id;",
        (task_id,)
    )
    deleted = cursor.fetchone()
    conn.commit()
    
    cursor.close()
    conn.close()
    if not deleted:
        raise HTTPException(status_code=404, detail="Task not found")

    return