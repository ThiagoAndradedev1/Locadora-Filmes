<template>
  <div class="min-h-screen flex flex-col items-center justify-center font-mono">
    <h1 class="text-3xl font-bold mb-4">Registrar</h1>
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
              >CPF</label
            >

            <input
              v-model="document"
              v-bind="documentAttrs"
              id="document"
              type="text"
              name="document"
              class="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
              placeholder="Informe o CPF"
            />
            <div class="text-red-400 text-sm">{{ errors.document }}</div>
          </div>

          <div class="flex flex-col mb-6">
            <label for="password" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
              >Senha</label
            >

            <input
              v-model="password"
              v-bind="passwordAttrs"
              id="password"
              type="password"
              name="password"
              class="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
              placeholder="Informe a senha"
            />
            <div class="text-red-400 text-sm">{{ errors.password }}</div>
          </div>
          <div class="text-center mb-4">
            <span
              @click="redirectToLogin"
              class="text-blue-500 text-center font-bold hover:underline cursor-pointer"
              >Já tem uma conta? Faça o login!</span
            >
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
import type { User } from '@/data/models/User.model'
import { useRouter } from 'vue-router'
import { ROUTES } from '@/utils/route-utils'

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: toTypedSchema(
    object({
      name: string()
        .min(4, 'O nome deve ter pelo menos 4 caracteres')
        .required('O campo nome é obrigatório'),
      password: string()
        .min(4, 'A senha deve ter pelo menos 4 caracteres')
        .required('O campo password é obrigatório'),
      document: string()
        .min(11, 'O CPF deve ter 11 digitos')
        .max(11, 'O CPF deve ter 11 digitos')
        .required('O campo CPF é obrigatório')
    })
  )
})

const [name, nameAttrs] = defineField('name')
const [password, passwordAttrs] = defineField('password')
const [document, documentAttrs] = defineField('document')

const router = useRouter()

const onSubmit = handleSubmit(({ name, password, document }) => {
  const newUser: User = {
    id: Math.floor(Math.random() * 10000).toString(),
    name,
    document,
    password,
    status: true
  }

  const usersStorage = localStorage.getItem('users')

  let actualUsers: User[] = usersStorage ? (JSON.parse(usersStorage) as User[]) : []
  const userAlreadyExists = actualUsers.find((usuario) => usuario.document === newUser.document)

  if (userAlreadyExists) {
    alert('Este usuário já está cadastrado!')
    return
  }

  actualUsers = [...actualUsers, newUser]
  localStorage.setItem('users', JSON.stringify(actualUsers))
  localStorage.setItem('actualUser', newUser.document)
  router.push('/movies')
})

const redirectToLogin = (): void => {
  router.push(ROUTES.LOGIN)
}
</script>

<style scoped></style>
