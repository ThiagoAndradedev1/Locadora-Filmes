import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { requiresAuth: false },
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      meta: { requiresAuth: false },
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: { requiresAuth: false },
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/users',
      name: 'users',
      meta: { requiresAuth: true },
      component: () => import('../views/UsersView.vue')
    },
    {
      path: '/moviesRenting',
      name: 'moviesRenting',
      meta: { requiresAuth: true },
      component: () => import('../views/MovieRentingView.vue')
    },
    {
      path: '/moviesRentingList',
      name: 'moviesRentingList',
      meta: { requiresAuth: true },
      component: () => import('../views/MovieRentingListView.vue')
    },
    {
      path: '/movies',
      name: 'movies',
      meta: { requiresAuth: true },
      component: () => import('../views/MoviesListView.vue')
    },
    {
      path: '/clients',
      name: 'clients',
      meta: { requiresAuth: true },
      component: () => import('../views/ClientslistView.vue')
    },
    {
      path: '/editClient/:id',
      name: 'editClient',
      meta: { requiresAuth: true },
      component: () => import('../views/EditClientView.vue')
    },
    {
      path: '/registerClient',
      name: 'registerClient',
      meta: { requiresAuth: true },
      component: () => import('../views/RegisterclientView.vue')
    },
    {
      path: '/editUser/:id',
      name: 'editUser',
      meta: { requiresAuth: true },
      component: () => import('../views/EdituserView.vue')
    }
  ]
})

router.beforeEach((to) => {
  const isAuthenticated = localStorage.getItem('actualUser')
  if (to.meta.requiresAuth && !isAuthenticated) {
    return {
      path: '/login',

      query: { redirect: to.fullPath }
    }
  }
})

export default router
