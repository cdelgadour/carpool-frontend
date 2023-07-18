import LoginViewVue from '@/views/LoginView.vue'
import MainView from '@/views/MainView.vue'
import NotFoundView from '@/views/404View.vue'

import Trips from '@/views/Trips/Trips.vue'
import TripDetailRoute from '@/views/TripDetailRoute.vue'

import DriverPayments from '@/views/Payments/DriverPayments.vue'

import RegisterVehicle from '@/views/Vehicle/RegisterVehicle.vue'
import ListVehicles from '@/views/Vehicle/ListVehicles.vue'

import UserRates from '@/views/Rates/UserRates.vue'
import { createRouter, createWebHistory } from 'vue-router'

import ProfileView from '@/views/ProfileView.vue'
import DriverRequestList from '@/views/Drivers/admin/DriverRequestList.vue'
import DriverRequestDetail from '@/views/Drivers/admin/DriverRequestDetail.vue'
import DriverCreateRoute from '@/views/DriverCreateRoute.vue'
import DriverDetailRoute from '@/views/DriverDetailRoute.vue'
import DriverRouteList from '@/views/DriverRouteList.vue'
import SearchRouteList from '@/views/SearchRouteList.vue'
import UserActiveTrip from '@/views/UserActiveTrip.vue'
import DriverActiveTrip from '@/views/DriverActiveTrip.vue'
import UserFinishedTrip from '@/views/UserFinishedTrip.vue'
import CreateReview from '@/views/CreateReview.vue'
import store from '@/store'

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
      path: '/trips',
      name: 'Trips',
      meta: {
        requiresAuth: true
      },
      component: Trips
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
        requiresAuth: true,
        requiredAdmin: true
      },
      component: DriverRequestDetail
    },
    {
      path: '/admin/driver-request',
      name: 'DriverRequests',
      meta: {
        requiresAuth: true,
        requiredAdmin: true
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
      path: '/create-rate',
      name: 'CreateReview',
      meta: {
        requiresAuth: true
      },
      component: CreateReview
    },
    {
      path: '/driver/create',
      name: 'DriverCreateRoute',
      meta: {
        requiresAuth: true
      },
      component: DriverCreateRoute
    },
    {
      path: '/driver/routes/:id',
      name: 'DriverDetailRoute',
      meta: {
        requiresAuth: true
      },
      component: DriverDetailRoute
    },
    {
      path: '/trips/:id',
      name: 'TripDetailRoute',
      meta: {
        requiresAuth: true
      },
      component: TripDetailRoute
    },
    {
      path: '/driver/routes',
      name: 'DriverRouteList',
      meta: {
        requiresAuth: true
      },
      component: DriverRouteList
    },
    {
      path: '/search/routes',
      name: 'SearchRouteList',
      meta: {
        requiresAuth: true
      },
      component: SearchRouteList
    },
    {
      path: '/passenger/search',
      name: 'PassengerSeachRoute',
      meta: {
        requiresAuth: true
      },
      component: DriverCreateRoute
    },
    {
      path: '/active-trip/:id',
      name: 'UserActiveTrip',
      meta: {
        requiresAuth: true
      },
      component: UserActiveTrip
    },
    {
      path: '/driver/active-trip/:id',
      name: 'DriverActiveTrip',
      meta: {
        requiresAuth: true
      },
      component: DriverActiveTrip
    },
    {
      path: '/finished-trip/',
      name: 'UserFinishedTrip',
      meta: {
        requiresAuth: true
      },
      component: UserFinishedTrip
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

  if (isAuthenticated && Object.keys(store.state.user).length == 0) {
    store.dispatch('getUserData');
  }

  if (to.meta.requiredAdmin && !store.state.user.is_admin) {
    return { name: 'MainView' }
  }
  
})

export default router
