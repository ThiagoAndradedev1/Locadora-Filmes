<template>
  <form @submit.prevent="editUser">
    <label>Nome:</label>
    <input v-model="user.name" /><br />
    <label>Documento:</label>
    <input v-model="user.document" /><br />
    <label>Status:</label>
    <select v-model="user.status">
      <option value="true">Ativo</option>
      <option value="false">Inativo</option></select
    ><br />
    <button type="submit" class="bg-blue-500 text-white py-1 px-2 rounded mr-2">Salvar</button>
  </form>
</template>

<script setup lang="ts">
import type { User } from '@/data/models/User.model'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userId = ref<number>(0)
const user = ref<User>({
  id: '0',
  name: '',
  document: '',
  password: '',
  status: false
})

const retrieveUser = () => {
  const usuariosLocalStorage = JSON.parse(localStorage.getItem('users') || '[]')
  const foundUser = usuariosLocalStorage.find(
    (usuario: User) => usuario.id === userId.value.toString()
  )
  if (foundUser) {
    user.value = { ...foundUser }
  }
}

const editUser = () => {
  const usuariosLocalStorage = JSON.parse(localStorage.getItem('users') || '[]')
  const index = usuariosLocalStorage.findIndex(
    (usuario: User) => usuario.id === userId.value.toString()
  )
  if (index !== -1) {
    usuariosLocalStorage.splice(index, 1, user.value)
    localStorage.setItem('users', JSON.stringify(usuariosLocalStorage))
  }
}

onMounted(() => {
  userId.value = Number(router.currentRoute.value.params.id)
  retrieveUser()
})
</script>

<style scoped>
/* Estilos personalizados podem ser adicionados aqui */
</style>
