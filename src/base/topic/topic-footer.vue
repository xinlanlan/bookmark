<template>
  <div class="topic-footer">
    <div class="know-search">
      <span class="search-sentence">查看知识点</span>
      <span class="meet">已会</span>
    </div>
    <div class="footer">
      <div class="footer-item"></div>
      <div class="footer-item active">
        <i class="iconfont icon-zan"></i>
        <span>4</span>
      </div>
      <div class="footer-item">
        <i class="iconfont icon-cai"></i>
        <span>2</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

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
      border-radius: 10px
      text-align: center
      background-color: #d7d7d7
      color: #fff
      cursor: pointer
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
