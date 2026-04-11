//  stores/map.ts 是地图全局状态管理库。
// 这是一个 Pinia 全局状态仓库，专门管理整个项目的地图状态：
// 管理所有旅行点位（mapPoints）
// 管理当前选中的点位（selectedPoint）
// 自动让地图自适应缩放显示所有点
// 选中点位时自动飞过去（flyTo）
// 全局共享状态，所有组件同步联动
// 一句话：它是整个项目地图的 “大脑”。

//  该库只在服务器端进行服务
// 导入地图类型
import type { LngLatBounds } from "maplibre-gl";
// 导入自定义点位类型MapPoint
import type { MapPoint } from "~/lib/type";

// 创建store整个应用共享
export const useMapStore = defineStore("useMapStore", () => {
  // 所有要显示在地图的点
  const mapPoints = ref<MapPoint[]>([]);
  // 侧边栏/列表点了那个,地图就跳过去
  const selectedPoint = ref<MapPoint | null>(null);

  let bounds: LngLatBounds | null = null;

  //  该函数只在客户端运行
  // ini函数 地图启动器,在组件onMounted时执行
  async function init() {
    // MapLibre只能在客户端运行,不能在服务端运行
    //  为什么不在服务端渲染: 你是傻福么? 地图使用的marker ,控制组件, canvas 这些东西服务端有么?🤭
    // // 服务端只能给一个坑
    // 客户端动态导入优化用 await import(),确保只在浏览器加载,异步打包避免服务器打包

    const { LngLatBounds } = await import("maplibre-gl");
    // useMap() 获取地图实例
    const { useMap } = await import("@indoorequal/vue-maplibre-gl");

    // 这个map是一个地图实例
    const map = useMap();
    // 为什么不用watcheffect呢?
    // effect 是 Pinia/Vue 底层的持久监听
    // 不会随组件销毁而取消
    // 保证全局状态永远同步
    // watchEffect 会跟着组件销毁，导致地图失灵

    // 自动视野控制逻辑
    // 只要点位列表变了 → 自动缩放到能看到所有点
    // 只要选中某个点 → 地图自动平滑飞过去定位
    effect(() => {
      //  拿到第一个点,如果没有点,直接退出
      const firstPoint = mapPoints.value[0];

      if (!firstPoint) {
        return;
      }

      // 创建一个边界,从第一个点开始,自动计算最小矩形边界
      bounds = mapPoints.value.reduce(
        (bounds, point) => {
          return bounds.extend([point.long, point.lat]);
        },
        new LngLatBounds(
          [firstPoint.long, firstPoint.lat],
          [firstPoint.long, firstPoint.lat],
        ),
      );

      // 让地图缩放到刚好能看到所有点
      // 渲染采取聚合
      // 或者使用canvas 当中symbol layer
      // 虚拟列表, 懒加载, 先渲染100个点,再去全部渲染
      map.map?.fitBounds(bounds, {
        padding: 50,
      });
      //  pinia底层响应式依赖监听api, 会持续监听状态收集情况， 如果使用watchEffect去进行监听,
      // 会导致在组件销毁时,监听取消全局状态同步丢失的问题
      effect(() => {
        if (selectedPoint.value) {
          // 调用map实例对象上的flyto方法
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
