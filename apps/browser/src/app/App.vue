<script setup lang="ts">
import Header from '../components/layout/Header.vue';
import { ref } from 'vue';

const theme = ref<'light' | 'dark'>('light');

if (
  localStorage.theme === 'dark' ||
  window.matchMedia('(prefers-color-scheme: dark)').matches
) {
  theme.value = 'dark';
} else {
  theme.value = 'light';
}

function changeTheme() {
  theme.value = theme.value == 'light' ? 'dark' : 'light';
}
</script>

<template>
  <div :class="theme">
    <article class="min-h-dvh bg-orange-100 p-4 lg:p-6 dark:bg-stone-700">
      <Header :theme="theme" @change-theme="changeTheme" />
      <div class="mt-72 text-center">
        <i class="pi pi-cog pi-spin text-4xl text-lime-500" />
      </div>
    </article>
  </div>
</template>
