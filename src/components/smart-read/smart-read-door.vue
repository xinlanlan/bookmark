<template>
  <div class="container">
    <m-header :data="headerText"></m-header>
    <div class="background"></div>
    <div class="info-box">
      <div class="info">
        <div class="logo">
          <img class="logo-img" src="../../common/image/logo.png" alt="logo">
        </div>
        <div class="info-list">
          <div class="list-item">
            <i class="icon book-icon">书</i>
            <p @click="selectBook" class="select-book">{{selectBookName}}</p>
            <i class="arrow"></i>
          </div>
          <div :class="{active: borderActive[0]}" class="list-item">
            <i class="icon word-icon">词</i>
            <input @focus="changeBorder(0)" :value="keywords" class="input-item" type="search" placeholder="请输入关键词">
            <i class="arrow"></i>
          </div>
          <div :class="{active: borderActive[1]}" class="list-item">
            <i class="icon sentence-icon">句</i>
            <input @focus="changeBorder(1)" :value="inputSentenceNum" class="input-item" type="search" :placeholder="sentenceNum">
            <i class="arrow"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="start-read">
      <a @click="startRead" class="read-btn">智能阅读</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header'
  import {alertTn} from 'common/js/confirm'
  import {getSentenceNum} from './page'

  export default {
    data() {
      return {
        headerText: '智能阅读',
        selectBookName: '请选书名或分类',
        borderActive: [false, false],
        keywords: '',
        sentenceNum: '请输入查的句子数',
        inputSentenceNum: ''
      }
    },
    created() {
      this.getSelectBookName()
      this._getSentenceNum()
    },
    methods: {
      // 获取选中的书名
      getSelectBookName() {
        let selectBookName = sessionStorage.getItem('selectBookName')
        if (selectBookName) {
          this.selectBookName = selectBookName
        }
      },
      // 输入框聚焦的时候
      changeBorder(index) {
        for (let i = 0; i < this.borderActive.length; i++) {
          this.borderActive[i] = false
        }
        this.borderActive.splice(index, 1, true)
      },
      // 点击选书的时候
      selectBook() {
        this.$router.push({
          path: '/bookrack',
          query: {
            type: 0
          }
        })
      },
      // 点击开启智能阅读的时候
      startRead() {
        let selectBookUri = sessionStorage.getItem('selectBookUri')
        let keywords = this.keywords
        let inputSentenceNum = parseInt(this.inputSentenceNum)
        let g = /^[1-9]*[1-9][0-9]*$/
        if (!selectBookUri) {
          alertTn('请选择书籍')
          return
        }
        if (inputSentenceNum && !g.test(inputSentenceNum)) {
          alertTn('输入的句子数量必须为正整数')
          return
        }
        if (!inputSentenceNum) {
          inputSentenceNum = ''
        }
        this.$router.push({
          path: '/smartRead',
          query: {
            sentenceNum: inputSentenceNum,
            keyword: keywords
          }
        })
      },
      // 获取句子的最大数量
      _getSentenceNum() {
        let uri = sessionStorage.getItem('selectBookUri')
        if (uri) {
          getSentenceNum(uri).then((res) => {
            this.sentenceNum = `最大数量为${res.num}`
          })
        }
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

  .container
    height: 100%
    background-color: $color-highlight-background
  .background
    height: 280px
    background: url("background.png") no-repeat
    background-size: 100% 100%
  .info-box
    margin-top: -66px
    padding: 0 40px
  .info
    border-radius: 18px
    background: #fff
    padding-bottom: 94px
    .logo
      padding: 37px
      .logo-img
        display: block
        height: 168px
        margin: 0 auto
    .info-list
      padding: 0 100px
      .list-item
        display: flex
        height: 75px
        line-height: 75px
        margin-top: 10px
        justify-content: space-between
        align-items: center
        border-bottom: 1px solid #eee
        &.active
          border-color: $color-theme
        .icon
          width: 56px
          height: 58px
          line-height: 58px
          margin-right: 16px
          text-align: center
          font-size: 32px
          font-style: normal
          color: #fff
          border-radius: 28px
          &.book-icon
            background-color: #60d1d4
          &.word-icon
            background-color: #ffcc80
          &.sentence-icon
            background-color: #ff8467
        .select-book
          width: 80%
          no-wrap()
        .arrow
          arrow-rig(15px, 1px, #000)
        .input-item
          width: 80%
          border-bottom: none
  .start-read
    margin-top: 75px
    padding: 0 40px
    .read-btn
      display: block
      height: 90px
      line-height: 90px
      font-size: 34px
      text-align: center
      border-radius: 14px
      color: #fff
      background-color: $color-theme
</style>
