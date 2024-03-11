<template>
  <FullTableMolecule table-title="Lista de Alocações">
    <template v-slot:filters>
      <div class="mb-2">
        <label for="nameFilter" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
          >Buscar por nome</label
        >
        <input
          id="nameFilter"
          v-model="filterName"
          type="text"
          name="nameFilter"
          class="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
          placeholder="Informe o nome"
        />
      </div>

      <div class="grid rid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="beginDate" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
            >Data de Inicio</label
          >

          <input
            v-model="filterBeginRenting"
            id="beginDate"
            type="date"
            name="beginDate"
            class="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
            placeholder="Informe a data de inicio"
          />
        </div>
        <div>
          <label for="finalDate" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
            >Data Final</label
          >

          <input
            v-model="filterEndRenting"
            id="finalDate"
            type="date"
            name="finalDate"
            class="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
            placeholder="Informe a data final"
          />
        </div>
      </div>
    </template>

    <template v-slot:header>
      <th class="px-4 py-3">Nome do Cliente</th>
      <th class="px-4 py-3">Filme</th>
      <th class="px-4 py-3">Data Inicial</th>
      <th class="px-4 py-3">Data Final</th>
      <th class="px-4 py-3">Status</th>
      <th class="px-4 py-3">Ações</th>
    </template>

    <template v-slot:body>
      <tr v-for="renting in rentingFiltered" :key="renting.clientId" class="text-gray-700">
        <td class="px-4 py-3 text-ms font-semibold border">{{ renting.clientName }}</td>
        <td class="px-4 py-3 text-ms font-semibold border">{{ renting.movie.Title }}</td>
        <td class="px-4 py-3 text-ms font-semibold border">
          {{ formatDate(renting.beginRenting) }}
        </td>
        <td class="px-4 py-3 text-ms font-semibold border">{{ formatDate(renting.endRenting) }}</td>
        <td class="px-4 py-3 text-ms font-semibold border">
          {{ renting.status ? 'Alugado' : 'Entregue' }}
        </td>
        <td class="px-4 py-3 text-sm border">
          <div class="flex gap-2">
            <ButtonAtom
              :label="renting.status ? 'Alugado' : 'Entregue'"
              :disabled="false"
              :on-pressed="() => toggleStatus(renting)"
            />
          </div>
        </td>
      </tr>
    </template>
  </FullTableMolecule>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { MovieRent } from '@/data/models/MovieRent'
import FullTableMolecule from '@/components/molecules/FullTableMolecule.vue'
import ButtonAtom from '@/components/atoms/ButtonAtom.vue'

const filterName = ref<string>('')
const filterBeginRenting = ref<string>('')
const filterEndRenting = ref<string>('')
const rentingsStorage = ref<string | null>(null)
const rentings = ref<MovieRent[]>([])

onMounted(() => {
  rentingsStorage.value = localStorage.getItem('rentings')
  if (rentingsStorage.value) {
    rentings.value = rentingsStorage.value ? (JSON.parse(rentingsStorage.value) as MovieRent[]) : []
  }
})

const formatDate = (date: Date): string => {
  const formatedDate = new Date(date)
  return formatedDate.toLocaleDateString()
}

const toggleStatus = (renting: MovieRent): void => {
  renting.status = !renting.status
  localStorage.setItem('rentings', JSON.stringify(rentings.value))
}

const rentingFiltered = computed(() => {
  return rentings.value.filter((renting) => {
    const clientMatch = renting.clientName.toLowerCase().includes(filterName.value.toLowerCase())
    const dateBeginMatch = filterBeginRenting.value
      ? new Date(renting.beginRenting).toISOString().substring(0, 10) === filterBeginRenting.value
      : true
    const dateEndMatch = filterEndRenting.value
      ? new Date(renting.endRenting).toISOString().substring(0, 10) === filterEndRenting.value
      : true
    return clientMatch && dateBeginMatch && dateEndMatch
  })
})
</script>

<style scoped></style>
