<template>
  <div class="container">
    <m-header :data="headerText" :left-arrow="true" v-on:back-page="backPage">
      <a class="sure-btn"><span>完成</span></a>
    </m-header>
    <div class="list">
      <label v-for="item in bookListArr" class="list-item">
        <input class="aui-checkbox" type="checkbox" name="checkbox">
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
        bookListArr: []
      }
    },
    created() {
      this._getBookList()
    },
    methods: {
      // 获取书列表的接口
      _getBookList() {
        getBookList().then((res) => {
          this.bookListArr = res.bookList
        })
      },

      // 返回上一页面，后面有待优化
      backPage() {
        this.$router.go(-1)
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
