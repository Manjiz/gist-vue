import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    {
      name: 'index',
      path: '/index',
      component: Index
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
