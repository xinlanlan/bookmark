import axios from 'axios'

// 从书中获取所有词的接口
export function getAllWord(params) {
  const url = '/ebook/wordStore/selectAllWord'

  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 查询该书中总共有多少词的接口
export function getWordCount(uri) {
  const url = '/ebook/wordStore/selectWordCount'
  const data = {
    bookUriList: uri
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
