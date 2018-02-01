<template>
  <div class="line-chart" ref="lineChart"></div>
</template>

<script type="text/ecmascript-6">
  import Echarts from 'echarts'
  const FONTSIZE = 18

  export default {
    props: {
      legendName: {
        type: String,
        default: '题头'
      },
      xAxisTextName: {
        type: String,
        default: 'x轴'
      },
      yAxisTextName: {
        type: String,
        default: 'y轴'
      },
      dataText: {
        type: Array,
        default: null
      },
      dataArr: {
        type: Array,
        default: null
      }
    },
    data() {
      return {
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
    },
    watch: {
      dataArr() {
        this.getLineChart()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .line-chart
    height: 560px
</style>
