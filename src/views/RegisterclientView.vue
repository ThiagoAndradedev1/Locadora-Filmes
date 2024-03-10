<template>
  <div class="min-h-screen flex flex-col items-center justify-center font-mono mt-10 mb-10">
    <h1 class="text-3xl font-bold mb-4">Registrar Cliente</h1>
    <div
      class="flex flex-col bg-white shadow-lg px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md"
    >
      <div class="mt-10">
        <form @submit="onSubmit" novalidate>
          <div class="flex flex-col mb-6">
            <label for="name" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
              >Nome</label
            >

            <input
              v-model="name"
              v-bind="nameAttrs"
              id="name"
              type="text"
              name="name"
              class="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
              placeholder="Informe o nome"
            />
            <div class="text-red-400 text-sm">{{ errors.name }}</div>
          </div>
          <div class="flex flex-col mb-6">
            <label for="document" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
              >Sobrenome</label
            >

            <input
              v-model="surname"
              v-bind="surnameAttrs"
              id="surname"
              type="text"
              name="surname"
              class="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
              placeholder="Informe o Sobrenome"
            />
            <div class="text-red-400 text-sm">{{ errors.surname }}</div>
          </div>

          <div class="flex flex-col mb-6">
            <label for="password" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
              >CPF</label
            >

            <input
              v-model="cpf"
              v-bind="cpfAttrs"
              id="cpf"
              type="text"
              maxlength="14"
              name="cpf"
              class="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
              placeholder="Informe o CPF"
            />
            <div class="text-red-400 text-sm">{{ errors.cpf }}</div>
          </div>

          <div class="flex flex-col mb-6">
            <label for="password" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
              >Email</label
            >

            <input
              v-model="email"
              v-bind="emailAttrs"
              id="email"
              type="text"
              name="email"
              class="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
              placeholder="Informe o Email"
            />
            <div class="text-red-400 text-sm">{{ errors.email }}</div>
          </div>

          <div class="flex flex-col mb-6">
            <label for="password" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
              >Celular</label
            >

            <input
              v-model="cellphone"
              v-bind="cellphoneAttrs"
              maxlength="15"
              id="cellphone"
              type="text"
              name="cellphone"
              class="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
              placeholder="Informe o Celular"
            />
            <div class="text-red-400 text-sm">{{ errors.cellphone }}</div>
          </div>

          <div class="flex flex-col mb-6">
            <label for="password" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
              >CEP</label
            >

            <input
              v-model="cep"
              v-bind="cepAttrs"
              maxlength="9"
              @input="findAddress"
              id="cep"
              type="text"
              name="cep"
              class="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
              placeholder="Informe o CEP"
            />
            <div class="text-red-400 text-sm">{{ errors.cep }}</div>
          </div>
          <div class="flex flex-col mb-6">
            <label for="password" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
              >Logradouro</label
            >

            <input
              v-model="logradouro"
              v-bind="logradouroAttrs"
              :disabled="true"
              id="logradouro"
              type="text"
              name="logradouro"
              class="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
              placeholder="Informe o Logradouro"
            />
            <div class="text-red-400 text-sm">{{ errors.logradouro }}</div>
          </div>
          <div class="flex flex-col mb-6">
            <label for="password" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
              >Bairro</label
            >

            <input
              v-model="bairro"
              v-bind="bairroAttrs"
              :disabled="true"
              id="bairro"
              type="text"
              name="bairro"
              class="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
              placeholder="Informe o Bairro"
            />
            <div class="text-red-400 text-sm">{{ errors.bairro }}</div>
          </div>
          <div class="flex flex-col mb-6">
            <label for="password" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
              >Cidade</label
            >

            <input
              v-model="cidade"
              inva
              v-bind="cidadeAttrs"
              :disabled="true"
              id="cidade"
              type="text"
              name="cidade"
              class="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
              placeholder="Informe a Cidade"
            />
            <div class="text-red-400 text-sm">{{ errors.cidade }}</div>
          </div>
          <div class="flex flex-col mb-6">
            <label for="password" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
              >UF</label
            >

            <input
              v-model="uf"
              v-bind="ufAttrs"
              :disabled="true"
              id="uf"
              type="text"
              name="uf"
              class="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
              placeholder="Informe o UF"
            />
            <div class="text-red-400 text-sm">{{ errors.uf }}</div>
          </div>
          <div class="flex w-full">
            <button
              class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
            >
              <span class="mr-2 uppercase">Registrar!</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { object, string } from 'yup'
import { toTypedSchema } from '@vee-validate/yup'
import { watch } from 'vue'
import type { Client } from '@/data/models/Client.model'
import { push } from 'notivue'

const { handleSubmit, defineField, errors, setValues } = useForm({
  validationSchema: toTypedSchema(
    object({
      name: string()
        .min(4, 'O nome deve ter pelo menos 4 caracteres')
        .required('O campo nome é obrigatório'),
      surname: string()
        .min(4, 'A senha deve ter pelo menos 4 caracteres')
        .required('O campo sobrenome é obrigatório'),
      cpf: string()
        .matches(
          /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
          'O CPF deve estar no formato correto (XXX.XXX.XXX-XX)'
        )
        .required('O campo CPF é obrigatório'),
      email: string()
        .email('O email deve estar em um formato válido')
        .required('O campo email é obrigatório'),
      cellphone: string()
        .matches(
          /^\(\d{2}\) \d{5}-\d{4}$/,
          'O número de celular deve estar no formato correto (XX) XXXXX-XXXX'
        )
        .required('O campo número de celular é obrigatório'),
      cep: string()
        .matches(/^\d{5}-\d{3}$/, 'O CEP deve estar no formato correto (XXXXX-XXX)')
        .required('O campo CEP é obrigatório'),
      logradouro: string()
        .min(4, 'O logradouro deve ter pelo menos 4 caracteres')
        .required('O campo logradouro é obrigatório'),
      bairro: string()
        .min(4, 'O bairro deve ter pelo menos 4 caracteres')
        .required('O campo bairro é obrigatório'),
      cidade: string()
        .min(4, 'A cidade deve ter pelo menos 4 caracteres')
        .required('O campo cidade é obrigatório'),
      uf: string()
        .min(1, 'O UF deve ter pelo menos 1 caracter')
        .required('O campo uf é obrigatório')
    })
  )
})

const [name, nameAttrs] = defineField('name')
const [surname, surnameAttrs] = defineField('surname')
const [cpf, cpfAttrs] = defineField('cpf')
const [email, emailAttrs] = defineField('email')
const [cellphone, cellphoneAttrs] = defineField('cellphone')
const [cep, cepAttrs] = defineField('cep')
const [logradouro, logradouroAttrs] = defineField('logradouro')
const [bairro, bairroAttrs] = defineField('bairro')
const [cidade, cidadeAttrs] = defineField('cidade')
const [uf, ufAttrs] = defineField('uf')

const findAddress = async () => {
  if (cep.value?.length === 9) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep.value}/json`)
      const data = await response.json()
      if (!data.erro) {
        setValues({
          logradouro: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          uf: data.uf
        })
      }
    } catch (error) {
      console.error('Erro ao buscar endereço:', error)
    }
  }
}

const onSubmit = handleSubmit(
  async ({ name, surname, cpf, email, cellphone, cep, logradouro, bairro, cidade, uf }) => {
    const newClient: Client = {
      id: Math.floor(Math.random() * 10000),
      nome: name,
      sobrenome: surname,
      cpf,
      contatos: {
        email,
        celular: cellphone
      },
      endereco: {
        logradouro,
        bairro,
        cidade,
        uf
      },
      cep,
      status: true,
      isAlocated: false
    }

    const clientsStorage = localStorage.getItem('clients')
    let currentClients: Client[] = clientsStorage ? (JSON.parse(clientsStorage) as Client[]) : []

    const clientAlreadyExists = currentClients.find((client) => client.cpf === newClient.cpf)

    if (clientAlreadyExists) {
      push.error('Este cliente já esta cadastrado!')
      return
    }

    currentClients = [...currentClients, newClient]

    localStorage.setItem('clients', JSON.stringify(currentClients))

    push.success('Cliente registrado com sucesso!')
  }
)

watch(
  () => cep,
  () => findAddress()
)

watch(cpf, () => {
  if (cpf.value) {
    const cleanedCPF = cpf.value.replace(/\D/g, '')
    cpf.value = cleanedCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }
})

watch(email, () => {
  if (email.value) {
    email.value = email.value.trim()
  }
})

watch(cellphone, () => {
  if (cellphone.value) {
    const cleanedCellphone = cellphone.value.replace(/\D/g, '')
    cellphone.value = cleanedCellphone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }
})

watch(cep, () => {
  if (cep.value) {
    const cleanedCEP = cep.value.replace(/\D/g, '')
    cep.value = cleanedCEP.replace(/(\d{5})(\d{3})/, '$1-$2')
  }
})
</script>

<style scoped></style>
