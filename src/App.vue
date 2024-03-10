<script setup lang="ts">
import { RouterView } from 'vue-router'
import './style.css'
import NavbarOrganism from './components/organisms/NavbarOrganism.vue'

import { Notivue, Notification, push } from 'notivue'
</script>

<template>
  <Notivue v-slot="item">
    <Notification :item="item" />
  </Notivue>

  <NavbarOrganism />
  <RouterView />
</template>

<style scoped></style>
