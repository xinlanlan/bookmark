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

// 公共书架页面
const Bookrack = (resolve) => {
  import('components/bookrack/bookrack').then((module) => {
    resolve(module)
  })
}

// 智能阅读主页
const SmartReadDoor = (resolve) => {
  import('components/smart-read/smart-read-door').then((module) => {
    resolve(module)
  })
}

// 智能阅读的阅读页面
const SmartReadPage = (resolve) => {
  import('components/smart-read/smart-read-page').then((module) => {
    resolve(module)
  })
}

// 全书阅读页面
const PdfRead = (resolve) => {
  import('components/pdf/pdf').then((module) => {
    resolve(module)
  })
}

// 词库阅读词页面
const WordReadDoor = (resolve) => {
  import('components/word-read/word-read-door').then((module) => {
    resolve(module)
  })
}

// 词库阅读阅读页面
const WordRead = (resolve) => {
  import('components/word-read/word-read').then((module) => {
    resolve(module)
  })
}

// 图表阅读页面
const ImgRead = (resolve) => {
  import('components/imgRead/imgRead').then((module) => {
    resolve(module)
  })
}

// 题库自测
const QuestionBank = (resolve) => {
  import('components/question-bank/question-bank').then((module) => {
    resolve(module)
  })
}

// 个人中心
const Personal = (resolve) => {
  import('components/personal/personal').then((module) => {
    resolve(module)
  })
}

// 我的积分
const MyCode = (resolve) => {
  import('components/my-code/my-code').then((module) => {
    resolve(module)
  })
}

// 我的学时
const MyPeriod = (resolve) => {
  import('components/my-period/my-period').then((module) => {
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

// 我的消息
const MyInfo = (resolve) => {
  import('components/my-info/my-info').then((module) => {
    resolve(module)
  })
}

// 乔布指数
const JobExponent = (resolve) => {
  import('components/job-exponent/job-exponent').then((module) => {
    resolve(module)
  })
}

// 修改密码
const UpdatePsd = (resolve) => {
  import('components/update-psd/update-psd').then((module) => {
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
      path: '/bookrack',
      component: Bookrack
    },
    {
      path: '/bookSearch',
      component: SmartReadDoor
    },
    {
      path: '/smartRead',
      component: SmartReadPage
    },
    {
      path: '/pdfRead',
      component: PdfRead
    },
    {
      path: '/wordReadDoor',
      component: WordReadDoor
    },
    {
      path: '/wordRead',
      component: WordRead
    },
    {
      path: '/imgRead',
      component: ImgRead
    },
    {
      path: '/questionBank',
      component: QuestionBank,
      beforeEnter: (to, from, next) => {
        let bookUri = to.fullPath.split('=')[1]
        if (bookUri) {
          next()
        } else {
          next({path: '/bookrack', query: {type: 2}})
        }
      }
    },
    {
      path: '/my-code',
      component: MyCode
    },
    {
      path: '/my-period',
      component: MyPeriod
    },
    {
      path: '/statistics',
      component: Statistics,
      redirect: '/statistics/read',
      children: [
        {
          path: 'read',
          component: StatisticsRead
        },
        {
          path: 'test',
          component: StatisticsTest
        }
      ]
    },
    {
      path: '/my-info',
      component: MyInfo
    },
    {
      path: '/job-exponent',
      component: JobExponent
    },
    {
      path: '/update-psd',
      component: UpdatePsd
    }
  ]
})
