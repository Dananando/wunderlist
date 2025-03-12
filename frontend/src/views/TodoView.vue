<template>
  <div>
    <!-- Left Navigation Drawer -->
    <v-navigation-drawer
      v-model="leftDrawer"
      :rail="leftDrawerRail"
      permanent
      @click="leftDrawerRail = false"
    >
      <v-list>
        <v-list-item
          prepend-icon="mdi-format-list-bulleted"
          title="Lists"
          value="lists"
        ></v-list-item>
        <v-divider></v-divider>
        <v-list-item
          v-for="list in listStore.lists"
          :key="list.id"
          :value="list.id"
          :title="list.name"
          @click="listStore.selectList(list.id)"
          :active="listStore.selectedList === list.id"
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

    <!-- Main Content -->
    <v-main>
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
                <v-list-item
                  v-for="task in ongoingTasks"
                  :key="task.id"
                  :value="task.id"
                  @click="taskStore.selectTask(task)"
                >
                  <template v-slot:prepend>
                    <v-checkbox
                      :model-value="task.completed"
                      @change="taskStore.toggleTaskStatus(task.id)"
                    ></v-checkbox>
                  </template>
                  <v-list-item-title>{{ task.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-window-item>

            <v-window-item value="done">
              <v-list>
                <v-list-item
                  v-for="task in completedTasks"
                  :key="task.id"
                  :value="task.id"
                  @click="taskStore.selectTask(task)"
                >
                  <template v-slot:prepend>
                    <v-checkbox
                      :model-value="task.completed"
                      @change="taskStore.toggleTaskStatus(task.id)"
                    ></v-checkbox>
                  </template>
                  <v-list-item-title>{{ task.title }}</v-list-item-title>
                </v-list-item>
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
    </v-main>

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

    <!-- New List Dialog -->
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
          <v-spacer></v-spacer>
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

    <!-- New Task Dialog -->
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
          <v-spacer></v-spacer>
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

    <!-- Delete Confirmation Dialog -->
    <v-dialog
      v-model="showDeleteDialog"
      max-width="500px"
    >
      <v-card>
        <v-card-title>Delete Task</v-card-title>
        <v-card-text> Are you sure you want to delete this task? </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
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
  </div>
</template>

<script setup lang="ts">
  import { useListStore } from '@/stores/list';
  import { useTaskStore } from '@/stores/task';
  import { computed, ref, watch } from 'vue';

  const listStore = useListStore();
  const taskStore = useTaskStore();

  const leftDrawer = ref(true);
  const leftDrawerRail = ref(false);
  const rightDrawer = ref(false);
  const activeTab = ref('ongoing');
  const showNewListDialog = ref(false);
  const showNewTodoDialog = ref(false);
  const showDeleteDialog = ref(false);
  const newListName = ref('');
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

  function createNewList() {
    if (newListName.value) {
      listStore.addList(newListName.value);
      newListName.value = '';
      showNewListDialog.value = false;
    }
  }

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
