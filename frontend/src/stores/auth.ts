import { defineStore } from 'pinia';
import { ref } from 'vue';

interface User {
  id: string;
  email: string;
  name: string;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const isAuthenticated = ref(false);

  function login(email: string, password: string) {
    // Mock login for now
    user.value = {
      id: '1',
      email,
      name: email.split('@')[0],
    };
    isAuthenticated.value = true;
  }

  function register(email: string, password: string, name: string) {
    // Mock register for now
    user.value = {
      id: '1',
      email,
      name,
    };
    isAuthenticated.value = true;
  }

  function logout() {
    user.value = null;
    isAuthenticated.value = false;
  }

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
  };
});
