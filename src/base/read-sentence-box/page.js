import axios from 'axios'

export function markSentence(uri) {
  const url = '/ebook/book/mark'
  const data = {
    uri: uri,
    type: 0
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve((res.data))
  })
}
