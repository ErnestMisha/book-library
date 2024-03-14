<script setup lang="ts">
import { BookListElement } from '@book-library/shared';
defineProps<{ book: BookListElement }>();
</script>
<template>
  <section
    class="m-2 rounded-md bg-lime-100 p-4 shadow-lg shadow-stone-500 dark:bg-stone-800 dark:text-white dark:shadow-lime-500"
  >
    <h2 class="text-xl font-bold">{{ book.title }}</h2>
    <p>Authors: {{ book.authors.join(', ') }}</p>
    <p>Edition: {{ book.edition }}</p>
  </section>
</template>
