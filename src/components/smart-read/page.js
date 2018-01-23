import axios from 'axios'

export function getSentenceNum(uri) {
  const url = '/ebook/book/getTotalScentenceNum'
  const data = {
    uri: uri
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
