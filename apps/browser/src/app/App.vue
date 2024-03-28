<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
import BookCard from './components/BookCard.vue';
import { ref } from 'vue';
import { BookListElement } from '@book-library/shared';
import BookModal from './components/BookModal.vue';
import { useTheme, useFetch } from './composables';

const { theme, changeTheme } = useTheme();
const books = useFetch<BookListElement[]>('/books');
const modal = ref({
  show: false,
  isbn: 0,
});
</script>

<template>
  <div :class="theme">
    <article
      class="min-h-dvh bg-lime-50 p-4 lg:p-6 dark:bg-stone-900 dark:text-white"
    >
      <AppHeader
        :theme="theme"
        @change-theme="changeTheme(theme == 'light' ? 'dark' : 'light')"
      />
      <main
        v-if="!books"
        class="absolute left-1/2 top-1/2 content-center justify-center text-center"
      >
        <i class="pi pi-cog pi-spin text-2xl text-lime-500 lg:text-4xl" />
      </main>
      <main
        v-else
        class="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      >
        <BookCard
          v-for="book in books"
          :book
          :key="book.isbn"
          class="cursor-pointer"
          @click="
            () => {
              modal.show = true;
              modal.isbn = book.isbn;
            }
          "
        />
      </main>
      <BookModal
        v-if="modal.show"
        :isbn="modal.isbn"
        @close-modal="modal.show = false"
      />
    </article>
  </div>
</template>
