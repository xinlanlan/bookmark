import axios from 'axios'
import md5 from 'md5'

// 登陆接口
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

// 退出登陆接口
export function logout() {
  const url = '/ebook/logout'

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取昵称接口
export function getNickname() {
  const url = '/ebook/user/getNeckName'

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
