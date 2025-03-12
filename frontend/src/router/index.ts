import LoginView from '@/views/authentication/LoginView.vue';
import RegisterView from '@/views/authentication/RegisterView.vue';
import TodoView from '@/views/Todos/TodoView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'todo',
      component: TodoView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
  ],
});

// router.beforeEach((to, _from, next) => {
//   const authStore = useAuthStore();

//   if (to.meta.requiresAuth && !authStore.isAuthenticated) {
//     next('/login');
//   } else {
//     next();
//   }
// });

export default router;
