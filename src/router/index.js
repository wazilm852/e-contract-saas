import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/login/register.vue')
  },
  {
    path: '/forget',
    name: 'forget',
    component: () => import('../views/login/forget.vue')
  },
  {
    path: '/certification',
    name: 'certification',
    component: () => import('../views/login/certification.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/index.vue')
  },
  {
    path: '/contractAdmin',
    name: 'contractAdmin',
    component: () => import('../views/contractAdmin/index.vue')
  },
  {
    path: '/mailList',
    name: 'mailList',
    component: () => import('../views/mailList/index.vue')
  },
  {
    path: '/signAdmin',
    name: 'signAdmin',
    component: () => import('../views/signAdmin/index.vue')
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('../views/message/index.vue')
  },
  {
    path: '/startcontract',
    name: 'startcontract',
    component: () => import('../views/contract/startcontract.vue')
  },
  {
    path: '/signContract',
    name: 'signContract',
    component: () => import('../views/contract/signContract.vue')
  },
  {
    path: '/signDetails',
    name: 'signDetails',
    component: () => import('../views/contract/signDetails.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
