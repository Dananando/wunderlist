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

  async createList(name: string): Promise<void> {
    await api.post<List>('/lists', { name });
  },
};
