<template>
  <div class="personal-page">
    <m-header :data="headerText"></m-header>
    <div class="user-info">
      <div class="avatar">
        <img src="./avatar.png" alt="头像">
      </div>
      <p class="nickname">{{nickname}}</p>
    </div>
    <!-- 功能列表 -->
    <ul class="list">
      <li class="list-item">
        <span class="icon iconfont icon-code"></span>
        <span class="text">我的积分</span>
        <span class="point">
          <i class="arrow-rig"></i>
        </span>
      </li>
      <router-link tag="li" class="list-item" to="/statistics">
        <span class="icon iconfont icon-statistic"></span>
        <span class="text">统计管理</span>
        <span class="point">
          <i class="arrow-rig"></i>
        </span>
      </router-link>
      <li class="list-item">
        <span class="icon iconfont icon-mistakes"></span>
        <span class="text">我的错题</span>
        <span class="point">
          <i class="arrow-rig"></i>
        </span>
      </li>
      <li class="list-item">
        <span class="icon iconfont icon-msg"></span>
        <span class="text">我的消息</span>
        <span class="point">
          <i class="arrow-rig"></i>
        </span>
      </li>
      <li class="list-item">
        <span class="icon iconfont icon-exponent"></span>
        <span class="text">乔布指数</span>
        <span class="point">
          <i class="arrow-rig"></i>
        </span>
      </li>
      <li class="list-item">
        <span class="icon iconfont icon-ci"></span>
        <span class="text">词库管理</span>
        <span class="point">
          <i class="arrow-rig"></i>
        </span>
      </li>
      <li class="list-item">
        <span class="icon iconfont icon-psd"></span>
        <span class="text">密码修改</span>
        <span class="point">
          <i class="arrow-rig"></i>
        </span>
      </li>
      <li class="list-item">
        <span class="icon iconfont icon-feedback"></span>
        <span class="text">意见反馈</span>
        <span class="point">
          <i class="arrow-rig"></i>
        </span>
      </li>
    </ul>

    <!-- 退出登陆 -->
    <div class="logout">
      <a class="logout-btn" @click="_logout">退出当前账号</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header'
  import {alertTn} from 'common/js/confirm'
  import {getNickname, logout} from 'api/userInfo'
  import {ERR_OK} from 'api/config'

  export default {
    data() {
      return {
        headerText: '个人中心',
        nickname: ''
      }
    },
    created() {
      this._getNickname()
    },
    methods: {
      goNextPage(path) {
        this.$router.push({
          path: path
        })
      },
      _logout() {
        let that = this
        alertTn('退出后不会删除任何历史数据', '提示', ['取消', '确定'], function(ret) {
          if (ret.buttonIndex === 2) {
            logout().then((res) => {
              if (parseInt(res.code) === ERR_OK) {
                that.$router.push({
                  path: '/login'
                })
              }
            })
          }
        })
      },
      _getNickname() {
        getNickname().then((res) => {
          console.log(res)
          this.nickname = res.nickName
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
  @import "~common/stylus/mixin"
  .personal-page
    min-height: 100%
    background-color: $color-highlight-background
  .user-info
    background: linear-gradient(#65c1bc, #a6d8d7)
    padding-bottom: 23px
    .avatar
      height: 118px
      padding: 23px 0
      img
        display: block
        height: 100%
        margin: 0 auto
    .nickname
      height: 32px
      text-align: center
      font-size: 32px
      color: #fff
  .list
    margin-top: 17px
    .list-item
      height: 85px
      line-height: 85px
      padding-right: 22px
      border-bottom: 1px solid #ddd
      background-color: #fff
      clear: both
      &:active
        background-color: $color-background-active
      &:first-child
        border-top: 1px solid #ddd
      .icon
        float: left
        width: 98px
        height: 85px
        line-height: 85px
        text-align: center
      .text
        float: left
      .point
        float: right
        .arrow-rig
          arrow-rig(18px, 1px, #000)
  .logout
    margin-top: 17px
    .logout-btn
      height: 84px
      line-height: 84px
      display: block
      text-align: center
      border-bottom: 1px solid #ddd
      border-top: 1px solid #ddd
      color: $color-theme
      background-color: #fff
      cursor: pointer
      &:active
        background-color: $color-background-active

  /* 图标样式 */
  .icon-code
    font-size: 36px
    color: #fb8672
  .icon-statistic
    font-size: 46px
    color: #fec985
  .icon-mistakes
    font-size: 30px
    color: #ff8767
  .icon-msg
    font-size: 34px
    color: #93df97
  .icon-exponent
    font-size: 52px
    color: #3099fb
  .icon-ci
    font-size: 32px
    color: #ffd49e
  .icon-psd
    font-size: 36px
    color: #847ed6
  .icon-feedback
    font-size: 36px
    color: #ff8a74
</style>
