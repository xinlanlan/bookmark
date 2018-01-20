import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 登录页面
const Login = (resolve) => {
  import('components/login/login').then((module) => {
    resolve(module)
  })
}

// 主页
const Homepage = (resolve) => {
  import('components/homepage/homepage').then((module) => {
    resolve(module)
  })
}

// 个人中心
const Personal = (resolve) => {
  import('components/personal/personal').then((module) => {
    resolve(module)
  })
}

// 统计管理
const Statistics = (resolve) => {
  import('components/statistics/statistics').then((module) => {
    resolve(module)
  })
}

// 统计管理的阅读子组件
const StatisticsRead = (resolve) => {
  import('components/statistics/read/read').then((module) => {
    resolve(module)
  })
}

// 统计管理的考试子组件
const StatisticsTest = (resolve) => {
  import('components/statistics/test/test').then((module) => {
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
    },
    {
      path: '/statistics',
      component: Statistics,
      redirect: '/statistics/read',
      children: [
        {
          path: '/statistics/read',
          component: StatisticsRead
        },
        {
          path: '/statistics/test',
          component: StatisticsTest
        }
      ]
    }
  ]
})
