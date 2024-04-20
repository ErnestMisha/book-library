<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import Loader from './Loader.vue';

defineOptions({
  inheritAttrs: false,
});
defineProps<{ loading: boolean }>();
const emit = defineEmits(['closeModal']);

function emitClose(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    emit('closeModal');
  }
}

onMounted(() => addEventListener('keyup', emitClose));
onUnmounted(() => removeEventListener('keyup', emitClose));
</script>
<template>
  <div
    class="fixed left-0 top-0 flex h-screen w-screen items-center justify-center overflow-auto bg-lime-50/90 p-2 dark:bg-stone-900/90"
    @click="$emit('closeModal')"
  >
    <Loader v-if="loading" />
    <article
      v-else
      class="m-auto flex w-[50rem] flex-col break-words rounded-md bg-white outline outline-1 outline-lime-500 lg:h-[95%] dark:bg-black"
      @click.stop
      v-bind="$attrs"
    >
      <slot />
    </article>
  </div>
</template>
