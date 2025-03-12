import { ref } from 'vue';

const isLeftSidebarOpen = ref(false);

export function useLeftSidebar() {
  const toggleLeftSidebar = (): void => {
    isLeftSidebarOpen.value = !isLeftSidebarOpen.value;
  };

  return {
    isLeftSidebarOpen,
    toggleLeftSidebar,
  };
}
