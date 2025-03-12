<template>
  <v-app-bar color="primary">
    <template
      v-if="isAuthenticated"
      v-slot:prepend
    >
      <v-app-bar-nav-icon @click="toggleLeftSidebar"></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>Wunderlist</v-app-bar-title>
    <v-btn
      v-if="isAuthenticated"
      icon
      @click="authStore.logout"
    >
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
  import { useLeftSidebar } from '@/composables/useLeftSidebar';
  import { useAuthStore } from '@/stores/auth';
  import { storeToRefs } from 'pinia';

  const { isAuthenticated } = storeToRefs(useAuthStore());

  const authStore = useAuthStore();
  const { toggleLeftSidebar } = useLeftSidebar();
</script>
