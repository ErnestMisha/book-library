<script setup lang="ts">
import { Book } from '@book-library/shared';
import Modal from '../components/layouts/Modal.vue';
import ActionButton from '../components/interfaces/ActionButton.vue';
import { useBookDetails } from '../composables';

const { isbn } = defineProps<{ isbn: Book['isbn'] }>();

const { book, edit, count, error, save, enableEdit } = useBookDetails(isbn);
</script>
<template>
  <Modal :loading="!book">
    <div class="h-5/6">
      <img
        :src="`/books/cover/${book!.isbn}.${book!.coverExtension}`"
        alt="book cover image 😢"
        class="flex size-full items-center justify-center rounded-t-md"
      />
    </div>
    <div class="flex flex-grow flex-col justify-between p-2">
      <h1 class="text-center text-xl font-bold">
        {{ book!.title }}
      </h1>
      <div class="flex justify-between">
        <section>
          <p>Authors: {{ book!.authors.join(', ') }}</p>
          <p>Length: {{ book!.length }} pages</p>
          <p>Edition: {{ book!.edition }}</p>
          <p>
            Available:
            <button
              v-if="edit"
              @click="count.available--"
              class="pi pi-minus mx-2 hover:text-lime-500"
            />
            {{ count.available }}
            <button
              v-if="edit"
              @click="count.available++"
              class="pi pi-plus mx-2 hover:text-lime-500"
            />/<button
              v-if="edit"
              @click="count.total--"
              class="pi pi-minus mx-2 hover:text-lime-500"
            />{{ count.total
            }}<button
              v-if="edit"
              @click="count.total++"
              class="pi pi-plus mx-2 hover:text-lime-500"
            />
          </p>
          <p v-if="error" class="text-sm italic text-red-500">
            {{ error }}
          </p>
        </section>
        <nav class="flex self-end">
          <ActionButton v-if="!edit" class="pi-pencil" @click="enableEdit" />
          <ActionButton v-else class="pi-save" @click="save" />
          <ActionButton class="pi-times" @click="$emit('closeModal')" />
        </nav>
      </div>
    </div>
  </Modal>
</template>
