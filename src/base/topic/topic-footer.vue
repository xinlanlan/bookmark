<template>
  <div class="topic-footer">
    <div class="know-search">
      <span @click="getSentenceByUri(uri)" class="search-sentence">查看知识点</span>
      <span @click="changeMeet(uri)" :class="{active: learn === 1}" class="meet">已会</span>
    </div>
    <div class="footer">
      <div class="footer-item"></div>
      <div :class="{active: isLike === 0}" class="footer-item">
        <i class="iconfont icon-zan"></i>
        <span>{{goodNumber}}</span>
      </div>
      <div :class="{active: isLike === 2}" class="footer-item">
        <i class="iconfont icon-cai"></i>
        <span>{{badNumber}}</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {updateEmpQuestion} from './page'
  import {ERR_OK} from 'api/config'

  export default {
    props: {
      learn: {
        type: Number,
        default: 0
      },
      goodNumber: {
        type: Number,
        default: 0
      },
      badNumber: {
        type: Number,
        default: 0
      },
      isLike: {
        type: Number,
        default: 1
      },
      uri: {
        type: String,
        default: ''
      },
      index: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        learnOver: true   // 已会不会开关（返回成功才可以点击下一次）
      }
    },
    methods: {
      getSentenceByUri(uri) {
        this.$emit('listen-footer', {
          uri: uri
        })
      },
      // 改变已会不会状态
      changeMeet(uri) {
        if (this.learnOver) {
          this.learnOver = false
          let learnVal = 0
          if (this.learn === 0) {
            learnVal = 1
          } else {
            learnVal = 0
          }
          updateEmpQuestion({
            questionId: uri,
            questionStatus: learnVal
          }).then((res) => {
            if (res.code === ERR_OK) {
              this.learnOver = true
            }
          })
        }
      }
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .know-search
    line-height: 44px
    margin-bottom: 42px
    text-align: right
    .search-sentence
      display: inline-block
      color: $color-theme
    .meet
      display: inline-block
      margin-left: 34px
      padding: 0 8px
      border-radius: 6px
      text-align: center
      background-color: #d7d7d7
      color: #fff
      cursor: pointer
      &.active
        background-color: $color-theme
  .footer
    display: flex
    height: 69px
    .footer-item
      flex: 1
      line-height: 69px
      text-align: center
      font-size: 26px
      border-top: 1px solid #ddd
      .iconfont
        margin-right: 8px
        font-size: 30px
      &.active
        color: $color-theme
</style>
