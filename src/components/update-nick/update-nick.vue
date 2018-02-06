<template>
  <div class="update-nick">
    <m-header :data="headerText" :leftArrow="true"></m-header>
    <div class="nickname">
      <div class="text">昵称：</div>
      <div class="input-box">
        <input v-model="nickname" class="input-nickname" type="text" placeholder="请输入新的昵称">
      </div>
    </div>
    <div class="update">
      <a @click="updateNick" class="update-btn">确定</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header'
  import {alertTn} from 'common/js/confirm'
  import {updateNickname} from 'api/userInfo'
  import {ERR_OK} from 'api/config'

  export default {
    data() {
      return {
        headerText: '修改昵称',
        nickname: ''
      }
    },
    methods: {
      updateNick() {
        if (!this.nickname || this.nickname.length > 6) {
          alertTn('请输入昵称且长度不能大于6位')
          return
        }
        updateNickname(this.nickname).then((res) => {
          if (parseInt(res.code) === ERR_OK) {
            alertTn('修改昵称成功')
            this.nickname = ''
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

  .update-nick
    min-height: 100vh
    background-color: $color-highlight-background
  .nickname
    display: flex
    margin-top: 18px
    padding-left: 28px
    background-color: #fff
    border-bottom: 1px solid #ddd
    .text
      flex: 0 0 186px
      height: 82px
      width: 186px
      line-height: 82px
      vertical-align: top
    .input-box
      flex: 1
      height: 82px
    .input-nickname
      height: 82px
      line-height: 82px
      border: none
  .update
    padding: 36px 30px
    .update-btn
      display: block
      height: 84px
      line-height: 84px
      font-size: 34px
      text-align: center
      border-radius: 10px
      background-color: $color-theme
      color: #fff
</style>
