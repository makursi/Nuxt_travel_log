//  该库只在服务器端进行服务

import type { MapPoint } from "~/lib/type";

export const useMapStore = defineStore("useMapStore", () => {
  const mapPoints = ref<MapPoint[]>([]);

  //  该函数只在客户端运行
  async function init() {
    // 对地图初始加载进行边界处理, 根据用户已添加的地图点进行自适应缩放
    const { LngLatBounds } = await import("maplibre-gl");
    const { useMap } = await import("@indoorequal/vue-maplibre-gl");
    const map = useMap();
    effect(() => {
      const firstPoint = mapPoints.value[0];

      if (!firstPoint) {
        return;
      }

      const bounds = mapPoints.value.reduce(
        (bounds, point) => {
          return bounds.extend([point.long, point.lat]);
        },
        new LngLatBounds(
          [firstPoint.long, firstPoint.lat],
          [firstPoint.long, firstPoint.lat],
        ),
      );

      map.map?.fitBounds(bounds, {
        padding: 50,
      });
    });
  }

  return {
    init,
    mapPoints,
  };
});
