<script setup lang="ts">
import { computed } from 'vue';

const { label } = defineProps<{ label: string; error?: string }>();
const model = defineModel<File>();

const labelText = computed(
  () => `${label}${model.value ? ` (${model.value.name})` : ''}`,
);
</script>
<template>
  <label class="flex w-full flex-col items-center lg:flex-row"
    >{{ labelText }}:

    <input
      class="hidden"
      type="file"
      @change="(e: Event) => (model = (e.target as HTMLInputElement).files![0])"
    />
    <i
      class="pi pi-upload m-auto cursor-pointer justify-self-end rounded-md p-2 text-xl outline-1 outline-lime-500 hover:outline focus:outline lg:text-2xl"
    />
  </label>
  <p v-if="error" class="mr-2 text-end text-sm italic text-red-500">
    {{ error }}
  </p>
</template>
