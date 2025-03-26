// Liste from API

import type { List } from '@/services/lists';
import { listsService } from '@/services/lists';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useListsStore = defineStore('lists', () => {
  const lists = ref<List[]>([]);
  const listLoading = ref(false);
  const error = ref<string | null>(null);
  const selectedListId = ref<number>(0);

  async function fetchLists() {
    listLoading.value = true;
    try {
      lists.value = await listsService.getLists();
    } catch (err) {
      throw err;
    } finally {
      listLoading.value = false;
    }
  }

  async function createList(name: string) {
    listLoading.value = true;
    try {
      await listsService.createList(name);
      await fetchLists();
    } catch (err) {
      throw err;
    } finally {
      listLoading.value = false;
    }
  }

  return {
    lists,
    loading: listLoading,
    selectedListId,
    error,
    fetchLists,
    createList,
  };
});
