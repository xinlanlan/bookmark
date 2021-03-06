import axios from 'axios'

// 获取智能阅读的句子
export function getKeySentences(params) {
  const url = '/ebook/book/getKeySentences'
  const data = params

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 根据句子的uri获取句子
export function getSentenceByUri(uri) {
  const url = '/ebook/book/getSentenceByUri'
  const data = {
    uri: uri
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取上十句的接口
export function getLastSentence(uri) {
  const url = '/ebook/book/getPreNearbySentences'
  const data = {
    uri: uri
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取下十句的接口
export function getNextSentence(uri) {
  const url = '/ebook/book/getAftNearbySentences'
  const data = {
    uri: uri
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 图表阅读获取重点图片
export function getImportImg(params) {
  const url = '/ebook/book/getPicture'
  const data = params

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
