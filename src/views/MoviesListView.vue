<template>
  <FullTableMolecule table-title="Filmes o/">
    <template v-slot:filters>
      <div class="flex items-end gap-4">
        <div class="flex-1">
          <label for="password" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
            >Buscar por título</label
          >

          <input
            v-model.trim="title"
            id="title"
            type="text"
            name="title"
            class="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
            placeholder="Informe o título"
          />
        </div>
        <div>
          <ButtonAtom @click="searchMovies" class="p-5" label="Pesquisar" :disabled="loading" />
        </div>
      </div>
      <div class="flex items-end gap-4">
        <div class="flex-1">
          <label for="password" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
            >Buscar por ano</label
          >

          <input
            v-model.trim="year"
            id="year"
            type="number"
            name="year"
            class="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
            placeholder="Informe o ano"
            min="0"
          />
        </div>
        <div>
          <ButtonAtom @click="searchMovies" class="p-5" label="Pesquisar" :disabled="loading" />
        </div>
      </div>
    </template>

    <template v-slot:header>
      <th class="px-4 py-3">Poster</th>
      <th class="px-4 py-3">Nome</th>
      <th class="px-4 py-3">Ano</th>
      <th class="px-4 py-3">Ações</th>
    </template>

    <template v-slot:body>
      <tr class="text-gray-700" v-if="loading">
        <td class="px-4 py-3 text-ms font-semibold border text-center" colspan="4">
          Carregando...
        </td>
      </tr>
      <tr class="text-gray-700" v-else-if="movie">
        <td class="px-4 py-3 text-ms font-semibold border">
          <img
            v-if="movie.Poster !== 'N/A'"
            class="rounded-3xl object-contain h-36"
            :src="movie.Poster"
            :alt="movie.Title"
          />
          <span v-else>Nenhuma imagem disponível</span>
        </td>
        <td class="px-4 py-3 text-ms font-semibold border">{{ movie.Title }}</td>
        <td class="px-4 py-3 text-ms font-semibold border">{{ movie.Year }}</td>
        <td class="px-4 py-3 text-sm border">
          <ButtonAtom label="Alugar" :disabled="!movie" :on-pressed="rentMovie" />
        </td>
      </tr>
      <tr v-else-if="searched && !movie" class="text-gray-700">
        <td class="px-4 py-3 text-ms font-semibold border text-center" colspan="4">
          Nenhum filme encontrado.
        </td>
      </tr>
      <tr v-else class="text-gray-700">
        <td class="px-4 py-3 text-ms font-semibold border text-center" colspan="4">
          Realize uma busca
        </td>
      </tr>
    </template>
  </FullTableMolecule>
</template>

<script setup lang="ts">
import type { Movie } from '@/data/models/Movie.model'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ButtonAtom from '@/components/atoms/ButtonAtom.vue'
import FullTableMolecule from '@/components/molecules/FullTableMolecule.vue'
import { useMovieStore } from '@/stores/movies'

const movieStore = useMovieStore()

const title = ref<string>('')
const year = ref<string>('')
const movie = ref<Movie | null>(null)
const searched = ref<boolean>(false)
const loading = ref<boolean>(false)

const router = useRouter()

const searchMovies = async () => {
  loading.value = true
  searched.value = true
  const apiKey = import.meta.env.VITE_API_KEY
  const baseUrl = `http://www.omdbapi.com/?apikey=${apiKey}&type=movie&plot=short`

  let url = baseUrl

  if (title.value) {
    url += `&t=${encodeURIComponent(title.value)}`
  }

  if (year.value) {
    url += `&y=${encodeURIComponent(year.value)}`
  }

  try {
    const response = await fetch(url)
    const data = await response.json()
    if (data.Response === 'True') {
      movie.value = data
    } else {
      movie.value = null
    }
  } catch (error) {
    console.error('Erro ao buscar filme:', error)
    movie.value = null
  } finally {
    loading.value = false
  }
}

const rentMovie = () => {
  if (movie.value) {
    const filmeData: Movie = {
      Title: movie.value.Title,
      Year: movie.value.Year,
      imdbID: movie.value.imdbID,
      Poster: movie.value.Poster
    }

    movieStore.setMovie(filmeData)

    router.push('/moviesRenting')
  }
}
</script>

<style scoped></style>
