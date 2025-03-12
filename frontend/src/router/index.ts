import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Todos/TodoView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/authentication/LoginView.vue'),
      meta: { guest: true },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/authentication/RegisterView.vue'),
      meta: { guest: true },
    },
  ],
});

router.beforeEach((to, _from, next) => {
  const { isAuthenticated } = storeToRefs(useAuthStore());

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated.value) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (isAuthenticated.value) {
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
