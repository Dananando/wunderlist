<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12">
          <v-card-title class="text-center text-h5 py-4"> Login </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleSubmit" ref="form">
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
              <v-btn type="submit" color="primary" block class="mt-4" :loading="loading">
                Login
              </v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-center pb-4">
            <v-btn variant="text" @click="$router.push('/register')">
              Don't have an account? Register
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

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
