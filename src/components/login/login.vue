<template>
  <div class="login-page">
    <m-header :header-text="headerText"></m-header>
    <div class="content">
      <div class="logo">
        <img class="img" src="./logo.png" alt="">
      </div>
      <div class="user-info">
        <div class="item-info">
          <div class="icon">
            <i class="iconfont icon-person"></i>
          </div>
          <div class="user-input">
            <input v-model="username" type="text" placeholder="请输入用户名">
          </div>
        </div>
        <div class="item-info">
          <div class="icon">
            <i class="iconfont icon-pwd"></i>
          </div>
          <div class="user-input">
            <input v-model="password" type="password" placeholder="请输入密码">
          </div>
        </div>
      </div>
      <div class="login">
        <a @click="goLogin" class="login-btn">登 陆</a>
      </div>
      <div class="tel-phone">客服 400-855-9393</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header'
  import {alertTn} from 'common/js/confirm'
  import {userLogin} from 'api/userInfo'
  import {ERR_OK} from 'api/config'

  export default {
    data() {
      return {
        username: '',
        password: '',
        headerText: '用户登陆'
      }
    },
    methods: {
      goLogin() {
        if (!this.username) {
          alertTn('请输入用户名')
        } else if (!this.password) {
          alertTn('请输入密码')
        } else {
          this._userLogin(this.username, this.password)
        }
      },
      _userLogin(username, password) {
        userLogin(username, password).then((res) => {
          console.log(res)
          if (parseInt(res.code) === ERR_OK) {
            this.$router.push({
              path: '/homepage'
            })
          } else {
            alertTn('请检查您的用户名或密码是否正确')
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

  .content
    padding-top: 115px
    .logo
      height: 295px
      .img
        display: block
        margin: 0 auto
        height: 100%
    .user-info
      padding: 68px 78px 0
      .item-info
        display: flex
        flex-direction: row
        padding-top: 22px
        text-align: center
        .icon
          flex: 0 0 83px
          width: 83px
          line-height: 55px
          .icon-person
            font-size: 37px
            color: $color-theme
          .icon-pwd
            font-size: 37px
            color: #ffc980
        .user-input
          flex: 1
    .login
      margin-top: 93px
      padding: 0 40px
      .login-btn
        display: block
        height: 91px
        line-height: 91px
        text-align: center
        border-radius: 10px
        color: #fff
        background-color: $color-theme
    .tel-phone
      height: 95px
      line-height: 95px
      text-align: center
</style>
