<template>
  <v-card
    class="elevation-12"
    width="400"
  >
    <v-card-title class="text-center text-h5 py-4">{{ title }}</v-card-title>
    <v-card-text>
      <v-form
        v-bind="$attrs"
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
  defineProps<{
    title: string;
    buttonText: string;
  }>();

  defineEmits<{
    (e: 'click'): void;
    (e: 'submit'): void;
  }>();
</script>
