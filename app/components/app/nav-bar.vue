<script setup lang="ts"></script>

<template>
  <div class="navbar bg-neutral text-neutral-content">
    <div class="navbar-start">
      <NuxtLint to="/" class="btn btn-ghost text-xl">Travel Log</NuxtLint>
    </div>

    <div class="navbar-end">
      <AppThemeToggle class="mx-4" />
      <a class="btn"
        >Sign In With GitHub<Icon name="tabler:brand-github" size="24"
      /></a>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
