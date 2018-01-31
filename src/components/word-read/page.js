import axios from 'axios'

export function getAllWord(params) {
  const url = '/ebook/wordStore/selectAllWord'

  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
