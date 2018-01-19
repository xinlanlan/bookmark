<template>
  <div class="histogram" ref="histogram"></div>
</template>

<script type="text/ecmascript-6">
  import Echarts from 'echarts'
  const FONTSIZE = 18
  const BARCOLOR = '#03a9f4'

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
    },
    watch: {
      dataArr() {
        this.getHistogram()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .histogram
    height: 560px
</style>
