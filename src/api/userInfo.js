import axios from 'axios'
import md5 from 'md5'

/*
 * 登陆接口
 */
export function userLogin(username, pwd) {
  const url = '/ebook/validateUser'
  const data = {
    username: username,
    pwd: md5(pwd)
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
