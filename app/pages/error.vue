<script setup lang="ts">
const route = useRoute();

const error = route.query.error || "An unknown error occurred";
</script>

<template>
  <div
    class="card bg-base-300 container mt-4 min-h-72 text-center mx-auto flex flex-col justify-center items-center gap-4"
  >
    <div role="alert" class="alert alert-error min-w-1/2 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{{ error }}</span>
    </div>

    <NuxtLink to="/" class="btn btn-primary">
      Home
      <Icon name="tabler:home" size="32" />
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped></style>
