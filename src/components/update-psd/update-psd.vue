<template>
  <div class="update-psd">
    <m-header :data="headerText" :leftArrow="true"></m-header>
    <div class="content">
      <ul class="psd-box">
        <li class="psd-item">
          <p class="iconfont icon-psd"></p>
          <p class="psd-text">
            <input v-model="psd" type="password" placeholder="请输入原始密码">
          </p>
        </li>
        <li class="psd-item">
          <p class="iconfont icon-psd"></p>
          <p class="psd-text">
            <input v-model="newPsd" type="password" placeholder="请设置登录密码">
          </p>
        </li>
        <li class="psd-item">
          <p class="iconfont icon-psd"></p>
          <p class="psd-text">
            <input v-model="surePsd" type="password" placeholder="请确认登录密码">
          </p>
        </li>
      </ul>
    </div>
    <div class="btn">
      <a @click="_updatePsd" class="update-btn">提交</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header'
  import md5 from 'md5'
  import {updatePsd} from 'api/userInfo'
  import {alertTn} from 'common/js/confirm'
  import {ERR_OK} from 'api/config'

  export default {
    data() {
      return {
        headerText: '修改密码',
        psd: '',
        newPsd: '',
        surePsd: ''
      }
    },
    methods: {
      _updatePsd() {
        if (!this.psd) {
          alertTn('请输入原始密码')
          return
        }
        if (!this.newPsd) {
          alertTn('请输入新密码')
          return
        }
        if (!this.surePsd) {
          alertTn('请确认新密码')
          return
        }
        if (this.newPsd !== this.surePsd) {
          alertTn('两次密码输入不相同')
          return
        }
        updatePsd(md5(this.psd), md5(this.newPsd)).then((res) => {
          console.log(res)
          if (res.message) {
            alertTn(res.message)
            return
          }
          if (res.code === ERR_OK) {
            alertTn('密码修改成功')
            this.psd = ''
            this.newPsd = ''
            this.surePsd = ''
          }
        })
      }
    },
    components: {
      MHeader
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .update-psd
    height: 100vh
    background-color: $color-highlight-background
  .content
    padding: 32px 42px
  .psd-box
    padding: 84px 44px
    border-radius: 12px
    background-color: #fff
    .psd-item
      padding-top: 28px
      text-align: center
      overflow: hidden
      .icon-psd
        float: left
        width: 83px
        height: 54px
        line-height: 54px
        font-size: 38px
        text-align: center
      &:nth-child(1)
        .icon-psd
          color: #ff8468
      &:nth-child(2)
        .icon-psd
          color: #ffc77f
      &:nth-child(3)
        .icon-psd
          color: #5ccacc
      .psd-text
        float: left
        width: 76%
        height: 54px
        border-bottom: 1px solid #ddd
  .btn
    margin-top: 30px
    padding: 0 42px
    .update-btn
      display: block
      height: 90px
      line-height: 90px
      font-size: 34px
      text-align: center
      background-color: $color-theme
      color: #fff
      border-radius: 12px
      &:active
        background-color: $color-theme-active
</style>
