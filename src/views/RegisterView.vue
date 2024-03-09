<template>
  <div>
    <div class="max-w-2xl m-auto bg-gray-50 p-20">
      <form @submit="onSubmit">
        <div>
          <div>
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Nome</label
            >
            <input
              v-model="name"
              v-bind="nameAttrs"
              type="text"
              id="name"
              class="w-full h-12 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
              placeholder="Informe seu nome"
              required
            />
          </div>
          <div class="text-red-600 text-sm">{{ errors.name }}</div>
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

        <button
          class="w-full mt-4 h-12 px-6 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
        >
          Registrar
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
    name: yup.string().required(),
    password: yup.string().min(1).required(),
    document: yup.string().min(1).required()
  })
})

const onSubmit = handleSubmit((values): void => {
  const newUser: User = {
    id: Math.floor(Math.random() * 10000).toString(),
    name: values.name,
    document: values.document,
    password: values.password,
    status: true
  }

  const usersStorage = localStorage.getItem('users')

  let actualUsers: User[] = usersStorage ? (JSON.parse(usersStorage) as User[]) : []
  const userAlreadyExists = actualUsers.find((usuario) => usuario.document === newUser.document)

  if (userAlreadyExists) {
    alert('Este nome de usuário já está em uso. Por favor, escolha outro.')
    return
  }

  actualUsers = [...actualUsers, newUser]
  localStorage.setItem('users', JSON.stringify(actualUsers))
  localStorage.setItem('actualUser', newUser.document)
})

const [name, nameAttrs] = defineField('name')
const [password, passwordAttrs] = defineField('password')
const [document, documentAttrs] = defineField('document')
</script>

<style scoped></style>
