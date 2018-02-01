<template>
  <div class="pie-chart" ref="pieChart"></div>
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
      this.getPie()
    },
    methods: {
      getPie() {
        this.chart = Echarts.init(this.$refs.pieChart)
        let option = {
          legend: {
            bottom: '5%',
            textStyle: {
              fontSize: FONTSIZE
            },
            data: this.dataText
          },
          series: [
            {
              type: 'pie',
              radius: '70%',
              center: ['50%', '45%'],
              data: this.pieData,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                normal: {
                  label: {
                    show: true,
                    formatter: '{d}%({c})',
                    textStyle: {fontSize: FONTSIZE}
                  },
                  labelLine: {show: true}
                }
              }
            }
          ]
        }
        this.chart.setOption(option)
      }
    },
    computed: {
      pieData() {
        let arr = []
        for (let i = 0; i < this.dataText.length; i++) {
          arr.push({
            value: this.dataArr[i],
            name: this.dataText[i]
          })
        }
        return arr
      }
    },
    watch: {
      dataArr() {
        this.getPie()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .pie-chart
    height: 560px
</style>
