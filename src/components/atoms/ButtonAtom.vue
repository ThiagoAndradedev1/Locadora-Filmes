<template>
  <button
    id="btn-atom"
    @click="onPressed"
    class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
    :class="{ 'opacity-50 cursor-not-allowed': disabled }"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  disabled: boolean
  onPressed?: () => void
}>()
</script>

<style scoped></style>
