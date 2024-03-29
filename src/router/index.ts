import { createRouter, createWebHistory } from 'vue-router'
import { exists } from '@/utils/storage-utils'
import { ROUTES } from '@/consts/route-utils'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: ROUTES.HOME,
      redirect: () => {
        return { path: '/movies' }
      }
    },
    {
      path: '/register',
      name: 'register',
      meta: { requiresAuth: false },
      component: () => import('../pages/RegisterView.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: { requiresAuth: false },
      component: () => import('../pages/LoginView.vue')
    },
    {
      path: '/users',
      name: ROUTES.USERS,
      meta: { requiresAuth: true },
      component: () => import('../pages/UsersView.vue')
    },
    {
      path: '/movies-renting',
      name: ROUTES.MOVIES_RENTING,
      meta: { requiresAuth: true },
      component: () => import('../pages/MovieRentingView.vue')
    },
    {
      path: '/movies-renting-list',
      name: ROUTES.MOVIES_RENTING_LIST,
      meta: { requiresAuth: true },
      component: () => import('../pages/MovieRentingListView.vue')
    },
    {
      path: '/movies',
      name: ROUTES.MOVIES,
      meta: { requiresAuth: true },
      component: () => import('../pages/MoviesListView.vue')
    },
    {
      path: '/clients',
      name: ROUTES.CLIENTS,
      meta: { requiresAuth: true },
      component: () => import('../pages/ClientsListView.vue')
    },
    {
      path: '/edit-client/:id',
      name: ROUTES.EDIT_CLIENT,
      meta: { requiresAuth: true },
      component: () => import('../pages/EditClientView.vue')
    },
    {
      path: '/register-client',
      name: ROUTES.REGISTER_CLIENT,
      meta: { requiresAuth: true },
      component: () => import('../pages/RegisterClientView.vue')
    },
    {
      path: '/edit-user/:id',
      name: ROUTES.EDIT_USER,
      meta: { requiresAuth: true },
      component: () => import('../pages/EditUserView.vue')
    }
  ]
})

router.beforeEach((to) => {
  const isAuthenticated = exists('actualUser')
  if (to.meta.requiresAuth && !isAuthenticated) {
    return {
      path: '/login',

      query: { redirect: to.fullPath }
    }
  }
})

export default router
