<template>
  <FullTableMolecule
    table-title="Clientes"
    button-header-title="+ Cliente"
    :on-pressed-button-header="
      () => {
        router.push(ROUTES.REGISTER_CLIENT)
      }
    "
  >
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
      <th class="px-4 py-3">CPF</th>
      <th class="px-4 py-3">Status</th>
      <th class="px-4 py-3">Ações</th>
    </template>

    <template v-slot:body>
      <tr v-for="client in clientsFiltered" :key="client.id" class="text-gray-700">
        <td class="px-4 py-3 text-ms font-semibold border">{{ client.nome }}</td>
        <td class="px-4 py-3 text-ms font-semibold border">{{ client.cpf }}</td>
        <td class="px-4 py-3 text-ms font-semibold border">
          {{ client.status ? 'Ativo' : 'Inativo' }}
        </td>
        <td class="px-4 py-3 text-sm border">
          <div class="flex gap-2">
            <ButtonAtom
              :label="client.status ? 'Desativar' : 'Ativar'"
              :disabled="false"
              :on-pressed="() => toggleStatus(client)"
            />
            <ButtonAtom label="Editar" :disabled="false" :on-pressed="() => goToEditView(client)" />
          </div>
        </td>
      </tr>
    </template>
  </FullTableMolecule>
</template>

<script setup lang="ts">
import ButtonAtom from '@/components/atoms/ButtonAtom.vue'
import FullTableMolecule from '@/components/molecules/FullTableMolecule.vue'
import type { Client } from '@/data/models/Client.model'
import { ROUTES } from '@/utils/route-utils'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const clientsList = ref<Client[]>([])
const findName = ref<string>('')
const findDocument = ref<string>('')
const filterStatus = ref<string>('')

const router = useRouter()

const retrieveClients = (): void => {
  const clientsLocalStorage = JSON.parse(localStorage.getItem('clients') || '[]')
  clientsList.value = clientsLocalStorage
}

const toggleStatus = (client: Client): void => {
  client.status = !client.status
  localStorage.setItem('clients', JSON.stringify(clientsList.value))
}

const goToEditView = (client: Client): void => {
  router.push({ name: 'editClient', params: { id: client.id } })
}

onMounted(() => {
  retrieveClients()
})

const clientsFiltered = computed(() => {
  return clientsList.value.filter((client) => {
    const nomeMatches = client.nome.toLowerCase().includes(findName.value.toLowerCase())
    const documentoMatches = client.cpf.includes(findDocument.value)
    const statusMatches = filterStatus.value === '' || String(client.status) === filterStatus.value
    return nomeMatches && documentoMatches && statusMatches
  })
})
</script>

<style scoped></style>
