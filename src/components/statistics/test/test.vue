<template>
  <div class="test">
    <total :data="totalInfo"></total>
    <div class="chart">
      <!-- 仿真测试统计结果 -->
      <div class="chart-item">
        <echart-model :title="realTestTitle" :tabChartBtnGroup="false"></echart-model>
        <line-histogram :yAxisTextName1="realTestYAxisTextName1"
                        :yAxisTextName2="realTestYAxisTextName2"
                        :dataText="testDataText"
                        :dataArr1="realTestDataArr1"
                        :dataArr2="realTestDataArr2"
        ></line-histogram>
      </div>
      <!-- 最近提一周考试时长图 -->
      <div class="chart-item">
        <echart-model :title="testTimeTitle" v-on:tab-view="tabViewVal"></echart-model>
        <histogram v-if="tabTestVal === 0"
                   :legend-name="testTimeLegendName"
                   :y-axis-text-name="testTimeYAxisTextName"
                   :data-text="testDataText"
                   :data-arr="testTimeDataArr"
        ></histogram>
        <line-chart v-if="tabTestVal === 1"
                    :legend-name="testTimeLegendName"
                    :y-axis-text-name="testTimeYAxisTextName"
                    :data-text="testDataText"
                    :data-arr="testTimeDataArr"
        ></line-chart>
        <pie-chart v-if="tabTestVal === 2"
                   :legend-name="testTimeLegendName"
                   :y-axis-text-name="testTimeYAxisTextName"
                   :data-text="testDataText"
                   :data-arr="testTimeDataArr"
        ></pie-chart>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Total from 'base/statistics/total'
  import EchartModel from 'base/echarts/echart-model'
  import LineHistogram from 'base/echarts/line-histogram'
  import Histogram from 'base/echarts/histogram'
  import LineChart from 'base/echarts/line-chart'
  import PieChart from 'base/echarts/pie-chart'
  import {ERR_OK} from 'api/config'
  import {getTotalTest, getTestTime, getRealTest} from 'api/statistics'
  import {getWeekDayStr} from 'common/js/date'
  const TABVALDEFAULT = 0

  export default {
    data() {
      return {
        totalTime: 0,
        totalNum: 0,
        realTestTitle: '仿真测试统计图',
        realTestYAxisTextName1: '考试次数',
        realTestYAxisTextName2: '合格率',
        realTestDataArr1: [],
        realTestDataArr2: [],
        testTimeTitle: '最近一周考试时长图',
        tabTestVal: TABVALDEFAULT,
        testTimeLegendName: '分钟',
        testTimeYAxisTextName: '分钟',
        testTimeDataArr: []
      }
    },
    computed: {
      totalInfo() {
        let arr = [
          {
            text: '累计考试时长',
            info: `${this.totalTime}分钟`
          },
          {
            text: '累计考试次数',
            info: `${this.totalNum}次`
          }
        ]
        return arr
      },
      // 获取最近7天的日期字符串
      testDataText() {
        return getWeekDayStr()
      }
    },
    created() {
      this._getRealTest()
      this._getTestTime()
      this._getTotalTest()
    },
    methods: {
      tabViewVal(val) {
        this.tabTestVal = val
      },
      // 获取考试总时长和次数
      _getTotalTest() {
        getTotalTest().then((res) => {
          if (parseInt(res.code) === ERR_OK) {
            this.totalTime = res.testTotalTime
            this.totalNum = res.testTotalCount
          }
        })
      },
      // 获取考试时长
      _getTestTime() {
        getTestTime().then((res) => {
          if (parseInt(res.code) === ERR_OK) {
            this.testTimeDataArr.push(res.firstDayTime)
            this.testTimeDataArr.push(res.secondDayTime)
            this.testTimeDataArr.push(res.thirdDayTime)
            this.testTimeDataArr.push(res.fourthDayTime)
            this.testTimeDataArr.push(res.fifthDayTime)
            this.testTimeDataArr.push(res.sixthDayTime)
            this.testTimeDataArr.push(res.seventhDayTime)
          }
        })
      },
      // 获取仿真测试统计图
      _getRealTest() {
        getRealTest().then((res) => {
          this.realTestDataArr1.push(res.firstDayCount)
          this.realTestDataArr1.push(res.secondDayCount)
          this.realTestDataArr1.push(res.thirdDayCount)
          this.realTestDataArr1.push(res.fourthDayCount)
          this.realTestDataArr1.push(res.fifthDayCount)
          this.realTestDataArr1.push(res.sixthDayCount)
          this.realTestDataArr1.push(res.seventhDayCount)

          this.realTestDataArr2.push(res.firstDayPassRatio)
          this.realTestDataArr2.push(res.secondDayPassRatio)
          this.realTestDataArr2.push(res.thirdDayPassRatio)
          this.realTestDataArr2.push(res.fourthDayPassRatio)
          this.realTestDataArr2.push(res.fifthDayPassRatio)
          this.realTestDataArr2.push(res.sixthDayPassRatio)
          this.realTestDataArr2.push(res.seventhDayPassRatio)
        })
      }
    },
    components: {
      Total,
      EchartModel,
      LineHistogram,
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
