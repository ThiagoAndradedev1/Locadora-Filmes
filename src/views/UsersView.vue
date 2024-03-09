<template>
  <div class="flex justify-center items-center h-screen">
    <div>
      <h1 class="text-2xl mb-4">Lista de Usuários</h1>
      <div class="mb-4">
        <label for="buscaNome" class="block text-gray-700 font-bold mb-2">Buscar por Nome:</label>
        <input
          v-model="findName"
          type="text"
          id="buscaNome"
          name="buscaNome"
          class="form-input w-full"
        />
      </div>
      <div class="mb-4">
        <label for="buscaDocumento" class="block text-gray-700 font-bold mb-2"
          >Buscar por Documento:</label
        >
        <input
          v-model="findDocument"
          type="text"
          id="buscaDocumento"
          name="buscaDocumento"
          class="form-input w-full"
        />
      </div>
      <div class="mb-4">
        <label for="filtroStatus" class="block text-gray-700 font-bold mb-2"
          >Filtrar por Status:</label
        >
        <select
          v-model="filterStatus"
          id="filtroStatus"
          name="filtroStatus"
          class="form-select w-full p-2"
        >
          <option value="">Todos</option>
          <option value="true">Ativo</option>
          <option value="false">Inativo</option>
        </select>
      </div>
      <div v-if="usersFiltered.length > 0">
        <table class="w-full">
          <thead>
            <tr>
              <th class="px-4 py-2">Nome</th>
              <th class="px-4 py-2">Documento</th>
              <th class="px-4 py-2">Status</th>
              <th class="px-4 py-2">Ação</th>
              <th class="px-4 py-2">Ação</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="usuario in usersFiltered" :key="usuario.id">
              <td class="border px-4 py-2">{{ usuario.name }}</td>
              <td class="border px-4 py-2">{{ usuario.document }}</td>
              <td class="border px-4 py-2">{{ usuario.status ? 'Ativo' : 'Inativo' }}</td>
              <td class="border px-4 py-2">
                <button
                  @click="toggleStatus(usuario)"
                  class="bg-blue-500 text-white py-1 px-2 rounded mr-2 w-full"
                >
                  {{ usuario.status ? 'Desativar' : 'Ativar' }}
                </button>
              </td>
              <td class="border px-4 py-2">
                <button @click="editUser()" class="bg-green-500 text-white py-1 px-2 rounded">
                  Editar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>Nenhum usuário encontrado.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/data/models/User.model'
import { ref, onMounted, computed } from 'vue'

const usersList = ref<User[]>([])
const findName = ref<string>('')
const findDocument = ref<string>('')
const filterStatus = ref<string>('')

const retrieveUsers = () => {
  const usuariosLocalStorage = JSON.parse(localStorage.getItem('users') || '[]')
  usersList.value = usuariosLocalStorage
}

const toggleStatus = (usuario: User) => {
  usuario.status = !usuario.status
  localStorage.setItem('users', JSON.stringify(usersList.value))
}

const editUser = () => {
  console.log()
}

onMounted(() => {
  retrieveUsers()
})

const usersFiltered = computed(() => {
  return usersList.value.filter((usuario) => {
    const nomeMatches = usuario.name.toLowerCase().includes(findName.value.toLowerCase())
    const documentoMatches = usuario.document.includes(findDocument.value)
    const statusMatches = filterStatus.value === '' || String(usuario.status) === filterStatus.value
    return nomeMatches && documentoMatches && statusMatches
  })
})
</script>

<style scoped>
/* Estilos personalizados podem ser adicionados aqui */
</style>
