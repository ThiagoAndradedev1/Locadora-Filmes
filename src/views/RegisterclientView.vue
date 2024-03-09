<template>
  <div class="flex justify-center items-center h-full">
    <div class="w-full max-w-md">
      <h1 class="text-2xl mb-2 mt-6">Criar Cliente</h1>
      <form @submit.prevent="createCliente">
        <div class="mb-4">
          <label for="nome" class="block text-gray-700 font-bold mb-2">Nome:</label>
          <input
            v-model.trim="cliente.nome"
            type="text"
            id="nome"
            name="nome"
            class="form-input"
            required
          />
        </div>
        <div class="mb-4">
          <label for="sobrenome" class="block text-gray-700 font-bold mb-2">Sobrenome:</label>
          <input
            v-model.trim="cliente.sobrenome"
            type="text"
            id="sobrenome"
            name="sobrenome"
            class="form-input"
            required
          />
        </div>
        <div class="mb-4">
          <label for="cpf" class="block text-gray-700 font-bold mb-2">CPF:</label>
          <input
            v-model.trim="cliente.cpf"
            type="text"
            id="cpf"
            name="cpf"
            class="form-input"
            required
            maxlength="14"
            @input="formatCPF"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-bold mb-2">E-mail:</label>
          <input
            v-model.trim="cliente.contatos.email"
            type="email"
            id="email"
            name="email"
            class="form-input"
            required
          />
        </div>
        <div class="mb-4">
          <label for="celular" class="block text-gray-700 font-bold mb-2">Celular:</label>
          <input
            v-model.trim="cliente.contatos.celular"
            type="tel"
            id="celular"
            name="celular"
            class="form-input"
            @input="formatCellPhone"
            maxlength="15"
            required
          />
        </div>
        <div class="mb-4">
          <label for="cep" class="block text-gray-700 font-bold mb-2">CEP:</label>
          <input
            v-model.trim="cliente.cep"
            type="text"
            id="cep"
            name="cep"
            class="form-input"
            required
            @input="findAddress"
            maxlength="9"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2">Logradouro:</label>
          <input
            v-model.trim="cliente.endereco.logradouro"
            type="text"
            class="form-input"
            :disabled="!fullAddress"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2">Bairro:</label>
          <input
            v-model.trim="cliente.endereco.bairro"
            type="text"
            class="form-input"
            :disabled="!fullAddress"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2">Cidade:</label>
          <input
            v-model.trim="cliente.endereco.cidade"
            type="text"
            class="form-input"
            :disabled="!fullAddress"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2">UF:</label>
          <input
            v-model.trim="cliente.endereco.uf"
            type="text"
            class="form-input"
            :disabled="!fullAddress"
            required
          />
        </div>
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Criar Cliente
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Client } from '@/data/models/Client.model'
import { ref, watch } from 'vue'

const cliente = ref<Client>({
  id: 0,
  nome: '',
  sobrenome: '',
  cpf: '',
  contatos: {
    email: '',
    celular: ''
  },
  endereco: {
    logradouro: '',
    bairro: '',
    cidade: '',
    uf: ''
  },
  cep: '',
  status: false,
  isAlocated: false
})

const clientes = ref<Client[]>(JSON.parse(localStorage.getItem('clientes') || '[]'))

const fullAddress = ref(false)

const formValid = ref(false)

const createCliente = () => {
  clientes.value.push({ ...cliente.value, id: clientes.value.length + 1, cep: cliente.value.cep })

  localStorage.setItem('clientes', JSON.stringify(clientes.value))
}

const findAddress = async () => {
  if (cliente.value.cep.length === 8) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cliente.value.cep}/json`)
      const data = await response.json()
      if (!data.erro) {
        cliente.value.endereco.logradouro = data.logradouro
        cliente.value.endereco.bairro = data.bairro
        cliente.value.endereco.cidade = data.localidade
        cliente.value.endereco.uf = data.uf
        fullAddress.value = true
      } else {
        fullAddress.value = false
      }
    } catch (error) {
      console.error('Erro ao buscar endereço:', error)
      fullAddress.value = false
    }
  } else {
    fullAddress.value = false
  }
}

watch(
  () => cliente.value.cep,
  () => findAddress()
)

const formatCPF = () => {
  let cpf = cliente.value.cpf.replace(/\D/g, '')
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2')
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2')
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2')

  cliente.value.cpf = cpf
}

const formatCellPhone = () => {
  let celular = cliente.value.contatos.celular.replace(/\D/g, '')

  celular = celular.replace(/^(\d{2})(\d)/g, '($1) $2')
  celular = celular.replace(/(\d{5})(\d)/, '$1-$2')

  cliente.value.contatos.celular = celular
}

watch(
  () => cliente.value,
  () => {
    formValid.value = Object.values(cliente.value).every((value) => value !== '')
  }
)
</script>

<style scoped>
/* Estilos personalizados podem ser adicionados aqui */
</style>
