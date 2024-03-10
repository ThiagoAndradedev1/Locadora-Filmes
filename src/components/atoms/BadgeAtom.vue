<template>
  <span
    class="p-2 rounded-lg text-white"
    :class="{
      'bg-green-500': severity === 'success',
      'bg-red-500': severity === 'error',
      'bg-blue-500': severity === 'primary'
    }"
    >{{ label }}</span
  >
</template>

<script setup lang="ts">
defineProps<{
  label: string
  severity: 'primary' | 'success' | 'error'
}>()
</script>

<style scoped></style>
