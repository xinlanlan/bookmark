<template>
  <div class="total">
    <div class="item">
      <span class="icon"></span>
      <span class="text">累计阅读时长</span>
      <span class="info">112分钟</span>
    </div>
    <div class="item">
      <span class="icon"></span>
      <span class="text">阅读次数统计</span>
      <span class="info">20次</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .total
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
