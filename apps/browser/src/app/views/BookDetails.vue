<script setup lang="ts">
import { Book } from '@book-library/shared';
import Modal from '../components/layouts/Modal.vue';
import ActionButton from '../components/interfaces/ActionButton.vue';
import { onMounted, ref } from 'vue';

const { isbn } = defineProps<{ isbn: Book['isbn'] }>();

const book = ref<Book>();

onMounted(async () => {
  book.value = await fetch(`/books/${isbn}`).then((res) => res.json());
});
</script>
<template>
  <Modal :loading="!book">
    <div class="h-5/6">
      <img
        :src="`/books/cover/${book?.isbn}.${book?.coverExtension}`"
        alt="book cover image 😢"
        class="flex size-full items-center justify-center rounded-t-md"
      />
    </div>
    <div class="flex flex-grow flex-col justify-between p-2">
      <h1 class="text-center text-xl font-bold">
        {{ book?.title }}
      </h1>
      <div class="flex justify-between">
        <section>
          <p>Authors: {{ book?.authors.join(', ') }}</p>
          <p>Length: {{ book?.length }} pages</p>
          <p>Edition: {{ book?.edition }}</p>
          <p>Available: {{ book?.availableCount }}/{{ book?.totalCount }}</p>
        </section>
        <nav class="self-end">
          <ActionButton class="pi-times" @click="$emit('closeModal')" />
        </nav>
      </div>
    </div>
  </Modal>
</template>
