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
