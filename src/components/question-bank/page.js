import axios from 'axios'

export function getQuestionList(uri) {
  const url = '/ebook/questionnaire/insertQuestFromA'
  const data = {
    num: 100,
    uri: uri
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
