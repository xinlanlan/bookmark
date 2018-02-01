// 判断是否有这个class名
export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

// 为该元素添加一个class名
export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }

  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

// 为该元素移除一个class名
export function removeClass(el, className) {
  if (hasClass(el, className)) {
    let newClass = el.className.split(' ')
    newClass.splice(newClass.indexOf(className), 1)
    el.className = newClass.join(' ')
  }
}
