export interface MovieRent {
  beginRenting: Date
  clientId: string
  endRenting: Date
  movie: {
    Title: string
    Year: string
    imdbID: string
    Poster: string
  }
  status: boolean
}
