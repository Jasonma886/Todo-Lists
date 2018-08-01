import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login'
import Home from '@/components/index'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {unAuth: true}
    },
    {
      path: '/hello',
      name: 'hello',
      component: HelloWorld
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.unAuth || store.state.isSignIn) {
    next()
  } else {
    router.push('/login')
  }
})

export default router
