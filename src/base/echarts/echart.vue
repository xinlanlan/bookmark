<template>
  <div class="chart" ref="chart"></div>
</template>

<script type="text/ecmascript-6">
  import Echarts from 'echarts'
  const FONTSIZE = 18
  const BARCOLOR = '#03a9f4'

  export default {
    props: {
      tabVal: {
        type: Number,
        default: 0
      }
    },
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
      this.drawChart()
    },
    methods: {
      // 柱状图的方法
      getHistogram() {
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
      },
      // 折线图的方法
      getLineChart() {
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
      },
      // 获取饼图的方法
      getPie() {
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
      },
      // 判断渲染不同的图表方法
      drawChart() {
        this.chart = Echarts.init(this.$refs.chart)
        if (this.tabVal === 0) {
          this.getHistogram()
        } else if (this.tabVal === 1) {
          this.getLineChart()
        } else if (this.tabVal === 2) {
          this.getPie()
        }
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
      tabVal() {
        this.drawChart()
      }
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .chart
    height: 560px
</style>
