<script setup lang="ts">
import { Book } from '@book-library/shared';
import { useFetch } from '../composables';

defineEmits(['closeModal']);
const { isbn } = defineProps<{ isbn: Book['isbn'] }>();

const book = useFetch<Book>(`/books/${isbn}`);
</script>
<template>
  <div
    class="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-lime-50/90 p-2 dark:bg-stone-900/90"
    @click="$emit('closeModal')"
  >
    <i
      v-if="!book"
      class="pi pi-cog pi-spin text-2xl text-lime-500 lg:text-4xl"
    />
    <article
      v-else
      class="flex w-[50rem] flex-col break-words rounded-md bg-white outline outline-1 outline-lime-500 lg:h-[95%] dark:bg-black"
      @click.stop
    >
      <div class="h-5/6">
        <img
          :src="`/books/cover/${book?.isbn}.${book?.coverExtension}`"
          alt="book cover image 😢"
          class="size-full rounded-t-md"
        />
      </div>
      <div class="flex flex-grow flex-col justify-between p-2">
        <h1 class="text-center text-xl font-bold">
          {{ book?.title }}
        </h1>
        <div>
          <p>Authors: {{ book?.authors.join(', ') }}</p>
          <p>Length: {{ book?.length }} pages</p>
          <p>Edition: {{ book?.edition }}</p>
          <p>Available: {{ book?.availableCount }}/{{ book?.totalCount }}</p>
        </div>
      </div>
    </article>
    <button @keyup.esc="$emit('closeModal')" v-focus />
  </div>
</template>
