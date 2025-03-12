<template>
  <v-card
    class="elevation-12"
    width="400"
  >
    <v-card-title class="text-center text-h5 py-4">{{ title }}</v-card-title>
    <v-card-text>
      <v-form
        ref="form"
        validate-on="submit"
        @submit.prevent="$emit('submit')"
      >
        <slot />
      </v-form>
    </v-card-text>
    <v-card-actions class="justify-center pb-4">
      <v-btn
        variant="text"
        @click="$emit('click')"
      >
        {{ buttonText }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  defineProps<{
    title: string;
    buttonText: string;
  }>();

  defineEmits<{
    (e: 'click'): void;
    (e: 'submit'): void;
  }>();

  const form = ref();

  defineExpose({
    validate: async () => {
      const result = await form.value?.validate();
      return { valid: result?.valid ?? false };
    },
  });
</script>
