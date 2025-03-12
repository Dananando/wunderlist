import { api } from './api';

export interface Task {
  id: number;
  shortDescription: string;
  longDescription?: string;
  dueDate?: Date;
  listId: number;
}

export const tasksService = {
  async createTask(task: Omit<Task, 'id'>): Promise<Task> {
    const response = await api.post<Task>('/tasks', task);
    return response.data;
  },

  async updateTask(id: number, task: Omit<Task, 'id'>): Promise<Task> {
    const response = await api.patch<Task>(`/tasks/${id}`, task);
    return response.data;
  },

  async deleteTask(id: number): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },
};
