<script setup lang="ts">
import AppHeader from './components/layout/AppHeader.vue';
import BookCard from './components/layout/BookCard.vue';
import { ref, watch, watchEffect } from 'vue';
import { BookListElement } from '@book-library/shared';

const theme = ref<'light' | 'dark'>(
  (localStorage.getItem('theme') as 'light' | 'dark') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'),
);
const books = ref<BookListElement[]>();
const loading = ref(false);

watch(theme, () => {
  localStorage.setItem('theme', theme.value);
});
watchEffect(async () => {
  loading.value = true;
  books.value = await fetch('/books').then(
    (res): Promise<BookListElement[]> => res.json(),
  );
  loading.value = false;
});
</script>

<template>
  <div :class="theme">
    <article class="min-h-dvh bg-lime-50 p-4 lg:p-6 dark:bg-stone-900">
      <AppHeader
        :theme="theme"
        @change-theme="theme = theme == 'light' ? 'dark' : 'light'"
      />
      <main
        v-if="loading"
        class="absolute left-1/2 top-1/2 content-center justify-center text-center"
      >
        <i class="pi pi-cog pi-spin text-2xl text-lime-500 lg:text-4xl" />
      </main>
      <main
        v-else
        class="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      >
        <BookCard v-for="book in books" :book :key="book.isbn" />
      </main>
    </article>
  </div>
</template>
