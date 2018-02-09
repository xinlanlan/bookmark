import AuiDialog from '../lib/aui-dialog'

export function alertTn(a, b, c, d) {
  if (!b) {
    b = '提示'
  }
  if (!c) {
    c = ['关闭']
  }
  // common.js的引用
  let dialog = new AuiDialog()
  // cmd和原生的引用
  // let dialog = new AuiDialog.AuiDialog()
  dialog.alert({
    title: b,
    msg: a,
    buttons: c
  }, d)
}
