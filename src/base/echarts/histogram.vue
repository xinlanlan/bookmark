<template>
  <div class="histogram" ref="histogram"></div>
</template>

<script type="text/ecmascript-6">
  import Echarts from 'echarts'
  const FONTSIZE = 18
  const BARCOLOR = '#03a9f4'

  export default {
    data() {
      return {
        legendName: '考试成绩',
        xAxisTextName: '',
        yAxisTextName: '考试成绩',
        dataText: ['优秀', '良好', '合格', '不合格'],
        dataArr: [10, 52, 200, 334],
        chart: null
      }
    },
    mounted() {
      this.getHistogram()
    },
    methods: {
      getHistogram() {
        this.chart = Echarts.init(this.$refs.histogram)
        let option = {
          color: [BARCOLOR],
          legend: {
            data: [this.legendName],
            textStyle: {
              fontSize: FONTSIZE
            }
          },
          xAxis: [
            {
              type: 'category',
              data: this.dataText,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: this.yAxisTextName,
              nameTextStyle: {
                fontSize: FONTSIZE
              }
            }
          ],
          series: [
            {
              name: this.yAxisTextName,
              type: 'bar',
              barWidth: '50%',
              data: this.dataArr
            }
          ]
        }
        this.chart.setOption(option)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .histogram
    height: 560px
</style>
