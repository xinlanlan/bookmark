<template>
  <div class="container">
    <div class="header">
      <h1 class="title">阅读次数统计图</h1>
    </div>
    <div class="tab-chart">
      <ul class="tab-btn-group">
        <li class="btn-item active">柱状</li>
        <li class="btn-item">折线</li>
        <li class="btn-item">饼状</li>
      </ul>
    </div>
    <div class="chart">
      <e-chart></e-chart>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import EChart from './echart'

  export default {
    components: {
      EChart
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .container
    background: #fff
  .header
    padding: 0 17px
    .title
      height: 90px
      line-height: 90px
      padding: 0 22px
      font-size: $font-size-medium
      font-weight: 300
      border-bottom: 1px solid #ddd
  .tab-chart
    height: 112px
    .tab-btn-group
      float: right
      display: flex
      flex-direction: row
      width: 302px
      height: 48px
      line-height: 48px
      margin-right: 20px
      margin-top: 32px
      justify-content: center
      border: 1px solid $color-theme
      border-radius: 6px
      .btn-item
        flex: 1
        text-align: center
        &.active
          color: #fff
          background-color: $color-theme
</style>
