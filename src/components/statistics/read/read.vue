<template>
  <div class="read">
    <total></total>
    <div class="chart">
      <div class="chart-item">
        <echart-model :title="readNumTitle"
                      :legend-name="readLegendName"
                      :y-axis-text-name="readYAxisTextName"
                      :data-text="readDataText"
                      :data-arr="readDataArr"
        >
        </echart-model>
      </div>
      <div class="chart-item">
        <echart-model :title="readTimeTitle"
                      :legend-name="timeLegendName"
                      :y-axis-text-name="timeYAxisTextName"
                      :data-text="timeDataText"
                      :data-arr="timeDataArr"
        >
        </echart-model>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Total from '../total/total'
  import EchartModel from 'base/echarts/echart-model'
  import {ERR_OK} from 'api/config'
  import {getReadNum, getReadTime} from './page'

  export default {
    data() {
      return {
        readNumTitle: '阅读次数统计图',
        numLegendName: '次数',
        numYAxisTextName: '次数',
        numDataText: ['全书阅读', '回到知识点', '回到原文'],
        numDataArr: [],
        readTimeTitle: '最近一周阅读时长图',
        timeLegendName: '分钟',
        timeYAxisTextName: '分钟',
        timeDataText: [1, 2, 3, 4, 5, 6, 7],
        timeDataArr: []
      }
    },
    created() {
      this._getReadNum()
      this._getReadTime()
    },
    methods: {
      _getReadNum() {
        getReadNum().then((res) => {
          if (parseInt(res.code) === ERR_OK) {
            delete res['code']
            for (let key in res) {
              this.readDataArr.push(res[key])
            }
          }
        })
      },
      _getReadTime() {
        getReadTime().then((res) => {
          console.log(res)
        })
      }
    },
    components: {
      Total,
      EchartModel
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .read
    padding-top: 12px
  .chart
    padding-top: 12px
</style>
