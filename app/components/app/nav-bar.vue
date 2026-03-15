<script setup lang="ts"></script>

<template>
  <div class="navbar bg-neutral text-neutral-content">
    <div class="navbar-start">
      <NuxtLink to="/" class="btn btn-ghost text-xl">
        Travel Log
      </NuxtLink>
    </div>

    <div class="navbar-end">
      <AppThemeToggle class="mx-4" />
      <AuthButton />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
