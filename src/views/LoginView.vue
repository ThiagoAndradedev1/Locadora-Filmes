<template>
  <div>
    <div class="max-w-2xl m-auto bg-gray-50 p-20">
      <form @submit="onSubmit">
        <div>
          <div>
            <label
              for="document"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 mt-4"
              >Documento</label
            >
            <input
              v-model="document"
              v-bind="documentAttrs"
              type="text"
              id="document"
              class="w-full h-12 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
              placeholder="Informe seu documento"
              required
            />
            <div class="text-red-600 text-sm">{{ errors.document }}</div>
          </div>
        </div>

        <div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 mt-4"
              >Senha</label
            >
            <input
              v-model="password"
              v-bind="passwordAttrs"
              type="password"
              id="password"
              class="w-full h-12 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
              placeholder="Informe sua senha"
              required
            />
            <div class="text-red-600 text-sm">{{ errors.password }}</div>
          </div>
        </div>

        <button
          class="w-full mt-4 h-12 px-6 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/data/models/User.model'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    document: yup.string().min(1).required(),
    password: yup.string().min(1).required()
  })
})

const [document, documentAttrs] = defineField('document')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit((values): void => {
  const documentInputValue = String(values.document)
  const passwordInputValue = String(values.password)

  const usersStorage = localStorage.getItem('users')

  let actualUsers: User[] = usersStorage ? (JSON.parse(usersStorage) as User[]) : []

  const user = actualUsers.find(
    (usuario) => usuario.document === documentInputValue && usuario.password === passwordInputValue
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
