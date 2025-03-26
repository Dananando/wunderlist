<template>
  <v-navigation-drawer
    v-model="isLeftSidebarOpen"
    permanent
  >
    <div class="d-flex align-center pa-4">
      <v-icon class="mr-4">mdi-pencil</v-icon>
      <span class="text-h5">Lists</span>
    </div>
    <v-list>
      <v-divider></v-divider>
      <v-list-item
        v-for="list in lists"
        :key="list.id"
        :value="list.id"
        :title="list.name"
        @click="selectListId(list.id)"
        :active="selectedListId === list.id"
      >
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn
          block
          color="primary"
          prepend-icon="mdi-plus"
          @click="showNewListDialog = true"
        >
          New List
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>

  <v-dialog
    v-model="showNewListDialog"
    max-width="500px"
  >
    <v-card>
      <v-card-title>New List</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="newListName"
          label="List Name"
          @keyup.enter="createNewList"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          text
          @click="showNewListDialog = false"
          >Cancel</v-btn
        >
        <v-btn
          color="primary"
          @click="createNewList"
          :disabled="!newListName"
          >Create</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { useLeftSidebar } from '@/composables/useLeftSidebar';
  import { useListsStore } from '@/stores/lists';
  import { useTasksStore } from '@/stores/tasks';
  import { storeToRefs } from 'pinia';
  import { ref } from 'vue';

  const { isLeftSidebarOpen } = useLeftSidebar();
  const listsStore = useListsStore();
  const tasksStore = useTasksStore();

  const { lists, selectedListId } = storeToRefs(listsStore);

  listsStore.fetchLists();

  const showNewListDialog = ref(false);
  const newListName = ref('');

  const createNewList = (): void => {
    listsStore.createList(newListName.value);
    newListName.value = '';
    showNewListDialog.value = false;
  };

  const selectListId = async (listId: number): Promise<void> => {
    selectedListId.value = listId;
    await tasksStore.fetchTasks(listId);
  };
</script>
