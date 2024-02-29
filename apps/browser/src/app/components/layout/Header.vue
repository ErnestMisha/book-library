<script setup lang="ts">
const { theme } = defineProps<{ theme: 'light' | 'dark' }>();
const emit = defineEmits(['changeTheme']);

function changeTheme() {
  localStorage.setItem('theme', theme == 'light' ? 'dark' : 'light');
  emit('changeTheme');
}
</script>
<template>
  <header class="flex w-full items-center justify-center text-lime-500">
    <h1 class="ml-auto flex items-center justify-center text-3xl md:text-4xl lg:text-6xl">
      <i class="pi pi-book mr-2" />
      <p>Book library</p>
    </h1>
    <button
      :class="theme == 'light' ? 'pi-moon' : 'pi-sun'"
      class="pi ml-auto rounded-md border-lime-500 p-2 hover:border md:text-lg lg:text-xl"
      @click="changeTheme"
    />
  </header>
</template>
