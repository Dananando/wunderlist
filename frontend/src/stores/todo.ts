import { defineStore } from 'pinia';
import { ref } from 'vue';

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  listId: string;
}

interface TodoList {
  id: string;
  name: string;
}

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([]);
  const lists = ref<TodoList[]>([]);
  const selectedList = ref<string | null>(null);
  const selectedTodo = ref<Todo | null>(null);

  function addTodo(todo: Omit<Todo, 'id'>) {
    todos.value.push({
      ...todo,
      id: Math.random().toString(36).substring(7),
    });
  }

  function addList(name: string) {
    lists.value.push({
      id: Math.random().toString(36).substring(7),
      name,
    });
  }

  function deleteTodo(id: string) {
    const index = todos.value.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      todos.value.splice(index, 1);
      if (selectedTodo.value?.id === id) {
        selectedTodo.value = null;
      }
    }
  }

  function toggleTodoStatus(id: string) {
    const todo = todos.value.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }

  function selectList(id: string | null) {
    selectedList.value = id;
  }

  function selectTodo(todo: Todo | null) {
    selectedTodo.value = todo;
  }

  return {
    todos,
    lists,
    selectedList,
    selectedTodo,
    addTodo,
    addList,
    deleteTodo,
    toggleTodoStatus,
    selectList,
    selectTodo,
  };
});
