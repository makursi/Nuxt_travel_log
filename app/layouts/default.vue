<script setup lang="ts">
const authStore = useAuthStore();
onMounted(async () => {
    await authStore.init();
});
</script>

<template>
    <!-- 全局默认布局, 只有一个导航栏 -->
    <div class="flex min-h-sreen flex-col">
        <AppNavBar />
        <main class="flex-1 flex flex-col">
            <slot />
        </main>
    </div>
</template>

<style lang="scss" scoped></style>
