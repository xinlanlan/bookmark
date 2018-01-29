<template>
  <div class="topic-footer">
    <div class="know-search">
      <span @click="getSentenceByUri(uri)" class="search-sentence">查看知识点</span>
      <span @click="changeMeet(id)" :class="{active: learn === 1}" class="meet">已会</span>
    </div>
    <div class="footer">
      <div class="footer-item"></div>
      <div @click="changeLike(id, 0)" :class="{active: isLike === 0}" class="footer-item">
        <i class="iconfont icon-zan"></i>
        <span>{{goodNumber}}</span>
      </div>
      <div @click="changeLike(id, 1)" :class="{active: isLike === 2}" class="footer-item">
        <i class="iconfont icon-cai"></i>
        <span>{{badNumber}}</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {updateEmpQuestion} from './page'
  import {ERR_OK} from 'api/config'
  import {alertTn} from 'common/js/confirm'

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
      id: {
        type: String,
        default: ''
      },
      index: {
        type: Number,
        default: 0
      },
      typeIndex: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        learnVal: 0,
        learnOver: true,   // 已会不会开关（返回成功才可以点击下一次）
        isLikeVal: 0,
        isLikeOver: true
      }
    },
    methods: {
      // 点击回到原文
      getSentenceByUri(uri) {
        this.$emit('listen-footer', {
          uri: uri
        })
      },
      // 改变已会不会状态
      changeMeet(id) {
        if (this.learnOver) {
          this.learnOver = false
          if (this.learn === 0) {
            this.learnVal = 1
          } else {
            this.learnVal = 0
          }
          this.$emit('listen-footer', {
            learn: this.learnVal,
            typeIndex: this.typeIndex,
            index: this.index
          })
          updateEmpQuestion({
            questionId: id,
            questionStatus: this.learnVal
          }).then((res) => {
            if (res.code === ERR_OK) {
              this.learnOver = true
            }
          })
        }
      },
      // 改变喜欢不喜欢(oType为0时表示点击赞按钮，为1时表示点击踩按钮)
      changeLike(id, oType) {
        if (this.isLikeOver) {
          this.isLikeOver = false
          if (oType === 0 && this.isLike === 2) {
            alertTn('您已经踩过该题，请取消上次操作才能继续本次操作哟')
            this.isLikeOver = true
            return
          }
          if (oType === 1 && this.isLike === 0) {
            alertTn('您已经赞过该题，请取消上次操作才能继续本次操作哟')
            this.isLikeOver = true
            return
          }
          if (oType === 0 && this.isLike === 0) {
            this.isLikeVal = 1
          }
          if (oType === 0 && this.isLike === 1) {
            this.isLikeVal = 0
          }
          if (oType === 1 && this.isLike === 2) {
            this.isLikeVal = 1
          }
          if (oType === 1 && this.isLike === 1) {
            this.isLikeVal = 2
          }
          this.$emit('listen-footer', {
            isLike: this.isLikeVal,
            typeIndex: this.typeIndex,
            index: this.index,
            oType: oType
          })
          updateEmpQuestion({
            questionId: id,
            questionLike: this.isLikeVal
          }).then((res) => {
            if (res.code === ERR_OK) {
              this.isLikeOver = true
            }
          })
        }
      }
    },
    watch: {
      learn() {
        this.learnVal = this.learn
      },
      isLike() {
        this.isLikeVal = this.isLike
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
