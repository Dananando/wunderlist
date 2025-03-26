<template>
  <LeftSideBar />

  <!-- Main Content -->
  <v-container fluid>
    <template v-if="selectedListId">
      <v-tabs v-model="activeTab">
        <v-tab value="ongoing">Ongoing</v-tab>
        <v-tab value="done">Done</v-tab>
      </v-tabs>

      <v-window
        v-model="activeTab"
        class="mt-4"
        theme="primary"
      >
        <v-window-item value="ongoing">
          <v-list>
            <BaseItem
              v-for="task in ongoingTasks"
              :key="task.id"
              :value="task.id"
              @click="selectTask(task.id)"
              @click-on-icon="tasksStore.toggleTaskCompleted(task.id, selectedListId)"
              icon="mdi-checkbox-blank-outline"
              :model-value="task.completed"
              :title="task.shortDescription"
            />
          </v-list>
        </v-window-item>

        <v-window-item value="done">
          <v-list>
            <BaseItem
              v-for="task in completedTasks"
              :key="task.id"
              :value="task.id"
              @click-on-item="selectTask(task.id)"
              @click-on-icon="tasksStore.toggleTaskCompleted(task.id, selectedListId)"
              icon="mdi-checkbox-marked"
              :model-value="task.completed"
              :title="task.shortDescription"
              item-title-class="text-decoration-line-through"
            />
          </v-list>
        </v-window-item>
      </v-window>

      <v-btn
        color="primary"
        icon="mdi-plus"
        size="large"
        class="floating-btn"
        @click="showNewTaskDialog = true"
      ></v-btn>
    </template>
    <template v-else>
      <v-row
        class="fill-height"
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
          class="text-center"
        >
          <h2 class="text-h5">Please select a list from the sidebar</h2>
        </v-col>
      </v-row>
    </template>
  </v-container>

  <RightSideBar />

  <v-dialog
    v-model="showNewTaskDialog"
    max-width="500px"
  >
    <v-card>
      <v-card-title>New Task</v-card-title>
      <v-card-text>
        <v-textarea
          v-model="newTask.shortDescription"
          label="Description"
        />
        <v-textarea
          v-model="newTask.longDescription"
          label="Long Description"
        />
        <v-date-picker
          title="Due Date"
          color="primary"
          v-model="newTask.dueDate"
          landscape
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          text
          @click="showNewTaskDialog = false"
          >Cancel</v-btn
        >
        <v-btn
          color="primary"
          @click="createNewTask"
          >Create</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import BaseItem from '@/components/BaseItem.vue';
  import { useRightSidebar } from '@/composables/useRightSideBar';
  import type { Task } from '@/services/tasks';
  import { useListsStore } from '@/stores/lists';
  import { useTasksStore } from '@/stores/tasks';
  import { storeToRefs } from 'pinia';
  import { computed, ref, watch } from 'vue';
  import LeftSideBar from './LeftSideBar.vue';
  import RightSideBar from './RightSideBar.vue';

  const listsStore = useListsStore();
  const tasksStore = useTasksStore();
  const { toggleRightSidebar } = useRightSidebar();

  const { selectedListId } = storeToRefs(listsStore);
  const { tasks, selectedTask } = storeToRefs(tasksStore);

  const rightDrawer = ref(false);
  const activeTab = ref('ongoing');
  const showNewTaskDialog = ref(false);
  const newTask = ref<Partial<Task>>({
    shortDescription: '',
    longDescription: '',
    completed: false,
    listId: selectedListId.value,
  });

  // Watch for selected task to open right drawer
  watch(
    () => selectedTask.value,
    (newValue) => {
      rightDrawer.value = !!newValue;
    },
  );

  const ongoingTasks = computed(() =>
    tasks.value.filter((task) => task.listId === +selectedListId.value && !task.completed),
  );

  const completedTasks = computed(() =>
    tasks.value.filter((task) => task.listId === +selectedListId.value && task.completed),
  );

  function createNewTask() {
    if (selectedListId.value) {
      console.log(
        newTask.value,
        new Date('Thu Mar 06 2025 00:00:00 GMT+0100 (heure normale d’Europe centrale)'),
      );
      tasksStore.createTask(+selectedListId.value, {
        ...newTask.value,
        dueDate: newTask.value.dueDate
          ? new Date(newTask.value.dueDate).toISOString()
          : new Date().toISOString(),
      });
      showNewTaskDialog.value = false;

      newTask.value = {
        shortDescription: '',
        longDescription: '',
        completed: false,
        listId: selectedListId.value,
      };
    }
  }

  const selectTask = (id: number) => {
    toggleRightSidebar();
    selectedTask.value = tasks.value.filter((task) => task.id === id)[0];
  };
</script>

<style scoped>
  .floating-btn {
    position: fixed;
    bottom: 16px;
    right: 16px;
  }
</style>
