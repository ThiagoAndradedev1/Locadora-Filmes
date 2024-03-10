// store.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Movie } from '@/data/models/Movie.model'

export const useMovieStore = defineStore('movie', () => {
  const movie = ref<Movie>({ Title: '', imdbID: '', Poster: '', Year: '' })

  function setMovie(newMovie: Movie): void {
    movie.value = newMovie
  }

  return { movie, setMovie }
})
