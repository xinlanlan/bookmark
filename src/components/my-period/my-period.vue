<template>
  <div class="my-period">
    <m-header :data="headerText" :leftArrow="true"></m-header>
    <div class="content">
      <total :data="totalInfo"></total>
      <!-- 我的总学时构成图 -->
      <div class="chart-item">
        <echart-model :title="period.title" :positionIndex="1" v-on:tab-view="tabViewVal"></echart-model>
        <histogram v-if="tabPeriodVal === 0"
                   :legend-name="period.periodLegendName"
                   :y-axis-text-name="period.periodYAxisTextName"
                   :data-text="period.periodDataText"
                   :data-arr="period.periodDataArr"
        ></histogram>
        <line-chart v-if="tabPeriodVal === 1"
                    :legend-name="period.periodLegendName"
                    :y-axis-text-name="period.periodYAxisTextName"
                    :data-text="period.periodDataText"
                    :data-arr="period.periodDataArr"
        ></line-chart>
        <pie-chart v-if="tabPeriodVal === 2"
                   :legend-name="period.periodLegendName"
                   :y-axis-text-name="period.periodYAxisTextName"
                   :data-text="period.periodDataText"
                   :data-arr="period.periodDataArr"
        ></pie-chart>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header'
  import Total from 'base/statistics/total'
  import EchartModel from 'base/echarts/echart-model'
  import Histogram from 'base/echarts/histogram'
  import LineChart from 'base/echarts/line-chart'
  import PieChart from 'base/echarts/pie-chart'
  import {getTotalPeriod} from 'api/statistics'
  import {getWeekMill} from 'common/js/date'

  export default {
    data() {
      return {
        headerText: '我的学时',
        totalInfo: [
          {
            text: '总学时',
            info: ''
          }
        ],
        startTime: '',
        endTime: '',
        tabPeriodVal: 0,
        period: {
          title: '总学时构成图',
          periodLegendName: '学时',
          periodYAxisTextName: '学时',
          periodDataText: ['阅读学时', '考试学时'],
          periodDataArr: []
        }
      }
    },
    created() {
      // 初始化时间
      this.startTime = getWeekMill().startTime
      this.endTime = getWeekMill().endTime
      this._getTotalPeriod()
    },
    methods: {
      // 第一个视图的切换（通过子组件传递值触发）
      tabViewVal(val) {
        this.tabPeriodVal = val
      },
      _getTotalPeriod() {
        getTotalPeriod(this.startTime, this.endTime).then((res) => {
          this.totalInfo[0].info = `${res.TotalTime}分钟`
          this.period.periodDataArr.push(res.readTotalTime, res.testTotalTime)
        })
      }
    },
    components: {
      MHeader,
      Total,
      EchartModel,
      Histogram,
      LineChart,
      PieChart
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .my-period
    background-color: $color-highlight-background
    min-height: 100vh
  .content
    padding: 12px 22px
    .chart-item
      margin-top: 20px
      background-color: #fff
</style>
