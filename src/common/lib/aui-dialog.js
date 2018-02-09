// (function(window) {
  'use strict'
  var AuiDialog = function() {
  }
  AuiDialog.prototype = {
    params: {
      title: '',
      msg: '',
      buttons: ['取消', '确定'],
      input: false
    },
    create: function(params, callback) {
      var self = this
      var dialogHtml = ''
      var buttonsHtml = ''
      var msgHtml = ''
      var headerHtml = params.title ? '<div class="aui-dialog-header">' + params.title + '</div>' : '<div class="aui-dialog-header">' + self.params.title + '</div>'
      if (params.input) {
        params.text = params.text ? params.text : ''
        msgHtml = '<div class="aui-dialog-body"><input type="text" placeholder="' + params.text + '"></div>'
      } else {
        msgHtml = params.msg ? '<div class="aui-dialog-body">' + params.msg + '</div>' : '<div class="aui-dialog-body">' + self.params.msg + '</div>'
      }
      var buttons = params.buttons ? params.buttons : self.params.buttons
      if (buttons && buttons.length > 0) {
        for (var i = 0; i < buttons.length; i++) {
          buttonsHtml += '<div class="aui-dialog-btn" button-index="' + i + '">' + buttons[i] + '</div>'
        }
      }
      var footerHtml = '<div class="aui-dialog-footer">' + buttonsHtml + '</div>'
      dialogHtml = '<div class="aui-dialog">' + headerHtml + msgHtml + footerHtml + '</div>'
      document.body.insertAdjacentHTML('beforeend', dialogHtml)
      // listen buttons click
      var dialogButtons = document.querySelectorAll('.aui-dialog-btn')
      if (dialogButtons && dialogButtons.length > 0) {
        // setTimeout(function(){
        for (var ii = 0; ii < dialogButtons.length; ii++) {
          dialogButtons[ii].ontouchend = function() {
            if (callback) {
              if (params.input) {
                callback({
                  buttonIndex: parseInt(this.getAttribute('button-index')) + 1,
                  text: document.querySelector('input').value
                })
              } else {
                callback({
                  buttonIndex: parseInt(this.getAttribute('button-index')) + 1
                })
              }
            }
            self.close()
            return
          }
        }
        // } ,300)
      }
      self.open()
    },
    open: function() {
      if (!document.querySelector('.aui-dialog')) return
      document.querySelector('.aui-dialog').style.marginTop = '-' + Math.round(document.querySelector('.aui-dialog').offsetHeight / 2) + 'px'
      if (!document.querySelector('.aui-mask')) {
        var maskHtml = '<div class="aui-mask"></div>'
        document.body.insertAdjacentHTML('beforeend', maskHtml)
      }
      // document.querySelector(".aui-dialog").style.display = "block";
      setTimeout(function() {
        // document.querySelector(".aui-dialog").classList.add("aui-dialog-in");
        document.querySelector('.aui-mask').classList.add('aui-mask-in')
        document.querySelector('.aui-dialog').classList.add('aui-dialog-in')
      }, 10)
      document.querySelector('.aui-mask').addEventListener('touchmove', function(e) {
        e.preventDefault()
      })
      document.querySelector('.aui-dialog').addEventListener('touchmove', function(e) {
        e.preventDefault()
      })
      return
    },
    close: function() {
      var self = this
      document.querySelector('.aui-mask').classList.remove('aui-mask-in')
      document.querySelector('.aui-dialog').classList.remove('aui-dialog-in')
      document.querySelector('.aui-dialog').classList.add('aui-dialog-out')
      if (document.querySelector('.aui-dialog:not(.aui-dialog-out)')) {
        setTimeout(function() {
          if (document.querySelector('.aui-dialog'))document.querySelector('.aui-dialog').parentNode.removeChild(document.querySelector('.aui-dialog'))
          self.open()
          return true
        }, 200)
      } else {
        document.querySelector('.aui-mask').classList.add('aui-mask-out')
        document.querySelector('.aui-dialog').addEventListener('webkitTransitionEnd', function() {
          self.remove()
        })
        document.querySelector('.aui-dialog').addEventListener('transitionend', function() {
          self.remove()
        })
      }
    },
    remove: function() {
      if (document.querySelector('.aui-dialog'))document.querySelector('.aui-dialog').parentNode.removeChild(document.querySelector('.aui-dialog'))
      if (document.querySelector('.aui-mask')) {
        document.querySelector('.aui-mask').classList.remove('aui-mask-out')
      }
      return true
    },
    alert: function(params, callback) {
      var self = this
      return self.create(params, callback)
    },
    prompt: function(params, callback) {
      var self = this
      params.input = true
      return self.create(params, callback)
    }
  }
  // 第一种方式 common.js规范
  if (typeof module !== `undefined` && typeof exports === `object`) {
    module.exports = AuiDialog
  }

  // 第二种方式 cmd规范
  // module.exports.AuiDialog = AuiDialog
  // module.exports = AuiDialog

  // 第三种方式 原生
  // this.AuiDialog = AuiDialog

// })(window)
