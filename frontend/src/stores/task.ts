import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  listId: string;
}

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<Task[]>([
    {
      id: '1',
      title: 'Buy groceries',
      description: 'Get milk, eggs, and bread',
      completed: false,
      listId: '1',
    },
    {
      id: '2',
      title: 'Do laundry',
      description: 'Wash and fold clothes',
      completed: true,
      listId: '1',
    },
    {
      id: '3',
      title: 'Pay bills',
      description: 'Pay electricity and water bills',
      completed: false,
      listId: '2',
    },
  ]);
  const selectedTask = ref<Task | null>(null);

  function addTask(task: Omit<Task, 'id'>) {
    tasks.value.push({
      ...task,
      id: Math.random().toString(36).substring(7),
    });
  }

  function deleteTask(id: string) {
    const index = tasks.value.findIndex((task) => task.id === id);
    if (index !== -1) {
      tasks.value.splice(index, 1);
      if (selectedTask.value?.id === id) {
        selectedTask.value = null;
      }
    }
  }

  function toggleTaskStatus(id: string) {
    const task = tasks.value.find((task) => task.id === id);
    if (task) {
      task.completed = !task.completed;
    }
  }

  function selectTask(task: Task | null) {
    selectedTask.value = task;
  }

  function deleteTasksByListId(listId: string) {
    tasks.value = tasks.value.filter((task) => task.listId !== listId);
    if (selectedTask.value?.listId === listId) {
      selectedTask.value = null;
    }
  }

  return {
    tasks,
    selectedTask,
    addTask,
    deleteTask,
    toggleTaskStatus,
    selectTask,
    deleteTasksByListId,
  };
});
