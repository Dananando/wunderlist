<template>
  <LoginRegisterLayout>
    <BaseForm
      title="Login"
      buttonText="Don't have an account? Register"
      @click="router.push('/register')"
      @submit="handleSubmit"
    >
      <v-text-field
        v-model="email"
        label="Email"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        required
      ></v-text-field>
      <v-btn
        type="submit"
        color="primary"
        block
        class="mt-4"
        :loading="loading"
        >Login</v-btn
      >
    </BaseForm>
  </LoginRegisterLayout>
</template>

<script setup lang="ts">
  import BaseForm from '@/components/BaseForm.vue';

  import { useAuthStore } from '@/stores/auth';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import LoginRegisterLayout from './layout/LoginRegisterLayout.vue';

  const router = useRouter();
  const authStore = useAuthStore();

  const email = ref('');
  const password = ref('');
  const loading = ref(false);
  const form = ref<any>(null);

  async function handleSubmit() {
    const { valid } = await form.value.validate();
    if (!valid) return;

    loading.value = true;
    try {
      await authStore.login(email.value, password.value);
      router.push('/');
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  }
</script>
