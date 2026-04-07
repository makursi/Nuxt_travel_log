import type { MapPoint } from "~/lib/type";

//  sidebar 全局状态处理
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
