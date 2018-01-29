import axios from 'axios'

// 已会不会，点赞不点赞的接口
export function updateEmpQuestion(data) {
  const url = '/ebook/questionnaire/saveorUpdateEmpQuestion'

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
