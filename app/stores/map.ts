//  该库只在服务器端进行服务
import type { LngLatBounds } from "maplibre-gl";
import type { MapPoint } from "~/lib/type";

export const useMapStore = defineStore("useMapStore", () => {
  const mapPoints = ref<MapPoint[]>([]);
  const selectedPoint = ref<MapPoint | null>(null);

  let bounds: LngLatBounds | null = null;
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

      bounds = mapPoints.value.reduce(
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
      effect(() => {
        if (selectedPoint.value) {
          map.map?.flyTo({
            center: [selectedPoint.value.long, selectedPoint.value.lat],
            zoom: 15,
            speed: 0.2,
            curve: 1,
            easing(t) {
              return t;
            },
          });
        } else if (bounds) {
          map.map?.fitBounds(bounds, {
            padding: 50,
          });
        }
      });
    });
  }

  return {
    init,
    mapPoints,
    selectedPoint,
  };
});
