<script setup lang="ts">
const authStore = useAuthStore();
</script>

<template>
  <div v-if="!authStore.loading && authStore.user" class="dropdown">
    <div
      tabindex="0"
      role="button"
      class="btn m-1"
    >
      <div v-if="authStore.user.image" class="avatar">
        <div class="w-8 rounded-full">
          <img :src="authStore.user.image" :alt="authStore.user.name">
        </div>
      </div>
      {{ authStore.user.name }}
    </div>
    <ul
      tabindex="-1"
      class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
    >
      <li>
        <NuxtLink to="/sign-out">
          <Icon name="tabler:logout-2" size="24" /> Sign Out
        </NuxtLink>
      </li>
    </ul>
  </div>
  <div>
    <button
      :disabled="authStore.loading"
      class="btn"
      @click="authStore.signIn"
    >
      Sign In With GitHub

      <span
        v-if="authStore.loading"
        class="loading loading-spinner loading-lg"
      />
      <Icon
        v-else
        name="tabler:brand-github"
        size="24"
      />
    </button>
  </div>
</template>

<style lang="scss" scoped></style>
