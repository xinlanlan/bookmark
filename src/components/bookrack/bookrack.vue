<template>
  <div class="container">
    <m-header :data="headerText" :left-arrow="true">
      <a @click="sureBtn" class="sure-btn"><span>完成</span></a>
    </m-header>
    <div class="list">
      <label v-for="item in bookListArr" class="list-item">
        <input :value="item.bookUri+'#'+item.bookTitle" v-model="selectBook" class="aui-checkbox" type="checkbox" name="checkbox">
        <img class="item-img" v-lazy="'http://bookmark.xftimes.com'+item.photoCoverImage" alt="">
        <span class="item-text">{{item.bookTitle}}</span>
      </label>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header'
  import {getBookList} from './page'

  export default {
    data() {
      return {
        headerText: '我的书架',
        bookListArr: [],
        selectBook: []
      }
    },
    created() {
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
        this.$router.go(-1)
      },
      // 获取书列表的接口
      _getBookList() {
        getBookList().then((res) => {
          console.log(res)
          this.bookListArr = res.bookList
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
  .sure-btn
    position: absolute
    width: 88px
    height: 44px
    line-height: 44px
    float: right
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
