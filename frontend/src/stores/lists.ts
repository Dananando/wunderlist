import type { List } from '@/services/lists';
import { listsService } from '@/services/lists';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useListsStore = defineStore('lists', () => {
  const lists = ref<List[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchLists() {
    loading.value = true;
    try {
      lists.value = await listsService.getLists();
    } catch (err) {
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function createList(name: string) {
    loading.value = true;
    try {
      const newList = await listsService.createList(name);
      lists.value.push(newList);
      return newList;
    } catch (err) {
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateList(id: number, name: string) {
    loading.value = true;
    try {
      const updatedList = await listsService.updateList(id, name);
      const index = lists.value.findIndex((list) => list.id === id);
      if (index !== -1) {
        lists.value[index] = updatedList;
      }
      return updatedList;
    } catch (err) {
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function deleteList(id: number) {
    loading.value = true;
    try {
      await listsService.deleteList(id);
      lists.value = lists.value.filter((list) => list.id !== id);
    } catch (err) {
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    lists,
    loading,
    error,
    fetchLists,
    createList,
    updateList,
    deleteList,
  };
});
