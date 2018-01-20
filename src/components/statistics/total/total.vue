<template>
  <div class="total">
    <div class="item">
      <span class="icon"></span>
      <span class="text">{{totalTimeText}}</span>
      <span class="info">{{totalTime}}分钟</span>
    </div>
    <div class="item">
      <span class="icon"></span>
      <span class="text">{{totalNumText}}</span>
      <span class="info">{{totalNum}}次</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      totalTimeText: {
        type: String,
        default: '第一个文字说明'
      },
      totalNumText: {
        type: String,
        default: '第二个文字说明'
      },
      totalTime: {
        type: Number,
        default: 0
      },
      totalNum: {
        type: Number,
        default: 0
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .total
    margin-top: 12px
    background-color: #fff
    .item
      height: 95px
      line-height: 95px
      padding: 0 37px
      border-bottom: 1px solid #ddd
      .icon
        float: left
        width: 50px
      .text
        float: left
      .info
        float: right
        color: $color-theme
</style>
