<script setup lang="ts">
// const colorMode = useColorMode();

// isDark = computed({
//   set(value) {
//     colorMode.preference = value ? "dark" : "light";
//   },
//   get() {
//     return colorMode.preference === "dark";
//   },
// });
</script>

<template>
  <label class="swap swap-rotate">
    <input type="checkbox" />
    <!-- sun icon -->
    <Icon class="swap-on" name="tabler:sun" size="24" />

    <!-- moon icon -->
    <Icon class="swap-off" name="tabler:moon-filled" size="24" />
  </label>
</template>

<style lang="scss" scoped></style>
