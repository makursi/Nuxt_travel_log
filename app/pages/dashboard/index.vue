<script setup lang="ts">
import { useLocationsStore } from "~/stores/locations";

const locationsStore = useLocationsStore();
const { locations, status } = storeToRefs(locationsStore);

onMounted(() => {
  locationsStore.refresh();
});
</script>

<template>
  <div class="p-4">
    <h2 class="text-2xl">
      Create Locations
    </h2>

    <div v-if="status === 'pending'">
      <span class="loading loading-spinner loading-xl" />
    </div>
    <!-- 渲染数据 -->

    <!-- 搞骨架屏渲染 -->
    <div
      v-else-if="locations && locations.length > 0"
      class="flex flex-nowrap mt-4 gap-2 overflow-auto"
      @mouseenter="mapStore.selectPoint = location"
      @mouseleave="mapStore.selectPoint = null"
    >
      <div
        v-for="location in locations"
        :key="location.id"
        class="card card-compact bg-base-400 h-40 w-72 mb-4 shrink-0"
        :class="{ 'boder-accent': mapStore.selectPoint === location }"
      >
        <div class="card-body">
          <h3 class="text-xl">
            {{ location.name }}
          </h3>
          <p>{{ location.description }}</p>
        </div>
      </div>
    </div>

    <div v-else class="flex flex-col gap-2 mt-4">
      <p>Add a location to get started</p>

      <NuxtLink to="/dashboard/add" class="btn btn-ghost w-40">
        Add locations
        <Icon name="tabler:tabler:circle-plus-filled" size="24" />
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
