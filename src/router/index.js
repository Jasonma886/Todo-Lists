import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import HelloWorld from '@/components/HelloWorld'
import Guide from '@/components/guide'
import Home from '@/components/index'
import Writing from '@/components/writing'
import Dairy from '@/components/dairy'
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
      path: '/guide',
      name: 'guide',
      component: Guide,
      meta: {unAuth: true}
    },
    {
      path: '/hello',
      name: 'hello',
      component: HelloWorld
    },
    {
      path: '/writing',
      name: 'writing',
      component: Writing
    },
    {
      path: '/dairy/:value',
      name: 'dairy',
      component: Dairy
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (store.state.isSignIn) {
    if (to.name === 'guide') {
      router.push('/')
    } else {
      next()
    }
  } else if (to.meta.unAuth) {
    next()
  } else {
    router.push('/guide')
  }
})

export default router
