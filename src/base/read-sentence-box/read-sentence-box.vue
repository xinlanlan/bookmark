<template>
  <div class="content">
    <ul class="list">
      <li v-for="(item, index) in sentenceArr" class="list-item">
        <div :class="'bgs_'+(index%3)" class="list-content">
          <div class="get-sentence-arrow"></div>
          <div class="sentence-box">
            <div class="sentence-section">
              <h1 class="section-index">---第{{index+1}}句---</h1>
              <div class="sentence-content">
                <span v-for="cell in item.lastSentenceArr" class="last-sentence-content" v-html="cell.text"></span>
                <span class="important-sentence">{{item.text}}</span>
                <span v-for="cell in item.nextSentenceArr" class="next-sentence-content" v-html="cell.text"></span>
              </div>
            </div>
            <div class="book-name">--《{{item.bookName}}》</div>
          </div>
          <div class="get-sentence-arrow"></div>
        </div>
        <ul class="list-footer">
          <!--<li @click="backOrignSentence(item.uri, index)" class="footer-item">-->
          <li @click="addClass(0, index)" :class="{active: (0 === current.num && index === current.index)}" class="footer-item">
            <span class="icon iconfont icon-classification"></span>
            <span class="text">回到原文</span>
          </li>
          <li @click="addClass(1, index)" :class="{active: (1 === current.num && index === current.index)}" class="footer-item">
            <span class="icon iconfont icon-marker"></span>
            <span class="text">标记</span>
          </li>
          <li @click="addClass(2, index)" :class="{active: (2 === current.num && index === current.index)}" class="footer-item">
            <span class="icon iconfont icon-share"></span>
            <span class="text">分享</span>
          </li>
          <li @click="addClass(3, index)" :class="{active: (3 === current.num && index === current.index)}" class="footer-item">
            <span class="icon iconfont icon-listen"></span>
            <span class="text">听</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getKeySentences, getLastSentence, getNextSentence} from 'api/get-sentence'

  export default {
    props: {
      params: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        sentenceArr: [],
        current: {num: -1, index: -1}
      }
    },
    created() {
      this._getKeySentences(this.params)
    },
    methods: {
      // 点击回到原文的时候
      backOrignSentence(uri, index) {
        getLastSentence(uri).then((res) => {
          console.log(res)
          this.sentenceArr[index].lastSentenceArr = res.returnJson.concat(this.sentenceArr[index].lastSentenceArr)
        })

        getNextSentence(uri).then((res) => {
          console.log(res)
          this.sentenceArr[index].nextSentenceArr = this.sentenceArr[index].nextSentenceArr.concat(res.returnJson)
        })
      },
      // 点击底部tab栏进行切换的时候
      addClass(num, index) {
        this.current.num = num
        this.current.index = index
      },
      // 获取重点句子的列表时
      _getKeySentences(params) {
        getKeySentences(params).then((res) => {
          let len = res.list.length
          this.sentenceArr = res.list
          for (let i = 0; i < len; i++) {
            this.sentenceArr.splice(i, 1, Object.assign({}, this.sentenceArr[i], {
              lastSentenceArr: [],
              nextSentenceArr: []
            }))
          }
          console.log(this.sentenceArr)
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'

  .content
    padding: 20px 26px 0
  .list-item
    margin-bottom: 26px
    background-color: #fff
    border-radius: 8px
    .list-content
      padding: 0 30px
    .get-sentence-arrow
      height: 65px
    .sentence-box
      height: 342px
      .sentence-section
        height: 270px
        overflow: scroll
        .section-index
          height: 45px
          margin-bottom: 20px
          line-height: 45px
          text-align: left
          font-size: $font-size-medium
          font-weight: 800
      .book-name
        height: 72px
        line-height: 72px
        text-align: right
    .list-footer
      display: flex
      flex-direction: row
      height: 110px
      .footer-item
        flex: 1
        display: flex
        flex-direction: column
        text-align: center
        border-top: 1px solid #ddd
        &.active
          color: $color-theme
        .icon
          flex: 1
          height: 65px
          padding-top: 10px
          line-height: 55px
          font-size: 46px
        .text
          flex: 1
          height: 45px
          line-height: 45px
          font-size: 26px
  .bgs_0
    background: url("bgs_0.png") no-repeat left bottom
    background-size: 100%
  .bgs_1
    background: url("bgs_1.png") no-repeat left bottom
    background-size: 100%
  .bgs_2
    background: url("bgs_2.png") no-repeat left bottom
    background-size: 100%
  .important-sentence
    font-weight: 700
</style>
