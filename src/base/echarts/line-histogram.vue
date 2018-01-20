<template>
  <div class="line-histogram" ref="lineHistogram"></div>
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
      yAxisTextName1: {
        type: String,
        default: 'y轴柱状图名字'
      },
      yAxisTextName2: {
        type: String,
        default: 'y轴折线图名字'
      },
      dataText: {
        type: Array,
        default: null
      },
      dataArr1: {
        type: Array,
        default: null
      },
      dataArr2: {
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
      this.getLineHistogram()
    },
    methods: {
      getLineHistogram() {
        this.chart = Echarts.init(this.$refs.lineHistogram)
        let maxs = Math.max.apply(null, this.dataArr1)
        let splitNum = 0
        if (maxs === 0) {
          splitNum = 1
        } else if (maxs > 0 && maxs < 6) {
          splitNum = maxs
        } else {
          splitNum = 5
        }
        let option = {
          legend: {
            data: [this.yAxisTextName1, this.yAxisTextName2],
            textStyle: {
              fontSize: FONTSIZE
            }
          },
          xAxis: {
            type: 'category',
            data: this.dataText,
            axisLabel: {
              show: true,
              interval: 0,
              textStyle: {
                fontSize: FONTSIZE
              }
            }
          },
          yAxis: [
            {
              type: 'value',
              name: this.yAxisTextName1,
              nameTextStyle: {fontSize: FONTSIZE},
              axisLabel: {
                formatter: '{value}',
                margin: 4,
                textStyle: {fontSize: FONTSIZE}
              },
              splitNumber: splitNum,
              min: 0,
              minInterval: 1
            },
            {
              type: 'value',
              name: this.yAxisTextName2,
              offset: -5,
              min: 0,
              max: 100,
              nameTextStyle: {fontSize: FONTSIZE},
              axisLabel: {
                formatter: '{value}%',
                textStyle: {fontSize: FONTSIZE}
              }
            }
          ],
          series: [
            {name: this.yAxisTextName1, type: 'bar', data: this.dataArr1},
            {name: this.yAxisTextName2, type: 'line', yAxisIndex: 1, data: this.dataArr2}
          ]
        }
        this.chart.setOption(option)
      }
    },
    watch: {
      dataArr1() {
        this.getLineHistogram()
      },
      dataArr2() {
        this.getLineHistogram()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .line-histogram
    height: 560px
</style>
