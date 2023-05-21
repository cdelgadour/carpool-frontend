import LoginViewVue from '@/views/LoginView.vue'
import MainView from '@/views/MainView.vue'
import NotFoundView from '@/views/404View.vue'


import RegisterVehicle from '@/views/Vehicle/RegisterVehicle.vue'
import ListVehicles from '@/views/Vehicle/ListVehicles.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: LoginViewVue
    },
    {
      path: '/main',
      name: 'MainView',
      meta: {
        requiresAuth: true
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: MainView
    },
    {
      path: '/vehicle/',
      name: 'Vehicles',
      meta: {
        requiresAuth: true
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: ListVehicles
    },
    {
      path: '/vehicle/register',
      name: 'RegisterVehicle',
      meta: {
        requiresAuth: true
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: RegisterVehicle
    },
    {
      path: '/:catchAll(.*)',
      name: '404',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: NotFoundView
    },
  ]
})

router.beforeEach((to, from) => {
  const isAuthenticated = localStorage.getItem('accessToken');
  if (to.meta.requiresAuth && !isAuthenticated) return { name: 'Login' }
})

export default router
