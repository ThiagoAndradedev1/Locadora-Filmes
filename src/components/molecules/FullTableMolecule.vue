<template>
  <section class="container mx-auto p-6 font-mono">
    <div class="flex justify-between items-center">
      <TitleHeaderAtom :title="tableTitle" />
      <button
        v-if="!!buttonHeaderTitle"
        @click="onPressedButtonHeader"
        class="bg-gray-200 text-black text-lg rounded py-2 px-3 transition duration-150 ease-in focus:outline-none hover:bg-gray-300"
      >
        {{ buttonHeaderTitle }}
      </button>
    </div>

    <div class="m-5">
      <slot name="filters"> </slot>
    </div>

    <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
      <div class="w-full overflow-x-auto">
        <table class="w-full table-auto">
          <thead>
            <tr
              class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600"
            >
              <slot name="header"></slot>
            </tr>
          </thead>
          <tbody class="bg-white">
            <slot name="body"></slot>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import TitleHeaderAtom from '../atoms/TitleHeaderAtom.vue'

defineProps<{
  tableTitle: string
  buttonHeaderTitle?: string
  onPressedButtonHeader?: () => void
}>()
</script>

<style scoped></style>
