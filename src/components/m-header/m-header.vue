<template>
  <div class="header">
    <div class="title">{{data}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      data: {
        type: String,
        default: '头部'
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .header
    height: 84px
    background-color: $color-theme
    .title
      width: 100%
      line-height: 84px
      text-align: center
      font-size: $font-size-medium-x
      color: #fff
</style>
