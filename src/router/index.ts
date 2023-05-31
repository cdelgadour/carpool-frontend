import LoginViewVue from '@/views/LoginView.vue'
import MainView from '@/views/MainView.vue'
import NotFoundView from '@/views/404View.vue'


import DriverPayments from '@/views/Payments/DriverPayments.vue'

import RegisterVehicle from '@/views/Vehicle/RegisterVehicle.vue'
import ListVehicles from '@/views/Vehicle/ListVehicles.vue'

import UserRates from '@/views/Rates/UserRates.vue'
import { createRouter, createWebHistory } from 'vue-router'

import ProfileView from '@/views/ProfileView.vue'
import DriverRequestList from '@/views/Drivers/admin/DriverRequestList.vue'
import DriverRequestDetail from '@/views/Drivers/admin/DriverRequestDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginViewVue
    },
    {
      path: '/main',
      name: 'MainView',
      meta: {
        requiresAuth: true
      },
      component: MainView
    },
    {
      path: '/vehicle/',
      name: 'Vehicles',
      meta: {
        requiresAuth: true
      },
      component: ListVehicles
    },
    {
      path: '/vehicle/register/:vehicleId?',
      name: 'RegisterVehicle',
      meta: {
        requiresAuth: true
      },
      component: RegisterVehicle
    },
    {
      path: '/profile',
      name: 'Profile',
      meta: {
        requiresAuth: true
      },
      component: ProfileView
    },
    {
      path: '/payments',
      name: 'DriverPayments',
      meta: {
        requiresAuth: true
      },
      component: DriverPayments
    },
    {
      path: '/admin/driver-request/:id',
      name: 'DriverRequestDetail',
      meta: {
        requiresAuth: true
      },
      component: DriverRequestDetail
    },
    {
      path: '/admin/driver-request',
      name: 'DriverRequests',
      meta: {
        requiresAuth: true
      },
      component: DriverRequestList
    },
    {
      path: '/rates',
      name: 'UserRates',
      meta: {
        requiresAuth: true
      },
      component: UserRates
    },
    {
      path: '/:catchAll(.*)',
      name: '404',
      component: NotFoundView
    },
  ]
})

router.beforeEach((to, from) => {
  const isAuthenticated = localStorage.getItem('accessToken');
  if (to.meta.requiresAuth && !isAuthenticated) return { name: 'Login' }
})

export default router
