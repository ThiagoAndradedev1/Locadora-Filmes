<template>
  <h1 id="title-header" class="text-3xl font-bold">{{ title }}</h1>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style scoped></style>
