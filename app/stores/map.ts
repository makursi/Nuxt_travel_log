//  stores/map.ts 是地图全局状态管理库。
// 它用来统一管理整个项目里地图的所有状态，让地图组件、侧边栏、地点列表、添加页面都能共享同一个地图状态
// 实现状态同步、视图联动、数据驱动地图渲染。

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
      //  pinia底层响应式依赖监听api, 会持续监听状态收集情况， 如果使用watchEffect去进行监听,
      // 会导致在组件销毁时,监听取消全局状态同步丢失的问题
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
