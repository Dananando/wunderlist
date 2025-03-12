import { api } from '@/services/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

interface LoginCredentials {
  email: string;
  password: string;
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'));
  const router = useRouter();

  const isAuthenticated = ref<boolean>(!!token.value);

  async function login(credentials: LoginCredentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      const { access_token } = response.data;

      token.value = access_token;
      localStorage.setItem('token', access_token);
      isAuthenticated.value = true;

      router.push('/');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  function logout() {
    token.value = null;
    localStorage.removeItem('token');
    isAuthenticated.value = false;
    router.push('/login');
  }

  return {
    token,
    isAuthenticated,
    login,
    logout,
  };
});
