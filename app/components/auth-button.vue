<script setup lang="ts">
const authStore = useAuthStore();

const { loading, signIn } = authStore;
</script>

<template>
  <div>
    <button
      :disabled="loading"
      class="btn"
      @click="signIn"
    >
      Sign In With GitHub

      <span v-if="loading" class="loading loading-spinner loading-lg" />
      <Icon
        v-else
        name="tabler:brand-github"
        size="24"
      />
    </button>
  </div>
</template>

<style lang="scss" scoped></style>
