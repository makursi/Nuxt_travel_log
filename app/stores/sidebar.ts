import type { MapPoint } from "~/lib/type";

export type SidebarItem = {
  id: string;
  label: string;
  icon: string;
  href?: string;
  location?: MapPoint;
};

export const useSidebarStore = defineStore("useSiderbarStore", () => {
  const sidebarItems = ref<SidebarItem[]>([]);
  const loading = ref(false);
  return { sidebarItems, loading };
});
