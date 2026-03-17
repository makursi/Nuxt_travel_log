<script setup lang="ts">
// ERROR [Better Auth]:  fetch failed, 中国国内大概有90%的概率会在使用 github api 上被阻塞, 因此使用github登录具有局限

const isSideBarOpen = ref(true);

onMounted(() => {
  isSideBarOpen.value = localStorage.getItem("isSideBarOpen") === "true";
});
// 这样做依旧具有缺陷,因为isSideBarOpen的初始值是从localStorage中读取的
// 客户端加载时会再读取本地存储的值, 然后进行动态加载, 将issidebar值添加到用户的数据库当中, 就可以消除这种影响
function toggleSideBar() {
  isSideBarOpen.value = !isSideBarOpen.value;
  localStorage.setItem("isSideBarOpen", isSideBarOpen.value.toString());
}
</script>

<template>
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
        <Icon
          v-if="isSideBarOpen"
          name="tabler:chevron-left"
          size="42"
        />
        <Icon
          v-else
          name="tabler:chevron-right"
          size="42"
        />
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
        />

        <div class="divider" />
        <SidebarButton
          :show-label="isSideBarOpen"
          label="Sign Out"
          icon="tabler:logout"
          href="/sign-out"
        />
      </div>
    </div>

    <div class="flex-1 bg-amber-950-300">
      我是傻逼
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
