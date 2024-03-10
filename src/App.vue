<script setup lang="ts">
import { RouterView } from 'vue-router'
import './style.css'
import NavbarOrganism from './components/organisms/NavbarOrganism.vue'
</script>

<template>
  <NavbarOrganism />
  <RouterView />
</template>

<style scoped></style>
