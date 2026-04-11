<script setup>
// 地图的亮暗模式的设置
const colorMode = useColorMode();

// 计算属性--当 colorMode 的值发生变化时，style 会自动重新计算。
const style = computed(() => {
  if (colorMode.value === "dark") {
    return "/styles/dark.json";
  }
  // 在线样式
  return "https://tiles.openfreemap.org/styles/liberty";
});

const mapStore = useMapStore();

// 缩放状态变量
const zoom = 3;

onMounted(async () => {
  // 组件挂载到DOM后异步调用mapStore.init(),初始化地图实例,加载基础数据或订阅事件
  await mapStore.init();
});
</script>

<template>
  <!-- 旅行地图页面 -->
  <!-- <MglMap>: 这是 vue-maplibre-gl 提供的根组件。 -->
  <MglMap :map-style="style" :center="CENTER" :zoom="zoom">
    <!-- 4. 交互控件与标记点 -->
    <!-- <MglNavigationControl />: 添加标准的导航控件（缩放按钮、旋转等）。 -->
    <MglNavigationControl />
    <!-- <MglMarker>: 循环渲染地图上的标记点。 -->

    <MglMarker
      v-for="point in mapStore.mapPoints"
      :key="point.id"
      :lat="point.lat"
      :lng="point.long"
      :coordinates="[point.long, point.lat]"
    >
      <!-- 自定义图标 -->
      <!-- 完全自定义标记点在地图上的显示内容 -->
      <!-- 用于vue-maplibre-gl库中使用 -->
      <template #marker>
        <!-- tooltip（提示框/工具提示） 的作用是：
        当用户将鼠标悬停（Hover）在地图上的标记图标上时，
        自动弹出一个小的文本气泡，显示该点的名称。 -->
        <div class="tooltip tooltip-top" :data-tip="point.name">
          <Icon name="tabler:map-pin-filled" size="30" class="text-primary" />
        </div>
      </template>
      <!-- 弹出窗口 (<MglPopup>): 点击标记点时弹出的信息框。
      显示标记点的名称 (point.name) 和描述 (point.description)。-->
      <MglPopup>
        <h3 class="text-xl">
          {{ point.name }}
        </h3>
        <p>{{ point.description }}</p>
      </MglPopup>
    </MglMarker>
  </MglMap>
</template>
