import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/public/login/Login'),
    beforeEnter (to, from, next) {
      const { payload } = store.getters.getUser
      if (payload?.exp * 1000 > Date.now()) return next('/')
      return next()
    }
  },
  {
    name: 'home',
    path: '/',
    component: () => import('@/views/private/home/Home'),
    beforeEnter (to, from, next) {
      const { payload } = store.getters.getUser
      if (payload?.exp * 1000 > Date.now()) return next()
      return next('/login')
    }
  },
  {
    name: 'students',
    path: '/students',
    component: () => import('@/views/private/students/Students'),
    beforeEnter (to, from, next) {
      const { payload } = store.getters.getUser
      if (payload?.exp * 1000 > Date.now()) return next()
      return next('/login')
    }
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior () {
    document.getElementById('app').scrollIntoView({ behavior: 'smooth' })
  }
})

router.beforeEach((to, from, next) => {
  next()
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch((err) => err)
}

export default router
