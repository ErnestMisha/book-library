<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);
</script>

<template>
  <section class="flex min-h-screen flex-col items-center justify-center space-y-8 bg-black">
    <h1 class="text-4xl text-amber-400">Coming soon...</h1>
    <button
      class="rounded-lg border border-rose-300 bg-red-400 p-2 hover:bg-orange-400 active:bg-yellow-400"
      @click="count++"
    >
      Counter: {{ count }}
    </button>
  </section>
</template>
