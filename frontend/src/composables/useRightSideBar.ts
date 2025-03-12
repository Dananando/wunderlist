import { ref } from 'vue';

const isRightSidebarOpen = ref(false);

export function useRightSidebar() {
  const toggleRightSidebar = (): void => {
    isRightSidebarOpen.value = !isRightSidebarOpen.value;
  };

  const openRightSidebar = (): void => {
    isRightSidebarOpen.value = true;
  };

  const closeRightSidebar = (): void => {
    isRightSidebarOpen.value = false;
  };

  return {
    isRightSidebarOpen,
    toggleRightSidebar,
    openRightSidebar,
    closeRightSidebar,
  };
}
