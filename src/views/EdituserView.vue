<template>
  <div class="min-h-screen flex flex-col items-center justify-center font-mono">
    <h1 class="text-3xl font-bold mb-4">Editar Usuário</h1>
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

          <div class="flex flex-col mb-6">
            <label for="status" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
              >Status</label
            >

            <select
              id="status"
              v-model="status"
              v-bind="statusAttrs"
              name="status"
              class="text-sm sm:text-base placeholder-gray-500 bg-white pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
            >
              <option :value="true">Ativo</option>
              <option :value="false">Inativo</option>
            </select>
          </div>

          <div class="flex w-full">
            <button
              class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
            >
              <span class="mr-2 uppercase">Editar!</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { boolean, object, string } from 'yup'
import { toTypedSchema } from '@vee-validate/yup'
import type { User } from '@/data/models/User.model'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const { handleSubmit, defineField, errors, setValues } = useForm({
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
        .required('O campo CPF é obrigatório'),
      status: boolean().required()
    })
  )
})

const [name, nameAttrs] = defineField('name')
const [password, passwordAttrs] = defineField('password')
const [document, documentAttrs] = defineField('document')
const [status, statusAttrs] = defineField('status')

const router = useRouter()
const userId = ref<number>(0)

const retrieveUser = () => {
  const usuariosLocalStorage = JSON.parse(localStorage.getItem('users') || '[]')
  const foundUser = usuariosLocalStorage.find(
    (usuario: User) => usuario.id === userId.value.toString()
  ) as User
  if (foundUser) {
    setValues({
      document: foundUser.document,
      name: foundUser.name,
      password: foundUser.password,
      status: Boolean(foundUser.status)
    })
  }
}

onMounted(() => {
  userId.value = Number(router.currentRoute.value.params.id)
  retrieveUser()
})

const onSubmit = handleSubmit(({ name, password, document, status }) => {
  const usersStorage = localStorage.getItem('users')
  let actualUsers: User[] = usersStorage ? (JSON.parse(usersStorage) as User[]) : []

  let foundUserIndex = actualUsers.findIndex(
    (usuario: User) => usuario.id === userId.value.toString()
  )

  if (foundUserIndex !== -1) {
    const id = actualUsers[foundUserIndex].id
    const editedUser = { id, name, password, document, status }
    actualUsers.splice(foundUserIndex, 1, editedUser)
    localStorage.setItem('users', JSON.stringify(actualUsers))
  }
})
</script>

<style scoped></style>
