<template>
  <div class="my-code">
    <m-header :data="headerText" :leftArrow="true"></m-header>
    <div class="content">
      <total :data="totalInfo"></total>
      <!-- 积分构成图 -->
      <div class="chart-item">
        <echart-model :title="codeConstitute.codeTitle" :positionIndex="1" v-on:tab-view="tabViewVal1"></echart-model>
        <histogram v-if="codeConstitute.tabCodeVal === 0"
                   :legend-name="codeConstitute.codeLegendName"
                   :y-axis-text-name="codeConstitute.codeYAxisTextName"
                   :data-text="codeConstitute.codeDataText"
                   :data-arr="codeConstitute.codeDataArr"
        ></histogram>
        <line-chart v-if="codeConstitute.tabCodeVal === 1"
                    :legend-name="codeConstitute.codeLegendName"
                    :y-axis-text-name="codeConstitute.codeYAxisTextName"
                    :data-text="codeConstitute.codeDataText"
                    :data-arr="codeConstitute.codeDataArr"
        ></line-chart>
        <pie-chart v-if="codeConstitute.tabCodeVal === 2"
                   :legend-name="codeConstitute.codeLegendName"
                   :y-axis-text-name="codeConstitute.codeYAxisTextName"
                   :data-text="codeConstitute.codeDataText"
                   :data-arr="codeConstitute.codeDataArr"
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
  import {getPersonalTotalScore} from 'api/statistics'
  import {getWeekMill} from 'common/js/date'
  import {ERR_OK} from 'api/config'
  const TABVALDEAULT = 0

  export default {
    data() {
      return {
        headerText: '我的积分',
        // 总积分总排行的基本信息
        totalInfo: [
          {
            text: '当前名次',
            info: ''
          },
          {
            text: '总积分',
            info: ''
          }
        ],
        totalNum: 0,
        totalRank: 1,
        // 积分构成图的相关信息
        codeConstitute: {
          codeTitle: '积分构成图',
          tabCodeVal: TABVALDEAULT,
          codeLegendName: '积分',
          codeYAxisTextName: '积分',
          codeDataText: ['匹配积分', '考试积分', '阅读积分'],
          codeDataArr: []
        }
      }
    },
    created() {
      let timeParams = getWeekMill()
      this._getPersonalTotalScore(timeParams.startTime, timeParams.endTime)
    },
    methods: {
      // 第一个视图的切换（通过子组件传递值触发）
      tabViewVal1(val) {
        this.codeConstitute.tabCodeVal = val
      },
      _getPersonalTotalScore(startTime, endTime) {
        getPersonalTotalScore(startTime, endTime).then((res) => {
          console.log(res)
          if (parseInt(res.code) === ERR_OK) {
            this.totalInfo[0].info = `第${res.userInfo.paiming}名`
            this.totalInfo[1].info = `${res.userInfo.totalScore}分`
            this.codeConstitute.codeDataArr.push(
              res.scoreInfo.jixiaojifen,
              res.scoreInfo.kaoshijifen,
              res.scoreInfo.yuedujifen
            )
          }
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

  .my-code
    height: 100vh
    background-color: $color-highlight-background
  .content
    padding: 0 22px
    .chart-item
      margin-top: 22px
      border-radius: 12px
      background-color: #fff
</style>
