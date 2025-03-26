import { api } from './api';

export interface Task {
  id: number;
  shortDescription: string;
  longDescription?: string;
  dueDate?: string;
  listId: number;
  completed: boolean;
}

export const tasksService = {
  async getTasks(listId: number): Promise<Task[]> {
    const response = await api.get<Task[]>(`/lists/${listId}/tasks`);
    return response.data;
  },

  async createTask(listId: number, task: Partial<Task>): Promise<Task> {
    const response = await api.post<Task>(`/lists/${listId}/tasks`, task);
    return response.data;
  },

  async updateTask(id: number, listId: number, task: Partial<Task>): Promise<Task> {
    const response = await api.patch<Task>(`/lists/${listId}/tasks/${id}`, task);
    return response.data;
  },

  async deleteTask(id: number, listId: number): Promise<void> {
    await api.delete(`/lists/${listId}/tasks/${id}`);
  },
};
