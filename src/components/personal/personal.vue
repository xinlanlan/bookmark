<template>
  <div class="personal-page">
    <m-header :header-text="headerText"></m-header>
    <div class="user-info">
      <div class="avatar">
        <img src="./avatar.png" alt="头像">
      </div>
      <p class="nickname">{{nickname}}</p>
    </div>
    <!-- 功能列表 -->
    <ul class="list">
      <li class="list-item">
        <span class="icon"></span>
        <span class="text">我的积分</span>
        <span class="point">
          <i class="arrow"></i>
        </span>
      </li>
      <li class="list-item">
        <span class="icon"></span>
        <span class="text">统计管理</span>
        <span class="point">
          <i class="arrow"></i>
        </span>
      </li>
      <li class="list-item">
        <span class="icon"></span>
        <span class="text">我的错题</span>
        <span class="point">
          <i class="arrow"></i>
        </span>
      </li>
      <li class="list-item">
        <span class="icon"></span>
        <span class="text">我的消息</span>
        <span class="point">
          <i class="arrow"></i>
        </span>
      </li>
      <li class="list-item">
        <span class="icon"></span>
        <span class="text">乔布指数</span>
        <span class="point">
          <i class="arrow"></i>
        </span>
      </li>
      <li class="list-item">
        <span class="icon"></span>
        <span class="text">词库管理</span>
        <span class="point">
          <i class="arrow"></i>
        </span>
      </li>
      <li class="list-item">
        <span class="icon"></span>
        <span class="text">密码修改</span>
        <span class="point">
          <i class="arrow"></i>
        </span>
      </li>
      <li class="list-item">
        <span class="icon"></span>
        <span class="text">意见反馈</span>
        <span class="point">
          <i class="arrow"></i>
        </span>
      </li>
    </ul>

    <!-- 退出登陆 -->
    <div class="logout">
      <a class="logout-btn">退出当前账号</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header'
  import {getNickname} from 'api/userInfo'

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
    background-color: #f2f2f2
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
      &:active
        background-color: $color-background-active
      &:first-child
        border-top: 1px solid #ddd
      .icon
        float: left
        width: 98px
        height: 85px
      .text
        float: left
      .point
        float: right
        .arrow
          arrow(18px, #000)
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
</style>
