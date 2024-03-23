<script setup lang="ts">
import AppHeader from './components/layout/AppHeader.vue';
import BookCard from './components/layout/BookCard.vue';
import { ref, watch, watchEffect } from 'vue';
import { BookListElement } from '@book-library/shared';

const theme = ref<'light' | 'dark'>('light');
const books = ref<BookListElement[]>();

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
watchEffect(async () => {
  books.value = await fetch('/books').then(
    (res): Promise<BookListElement[]> => res.json(),
  );
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
        class="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      >
        <BookCard v-for="book in books" :book :key="book.isbn" />
      </main>
    </article>
  </div>
</template>
