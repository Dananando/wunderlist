import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface Task {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  dueDate: string;
  completed: boolean;
  listId: string;
  createdAt: string;
}

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<Task[]>([
    {
      id: '1',
      title: 'Buy groceries',
      shortDescription: 'Get milk, eggs, and bread',
      longDescription: 'Toto',
      dueDate: new Date().toLocaleDateString('fr-FR'),
      completed: false,
      listId: '1',
      createdAt: new Date().toLocaleDateString('fr-FR'),
    },
    {
      id: '2',
      title: 'Do laundry',
      shortDescription: 'Wash and fold clothes',
      longDescription: 'Toto',
      dueDate: new Date().toLocaleDateString('fr-FR'),
      completed: true,
      listId: '1',
      createdAt: new Date().toLocaleDateString('fr-FR'),
    },
    {
      id: '3',
      title: 'Pay bills',
      shortDescription: 'Pay electricity and water bills',
      longDescription: 'Toto',
      dueDate: new Date().toLocaleDateString('fr-FR'),
      completed: false,
      listId: '2',
      createdAt: new Date().toLocaleDateString('fr-FR'),
    },
    {
      id: '4',
      title: 'Blabla',
      shortDescription: 'Get milk, eggs, and bread',
      longDescription: 'Toto',
      dueDate: new Date().toLocaleDateString('fr-FR'),
      completed: false,
      listId: '1',
      createdAt: new Date().toLocaleDateString('fr-FR'),
    },
    {
      id: '5',
      title: 'Toto',
      shortDescription: 'Get milk, eggs, and bread',
      longDescription: 'Toto',
      dueDate: new Date().toLocaleDateString('fr-FR'),
      completed: false,
      listId: '1',
      createdAt: new Date().toLocaleDateString('fr-FR'),
    },
    {
      id: '6',
      title: 'Tata',
      shortDescription: 'Get milk, eggs, and bread',
      longDescription: 'Toto',
      dueDate: new Date().toLocaleDateString('fr-FR'),
      completed: false,
      listId: '1',
      createdAt: new Date().toLocaleDateString('fr-FR'),
    },
  ]);
  const selectedTask = ref<Task | null>(null);

  const addTask = (task: Omit<Task, 'id'>) => {
    tasks.value.push({
      ...task,
      id: (tasks.value.length + 1).toString(),
    });
  };

  const deleteTask = (id: string) => {
    const index = tasks.value.findIndex((task) => task.id === id);
    if (index !== -1) {
      tasks.value.splice(index, 1);
      if (selectedTask.value?.id === id) {
        selectedTask.value = null;
      }
    }
  };

  const toggleTaskStatus = (id: string) => {
    const task = tasks.value.find((task) => task.id === id);
    if (task) {
      task.completed = !task.completed;
    }
  };

  const selectTask = (task: Task | null) => {
    selectedTask.value = task;
  };

  const deleteTasksByListId = (listId: string) => {
    tasks.value = tasks.value.filter((task) => task.listId !== listId);
    if (selectedTask.value?.listId === listId) {
      selectedTask.value = null;
    }
  };

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
