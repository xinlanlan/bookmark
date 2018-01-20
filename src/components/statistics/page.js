import axios from 'axios'
import {getDayStr} from 'common/js/dom'

// 获取最近7天的日期
export function getWeekDayStr() {
  let arr = []
  for (let i = -6; i <= 0; i++) {
    arr.push(getDayStr(i))
  }
  return arr
}

// 获取阅读次数统计图接口
export function getReadNum() {
  const url = '/ebook/countInfo/selectReadTimes'

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取阅读时长的接口
export function getReadTime() {
  const url = '/ebook/countInfo/selectReadTime'

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取考试时长和考试次数的接口
export function getTotalTest() {
  const url = '/ebook/countInfo/selectTestInfo'

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 仿真测试统计接口
export function getRealTest() {
  const url = '/ebook/countInfo/selectPresonalFangzhenCountInfo'

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取最近一周考试时长图
export function getTestTime() {
  const url = '/ebook/countInfo/selectScoreTime'

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
