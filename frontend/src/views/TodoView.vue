<template>
  <v-layout class="rounded rounded-md">
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
          v-for="list in todoStore.lists"
          :key="list.id"
          :value="list.id"
          :title="list.name"
          @click="todoStore.selectList(list.id)"
          :active="todoStore.selectedList === list.id"
        >
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="primary" prepend-icon="mdi-plus" @click="showNewListDialog = true">
            New List
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <v-container fluid>
        <template v-if="todoStore.selectedList">
          <v-tabs v-model="activeTab">
            <v-tab value="ongoing">Ongoing</v-tab>
            <v-tab value="done">Done</v-tab>
          </v-tabs>

          <v-window v-model="activeTab" class="mt-4">
            <v-window-item value="ongoing">
              <v-list>
                <v-list-item
                  v-for="todo in ongoingTodos"
                  :key="todo.id"
                  :value="todo.id"
                  @click="todoStore.selectTodo(todo)"
                >
                  <template v-slot:prepend>
                    <v-checkbox
                      :model-value="todo.completed"
                      @change="todoStore.toggleTodoStatus(todo.id)"
                    ></v-checkbox>
                  </template>
                  <v-list-item-title>{{ todo.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-window-item>

            <v-window-item value="done">
              <v-list>
                <v-list-item
                  v-for="todo in completedTodos"
                  :key="todo.id"
                  :value="todo.id"
                  @click="todoStore.selectTodo(todo)"
                >
                  <template v-slot:prepend>
                    <v-checkbox
                      :model-value="todo.completed"
                      @change="todoStore.toggleTodoStatus(todo.id)"
                    ></v-checkbox>
                  </template>
                  <v-list-item-title>{{ todo.title }}</v-list-item-title>
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
          <v-row class="fill-height" align="center" justify="center">
            <v-col cols="12" class="text-center">
              <h2 class="text-h5">Please select a list from the sidebar</h2>
            </v-col>
          </v-row>
        </template>
      </v-container>
    </v-main>

    <!-- Right Navigation Drawer -->
    <v-navigation-drawer v-model="rightDrawer" location="right" temporary width="400">
      <template v-if="todoStore.selectedTodo">
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
              v-model="todoStore.selectedTodo.title"
              label="Title"
              readonly
            ></v-text-field>
            <v-textarea
              v-model="todoStore.selectedTodo.description"
              label="Description"
              readonly
            ></v-textarea>
          </v-card-text>
        </v-card>
      </template>
    </v-navigation-drawer>

    <!-- New List Dialog -->
    <v-dialog v-model="showNewListDialog" max-width="500px">
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
          <v-btn color="primary" text @click="showNewListDialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="createNewList" :disabled="!newListName">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- New Todo Dialog -->
    <v-dialog v-model="showNewTodoDialog" max-width="500px">
      <v-card>
        <v-card-title>New Task</v-card-title>
        <v-card-text>
          <v-text-field v-model="newTodo.title" label="Title"></v-text-field>
          <v-textarea v-model="newTodo.description" label="Description"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="showNewTodoDialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="createNewTodo" :disabled="!newTodo.title">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="showDeleteDialog" max-width="500px">
      <v-card>
        <v-card-title>Delete Task</v-card-title>
        <v-card-text> Are you sure you want to delete this task? </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="showDeleteDialog = false">Cancel</v-btn>
          <v-btn color="error" @click="deleteTodo">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';
import { computed, ref } from 'vue';

const todoStore = useTodoStore();

const leftDrawer = ref(true);
const leftDrawerRail = ref(false);
const rightDrawer = ref(false);
const activeTab = ref('ongoing');
const showNewListDialog = ref(false);
const showNewTodoDialog = ref(false);
const showDeleteDialog = ref(false);
const newListName = ref('');
const newTodo = ref({
  title: '',
  description: '',
});

// Watch for selected todo to open right drawer
watch(
  () => todoStore.selectedTodo,
  (newValue) => {
    rightDrawer.value = !!newValue;
  },
);

const ongoingTodos = computed(() =>
  todoStore.todos.filter((todo) => todo.listId === todoStore.selectedList && !todo.completed),
);

const completedTodos = computed(() =>
  todoStore.todos.filter((todo) => todo.listId === todoStore.selectedList && todo.completed),
);

function createNewList() {
  if (newListName.value) {
    todoStore.addList(newListName.value);
    newListName.value = '';
    showNewListDialog.value = false;
  }
}

function createNewTodo() {
  if (newTodo.value.title && todoStore.selectedList) {
    todoStore.addTodo({
      title: newTodo.value.title,
      description: newTodo.value.description,
      completed: false,
      listId: todoStore.selectedList,
    });
    newTodo.value = { title: '', description: '' };
    showNewTodoDialog.value = false;
  }
}

function deleteTodo() {
  if (todoStore.selectedTodo) {
    todoStore.deleteTodo(todoStore.selectedTodo.id);
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
