<script setup lang="ts">
import ActionButton from '../interfaces/ActionButton.vue';

defineProps<{ theme: 'light' | 'dark' }>();
defineEmits(['changeTheme', 'addBook']);
</script>
<template>
  <header class="mb-12 mt-4 flex items-center justify-between text-lime-500">
    <h1
      class="flex items-center justify-center text-3xl md:text-4xl lg:text-6xl"
    >
      <i class="pi pi-book mr-2" />
      <p>Book library</p>
    </h1>
    <aside>
      <ActionButton
        id="add-book-button"
        @click="$emit('addBook')"
        class="pi-plus"
      />
      <ActionButton
        id="theme-button"
        @click="$emit('changeTheme')"
        :class="theme == 'light' ? 'pi-moon' : 'pi-sun'"
      />
    </aside>
  </header>
</template>
