<template>
  <div class="topic-footer">
    <div class="know-search">
      <span class="search-sentence">查看知识点</span>
      <span :class="{active: learn === 1}" class="meet">已会</span>
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
