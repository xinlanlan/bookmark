<template>
  <div class="word-read">
    <m-header :data="headerText" :leftArrow="true"></m-header>
    <!-- 所选书的名字 -->
    <div class="name">
      <p class="book-name-par" v-for="item in bookName">
        <span class="symbol">《</span>
        <span class="name-item">{{item}}</span>
        <span class="symbol">》</span>
      </p>
    </div>
    <!-- 排序筛选 -->
    <div class="filter-box">
      <div class="filter">
        <div @click="tabFrequency" :class="{active: sortType === 2}" class="frequency">
          <i class="iconfont icon-frequency"></i>
          <span class="text">频次</span>
          <i :class="{'icon-up': sort !== 1}" class="iconfont icon-down"></i>
        </div>
        <div @click="tabLetter"  :class="{active: sortType === 1}"  class="letter">
          <i class="iconfont icon-letter"></i>
          <span class="text">字母</span>
          <i :class="{'icon-up': firstWordSort !== 1}" class="iconfont icon-down"></i>
        </div>
      </div>
    </div>
    <!-- 词列表 -->
    <div class="word-list">
      <div class="list-item header">
        <span class="keywords">关键词</span>
        <span class="frequency">频次</span>
        <span class="todo">操作</span>
      </div>
      <div @click="goReadPage(item.bookUriList, item.word, item.numbers)" v-for="item in wordArr" class="list-item">
        <span class="keywords">{{item.word}}</span>
        <span class="frequency">{{item.numbers}}次</span>
        <span class="todo">
          <i class="iconfont icon-book"></i>
          <span class="text">阅读</span>
          <i class="arrow"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header'
  import {ERR_OK} from 'api/config'
  import {getAllWord} from './page'

  export default {
    data() {
      return {
        headerText: '关键词阅读',
        start: 0,
        end: 14,
        sort: 1,
        firstWordSort: 1,
        sortType: 2,
        wordArr: []
      }
    },
    computed: {
      bookName() {
        return sessionStorage.getItem('selectBookName').split(',')
      },
      bookUriList() {
        return sessionStorage.getItem('selectBookUri')
      }
    },
    created() {
      this._getAllWord()
    },
    methods: {
      // 点击频次的时候
      tabFrequency() {
        this.sortType = 2
        this.sort === 1 ? this.sort = '' : this.sort = 1
        this.wordArr = []
        this._getAllWord()
      },
      // 点击首字母排序
      tabLetter() {
        this.sortType = 1
        this.firstWordSort === 1 ? this.firstWordSort = '' : this.firstWordSort = 1
        this.wordArr = []
        this._getAllWord()
      },
      // 去阅读页面
      goReadPage(uri, keywords, count) {
        this.$router.push({
          path: '/wordRead',
          query: {
            uri: uri,
            keywords: keywords,
            count: count
          }
        })
      },
      _getAllWord() {
        let params = {
          start: this.start,
          end: this.end,
          sort: this.sort,
          firstWordSort: this.firstWordSort,
          sortType: this.sortType,
          bookUriList: this.bookUriList
        }
        getAllWord(params).then((res) => {
          if (res.code === ERR_OK) {
            console.log(res)
            this.wordArr = this.wordArr.concat(res.list)
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
  @import "~common/stylus/mixin"

  .name
    border-top: 10px solid  $color-highlight-background
    padding: 40px 40px 20px
    .book-name-par
      line-height: 50px
      text-align: center
      .symbol
        display: inline-block
        vertical-align: middle
      .name-item
        display: inline-block
        width: 86%
        vertical-align: middle
        no-wrap()
  .filter-box
    margin-top: 30px
    overflow: hidden
  .filter
    float: right
    margin-right: 30px
    height: 60px
    border: 3px solid $color-theme
    border-radius: 6px
    .frequency, .letter
      display: inline-block
      line-height: 54px
      padding: 0 10px
      color: $color-theme
      .text, .iconfont
        display: inline-block
        vertical-align: middle
        font-size: 30px
      .icon-letter
        font-size: 36px
      &.active
        background-color: $color-theme
        color: #fff
  .word-list
    margin-top: 15px
    .list-item
      display: flex
      height: 84px
      line-height: 84px
      .keywords, .frequency, .todo
        flex: 1
        text-align: center
      &:nth-child(odd)
        background-color: #f6f6f6
      &.header
        border-top: 1px solid #ddd
        background-color: #f4fffa
      .arrow
        arrow-rig(20px, 1px, #000)
      .icon-book
        font-size: 36px
        color: $color-theme
      .text
        vertical-align: middle
</style>
