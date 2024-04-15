<script setup lang="ts">
import AppHeader from './components/layouts/AppHeader.vue';
import BookCard from './components/layouts/BookCard.vue';
import { ref } from 'vue';
import { BookListElement } from '@book-library/shared';
import BookDetails from './views/BookDetails.vue';
import AddBook from './views/AddBook.vue';
import { useTheme, useFetch } from './composables';
import Loader from './components/layouts/Loader.vue';

const { theme, changeTheme } = useTheme();
const { data, refetch } = useFetch<BookListElement[]>('/books');
const currView = ref<'BookDetails' | 'AddBook'>();
const views = {
  BookDetails,
  AddBook,
};
const isbn = ref<number>();

function changeView(name: 'BookDetails' | 'AddBook', newIsbn?: number) {
  currView.value = name;
  isbn.value = newIsbn;
}

async function closeModal() {
  currView.value = undefined;
  await refetch();
}
</script>

<template>
  <div :class="theme">
    <article
      class="min-h-dvh bg-lime-50 p-4 lg:p-6 dark:bg-stone-900 dark:text-white"
    >
      <AppHeader
        :theme="theme"
        @change-theme="changeTheme(theme == 'light' ? 'dark' : 'light')"
        @add-book="changeView('AddBook')"
      />
      <main
        v-if="!data"
        class="absolute left-1/2 top-1/2 content-center justify-center text-center"
      >
        <Loader />
      </main>
      <main
        v-else
        class="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      >
        <BookCard
          v-for="book in data"
          :book
          :key="book.isbn"
          class="cursor-pointer"
          @click="changeView('BookDetails', book.isbn)"
        />
      </main>
      <component
        v-if="currView"
        :is="views[currView]"
        :isbn
        @close-modal="closeModal"
      />
    </article>
  </div>
</template>
