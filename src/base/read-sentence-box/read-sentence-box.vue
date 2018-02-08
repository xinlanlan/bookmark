<template>
  <div class="content">
    <div v-if="readBtn" @click="readSentence" class="iconfont icon-ting">
      <audio ref="totalAudio" :src="readUrl + readText"></audio>
    </div>
    <ul class="list">
      <li v-for="(item, index) in sentenceArr" class="list-item" ref="listItem">
        <div :class="'bgs_'+(index%3)" class="list-content">
          <div class="get-sentence-arrow">
            <span @click="_getLastSentence(sentenceArr[index].getlastSentenceUri, sentenceArr[index], true)" v-show="item.unfold" class="iconfont icon-top-arrow"></span>
          </div>
          <div :class="{unfold: item.unfold}" class="sentence-box">
            <div :class="{unfold: item.unfold}" class="sentence-section" ref="sentenceSection">
              <h1 v-if="type === 0" class="section-index">---第{{index+1}}句---</h1>
              <div class="sentence-content">
                <!-- 上十句 -->
                <span v-if="cell.src" v-for="cell in item.lastSentenceArr" class="last-sentence-content">
                  <img class="img" v-lazy="imgBaseUrl + cell.src " alt="">
                  <i class="text">{{cell.text}}</i>
                </span>
                <span v-else class="last-sentence-content" v-text="cell.text"></span>

                <!-- 重点句子 -->
                <span v-if="item.src" class="important-sentence">
                  <img class="img" v-lazy="imgBaseUrl + item.src " alt="">
                  <i class="text">{{item.text}}</i>
                </span>
                <span v-else class="important-sentence" v-text="item.text"></span>

                <!-- 下十句 -->
                <span v-if="cell.src" v-for="cell in item.nextSentenceArr" class="next-sentence-content" v-html="cell.text">
                  <img class="img" v-lazy="imgBaseUrl + cell.src " alt="">
                  <i class="text">{{cell.text}}</i>
                </span>
                <span v-else class="next-sentence-content" v-text="cell.text"></span>
              </div>
            </div>
            <div class="book-name">--《{{item.bookName ? item.bookName : bookName}}》</div>
          </div>
          <div class="get-sentence-arrow">
            <span @click="_getNextSentence(sentenceArr[index].getNextSentenceUri, sentenceArr[index], true)" v-show="item.unfold" class="iconfont icon-arrow"></span>
          </div>
        </div>
        <ul class="list-footer" @click.stop>
          <!--<li @click="backOrignSentence(item.uri, index)" class="footer-item">-->
          <li @click="tabFooterItem(0, index, item.uri)" :class="{active: (0 === current.num && index === current.index)}" class="footer-item">
            <template v-if="item.unfold">
              <span class="icon iconfont icon-zhankai"></span>
              <span class="text">收起</span>
            </template>
            <template v-else>
              <span class="icon iconfont icon-classification"></span>
              <span class="text">回到原文</span>
            </template>
          </li>
          <li @click="tabFooterItem(1, index, item.uri)" :class="{active: (1 === current.num && index === current.index)}" class="footer-item">
            <span class="icon iconfont icon-marker"></span>
            <span class="text">标记</span>
            <div v-show="(1 === current.num && index === current.index)" class="mark-box">
              <div class="mark">
                <span @click.stop="_markSentence(item.uri, 0)" class="mark-good">好句</span>
                <span @click.stop="_markSentence(item.uri, 1)" class="mark-bad">残句</span>
              </div>
              <i class="mark-arrow"></i>
            </div>
          </li>
          <li @click="tabFooterItem(2, index, item.uri)" :class="{active: (2 === current.num && index === current.index)}" class="footer-item">
            <span class="icon iconfont icon-share"></span>
            <span class="text">分享</span>
          </li>
          <li @click="tabFooterItem(3, index, item.uri)" :class="{active: (3 === current.num && index === current.index)}" class="footer-item">
            <span class="icon iconfont icon-listen"></span>
            <span class="text">听</span>
          </li>
        </ul>
      </li>
      <div class="loading-container" v-show="!sentenceArr.length">
        <loading></loading>
      </div>
    </ul>
    <scroll-top></scroll-top>
  </div>
</template>

<script type="text/ecmascript-6">
  import Loading from 'base/loading/loading'
  import ScrollTop from 'base/scroll-top/scroll-top'
  import {getKeySentences, getLastSentence, getNextSentence, getImportImg} from 'api/get-sentence'
  import {markSentence} from './page'
  import {ERR_OK, imgBaseUrl} from 'api/config'
  import {alertTn} from 'common/js/confirm'
  const READBASEURL = 'http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&per=1&spd=5&text='

  export default {
    props: {
      params: {
        type: Object,
        default: null
      },
      type: {
        type: Number,
        // 0表示获取的事重点句子，1表示获取的是重点图片
        default: 0
      },
      readBtn: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        sentenceArr: [],
        current: {num: -1, index: -1},
        bookName: this.$route.query.bookName,
        imgBaseUrl: imgBaseUrl,
        readUrl: READBASEURL,
        readText: '',
        readIndex: 0
      }
    },
    created() {
      if (this.type === 0) {
        this._getKeySentences(this.params)
      } else if (this.type === 1) {
        this._getImportImg(this.params)
      }
      document.addEventListener('click', (e) => {
        this.current.index = -1
      })
    },
    mounted() {
      if (this.type === 0) {
        this.readNextText()
      }
    },
    methods: {
      // 点击底部tab栏进行切换的时候
      tabFooterItem(num, index, uri) {
        this.current.num = num
        this.current.index = index
        if (num === 0) {
          this.backOrignSentence(uri, index)
        }
      },
      // 点击回到原文的时候
      backOrignSentence(uri, index) {
        let cell = this.sentenceArr[index]
        // 展开还是收起
        cell.unfold = !cell.unfold
        if (cell.unfold) {
          this._getLastSentence(uri, cell, false)
          this._getNextSentence(uri, cell)
        } else {
          cell.lastSentenceArr = []
          cell.nextSentenceArr = []
          cell.getlastSentenceUri = ''
          cell.lastSentenceArr = ''
        }
      },
      // 上十句,tipOver决定是否提醒有上下文，当点击原文的时候不需要提醒
      _getLastSentence(uri, cell, tipOver) {
        getLastSentence(uri).then((res) => {
          if (res.returnJson.length === 0 && tipOver) {
            alertTn('没有上文了')
            return
          }
          if (res.returnJson.length === 0) {
            return
          }
          cell.getlastSentenceUri = res.returnJson[0].uri
          cell.lastSentenceArr = res.returnJson.concat(cell.lastSentenceArr)
        })
      },
      // 下十句
      _getNextSentence(uri, cell, tipOver) {
        getNextSentence(uri).then((res) => {
          let d = res.returnJson
          if (d.length === 0 && tipOver) {
            alertTn('没有下文了')
            return
          }
          if (d.length === 0) {
            return
          }
          cell.getNextSentenceUri = d[d.length - 1].uri
          cell.nextSentenceArr = cell.nextSentenceArr.concat(res.returnJson)
        })
      },
      // 点击标记
      _markSentence(uri, type) {
        this.current.index = -1
        markSentence(uri).then((res) => {
          if (res.code && res.code === ERR_OK) {
            if (type === 0 && this.type === 0) {
              alertTn('标记好句成功')
            } else if (type === 1 && this.type === 0) {
              alertTn('标记残句成功')
            } else if (type === 0 && this.type === 1) {
              alertTn('标记好图成功')
            } else if (type === 1 && this.type === 1) {
              alertTn('标记残图成功')
            }
          } else if (res.errorMessage) {
            alertTn(res.errorMessage)
          }
        })
      },
      // 获取重点句子的列表时
      _getKeySentences(params) {
        getKeySentences(params).then((res) => {
          this.handleImportFunc(res.list)
        })
      },
      // 获取重点图片的方法
      _getImportImg(params) {
        getImportImg(params).then((res) => {
          this.handleImportFunc(res.returnJson)
        })
      },
      // 处理重点图片和重点句子的公共方法
      handleImportFunc(data) {
        let len = data.length
        this.sentenceArr = data
        for (let i = 0; i < len; i++) {
          this.sentenceArr.splice(i, 1, Object.assign({}, this.sentenceArr[i], {
            lastSentenceArr: [],
            nextSentenceArr: [],
            getlastSentenceUri: '',
            getNextSentenceUri: '',
            unfold: false
          }))
        }
        // 设置读第一句的时候
        this.readText = data[this.readIndex].text
      },
      // 点击读的按钮的时候
      readSentence() {
        let audio = this.$refs.totalAudio
        if (audio.paused) {
          audio.play()
        } else {
          audio.pause()
        }
      },
      // 每一条读完的时候读下一句
      readNextText() {
        let ele = this.$refs.totalAudio
        ele.addEventListener('ended', (e) => {
          if (this.current.index === this.readIndex && this.current.num === 3) {
            this.readIndex --
          } else {
            let oThis = this.$refs.listItem[this.readIndex]
            let oHeight = oThis.offsetTop + 300
            scrollTo(0, oHeight)
          }
          this.readIndex ++
          if (this.sentenceArr[this.readIndex].text) {
            this.readText = this.sentenceArr[this.readIndex].text
            this.$nextTick(() => {
              ele.play()
            })
          } else {
            this.readText = this.sentenceArr[0].text
          }
        })
      }
    },
    components: {
      Loading,
      ScrollTop
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import "~common/stylus/mixin"

  .content
    padding: 20px 26px 0
    background-color: $color-highlight-background
  .icon-ting
    position: absolute
    top: 0
    right: 20px
    padding: 12px
    font-size: 40px
    color: #fff
    &:active
      background-color: $color-theme-active
  .list-item
    margin-bottom: 26px
    background-color: #fff
    border-radius: 8px
    .list-content
      padding: 0 30px
    .get-sentence-arrow
      height: 65px
      .iconfont
        display: block
        height: 100%
        font-size: 42px
        text-align: center
    .sentence-box
      height: 402px
      transition: all 0.5s
      transform: translate3d(0, 0, 0)
      &.unfold
        height: 842px
      .sentence-section
        height: 330px
        overflow-y: scroll
        transition: all 0.5s
        transform: translate3d(0, 0, 0);
        &.unfold
          height: 770px
        .section-index
          height: 45px
          margin-bottom: 20px
          line-height: 45px
          text-align: left
          font-size: $font-size-medium
          font-weight: 800
      .book-name
        height: 72px
        padding-left: 20px
        line-height: 72px
        no-wrap()
        text-align: right
    .list-footer
      display: flex
      flex-direction: row
      height: 110px
      .footer-item
        position: relative
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

  /* 盒子中有图片的情况 */
  .sentence-content
    .img
      width: 100%
      padding-top: 15px
    .text
      display: inline-block
      width: 100%
      padding: 10px 0 15px
      text-align: center
      font-style: normal
    .important-sentence
      display: inline-block
      font-weight: 700
  /* 背景图 */
  .bgs_0
    background: url("bgs_0.png") no-repeat left bottom
    background-size: 100%
  .bgs_1
    background: url("bgs_1.png") no-repeat left bottom
    background-size: 100%
  .bgs_2
    background: url("bgs_2.png") no-repeat left bottom
    background-size: 100%
  /* 标记的弹窗 */
  .mark-box
    position: absolute
    width: 188px
    height: 75px
    left: 50%
    bottom: 126px
    margin-left: -94px
    z-index: 100
    background-color: #4e4a4a
    border-radius: 10px
    span
      display: inline-block
      width: 47%
      height: 60px
      line-height: 60px
      margin-top: 8px
      color: #fff
      cursor: pointer
    .mark-good
      border-right: 1px solid #fff
    .mark-arrow
      position: absolute
      left: 78px
      bottom: -15px
      font-size: 0px
      border-width: 13px
      border-bottom-width: 0
      border-style: dashed
      border-top-style: solid
      border-color: #4e4a4a
      border-left-color: transparent
      border-right-color: transparent
  /* 加载等待 */
  .loading-container
    position: absolute
    width: 100%
    top: 300px
    margin-left: -26px
</style>
