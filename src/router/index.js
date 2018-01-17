import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Login = (resolve) => {
  import('components/login/login').then((module) => {
    resolve(module)
  })
}

const Homepage = (resolve) => {
  import('components/homepage/homepage').then((module) => {
    resolve(module)
  })
}

const Personal = (resolve) => {
  import('components/personal/personal').then((module) => {
    resolve(module)
  })
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/homepage',
      component: Homepage
    },
    {
      path: '/personal',
      component: Personal
    }
  ]
})
