import Vue from 'vue'
import VueRouter from 'vue-router'
import vc from 'vue-cookie'

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
    path: '/protocol',
    name: 'protocol',
    component: () => import('../views/login/protocol.vue')
  },
  {
    path: '/terms',
    name: 'terms',
    component: () => import('../views/login/terms.vue')
  },
  {
    path: '/certification',
    name: 'certification',
    component: () => import('../views/login/certification.vue')
  },
  {
    path: '/authing',
    name: 'authing',
    component: () => import('../views/home/authing.vue')
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
    path: '/startContract',
    name: 'startContract',
    component: () => import('../views/contract/startContract.vue')
  },
  {
    path: '/sendContract',
    name: 'sendContract',
    component: () => import('../views/contract/sendContract.vue')
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
  {
    path: '/editContract',
    name: 'editContract',
    component: () => import('../views/contract/editContract.vue')
  },
  {
    path: '/myTemplate',
    name: 'myTemplate',
    component: () => import('../views/myTemplate/index.vue')
  },
  {
    path: '/lookTemplate',
    name: 'lookTemplate',
    component: () => import('../views/myTemplate/lookTemplate.vue')
  },
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/' || to.path === '/register' || to.path === '/forget' || to.path === '/verified' || to.path === '/verified_status' ||  to.path === '/authing' || to.path === '/protocol' ||  to.path === '/terms') {
    next();
  } else {
    let userInfo = vc.get('userInfo')
    if (userInfo === null || userInfo === '') {
      next('/');
    } else {
      next();
    }
  }
});

export default router
