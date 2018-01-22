import axios from 'axios'

// 获取书的列表接口
export function getBookList() {
  const url = '/ebook/book/getBookByClass'
  const data = {
    type: 0
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
