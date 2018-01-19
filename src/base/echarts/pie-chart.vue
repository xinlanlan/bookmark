<template>
  <div class="pie-chart" ref="pieChart"></div>
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
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .pie-chart
    height: 560px
</style>
