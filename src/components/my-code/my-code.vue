<template>
  <div class="my-code">
    <m-header :data="headerText" :leftArrow="true"></m-header>
    <div class="content">
      <total :data="totalInfo"></total>
      <!-- 积分构成图 -->
      <div class="chart-item">
        <echart-model :title="codeConstitute.codeTitle" :positionIndex="1" v-on:tab-view="tabViewVal1"></echart-model>
        <histogram v-if="tabCodeVal === 0"
                   :legend-name="codeConstitute.codeLegendName"
                   :y-axis-text-name="codeConstitute.codeYAxisTextName"
                   :data-text="codeConstitute.codeDataText"
                   :data-arr="codeConstitute.codeDataArr"
        ></histogram>
        <line-chart v-if="tabCodeVal === 1"
                    :legend-name="codeConstitute.codeLegendName"
                    :y-axis-text-name="codeConstitute.codeYAxisTextName"
                    :data-text="codeConstitute.codeDataText"
                    :data-arr="codeConstitute.codeDataArr"
        ></line-chart>
        <pie-chart v-if="tabCodeVal === 2"
                   :legend-name="codeConstitute.codeLegendName"
                   :y-axis-text-name="codeConstitute.codeYAxisTextName"
                   :data-text="codeConstitute.codeDataText"
                   :data-arr="codeConstitute.codeDataArr"
        ></pie-chart>
      </div>
      <!-- 积分详情图 -->
      <div class="chart-item">
        <echart-model :title="codeDetail.detailTitle" :positionIndex="1" v-on:tab-view="tabViewVal2">
          <ul class="tab-data">
            <li @click="getCodeDetail(index)"
                v-for="(item, index) in codeDetailTextArr"
                :class="{active: index === codeDetailTextVal}"
                class="tab-data-item"
                v-text="item"
            >
            </li>
          </ul>
        </echart-model>
        <histogram v-if="tabDetailVal === 0"
                   :legend-name="codeDetail.detailLegendName"
                   :y-axis-text-name="codeDetail.detailYAxisTextName"
                   :data-text="codeDetail.detailDataText"
                   :data-arr="codeDetail.detailDataArr"
        ></histogram>
        <line-chart v-if="tabDetailVal === 1"
                    :legend-name="codeDetail.detailLegendName"
                    :y-axis-text-name="codeDetail.detailYAxisTextName"
                    :data-text="codeDetail.detailDataText"
                    :data-arr="codeDetail.detailDataArr"
        ></line-chart>
        <pie-chart v-if="tabDetailVal === 2"
                   :legend-name="codeDetail.detailLegendName"
                   :y-axis-text-name="codeDetail.detailYAxisTextName"
                   :data-text="codeDetail.detailDataText"
                   :data-arr="codeDetail.detailDataArr"
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
  import {getPersonalTotalScore, getPersonalPositionScore, getPersonalTestScore, getPersonalReadScore} from 'api/statistics'
  import {getWeekMill} from 'common/js/date'
  import {ERR_OK} from 'api/config'
  const TABVALDEAULT = 0
  const DETAILDATETEXT_1 = ['岗位价值', '执行力', '总结文本']
  const DETAILDATETEXT_2 = ['仿真考试', '题库测试']
  const DETAILDATETEXT_3 = ['全书阅读', '题库阅读', '智能阅读', '知识点阅读']

  export default {
    data() {
      return {
        headerText: '我的积分',
        startTime: '',
        endTime: '',
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
        tabCodeVal: TABVALDEAULT,
        codeConstitute: {
          codeTitle: '积分构成图',
          codeLegendName: '积分',
          codeYAxisTextName: '积分',
          codeDataText: ['匹配积分', '考试积分', '阅读积分'],
          codeDataArr: []
        },
        // 积分详情图的相关信息
        tabDetailVal: TABVALDEAULT,
        codeDetail: {
          detailTitle: '积分详情图',
          detailLegendName: '积分',
          detailYAxisTextName: '积分',
          detailDataText: DETAILDATETEXT_1,
          detailDataArr: []
        },
        codeDetailTextArr: ['绩效积分', '考试积分', '阅读积分'],
        codeDetailTextVal: TABVALDEAULT,
        detailDataArr1: [],
        detailDataArr2: [],
        detailDataArr3: []
      }
    },
    created() {
      // 初始化开始和结束时间
      let timeParams = getWeekMill()
      this.startTime = timeParams.startTime
      this.endTime = timeParams.endTime

      this._getPersonalTotalScore(this.startTime, this.endTime)
      this._getPersonalPositionScore(this.startTime, this.endTime)
      this._getPersonalTestScore(this.startTime, this.endTime)
      this._getPersonalReadScore(this.startTime, this.endTime)
    },
    methods: {
      // 第一个视图的切换（通过子组件传递值触发）
      tabViewVal1(val) {
        this.tabCodeVal = val
      },
      // 第二个视图的切换（通过子组件传递值触发）
      tabViewVal2(val) {
        this.tabDetailVal = val
      },
      // 获取积分构成图
      _getPersonalTotalScore(startTime, endTime) {
        getPersonalTotalScore(startTime, endTime).then((res) => {
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
      },
      // 获取积分详情图的方法
      getCodeDetail(index) {
        if (this.codeDetailTextVal === index) {
          return
        }
        this.codeDetailTextVal = index
        if (index === 0) {
          this.codeDetail.detailDataText = DETAILDATETEXT_1
          this.codeDetail.detailDataArr = this.detailDataArr1
          return
        }
        if (index === 1) {
          this.codeDetail.detailDataText = DETAILDATETEXT_2
          this.codeDetail.detailDataArr = this.detailDataArr2
          return
        }
        if (index === 2) {
          this.codeDetail.detailDataText = DETAILDATETEXT_3
          this.codeDetail.detailDataArr = this.detailDataArr3
          return
        }
      },
      // 绩效积分的接口
      _getPersonalPositionScore(startTime, endTime) {
        getPersonalPositionScore(startTime, endTime).then((res) => {
          console.log(res)
          if (parseInt(res.code) === ERR_OK) {
            this.codeDetail.detailDataArr.push(
              res.jixiaoCountInfoMap.gangweiScore,
              res.jixiaoCountInfoMap.wenbenScore,
              res.jixiaoCountInfoMap.zhixingliScore
            )
            this.detailDataArr1 = this.codeDetail.detailDataArr
          }
        })
      },
      // 考试积分接口
      _getPersonalTestScore() {
        getPersonalTestScore(this.startTime, this.endTime).then((res) => {
          if (parseInt(res.code) === ERR_OK) {
            this.detailDataArr2.push(
              res.kaoShiCountInfoMap.fangzhenkaoshiScore,
              res.kaoShiCountInfoMap.tikukaoshiScore
            )
          }
        })
      },
      // 阅读积分的接口
      _getPersonalReadScore() {
        getPersonalReadScore(this.startTime, this.endTime).then((res) => {
          if (parseInt(res.code) === ERR_OK) {
            this.detailDataArr3.push(
              res.yueduCountInfo.quanshuyueduScore,
              res.yueduCountInfo.shitiyueduScore,
              res.yueduCountInfo.zhinengyueduScore,
              res.yueduCountInfo.zhishidianyueduScore
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
    background-color: $color-highlight-background
  .content
    padding: 12px 22px 30px
    .chart-item
      margin-top: 22px
      border-radius: 8px
      background-color: #fff
  /* 插槽的部分 */
  .tab-data
    display: flex
    padding: 0 16px
    .tab-data-item
      flex: 1
      height: 80px
      line-height: 80px
      text-align: center
      border-bottom: 4px solid transparent
      &.active
        border-color: $color-theme
</style>
