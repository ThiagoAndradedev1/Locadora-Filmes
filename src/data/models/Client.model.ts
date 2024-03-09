export interface Client {
  id: number
  nome: string
  sobrenome: string
  cpf: string
  contatos: {
    email: string
    celular: string
  }
  endereco: {
    logradouro: string
    bairro: string
    cidade: string
    uf: string
  }
  cep: string
  status: boolean
  isAlocated: boolean
}
