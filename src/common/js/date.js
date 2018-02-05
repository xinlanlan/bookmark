// 获取当前天的前n天日期
export function getDayStr(num) {
  let dd = new Date()
  dd.setDate(dd.getDate() + num)
  let m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1)
  let d = dd.getDate() < 10 ? '0' + (dd.getDate()) : dd.getDate()
  return `${m}月${d}日`
}

// 获取最近7天的日期(mm月dd日)数组
export function getWeekDayStr() {
  let arr = []
  for (let i = -6; i <= 0; i++) {
    arr.push(getDayStr(i))
  }
  return arr
}

// 获取前7天的时间戳单位为秒
export function getWeekMill() {
  // dd为当天的零点秒数
  let dd = (new Date(new Date().toLocaleDateString()).getTime()) / 1000
  let obj = {
    startTime: dd - 7 * 24 * 3600,
    endTime: dd
  }
  return obj
}

// 根据毫秒数或描述转化为文字日期（2017-04-25的形式,传入为毫秒）
export function getDateString(mill) {
  let date = new Date(mill)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  return year + '-' + month + '-' + day
}
