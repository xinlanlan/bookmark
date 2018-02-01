<template>
  <div class="read">
    <total :data="totalInfo"></total>
    <div class="chart">
      <!-- 阅读次数统计图 -->
      <div class="chart-item">
        <echart-model :title="readNumTitle" v-on:tab-view="tabViewVal1"></echart-model>
        <histogram v-if="tabNumVal === 0"
                   :legend-name="numLegendName"
                   :y-axis-text-name="numYAxisTextName"
                   :data-text="numDataText"
                   :data-arr="numDataArr"
        ></histogram>
        <line-chart v-if="tabNumVal === 1"
                    :legend-name="numLegendName"
                    :y-axis-text-name="numYAxisTextName"
                    :data-text="numDataText"
                    :data-arr="numDataArr"
        ></line-chart>
        <pie-chart v-if="tabNumVal === 2"
                   :legend-name="numLegendName"
                   :y-axis-text-name="numYAxisTextName"
                   :data-text="numDataText"
                   :data-arr="numDataArr"
        ></pie-chart>
      </div>
      <!-- 阅读时长统计图 -->
      <div class="chart-item">
        <echart-model :title="readTimeTitle" v-on:tab-view="tabViewVal2"></echart-model>
        <histogram v-if="tabTimeVal === 0"
                   :legend-name="timeLegendName"
                   :y-axis-text-name="timeYAxisTextName"
                   :data-text="timeDataText"
                   :data-arr="timeDataArr"
        ></histogram>
        <line-chart v-if="tabTimeVal === 1"
                    :legend-name="timeLegendName"
                    :y-axis-text-name="timeYAxisTextName"
                    :data-text="timeDataText"
                    :data-arr="timeDataArr"
        ></line-chart>
        <pie-chart v-if="tabTimeVal === 2"
                   :legend-name="timeLegendName"
                   :y-axis-text-name="timeYAxisTextName"
                   :data-text="timeDataText"
                   :data-arr="timeDataArr"
        ></pie-chart>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Total from 'base/statistics/total'
  import EchartModel from 'base/echarts/echart-model'
  import Histogram from 'base/echarts/histogram'
  import LineChart from 'base/echarts/line-chart'
  import PieChart from 'base/echarts/pie-chart'
  import {ERR_OK} from 'api/config'
  import {getReadNum, getReadTime} from 'api/statistics'
  import {getWeekDayStr} from 'common/js/date'
  const TABVALDEAULT = 0

  export default {
    data() {
      return {
        totalTime: 0,
        totalNum: 0,
        tabNumVal: TABVALDEAULT,
        tabTimeVal: TABVALDEAULT,
        readNumTitle: '阅读次数统计图',
        numLegendName: '次数',
        numYAxisTextName: '次数',
        numDataText: ['全书阅读', '回到知识点', '回到原文'],
        numDataArr: [],
        readTimeTitle: '最近一周阅读时长图',
        timeLegendName: '分钟',
        timeYAxisTextName: '分钟',
        timeDataArr: []
      }
    },
    computed: {
      totalInfo() {
        let arr = [
          {
            text: '累计阅读时长',
            info: `${this.totalTime}分钟`
          },
          {
            text: '累计次数统计',
            info: `${this.totalNum}次`
          }
        ]
        return arr
      },
      timeDataText() {
        return getWeekDayStr()
      }
    },
    created() {
      this._getReadNum()
      this._getReadTime()
    },
    methods: {
      // 第一个视图的切换（通过子组件传递值触发）
      tabViewVal1(val) {
        this.tabNumVal = val
      },
      // 第二个视图的切换通过子组件传递值触发）
      tabViewVal2(val) {
        this.tabTimeVal = val
      },
      // 获取阅读次数的方法
      _getReadNum() {
        getReadNum().then((res) => {
          if (parseInt(res.code) === ERR_OK) {
            delete res['code']
            for (let key in res) {
              this.totalNum += res[key]
              this.numDataArr.push(res[key])
            }
          }
        })
      },
      // 获取阅读时长的方法
      _getReadTime() {
        getReadTime().then((res) => {
          if (parseInt(res.code) === ERR_OK) {
            this.totalTime = res.totalTime
            this.timeDataArr.push(res.firstDayTime)
            this.timeDataArr.push(res.secondDayTime)
            this.timeDataArr.push(res.thirdDayTime)
            this.timeDataArr.push(res.fourthDayTime)
            this.timeDataArr.push(res.fifthDayTime)
            this.timeDataArr.push(res.sixthDayTime)
            this.timeDataArr.push(res.seventhDayTime)
          }
        })
      }
    },
    components: {
      Total,
      EchartModel,
      Histogram,
      LineChart,
      PieChart
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .chart
    padding-top: 12px
    .chart-item
      background-color: #fff
      &:last-child
        margin-top: 12px
</style>
