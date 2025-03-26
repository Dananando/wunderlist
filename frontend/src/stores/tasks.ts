// Tasks from API

import { tasksService, type Task } from '@/services/tasks';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTasksStore = defineStore('tasks', () => {
  const loading = ref(false);
  const tasks = ref<Task[]>([]);
  const selectedTask = ref<Partial<Task> | null>(null);

  async function fetchTasks(listId: number) {
    loading.value = true;

    try {
      tasks.value = await tasksService.getTasks(listId);
    } catch (err) {
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function createTask(listId: number, task: Partial<Task>) {
    loading.value = true;
    try {
      await tasksService.createTask(listId, task);
      await fetchTasks(listId);
    } catch (err) {
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateTask(id: number, listId: number, task: Partial<Task>) {
    loading.value = true;
    try {
      await tasksService.updateTask(id, listId, task);
      await fetchTasks(listId);
    } catch (err) {
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function toggleTaskCompleted(id: number, listId: number) {
    loading.value = true;
    try {
      await tasksService.updateTask(id, listId, { completed: !selectedTask.value?.completed });
      await fetchTasks(listId);
    } catch (err) {
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function deleteTask(id: number, listId: number) {
    loading.value = true;
    try {
      await tasksService.deleteTask(id, listId);
      await fetchTasks(listId);
    } catch (err) {
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    selectedTask,
    toggleTaskCompleted,
    loading,
    tasks,
    createTask,
    updateTask,
    deleteTask,
    fetchTasks,
  };
});
