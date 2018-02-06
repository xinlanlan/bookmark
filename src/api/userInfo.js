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

// 修改密码接口
export function updatePsd(psd, newPsd) {
  const url = '/ebook/updatePassword'
  const data = {
    oldPassword: psd,
    newPassword: newPsd
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

// 更新昵称接口
export function updateNickname(nickname) {
  const url = '/ebook/user/updateNickName'
  const data = {
    nickName: nickname
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 统计用户页面停留时长的接口
export function sendTime() {
  const url = '/ebook/countInfo/insertCountInfo'
  const data = {
    countInfo: 1,
    remark: '智能阅读时长',
    countDetail: '0001000002',
    type: 0
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
