<script setup lang="ts">
import type { FetchError } from "ofetch";

// 使用 vee-validate bata 测试版的 useForm 函数创建表单上下文
// 传入 InsertLocationSchema 作为验证规则
//  !!!!!
import { useForm } from "vee-validate";

import { InsertLocation } from "~/lib/db/schema";

const { $csrfFetch } = useNuxtApp();

const { handleSubmit, errors, meta } = useForm({
  validationSchema: InsertLocation,
});

const submitError = ref("");
const router = useRouter();
const loading = ref(false);
const submitted = ref(false);
// 创建表单提交事件处理
// handleSubmit 是 VeeValidate 提供的高阶函数。
const onSubmit = handleSubmit(async (values) => {
  // 使用$fetch 在前端请求后端服务
  try {
    loading.value = true;
    await $csrfFetch("/api/locations", {
      method: "POST",
      body: values,
    });
    submitError.value = "";
    submitted.value = true;
    navigateTo("/dashboard");
  } catch (e) {
    const error = e as FetchError;
    console.log(error);
    // 返回服务器错误信息
    submitError.value =
      error.data?.statusMessage ||
      error.statusMessage ||
      "An unknow error message";
    loading.value = false;
  }
});
// 使用onBeforeRouteLeave 路由守卫进行路由离开前的确认
onBeforeRouteLeave(() => {
  if (!submitted.value && meta.value.dirty) {
    // const confirm = window.confirm(
    //   "Are you sure you want to leave? You have unsaved changes.",
    // );
    if (!confirm) {
      return false;
    }
    return true;
  }
});
</script>

<template>
  <div class="container max-w-md mx-auto">
    <div class="my-4">
      <h1 class="text-lg">Add Locations</h1>
      <p class="text-sm">Add a new location to your travel log.</p>
    </div>
    <!-- 创建alert 提交错误提示 -->
    <div v-if="submitError" role="alert" class="alert alert-error">
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
      <span>{{ submitError }}</span>
    </div>
    <!-- 详情页表单区域 -->
    <form class="flex flex-col gap-2" @submit="onSubmit">
      <!-- 名字 -->
      <AppFormField
        name="name"
        type="text"
        :errors="errors.name"
        label="Name"
      />

      <!-- 描述 -->

      <AppFormField
        name="description"
        type="textarea"
        :errors="errors.description"
        label="Description"
      />

      <!-- 纬度 -->
      <AppFormField
        name="lat"
        type="number"
        :errors="errors.lat"
        label="Latitude"
      />

      <!-- 经度 -->
      <AppFormField
        name="long"
        type="number"
        :errors="errors.long"
        label="Longitude"
      />

      <div class="flex justify-end gap-2">
        <button type="submit" class="btn btn-primary">
          Add Location
          <Icon name="tabler:circle-plus-filled" size="24" />
        </button>

        <button type="button" class="btn btn-warning" @click="router.back()">
          Cancel <Icon name="tabler:arrow-left" size="24" />
        </button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
