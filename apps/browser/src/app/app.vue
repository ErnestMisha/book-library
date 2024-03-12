<script setup lang="ts">
import Header from './components/layout/header.vue';
import { ref, watch } from 'vue';

const theme = ref<'light' | 'dark'>('light');

if (
  localStorage.getItem('theme') === 'dark' ||
  window.matchMedia('(prefers-color-scheme: dark)').matches
) {
  theme.value = 'dark';
} else {
  theme.value = 'light';
}

watch(theme, () => {
  localStorage.setItem('theme', theme.value);
});
</script>

<template>
  <div :class="theme">
    <article class="min-h-dvh bg-orange-100 p-4 lg:p-6 dark:bg-stone-700">
      <Header
        :theme="theme"
        @change-theme="theme = theme == 'light' ? 'dark' : 'light'"
      />
      <div class="mt-72 text-center">
        <i class="pi pi-cog pi-spin text-4xl text-lime-500" />
      </div>
    </article>
  </div>
</template>
