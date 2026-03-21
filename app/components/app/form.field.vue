<script setup lang="ts">
// 对表单组件进行封装
const props = defineProps<{
  label: string;
  name: string;
  type?: "text" | "textarea" | "number";
  errors?: string;
}>();
</script>

<template>
  <div>
    <fieldset class="fieldset">
      <legend class="fieldset-legend">
        {{ props.label }}
      </legend>
      <Field
        :as="props.type === 'textarea' ? 'textarea' : 'input'"
        :name="props.name"
        :type="props.type || 'text'"
        class="w-full"
        :class="{
          'input-error': props.errors,
          'input ':
            !props.type || props.type === 'text' || props.type === 'number',
          'textarea ': props.type === 'textarea',
        }"
      />
      <p v-if="props.errors" class="label">
        {{ props.errors }}
      </p>
    </fieldset>
  </div>
</template>

<style lang="scss" scoped></style>
