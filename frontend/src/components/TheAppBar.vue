<template>
  <v-app-bar color="primary">
    <template
      v-if="authStore.isAuthenticated"
      v-slot:prepend
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>Wunderlist</v-app-bar-title>
    <!-- <template v-if="authStore.isAuthenticated"> -->
    <v-btn @click="handleLogout">Logout</v-btn>
    <!-- </template> -->
  </v-app-bar>
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth';
  import { useRouter } from 'vue-router';

  const authStore = useAuthStore();
  const router = useRouter();

  const handleLogout = (): void => {
    authStore.logout();
    router.push('/login');
  };
</script>
