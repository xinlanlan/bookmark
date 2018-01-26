<template>
  <div class="select">
    <div class="filter">
      <span class="text">筛选题型</span>
      <span class="iconfont icon-pull-down"></span>
    </div>
    <div class="filter">
      <span class="text">考试程度</span>
      <span class="iconfont icon-pull-down"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .select
    padding: 0 40px
    color: $color-theme
    border-bottom: 1px solid #ddd
    .filter
      position: relative
      display: inline-block
      width: 190px
      height: 73px
      line-height: 73px
      .iconfont
        font-size: 30px
</style>
