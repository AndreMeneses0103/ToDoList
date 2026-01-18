import type { Task } from "../interfaces/Task";
import Task from "./Task";

interface Props {
    tasks: Task[],
    loading: boolean,
    onDelete: (taskId: number, isCompleted: boolean) => void,
    onUpdate: (updatedTask: Task) => void
}

export default function ListTasks({ tasks, loading, onDelete, onUpdate }: Props) {

    if (loading) {
        return <div>Loading tasks...</div>;
    }

    if (tasks.length === 0) {
        return <div>No tasks available. Create a new one above!</div>;
    }

    return (
        <div>
            <div
                className="
          w-full flex items-center justify-between
          py-3 px-2
          font-medium
          border-b border-gray-300/30
        hover:bg-gray-500/5
          transition
        "
            >
                <span>To do</span>
                <span className="text-sm text-gray-500">
                    {tasks.length}
                </span>
            </div>

            {tasks.length === 0 ? (
                <div className="text-sm text-gray-500 px-2 py-4">
                    No tasks available. Create a new one above!
                </div>
            ) : (
                <div className="bg-gray-500/10 p-10 space-y-4">
                    {tasks.map(task => (
                        <Task
                            key={task.id}
                            task={task}
                            onDelete={onDelete}
                            onUpdate={onUpdate}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
