import LoginViewVue from '@/views/LoginView.vue'
import MainView from '@/views/MainView.vue'
import NotFoundView from '@/views/404View.vue'


import RegisterVehicle from '@/views/Vehicle/RegisterVehicle.vue'
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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: MainView
    },
    {
      path: '/vehicle/register',
      name: 'RegistrarVehiculo',
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

export default router
