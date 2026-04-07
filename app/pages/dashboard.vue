<script setup lang="ts">
// ERROR [Better Auth]:  fetch failed, 中国国内大概有90%的概率会在使用 github api 上被阻塞, 因此使用github登录具有局限
import { useSidebarStore } from "@/stores/sidebar";
import { useLocationsStore } from "~/stores/locations";

const route = useRoute();
const locationsStore = useLocationsStore();

const isSideBarOpen = ref(true);
const sidebarStore = useSidebarStore();
onMounted(() => {
  isSideBarOpen.value = localStorage.getItem("isSideBarOpen") === "true";
  // 如果不在主页面,应该刷新位置数据
  // 因为
  // 非主页面可能已经有了位置数据, 但是需要最新的数据来显示
  if (route.path !== "/dashboard") {
    locationsStore.refresh();
  }
});
// 这样做依旧具有缺陷,因为isSideBarOpen的初始值是从localStorage中读取的
// 客户端加载时会再读取本地存储的值, 然后进行动态加载, 将issidebar值添加到用户的数据库当中, 就可以消除这种影响
function toggleSideBar() {
  isSideBarOpen.value = !isSideBarOpen.value;
  localStorage.setItem("isSideBarOpen", isSideBarOpen.value.toString());
}
</script>

<template>
  <!-- 左侧侧边栏 flex从左到右 -->
  <div class="flex-1 flex">
    <!-- 绑定特殊样式, 根据isSideBarOpen的值切换侧边栏的展开状态 -->
    <div
      class="bg-base-100 transition-all duration-300"
      :class="{ 'w-16': !isSideBarOpen, 'w-64': isSideBarOpen }"
    >
      <!-- // 点击切换侧边栏展开状态 -->
      <div
        class="flex hover:cursor-pointer hover:bg-base-200"
        :class="{
          'justify-center': !isSideBarOpen,
          'justify-end': isSideBarOpen,
        }"
        @click="toggleSideBar"
      >
        <Icon v-if="isSideBarOpen" name="tabler:chevron-left" size="42" />
        <Icon v-else name="tabler:chevron-right" size="42" />
      </div>

      <div class="flex flex-col">
        <SidebarButton
          :show-label="isSideBarOpen"
          label="Locations"
          icon="tabler:map"
          href="/dashboard"
        />
        <SidebarButton
          :show-label="isSideBarOpen"
          label="Add Locations"
          icon="tabler:circle-plus-filled"
          href="/dashboard/add"
        />

        <!-- 骨架屏组件 < -->
        <div
          v-if="sidebarStore.loading || sidebarStore.sidebarItems.length"
          class="divider"
        />
        <div v-if="sidebarStore.loading" class="px-4">
          <div class="skeleton h-4 w-full" />
        </div>
        <!-- 处理服务端渲染出现的前端组件加载的问题 -->
        <div
          v-if="!sidebarStore.loading && sidebarStore.sidebarItems.length"
          class="flex flex-col"
        >
          <SidebarButton
            v-for="item in sidebarStore.sidebarItems"
            :key="item.id"
            :show-label="isSideBarOpen"
            :label="item.label"
            :icon="item.icon"
            :href="item.href"
          />
        </div>
        <!-- 骨架屏组件 > -->
        <div class="divider" />
        <SidebarButton
          :show-label="isSideBarOpen"
          label="Sign Out"
          icon="tabler:logout"
          href="/sign-out"
        />
      </div>
    </div>

    <!--右侧---展示内容区域 -->
    <div class="flex-1 flex flex-col">
      <div>
        <div class="flex-1">
          <div class="flex flex-col size-full">
            <!-- 两个页面,一个是根页面展示地图内容 -->
            <!-- 另一个是显示地图内容 -->
            <NuxtPage />
            <!-- 这个NuxtPage指的是 /dashboard/index.vue -->

            <AppMap class="flex-1" />
            <!-- 展示地图内容 -->
          </div>
        </div>
        <!--  展示的为dashboard/index.vue的内容 -->
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
