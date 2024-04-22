<script setup lang="ts">
import AppHeader from './components/layouts/AppHeader.vue';
import BookCard from './components/layouts/BookCard.vue';
import Loader from './components/layouts/Loader.vue';
import ActionButton from './components/interfaces/ActionButton.vue';
import { useApp } from './composables';

const {
  offset,
  theme,
  changeTheme,
  books,
  prevPage,
  nextPage,
  currView,
  views,
  isbn,
  scrollUpButton,
  changeView,
  closeModal,
  scrollUp,
  deleteBook,
} = useApp();
</script>

<template>
  <div :class="theme">
    <article
      class="min-h-dvh bg-lime-50 p-4 lg:p-6 dark:bg-stone-900 dark:text-white"
    >
      <AppHeader
        :theme="theme"
        :prev-page="prevPage!"
        :next-page="nextPage!"
        @prev-page="offset -= 12"
        @next-page="offset += 12"
        @change-theme="changeTheme(theme == 'light' ? 'dark' : 'light')"
        @add-book="changeView('AddBook')"
      />
      <main
        v-if="!books"
        class="absolute left-1/2 top-1/2 content-center justify-center text-center"
      >
        <Loader />
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
          @click="changeView('BookDetails', book.isbn)"
          @delete="deleteBook(book.isbn)"
        />
        <ActionButton
          v-show="scrollUpButton"
          class="pi-arrow-up fixed bottom-2 right-2 bg-lime-500 text-lime-50 dark:text-stone-900"
          @click="scrollUp"
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
