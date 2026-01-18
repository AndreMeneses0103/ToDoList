import { PlusIcon } from '@heroicons/react/24/solid'
import { toast } from 'react-toastify'
import { createTask } from '../services/TaskService';
import { useState } from 'react';
import type { Task } from '../interfaces/Task';

interface CreateTaskProps {
    onCreate: (newTask: Task) => void
}

export default function CreateTask({onCreate}: CreateTaskProps) {

  const [title, setTitle] =  useState<string>("");

  const newTask = async() =>{
    if(title.trim() === ""){
      toast.error("Task title cannot be empty.");
      return;
    }
    try {
      const createdTask = await createTask({title: title, user_id:5});
      toast.success("Task created successfully!");
      onCreate(createdTask);
      setTitle("");
    } catch (error) {
      toast.error("Error creating task.");
    }
  }

  const enterTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter'){
      newTask();
    }
  }

  return (
    <div className='bg-gray-500/10 p-4 rounded-md flex items-center'>
        <button onClick={newTask} className="bg-transparent cursor-pointer p-2 rounded-full hover:bg-gray-300/20">
            <PlusIcon className="h-6 w-6 text-gray-500" />
        </button>
        <input 
          type="text" 
          placeholder="Create a new task..." 
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          onKeyDown={enterTask}
          className="ml-2 p-2 rounded-md focus:outline-none"
        />
    </div>
  )
}
