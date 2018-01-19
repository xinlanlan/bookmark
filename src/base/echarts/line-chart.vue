<template>
  <div class="line-chart" ref="lineChart"></div>
</template>

<script type="text/ecmascript-6">
  import Echarts from 'echarts'
  const FONTSIZE = 18

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
      this.getLineChart()
    },
    methods: {
      getLineChart() {
        this.chart = Echarts.init(this.$refs.lineChart)
        let option = {
          legend: {
            data: [this.legendName],
            textStyle: {
              fontSize: FONTSIZE
            }
          },
          xAxis: {
            type: 'category',
            data: this.dataText,
            axisTick: {
              alignWithLabel: true
            }
          },
          yAxis: [
            {
              type: 'value',
              name: this.yAxisTextName,
              nameTextStyle: {fontSize: FONTSIZE}
            }
          ],
          series: [
            {
              name: this.yAxisTextName,
              type: 'line',
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
  .line-chart
    height: 560px
</style>
