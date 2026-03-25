<script setup>
const colorMode = useColorMode();

const style = computed(() => {
  if (colorMode.value === "dark") {
    return "/styles/dark.json";
  }
  return "https://tiles.openfreemap.org/styles/liberty";
});
const center = [-1.559482, 47.21322];

// 缩放状态变量
const zoom = 3;
</script>

<template>
  <MglMap
    :map-style="style"
    :center="center"
    :zoom="zoom"
  >
    <MglNavigationControl />
  </MglMap>
</template>
