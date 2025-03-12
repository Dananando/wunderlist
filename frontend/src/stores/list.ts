import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface TodoList {
  id: string;
  name: string;
}

export const useListStore = defineStore('list', () => {
  const lists = ref<TodoList[]>([
    {
      id: '1',
      name: 'List 1',
    },
    {
      id: '2',
      name: 'List 2',
    },
  ]);
  const selectedList = ref<string | null>(null);

  function addList(name: string) {
    lists.value.push({
      id: Math.random().toString(36).substring(7),
      name,
    });
  }

  function deleteList(id: string) {
    const index = lists.value.findIndex((list) => list.id === id);
    if (index !== -1) {
      lists.value.splice(index, 1);
      if (selectedList.value === id) {
        selectedList.value = null;
      }
    }
  }

  function selectList(id: string | null) {
    selectedList.value = id;
  }

  return {
    lists,
    selectedList,
    addList,
    deleteList,
    selectList,
  };
});
