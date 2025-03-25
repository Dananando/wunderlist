<template>
  <v-navigation-drawer
    v-model="isRightSidebarOpen"
    location="right"
    temporary
    width="400"
  >
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
          :model-value="selectedTask?.title ?? ''"
          label="Title"
          readonly
        ></v-text-field>
        <v-textarea
          :model-value="selectedTask?.longDescription ?? ''"
          label="Long Description"
          readonly
        />
        <v-textarea
          :model-value="selectedTask?.shortDescription ?? ''"
          label="Short Description"
          readonly
        />
        <v-text-field
          :model-value="selectedTask?.dueDate ?? ''"
          label="Due Date"
          readonly
        />
        <v-text-field
          :model-value="selectedTask?.createdAt ?? ''"
          label="Created At"
          readonly
        />
      </v-card-text>
    </v-card>
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
  import { useRightSidebar } from '@/composables/useRightSideBar';
  import { useTaskStore } from '@/stores/task';
  import { storeToRefs } from 'pinia';
  import { ref } from 'vue';

  const { isRightSidebarOpen } = useRightSidebar();

  const taskStore = useTaskStore();
  const { selectedTask } = storeToRefs(taskStore);

  const showDeleteDialog = ref(false);

  const deleteTask = (): void => {
    if (selectedTask.value?.id) {
      taskStore.deleteTask(selectedTask.value.id);
      showDeleteDialog.value = false;
    }
  };
</script>
