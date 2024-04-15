<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import Modal from '../components/layouts/Modal.vue';
import LabeledInput from '../components/interfaces/LabeledInput.vue';
import FileUploadInput from '../components/interfaces/FileUploadInput.vue';
import ActionButton from '../components/interfaces/ActionButton.vue';
import { SubmitStatus, useSubmit } from '../composables';
import Loader from '../components/layouts/Loader.vue';
import { CreateBook } from '@book-library/shared';

const emit = defineEmits();

const book = ref({} as CreateBook);
const cover = ref<File>();

const { errors, status, submit } = useSubmit();

const headerMessages = [
  'Add new book',
  'Submitting',
  'Something went wrong, please try again later :(',
];

const header = computed(() => headerMessages[status.value]);

watch(status, () => {
  if (status.value === SubmitStatus.Success) {
    emit('closeModal');
  }
});
</script>
<template>
  <Modal :loading="false" class="items-center justify-between p-4">
    <h2 class="text-center text-2xl font-bold">{{ header }}</h2>
    <form
      v-if="status === SubmitStatus.Idle"
      @submit.prevent="submit(book, cover)"
      class="my-4"
      id="add-book-form"
      novalidate
    >
      <LabeledInput label="Title" v-model="book.title" :error="errors.title" />
      <LabeledInput
        label="Authors (comma separated)"
        v-model.array="book.authors"
        :error="errors.authors"
      />
      <LabeledInput
        label="ISBN"
        v-model.number="book.isbn"
        :error="errors.isbn"
      />
      <LabeledInput
        label="Length"
        v-model.number="book.length"
        :error="errors.length"
      />
      <LabeledInput
        label="Edition"
        v-model.number="book.edition"
        :error="errors.edition"
      />
      <LabeledInput
        label="Total count"
        v-model.number="book.totalCount"
        :error="errors.totalCount"
      />
      <LabeledInput
        label="Available count"
        v-model.number="book.availableCount"
        :error="errors.availableCount"
      />
      <FileUploadInput
        label="Cover image"
        v-model="cover"
        :error="errors.cover"
      />
    </form>
    <Loader v-else-if="status === SubmitStatus.Submitting" />
    <i
      v-else
      class="pi pi-exclamation-circle text-2xl text-red-500 lg:text-4xl"
    />
    <nav>
      <ActionButton
        v-if="status === SubmitStatus.Idle"
        class="pi-check"
        form="add-book-form"
      />
      <ActionButton class="pi-times" @click="$emit('closeModal')" />
    </nav>
  </Modal>
</template>
