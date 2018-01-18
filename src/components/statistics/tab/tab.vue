<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/statistics/read">
      <span class="tab-link">阅读分析</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/statistics/test">
      <span class="tab-link">考试分析</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .tab
    display: flex
    height: 86px
    border-bottom: 1px solid #ddd
    background-color: #fff
    .tab-item
      flex: 1
      text-align: center
      .tab-link
        display: block
        height: 83px
        margin: 0 90px
        line-height: 83px
      &.router-link-active
        .tab-link

          color: $color-theme
          border-bottom: 4px solid $color-theme
</style>
