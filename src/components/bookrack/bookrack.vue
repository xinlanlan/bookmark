<template>
  <div class="container">
    <m-header :data="headerText" :left-arrow="true">
      <a v-if="bookrackType === 0 || bookrackType === 9" @click="sureBtn" class="sure-btn">完成</a>
    </m-header>
    <div class="list">
      <label @click="clickItemBook(item.bookUri, item.pdfUri, item.bookTitle)" v-for="item in bookListArr" class="list-item">
        <input v-if="bookrackType === 0 || bookrackType === 9" :value="item.bookUri+'#'+item.bookTitle" v-model="selectBook" class="aui-checkbox" type="checkbox" name="checkbox">
        <img class="item-img" v-lazy="baseUrl+item.photoCoverImage" alt="">
        <span class="item-text">{{item.bookTitle}}</span>
      </label>
    </div>
    <scroll-top></scroll-top>
  </div>
</template>

<script type="text/ecmascript-6">
  /*
   * bookrackType为0的时候是智能阅读，3的时候是全书阅读
   */
  import MHeader from 'components/m-header/m-header'
  import ScrollTop from 'base/scroll-top/scroll-top'
  import {baseUrl} from 'api/config'
  import {getBookList} from './page'
  import {alertTn} from 'common/js/confirm'
  const READTYPE_0 = 0    // 智能阅读
  const READTYPE_2 = 2    // 题库自测
  const READTYPE_3 = 3    // 全书阅读
  const READTYPE_9 = 9    // 词库阅读
  const READTYPE_10 = 10  // 图表阅读

  export default {
    data() {
      return {
        headerText: '我的书架',
        bookListArr: [],
        selectBook: [],
        bookrackType: READTYPE_0,
        baseUrl: baseUrl
      }
    },
    created() {
      this.bookrackType = parseInt(this.$route.query.type)
      this._getBookList()
    },
    methods: {
      // 点击完成所看的书
      sureBtn() {
        let selectBookUri = ''
        let selectBookName = ''
        let len = this.selectBook.length
        for (let i = 0; i < len; i++) {
          let arrItem = this.selectBook[i].split('#')
          selectBookUri += arrItem[0] + ','
          selectBookName += arrItem[1] + ','
        }
        sessionStorage.setItem('selectBookUri', selectBookUri.substring(0, selectBookUri.length - 1))
        sessionStorage.setItem('selectBookName', selectBookName.substring(0, selectBookName.length - 1))
        // 智能阅读
        if (this.bookrackType === READTYPE_0) {
          this.$router.go(-1)
          return
        }
        // 词库阅读
        if (this.bookrackType === READTYPE_9) {
          this.$router.push({
            path: '/wordReadDoor'
          })
        }
      },
      // 点击每本书的时候
      clickItemBook(bookUri, pdfUrl, bookName) {
        // 题库自测
        if (this.bookrackType === READTYPE_2) {
          this.$router.push({
            path: '/questionBank',
            query: {
              bookUri: bookUri
            }
          })
          return
        }
        // 全书阅读
        if (this.bookrackType === READTYPE_3) {
          if (!pdfUrl) {
            alertTn('该书没有pdf')
            return
          }
          this.$router.push({
            path: '/PdfRead',
            query: {
              path: pdfUrl
            }
          })
          return
        }
        // 图表阅读
        if (this.bookrackType === READTYPE_10) {
          this.$router.push({
            path: '/imgRead',
            query: {
              bookUri: bookUri,
              bookName: bookName
            }
          })
          return
        }
      },

      // 获取书列表的接口
      _getBookList() {
        getBookList().then((res) => {
          this.bookListArr = res.bookList
        })
      }
    },
    components: {
      MHeader,
      ScrollTop
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .sure-btn
    position: absolute
    width: 88px
    height: 44px
    line-height: 44px
    text-align: center
    right: 20px
    top: 20px
    border: 1px solid #fff
    border-radius: 5px
    color: #fff
    &:active
      background-color: $color-theme-active
  .list-item
    display: flex
    height: 188px
    padding: 0 20px
    align-items: center
    border-bottom: 10px solid $color-highlight-background
    .item-img
      display: block
      width: 102px
      height: 136px
      margin: 0 30px 0 30px
    .item-text
      display: block
      max-width: 500px
      color: #333
</style>
