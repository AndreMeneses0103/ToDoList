import api from "./api";
import type { Task } from "../interfaces/Task";

export const getTasks = async (userId: number): Promise<Task[]> => {
    const params = userId ? { user_id: userId } : {};
    const response = await api.get('/to-do-tasks', { params });
    return response.data;
}

export const getCompletedTasks = async (userId: number): Promise<Task[]> => {
    const params = userId ? { user_id: userId } : {};
    const response = await api.get('/completed-tasks', { params });
    return response.data;
}

export const updateTasks = async (taskId: number): Promise<Task> => {
    const response = await api.put(`/update-task/${taskId}`);
    console.log(response.data);
    return response.data;
}

export const createTask = async (task: Pick<Task, 'user_id' | 'title'>): Promise<Task> => {
    const response = await api.post('/new-task', task);
    return response.data;
}

export const removeTask = async (taskId: number): Promise<void> => {
    await api.delete(`/delete-task/${taskId}`);
    return;
}