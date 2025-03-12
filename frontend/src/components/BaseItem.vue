<template>
  <v-list-item
    v-bind="$attrs"
    class="py-2"
  >
    <template v-slot:prepend>
      <v-icon
        :icon="icon"
        :model-value="modelValue"
        @click="$emit('click-on-icon', $event)"
        class="mt-0"
      ></v-icon>
    </template>
    <v-list-item-title :class="itemTitleClass">{{ title }}</v-list-item-title>
  </v-list-item>
</template>

<script setup lang="ts">
  defineProps<{
    icon: string;
    modelValue: boolean;
    itemTitleClass?: string;
    title: string;
  }>();

  defineEmits<{
    (e: 'click-on-icon', event: Event): void;
  }>();
</script>
