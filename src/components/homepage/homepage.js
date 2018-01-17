import axios from 'axios'

/*
 * 获取一级菜单的接口
 */
export function getMenu(configId) {
  const url = '/ebook/departmentConfig/selectDepartmentConfig'
  const data = {
    configId: configId
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
