import { ref } from 'vue';

const isLeftSidebarOpen = ref(false);

export function useLeftSidebar() {
  const toggleSidebar = (): void => {
    isLeftSidebarOpen.value = !isLeftSidebarOpen.value;
  };

  return {
    isLeftSidebarOpen,
    toggleSidebar,
  };
}
