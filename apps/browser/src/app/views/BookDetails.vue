<script setup lang="ts">
import { Book } from '@book-library/shared';
import { useFetch } from '../composables';
import Modal from '../components/layouts/Modal.vue';
import ActionButton from '../components/interfaces/ActionButton.vue';

const { isbn } = defineProps<{ isbn: Book['isbn'] }>();

const { data } = useFetch<Book>(`/books/${isbn}`);
</script>
<template>
  <Modal :loading="!data">
    <div class="h-5/6">
      <img
        :src="`/books/cover/${data?.isbn}.${data?.coverExtension}`"
        alt="book cover image 😢"
        class="flex size-full items-center justify-center rounded-t-md"
      />
    </div>
    <div class="flex flex-grow flex-col justify-between p-2">
      <h1 class="text-center text-xl font-bold">
        {{ data?.title }}
      </h1>
      <div class="flex justify-between">
        <section>
          <p>Authors: {{ data?.authors.join(', ') }}</p>
          <p>Length: {{ data?.length }} pages</p>
          <p>Edition: {{ data?.edition }}</p>
          <p>Available: {{ data?.availableCount }}/{{ data?.totalCount }}</p>
        </section>
        <nav class="self-end">
          <ActionButton class="pi-times" @click="$emit('closeModal')" />
        </nav>
      </div>
    </div>
  </Modal>
</template>
