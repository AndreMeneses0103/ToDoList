import './App.css'
import Header from './components/Header'
import CreateTask from './components/CreateTask'
import ListTasks from './components/ListTasks'
import { ToastContainer } from 'react-toastify'
import type { Task } from './interfaces/Task'
import { useEffect, useState } from 'react'
import { getCompletedTasks, getTasks } from './services/TaskService'
import ListCompletedTasks from './components/ListCompletedTasks'

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchToDoTasks = async () => {
    try {
      const data = await getTasks(1)
      setTasks(data)
    } catch (error) {
      console.error("Error fetching tasks:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCompletedTasks = async () => {
    try {
      const data = await getCompletedTasks(1)
      setCompletedTasks(data)
    } catch (error) {
      console.error("Error fetching tasks:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchToDoTasks()
    fetchCompletedTasks()
  }, []);

  const handleTaskUpdated = (updatedTask: Task) => {
    if (updatedTask.completed) {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== updatedTask.id));
      setCompletedTasks(prevTasks => [updatedTask, ...prevTasks]);
    } else {
      setCompletedTasks(prevTasks => prevTasks.filter(task => task.id !== updatedTask.id));
      setTasks(prevTasks => [updatedTask, ...prevTasks]);
    }
    return;
  }

  const handleTaskCreated = (newTask: Task) => {
    if (newTask.completed) {
      setCompletedTasks(prevTasks => [newTask, ...prevTasks]);
    } else {
      setTasks(prevTasks => [newTask, ...prevTasks]);
    }
    return;
  }

  const handleTaskDeleted = (taskId: number, isCompleted: boolean) => {
    if (isCompleted) {
      setCompletedTasks(prevTasks =>
        prevTasks.filter(task => task.id !== taskId)
      );
    } else {
      setTasks(prevTasks =>
        prevTasks.filter(task => task.id !== taskId)
      );
    }
  };

  return (
    <>
      <div className='flex flex-col gap-16'>
        <Header />
        <CreateTask onCreate={handleTaskCreated} />
        <ListTasks tasks={tasks} loading={loading} onDelete={handleTaskDeleted} onUpdate={handleTaskUpdated} />
        <ListCompletedTasks tasks={completedTasks} loading={loading} onDelete={handleTaskDeleted} onUpdate={handleTaskUpdated} />
      </div>
      <ToastContainer
        theme='dark'
      />
    </>
  )
}

export default App
