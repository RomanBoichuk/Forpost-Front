import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/clients',
    name: 'Clients',
    component: () => import('../views/Clients.vue')
  },
  {
    path: '/creditContracts',
    name: 'CreditContracts',
    component: () => import('../views/CreditContracts.vue')
  },
  {
    path: '/clientAnketa',
    name: 'ClientAnketa',
    component: () => import('../components/Clients/CreateClientAnketa.vue')
  },
  {
    path: '/profileClient',
    name: 'ProfileClient',
    component: () => import('../views/ProfileClient.vue'),
    props: true
  },
  {
    path: '/каса',
    name: 'Cash',
    component: () => import('../views/Payments.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
