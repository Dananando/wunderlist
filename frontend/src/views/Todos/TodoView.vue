<template>
  <LeftSideBar />

  <!-- Main Content -->
  <v-container fluid>
    <template v-if="listStore.selectedList">
      <v-tabs v-model="activeTab">
        <v-tab value="ongoing">Ongoing</v-tab>
        <v-tab value="done">Done</v-tab>
      </v-tabs>

      <v-window
        v-model="activeTab"
        class="mt-4"
      >
        <v-window-item value="ongoing">
          <v-list>
            <BaseItem
              v-for="task in ongoingTasks"
              :key="task.id"
              :value="task.id"
              @click-on-item="taskStore.selectTask(task)"
              @click-on-icon="taskStore.toggleTaskStatus(task.id)"
              icon="mdi-checkbox-blank-outline"
              :model-value="task.completed"
              :title="task.title"
            />
          </v-list>
        </v-window-item>

        <v-window-item value="done">
          <v-list>
            <BaseItem
              v-for="task in completedTasks"
              :key="task.id"
              :value="task.id"
              @click-on-item="taskStore.selectTask(task)"
              @click-on-icon="taskStore.toggleTaskStatus(task.id)"
              icon="mdi-checkbox-marked"
              :model-value="task.completed"
              :title="task.title"
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
        @click="showNewTodoDialog = true"
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
    v-model="showNewTodoDialog"
    max-width="500px"
  >
    <v-card>
      <v-card-title>New Task</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="newTask.title"
          label="Title"
        ></v-text-field>
        <v-textarea
          v-model="newTask.description"
          label="Description"
        ></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          text
          @click="showNewTodoDialog = false"
          >Cancel</v-btn
        >
        <v-btn
          color="primary"
          @click="createNewTask"
          :disabled="!newTask.title"
          >Create</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import BaseItem from '@/components/BaseItem.vue';
  import { useListStore } from '@/stores/list';
  import { useTaskStore } from '@/stores/task';
  import { computed, ref, watch } from 'vue';
  import LeftSideBar from './LeftSideBar.vue';

  const listStore = useListStore();
  const taskStore = useTaskStore();

  const rightDrawer = ref(false);
  const activeTab = ref('ongoing');
  const showNewTodoDialog = ref(false);
  const showDeleteDialog = ref(false);
  const newTask = ref({
    title: '',
    description: '',
  });

  // Watch for selected task to open right drawer
  watch(
    () => taskStore.selectedTask,
    (newValue) => {
      rightDrawer.value = !!newValue;
    },
  );

  const ongoingTasks = computed(() =>
    taskStore.tasks.filter((task) => task.listId === listStore.selectedList && !task.completed),
  );

  const completedTasks = computed(() =>
    taskStore.tasks.filter((task) => task.listId === listStore.selectedList && task.completed),
  );

  function createNewTask() {
    if (newTask.value.title && listStore.selectedList) {
      taskStore.addTask({
        title: newTask.value.title,
        description: newTask.value.description,
        completed: false,
        listId: listStore.selectedList,
      });
      newTask.value = { title: '', description: '' };
      showNewTodoDialog.value = false;
    }
  }

  function deleteTask() {
    if (taskStore.selectedTask) {
      taskStore.deleteTask(taskStore.selectedTask.id);
      showDeleteDialog.value = false;
    }
  }
</script>

<style scoped>
  .floating-btn {
    position: fixed;
    bottom: 16px;
    right: 16px;
  }
</style>
