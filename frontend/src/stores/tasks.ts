// Tasks from API

import { tasksService, type Task } from '@/services/tasks';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTasksStore = defineStore('tasks', () => {
  const loading = ref(false);

  async function createTask(task: Omit<Task, 'id'>) {
    loading.value = true;
    try {
      return await tasksService.createTask(task);
    } catch (err) {
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateTask(id: number, task: Omit<Task, 'id'>) {
    loading.value = true;
    try {
      return await tasksService.updateTask(id, task);
    } catch (err) {
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function deleteTask(id: number) {
    loading.value = true;
    try {
      await tasksService.deleteTask(id);
    } catch (err) {
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    createTask,
    updateTask,
    deleteTask,
  };
});
