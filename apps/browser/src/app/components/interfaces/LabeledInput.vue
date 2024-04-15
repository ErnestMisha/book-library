<script setup lang="ts">
defineProps<{ label: string; error?: string }>();

const [model, modifiers] = defineModel({
  set(value: string) {
    if (modifiers.array) {
      return value.split(',').map((el) => el.trim());
    }
    if (modifiers.number) {
      const newValue = parseInt(value.replaceAll(/[-_.,]/g, ''));
      return Number.isNaN(newValue) ? value : newValue;
    }
    return value;
  },
});
</script>
<template>
  <label class="flex w-full flex-col items-center justify-between lg:flex-row"
    >{{ label }}:
    <input
      class="my-2 ml-4 h-8 w-full rounded-md border-0 bg-lime-100 focus:bg-white focus:ring-lime-500 lg:w-auto dark:bg-stone-800 dark:focus:bg-black"
      v-model.lazy.trim="model"
    />
  </label>
  <p v-if="error" class="mr-2 text-end text-sm italic text-red-500">
    {{ error }}
  </p>
</template>
