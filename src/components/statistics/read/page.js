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
