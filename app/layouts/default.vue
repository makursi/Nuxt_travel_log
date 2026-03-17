<script setup lang="ts">
const authStore = useAuthStore();
onMounted(async () => {
  await authStore.init();
});
</script>

<template>
  <div class="flex min-h-sreen flex-col">
    <AppNavBar />
    <main class="flex-1 flex flex-col">
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped></style>
