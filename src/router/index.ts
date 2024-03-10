import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UsersView.vue')
    },
    {
      path: '/clients',
      name: 'clients',
      component: () => import('../views/ClientslistView.vue')
    },
    {
      path: '/editClient/:id',
      name: 'editClient',
      component: () => import('../views/EditClientView.vue')
    },
    {
      path: '/registerClient',
      name: 'registerClient',
      component: () => import('../views/RegisterclientView.vue')
    },
    {
      path: '/editUser/:id',
      name: 'editUser',
      component: () => import('../views/EdituserView.vue')
    }
  ]
})

export default router
