<template>
  <div class="min-h-screen flex flex-col items-center justify-center font-mono">
    <h1 class="text-3xl font-bold mb-5">Locar Filme</h1>
    <div
      class="flex flex-col bg-white shadow-lg px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-4xl"
    >
      <div class="mt-10">
        <form @submit="onSubmit" novalidate>
          <div class="flex flex-col mb-6">
            <label for="name" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
              >Filme</label
            >
            <h3 class="text-lg font-bold">{{ store.movie.Title }}</h3>
          </div>

          <div class="flex flex-col mb-6">
            <label for="name" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
              >Cliente</label
            >

            <select
              v-model="clientId"
              v-bind="clientIdAttrs"
              class="text-sm sm:text-base h-10 placeholder-gray-500 bg-white pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
            >
              <option v-for="client in clients" :key="client.id" :value="client.id">
                {{ client.nome }}
              </option>
            </select>
            <div class="text-red-400 text-sm">{{ errors.clientId }}</div>
          </div>

          <div class="grid rid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="beginDate" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >Data de Inicio</label
              >

              <input
                v-model="beginDate"
                v-bind="beginDateAttrs"
                id="beginDate"
                type="date"
                name="beginDate"
                class="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                placeholder="Informe a data de inicio"
              />
              <div class="text-red-400 text-sm">{{ errors.beginDate }}</div>
            </div>
            <div>
              <label for="finalDate" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >Data Final</label
              >

              <input
                v-model="finalDate"
                v-bind="finalDateAttrs"
                id="finalDate"
                type="date"
                name="finalDate"
                class="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                placeholder="Informe a data final"
              />
              <div class="text-red-400 text-sm">{{ errors.finalDate }}</div>
            </div>
          </div>

          <div class="flex w-full mt-6">
            <button
              class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
            >
              <span class="mr-2 uppercase">Alocar Filme!</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { date, object, string } from 'yup'
import { toTypedSchema } from '@vee-validate/yup'
import { useMovieStore } from '@/stores/movies'
import { ref } from 'vue'
import type { MovieRent } from '@/data/models/MovieRent'

const clients = JSON.parse(localStorage.getItem('clients') || '[]')
const rentings = ref<MovieRent[]>(JSON.parse(localStorage.getItem('rentings') || '[]'))

const store = useMovieStore()

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: toTypedSchema(
    object({
      clientId: string().required('O campo nome é obrigatório'),
      beginDate: date().required('O campo é obrigatorio!'),
      finalDate: date()
        .required('o Campo é obrigatorio')
        .when('beginDate', (beginDate, schema) => {
          if (beginDate[0]) {
            const date = beginDate[0] as unknown as Date
            return schema.min(date, 'A data de final deve ser maior que a data de inicio')
          }
          return schema
        })
    })
  )
})

const [clientId, clientIdAttrs] = defineField('clientId')
const [beginDate, beginDateAttrs] = defineField('beginDate')
const [finalDate, finalDateAttrs] = defineField('finalDate')

const onSubmit = handleSubmit(async ({ clientId, beginDate, finalDate }) => {
  const clientIsCurrentlyRenting = rentings.value.some(
    (movie) => movie.clientId === clientId && movie.status === true
  )

  if (clientIsCurrentlyRenting) {
    alert('Este cliente já possui uma alocação ativa.')
    return
  }

  const newAlocation = {
    clientId: clientId,
    movie: store.movie,
    beginRenting: beginDate,
    endRenting: finalDate,
    status: true
  }
  rentings.value.push(newAlocation)
  localStorage.setItem('rentings', JSON.stringify(rentings.value))
})
</script>

<style scoped></style>
