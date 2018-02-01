import axios from 'axios'

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

// 获取我的积分中总积分和排名以及积分构成图的接口(注意时间传的是秒)
export function getPersonalTotalScore(startTime, endTime) {
  const url = '/ebook/countInfo/selectPresonalScoreCountInfo'
  const data = {
    startTime: startTime,
    endTime: endTime
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取阅读积分详情的接口
export function getPersonalReadScore(startTime, endTime) {
  const url = '/ebook/countInfo/selectPresonalReadScoreCountInfo'
  const data = {
    startTime: startTime,
    endTime: endTime
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取职位绩效积分详情的接口
export function getPersonalPositionScore(startTime, endTime) {
  const url = '/ebook/countInfo/selectPresonalJixiaoScoreCountInfo'
  const data = {
    startTime: startTime,
    endTime: endTime
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取考试积分详情接口
export function getPersonalTestScore(startTime, endTime) {
  const url = '/ebook/countInfo/selectPresonalKaoshiScoreCountInfo'
  const data = {
    startTime: startTime,
    endTime: endTime
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
