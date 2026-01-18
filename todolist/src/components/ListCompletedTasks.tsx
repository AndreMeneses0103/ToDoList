import { useState } from "react";
import type { Task } from "../interfaces/Task";
import Task from "./Task";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

interface Props {
    tasks: Task[],
    loading: boolean,
    onDelete: (taskId: number, isCompleted: boolean) => void,
    onUpdate: (updatedTask: Task) => void
}

export default function ListCompletedTasks({ tasks, loading, onDelete, onUpdate }: Props) {

    const [isHide, setIsHide] = useState<boolean>(true);

    if (loading) {
        return <div>Loading tasks...</div>;
    }

    return (
        <div>
            <button
                onClick={() => setIsHide(!isHide)}
                className="
          w-full flex items-center justify-between
          py-3 px-2
          font-medium
          border-b border-gray-300/30
          hover:bg-gray-500/5
          transition
        "
            >
                <span>Completed</span>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                        {tasks.length}
                    </span>

                    <ChevronRightIcon
                        className={`
              h-5 w-5 transition-transform duration-200
              ${!isHide ? 'rotate-90' : ''}
            `}
                    />
                </div>
            </button>

            {!isHide && tasks.length > 0 && (
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

            {!isHide && tasks.length === 0 && (
                <div className="text-sm text-gray-500 px-2 py-4">
                    No completed tasks yet.
                </div>
            )}
        </div>
    )
}
