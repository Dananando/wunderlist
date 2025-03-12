import type { Task } from '@/stores/task';
import { api } from './api';

export interface List {
  id: number;
  name: string;
  userId: number;
  tasks: Task[];
}

export const listsService = {
  async getLists(): Promise<List[]> {
    const response = await api.get<List[]>('/lists');
    return response.data;
  },

  async createList(name: string): Promise<List> {
    const response = await api.post<List>('/lists', { name });
    return response.data;
  },

  async updateList(id: number, name: string): Promise<List> {
    const response = await api.patch<List>(`/lists/${id}`, { name });
    return response.data;
  },

  async deleteList(id: number): Promise<void> {
    await api.delete(`/lists/${id}`);
  },
};
