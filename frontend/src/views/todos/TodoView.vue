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
              @click="selectTask(task)"
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
              @click="selectTask(task)"
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
        <v-text-field
          v-model="newTask.title"
          label="Title"
        />
        <v-textarea
          v-model="newTask.shortDescription"
          label="Description"
        />
        <v-textarea
          v-model="newTask.longDescription"
          label="Long Description"
        />
        <v-text-field
          v-model="newTask.dueDate"
          label="Due Date"
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
          :disabled="!newTask.title"
          >Create</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import BaseItem from '@/components/BaseItem.vue';
  import { useRightSidebar } from '@/composables/useRightSideBar';
  import { useListStore } from '@/stores/list';
  import { useTaskStore, type Task } from '@/stores/task';
  import { storeToRefs } from 'pinia';
  import { computed, ref, watch } from 'vue';
  import LeftSideBar from './LeftSideBar.vue';
  import RightSideBar from './RightSideBar.vue';

  const listStore = useListStore();
  const taskStore = useTaskStore();
  const { toggleRightSidebar } = useRightSidebar();

  const { selectedListId } = storeToRefs(listStore);
  const { tasks, selectedTask } = storeToRefs(taskStore);

  const rightDrawer = ref(false);
  const activeTab = ref('ongoing');
  const showNewTaskDialog = ref(false);
  const newTask = ref<Omit<Task, 'id'>>({
    title: '',
    shortDescription: '',
    longDescription: '',
    dueDate: '',
    completed: false,
    listId: '',
    createdAt: '',
  });

  // Watch for selected task to open right drawer
  watch(
    () => selectedTask.value,
    (newValue) => {
      rightDrawer.value = !!newValue;
    },
  );

  const ongoingTasks = computed(() =>
    tasks.value.filter((task) => task.listId === selectedListId.value && !task.completed),
  );

  const completedTasks = computed(() =>
    tasks.value.filter((task) => task.listId === selectedListId.value && task.completed),
  );

  function createNewTask() {
    if (newTask.value.title && selectedListId.value) {
      taskStore.addTask({
        title: newTask.value.title,
        shortDescription: newTask.value.shortDescription,
        longDescription: newTask.value.longDescription,
        dueDate: newTask.value.dueDate,
        completed: false,
        listId: selectedListId.value,
        createdAt: new Date().toLocaleDateString('fr-FR'),
      });

      newTask.value = {
        title: '',
        shortDescription: '',
        longDescription: '',
        dueDate: '',
        completed: false,
        listId: '',
        createdAt: '',
      };
      showNewTaskDialog.value = false;
    }
  }

  const selectTask = (task: Task) => {
    toggleRightSidebar();
    taskStore.selectTask(task);
  };
</script>

<style scoped>
  .floating-btn {
    position: fixed;
    bottom: 16px;
    right: 16px;
  }
</style>
