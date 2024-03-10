<template>
  <nav
    v-if="$route.meta.requiresAuth"
    class="font-mono flex flex-col text-center content-center sm:flex-row sm:text-left sm:justify-between py-2 px-6 bg-white sm:items-baseline w-full"
  >
    <div class="mb-2 sm:mb-0 inner">
      <RouterLink
        :to="`/${ROUTES.MOVIES}`"
        class="text-2xl no-underline text-grey-darkest hover:text-blue-dark font-sans font-bold"
        >Locadora Filmes 🍿</RouterLink
      ><br />
      <span class="text-xs text-grey-dark">Olá, {{ loggedInUser?.name }}!</span>
    </div>

    <div class="flex flex-wrap justify-center md:justify-end">
      <RouterLink
        :to="`/${ROUTES.USERS}`"
        class="text-md no-underline text-grey-darker hover:text-blue-dark ml-2 px-1 hover:underline"
        >Usuários</RouterLink
      >
      <RouterLink
        :to="`/${ROUTES.CLIENTS}`"
        class="text-md no-underline text-grey-darker hover:text-blue-dark ml-2 px-1 hover:underline"
        >Clientes</RouterLink
      >
      <RouterLink
        :to="`/${ROUTES.MOVIES}`"
        class="text-md no-underline text-grey-darker hover:text-blue-dark ml-2 px-1 hover:underline"
        >Filmes</RouterLink
      >
      <RouterLink
        :to="`/${ROUTES.MOVIES_RENTING_LIST}`"
        class="text-md no-underline text-grey-darker hover:text-blue-dark ml-2 px-1 hover:underline"
        >Locações</RouterLink
      >
      <a
        @click="logout"
        class="text-md no-underline text-red-300 hover:text-blue-dark ml-2 px-1 cursor-pointer hover:text-red-700"
        >Logout</a
      >
    </div>
  </nav>
</template>

<script setup lang="ts">
import type { User } from '@/data/models/User.model'
import { ROUTES } from '@/utils/route-utils'
import { getAll, remove } from '@/utils/storage-utils'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const loggedInUser = ref<User | undefined>(undefined)

onMounted(() => {
  const usersStorage = getAll<User[]>('users')
  if (!usersStorage) {
    return
  }
  const actualUserDocument = getAll<string>('actualUser')

  if (!actualUserDocument) {
    return
  }

  const actualUser = usersStorage.find((user) => user.document === actualUserDocument)

  if (actualUser) {
    loggedInUser.value = actualUser
  }
})

const logout = () => {
  remove('actualUser')
  router.push(ROUTES.LOGIN)
}
</script>

<style scoped></style>
