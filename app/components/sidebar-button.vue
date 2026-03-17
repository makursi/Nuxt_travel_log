<script setup lang="ts">
// 定义sidebar的组件
//  定义props值进行复用
const props = defineProps<{
  label: string;
  icon: string;
  href?: string;
  showLabel?: boolean;
}>();

const route = useRoute();
</script>

<template>
  <!-- 添加tooltip  -->
  <!-- 将tooltip 添加为可选类 , 如果showLabel 为false, 则添加tooltip类, 反之则不添加 -->
  <div
    class="tooltip-right"
    :class="{ tooltip: !showLabel }"
    :data-tip="showLabel ? undefined : props.label"
  >
    <NuxtLink
      class="flex gap-2 p-2 hover:bg-base-300 hover:cursor-pointer"
      :to="props.href"
      :class="{
        'bg-base-200': route.path === props.href,
        'justify-center': !props.showLabel,
        'justify-start': props.showLabel,
      }"
    >
      <Icon :name="props.icon" size="24" />
      <!-- show-label 的值与isSideBarOpen 相关, 当isSideBarOpen 为 true 时显示 label -->
      <!-- 使用Transition 组件进行流畅的动画过渡 -->
      <Transition>
        <span v-if="props.showLabel">{{ props.label }}</span>
      </Transition>
    </NuxtLink>
  </div>
</template>

<style scoped>
.grow-enter-active {
  animation: grow 0.5s;
}
.grow-leave-active {
  animation: grow 0.5s reverse;
}
@keyframes grow {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
