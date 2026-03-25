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
      <span class="loading loading-spinner loading-lg" />
    </div>
    <!-- 渲染数据 -->

    <!-- 搞骨架屏渲染 -->
    <div v-else-if="locations" class="flex flex-wrap gap-2">
      <div
        v-for="location in locations"
        :key="location.id"
        class="card card-compact bg-base-400 h-40 w-72"
      >
        <div class="card-body">
          <h2 class="card-title">
            {{ location.name }}
          </h2>
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
