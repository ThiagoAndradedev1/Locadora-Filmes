<template>
  <div class="min-h-screen flex flex-col items-center justify-center font-mono">
    <h1 class="text-3xl font-bold mb-4">Login</h1>
    <div
      class="flex flex-col bg-white shadow-lg px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md"
    >
      <div class="mt-10">
        <form @submit="onSubmit" novalidate>
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
          <div class="flex w-full">
            <button
              class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
            >
              <span class="mr-2 uppercase">Logar!</span>
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

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: toTypedSchema(
    object({
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

const [password, passwordAttrs] = defineField('password')
const [document, documentAttrs] = defineField('document')

const onSubmit = handleSubmit(({ password, document }) => {
  const usersStorage = localStorage.getItem('users')

  let actualUsers: User[] = usersStorage ? (JSON.parse(usersStorage) as User[]) : []

  const user = actualUsers.find(
    (usuario) => usuario.document === document && usuario.password === password
  )

  if (user?.status === false) {
    alert('Usuario inativo')
    return
  }

  if (user) {
    localStorage.setItem('actualUser', user.document)
  } else {
    alert('Nome de usuário ou senha incorretos.')
  }
})
</script>

<style scoped></style>
