<template>
  <!-- Right Navigation Drawer -->
  <v-navigation-drawer
    v-model="rightDrawer"
    location="right"
    temporary
    width="400"
  >
    <template v-if="taskStore.selectedTask">
      <v-card flat>
        <v-card-title class="d-flex justify-space-between align-center">
          <span>Task Details</span>
          <v-btn
            icon="mdi-delete"
            variant="text"
            color="error"
            @click="showDeleteDialog = true"
          ></v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="taskStore.selectedTask.title"
            label="Title"
            readonly
          ></v-text-field>
          <v-textarea
            v-model="taskStore.selectedTask.description"
            label="Description"
            readonly
          ></v-textarea>
        </v-card-text>
      </v-card>
    </template>
  </v-navigation-drawer>

  <!-- Delete Confirmation Dialog -->
  <v-dialog
    v-model="showDeleteDialog"
    max-width="500px"
  >
    <v-card>
      <v-card-title>Delete Task</v-card-title>
      <v-card-text> Are you sure you want to delete this task? </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          text
          @click="showDeleteDialog = false"
          >Cancel</v-btn
        >
        <v-btn
          color="error"
          @click="deleteTask"
          >Delete</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { useTaskStore } from '@/stores/task';
  import { ref } from 'vue';

  const taskStore = useTaskStore();

  const rightDrawer = ref(false);
  const showDeleteDialog = ref(false);

  const deleteTask = (): void => {
    if (taskStore.selectedTask?.id) {
      taskStore.deleteTask(taskStore.selectedTask.id);
      showDeleteDialog.value = false;
    }
  };
</script>
