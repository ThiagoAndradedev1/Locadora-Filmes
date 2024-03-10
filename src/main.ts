import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'notivue/notifications.css'
import 'notivue/animations.css'

import App from './App.vue'
import router from './router'
import { createNotivue } from 'notivue'

const notivue = createNotivue({ position: 'top-right' })
const app = createApp(App)

app.use(createPinia())
app.use(notivue)
app.use(router)

app.mount('#app')
