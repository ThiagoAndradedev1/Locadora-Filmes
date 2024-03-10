export interface MovieRent {
  beginRenting: Date
  clientId: string
  clientName: string
  endRenting: Date
  movie: {
    Title: string
    Year: string
    imdbID: string
    Poster: string
  }
  status: boolean
}
