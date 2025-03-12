<template>
  <LoginRegisterLayout>
    <BaseForm
      title="Register"
      buttonText="Already have an account? Login"
      @click="$router.push('/login')"
      @submit="handleSubmit"
    >
      <v-text-field
        v-model="name"
        label="Name"
        required
        :rules="[(v) => !!v || 'Name is required']"
      ></v-text-field>
      <v-text-field
        v-model="email"
        label="Email"
        type="email"
        required
        :rules="[(v) => !!v || 'Email is required']"
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        required
        :rules="[(v) => !!v || 'Password is required']"
      ></v-text-field>
      <v-text-field
        v-model="confirmPassword"
        label="Confirm Password"
        type="password"
        required
        :rules="[
          (v) => !!v || 'Password confirmation is required',
          (v) => v === password || 'Passwords must match',
        ]"
      ></v-text-field>
      <v-btn
        type="submit"
        color="primary"
        block
        class="mt-4"
        :loading="loading"
      >
        Register
      </v-btn>
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

  const name = ref('');
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const loading = ref(false);
  const form = ref<any>(null);

  async function handleSubmit() {
    const { valid } = await form.value.validate();
    if (!valid) return;

    loading.value = true;
    try {
      await authStore.register(email.value, password.value, name.value);
      router.push('/');
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  }
</script>
