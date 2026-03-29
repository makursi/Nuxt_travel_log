<script setup>
const colorMode = useColorMode();

const style = computed(() => {
  if (colorMode.value === "dark") {
    return "/styles/dark.json";
  }
  return "https://tiles.openfreemap.org/styles/liberty";
});

const mapStore = useMapStore();

// 缩放状态变量
const zoom = 3;

onMounted(async () => {
  await mapStore.init();
});
</script>

<template>
  <MglMap
    :map-style="style"
    :center="CENTER"
    :zoom="zoom"
  >
    <MglNavigationControl />
    <MglMarker
      v-for="point in mapStore.mapPoints"
      :key="point.id"
      :lat="point.lat"
      :lng="point.long"
      :coordinates="[point.long, point.lat]"
    >
      <template #marker>
        <div class="tooltip tooltip-top" :data-tip="point.label">
          <Icon
            name="tabler:map-pin-filled"
            size="30"
            class="text-primary"
          />
        </div>
      </template>
    </MglMarker>
  </MglMap>
</template>
