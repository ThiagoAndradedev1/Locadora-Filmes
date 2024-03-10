<script setup lang="ts">
import { RouterView } from 'vue-router'
import './style.css'
</script>

<template>
  <nav
    v-if="$route.meta.requiresAuth"
    class="font-mono flex flex-col text-center content-center sm:flex-row sm:text-left sm:justify-between py-2 px-6 bg-white sm:items-baseline w-full"
  >
    <div class="mb-2 sm:mb-0 inner">
      <a
        href="/home"
        class="text-2xl no-underline text-grey-darkest hover:text-blue-dark font-sans font-bold"
        >Locadora Filmes 🍿</a
      ><br />
      <span class="text-xs text-grey-dark">Olá, Fulano de tal!</span>
    </div>

    <div class="flex flex-wrap justify-center md:justify-end">
      <a href="#" class="text-md no-underline text-black hover:text-blue-dark ml-2 px-1">Home</a>
      <a href="#" class="text-md no-underline text-grey-darker hover:text-blue-dark ml-2 px-1"
        >Usuários</a
      >
      <a href="#" class="text-md no-underline text-grey-darker hover:text-blue-dark ml-2 px-1"
        >Clientes</a
      >
      <a href="#" class="text-md no-underline text-grey-darker hover:text-blue-dark ml-2 px-1"
        >Filmes</a
      >
      <a href="#" class="text-md no-underline text-grey-darker hover:text-blue-dark ml-2 px-1"
        >Locações</a
      >
      <a href="#" class="text-md no-underline text-red-300 hover:text-blue-dark ml-2 px-1"
        >Logout</a
      >
    </div>
  </nav>
  <!-- <div class="h-screen flex items-center justify-center"> -->
  <RouterView />
  <!-- </div> -->
</template>

<style scoped></style>
