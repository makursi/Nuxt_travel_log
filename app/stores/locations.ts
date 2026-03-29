export const useLocationsStore = defineStore("useLocations", () => {
  // 在lazy:false情况下,useFetch 会阻塞组件渲染直到数据获取完成
  // 设置为true 时, 组件会立即渲染
  // 服务器不等待数据，立即发送包含空状态（或加载态）的 HTML。等水合后, 数据在客户端获取,并被加载。

  // status (响应式字符串) Ref<'idle' | 'pending' | 'success' | 'error'>
  // 'idle':请求未开始, 'pending': 请求进行中
  // 'success': 请求成功完成,data 已填充
  // 'error': 请求失败，error 对象填充值。

  //  refresh 作用: 手动重新触发数据请求
  //  调用 refresh 会重新发送请求, 并更新 data 和 status,status会再次变为pending
  const { data, status, refresh } = useFetch("/api/locations", {
    lazy: true,
  });
  const sidebarStore = useSidebarStore();
  const mapStore = useMapStore();

  effect(() => {
    if (data.value) {
      sidebarStore.loading = false;
      sidebarStore.sidebarItems = data.value.map(location => ({
        id: `location-${location.id}`,
        label: location.name,
        icon: "tabler:tabler:map-pin",
        href: `/dashboard/${location.id}`,
      }));
      mapStore.mapPoints = data.value;
    }
    else {
      sidebarStore.loading = status.value === "pending";
    }
  });

  return {
    locations: data,
    status,
    refresh,
  };
});
