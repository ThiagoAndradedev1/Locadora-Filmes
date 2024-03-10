<template>
  <FullTableMolecule table-title="Usuários">
    <template v-slot:filters>
      <div class="mb-2">
        <label for="nameFilter" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
          >Buscar por nome</label
        >

        <input
          id="nameFilter"
          v-model="findName"
          type="text"
          name="nameFilter"
          class="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
          placeholder="Informe o nome"
        />
      </div>

      <div class="mb-2">
        <label for="documentFilter" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
          >Buscar por documento</label
        >

        <input
          id="documentFilter"
          v-model="findDocument"
          type="text"
          name="documentFilter"
          class="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
          placeholder="Informe o documento"
        />
      </div>

      <div class="mb-2">
        <label for="statusFilter" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
          >Filtrar por status</label
        >

        <select
          id="statusFilter"
          v-model="filterStatus"
          name="statusFilter"
          class="text-sm sm:text-base placeholder-gray-500 bg-white pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
        >
          <option value="">Todos</option>
          <option value="true">Ativo</option>
          <option value="false">Inativo</option>
        </select>
      </div>
    </template>

    <template v-slot:header>
      <th class="px-4 py-3">Nome</th>
      <th class="px-4 py-3">Documento</th>
      <th class="px-4 py-3">Status</th>
      <th class="px-4 py-3">Ações</th>
    </template>

    <template v-slot:body>
      <tr v-for="user in usersFiltered" :key="user.id" class="text-gray-700">
        <td class="px-4 py-3 text-ms font-semibold border">{{ user.name }}</td>
        <td class="px-4 py-3 text-ms font-semibold border">{{ user.document }}</td>
        <td class="px-4 py-3 text-ms font-semibold border">
          <BadgeAtom
            :label="user.status ? 'Ativo' : 'Desativado'"
            :severity="user.status ? 'success' : 'error'"
          />
        </td>
        <td class="px-4 py-3 text-sm border">
          <div class="flex gap-2">
            <ButtonAtom
              :label="user.status ? 'Desativar' : 'Ativar'"
              :disabled="false"
              :on-pressed="() => toggleStatus(user)"
            />
            <ButtonAtom label="Editar" :disabled="false" :on-pressed="() => goToEditView(user)" />
          </div>
        </td>
      </tr>
    </template>
  </FullTableMolecule>
</template>

<script setup lang="ts">
import BadgeAtom from '@/components/atoms/BadgeAtom.vue'
import ButtonAtom from '@/components/atoms/ButtonAtom.vue'
import FullTableMolecule from '@/components/molecules/FullTableMolecule.vue'
import type { User } from '@/data/models/User.model'
import { ROUTES } from '@/utils/route-utils'
import { getAll, set } from '@/utils/storage-utils'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const usersList = ref<User[]>([])
const findName = ref<string>('')
const findDocument = ref<string>('')
const filterStatus = ref<string>('')

const router = useRouter()

const retrieveUsers = (): void => {
  const usersStorage = getAll<User[]>('users')

  if (!usersStorage) {
    return
  }

  usersList.value = usersStorage
}

const toggleStatus = (user: User): void => {
  user.status = !user.status
  set<User[]>('users', usersList.value)
}

const goToEditView = (user: User): void => {
  router.push({ name: ROUTES.EDIT_USER, params: { id: user.id } })
}

onMounted(() => {
  retrieveUsers()
})

const usersFiltered = computed(() => {
  return usersList.value.filter((usuario) => {
    const nameMatches = usuario.name.toLowerCase().includes(findName.value.toLowerCase())
    const documentMatches = usuario.document.includes(findDocument.value)
    const statusMatches = filterStatus.value === '' || String(usuario.status) === filterStatus.value
    return nameMatches && documentMatches && statusMatches
  })
})
</script>

<style scoped></style>
