import type { Task } from "../interfaces/Task";
import Task from "./Task";

interface Props{
    tasks: Task[],
    loading: boolean,
    onDelete: (taskId: number, isCompleted: boolean) => void,
    onUpdate: (updatedTask: Task) => void
}

export default function ListCompletedTasks({tasks, loading, onDelete, onUpdate}: Props) {

    if (loading) {
        return <div>Loading tasks...</div>;
    }

    return (
        <div className='bg-gray-500/10 p-10 space-y-4'>
            {tasks.map((task) => (
                <Task key={task.id} task={task} onDelete={onDelete} onUpdate={onUpdate}/>
            ))}
        </div>
    )
}
