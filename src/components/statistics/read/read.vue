<template>
  <div class="read">
    <total></total>
    <div class="chart">
      <div class="chart-item">
        <echart-model></echart-model>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Total from '../total/total'
  import EchartModel from 'base/echarts/echart-model'

  export default {
    components: {
      Total,
      EchartModel
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .read
    padding-top: 12px
  .chart
    padding-top: 12px
</style>
