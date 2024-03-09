<template>
  <form @submit="onSubmit">
    <input type="text" v-model="name" v-bind="nameAttrs" />
    <div>{{ errors.name }}</div>

    <input type="password" v-model="password" v-bind="passwordAttrs" />
    <div>{{ errors.password }}</div>

    <input type="text" v-model="document" v-bind="documentAttrs" />
    <div>{{ errors.document }}</div>

    <button>Submit</button>
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    name: yup.string().required(),
    password: yup.string().min(6).required(),
    document: yup.string().min(11).required()
  })
})

const onSubmit = handleSubmit((values): void => {
  alert(JSON.stringify(values, null, 2))
})

const [name, nameAttrs] = defineField('name')
const [password, passwordAttrs] = defineField('password')
const [document, documentAttrs] = defineField('document')
</script>

<style scoped></style>
