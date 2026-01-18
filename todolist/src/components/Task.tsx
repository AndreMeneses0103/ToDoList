import { TrashIcon } from '@heroicons/react/24/solid'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import type { Task } from '../interfaces/Task'
import { toast } from 'react-toastify'
import { removeTask, updateTasks } from '../services/TaskService'

interface TaskProps {
  task: Task,
  onDelete: (taskId: number, isCompleted: boolean) => void
  onUpdate: (updatedTask: Task) => void
}

export default function Task({ task, onDelete, onUpdate }: TaskProps) {
  const deleteTask = async (task: Task) => {
    try {
      await removeTask(task.id);
      toast.success("Task deleted successfully!");
      onDelete(task.id, task.completed);
    } catch (error) {
      toast.error("Error deleting task.");
    }
  }

  const completeTask = async (task_id: number) => {
    try {
      const data = await updateTasks(task_id);
      toast.success("Task completed successfully!");
      console.log(data);
      onUpdate(data);
    } catch (error) {
      toast.error("Error completing task.");
    }
  }

  return (
    <div className="bg-gray-800 p-2 rounded-md flex items-center">
      <CheckCircleIcon
        onClick={() => completeTask(task.id)}
        className={`h-6 w-6 ml-2 cursor-pointer transition-colors
          ${task.completed
                  ? "text-green-500 hover:text-gray-500"
                  : "text-gray-500 hover:text-green-500"
                }
        `}
      />
      <div
        className={`p-[8px] ml-2 ${task.completed ? "line-through text-gray-400" : ""
          }`}
      >
        {task.title}
      </div>
      <TrashIcon onClick={() => deleteTask(task)} className="h-6 w-6 ml-auto mr-2 text-gray-500 cursor-pointer hover:text-red-500" />
    </div>
  )
}
