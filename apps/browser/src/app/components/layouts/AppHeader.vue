<script setup lang="ts">
import ActionButton from '../interfaces/ActionButton.vue';

defineProps<{
  theme: 'light' | 'dark';
  nextPage?: boolean;
  prevPage?: boolean;
}>();
defineEmits(['changeTheme', 'addBook', 'prevPage', 'nextPage']);
</script>
<template>
  <header class="mb-12 mt-4 flex items-center justify-between text-lime-500">
    <nav>
      <ActionButton
        :class="prevPage ? '' : 'cursor-not-allowed opacity-50 outline-0'"
        class="pi-arrow-left"
        @click="prevPage && $emit('prevPage')"
      />
      <ActionButton
        :class="nextPage ? '' : 'cursor-not-allowed opacity-50 outline-0'"
        class="pi-arrow-right"
        @click="nextPage && $emit('nextPage')"
      />
    </nav>
    <h1
      class="flex items-center justify-center text-3xl md:text-4xl lg:text-6xl"
    >
      <i class="pi pi-book mr-2" />
      <p>Book library</p>
    </h1>
    <aside>
      <ActionButton @click="$emit('addBook')" class="pi-plus" />
      <ActionButton
        @click="$emit('changeTheme')"
        :class="theme == 'light' ? 'pi-moon' : 'pi-sun'"
      />
    </aside>
  </header>
</template>
