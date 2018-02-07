<template>
  <div class="total">
    <div v-for="item in data" class="item">
      <span class="icon"></span>
      <span class="text">{{item.text}}</span>
      <span class="info">{{item.info}}</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      data: {
        type: Array,
        default: null
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
      clear: both
      .icon
        float: left
        width: 50px
      .text
        float: left
      .info
        float: right
        color: $color-theme
      &:last-child
        border: none
</style>
