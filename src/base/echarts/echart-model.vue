<template>
  <div class="container">
    <div class="header">
      <h1 class="title">阅读次数统计图</h1>
    </div>
    <div class="tab-chart">
      <ul class="tab-btn-group">
        <li v-for="(item, index) in tabArr" @click="tabChart(index)" :class="{active: item.tabActive}" class="btn-item">{{item.text}}</li>
      </ul>
    </div>
    <!--<e-chart :tab-val="tabDefaultVal"></e-chart>-->
    <histogram v-if="tabVal === 0"></histogram>
    <line-chart v-if="tabVal === 1"></line-chart>
    <pie-chart v-if="tabVal === 2"></pie-chart>
  </div>
</template>

<script type="text/ecmascript-6">
  import Histogram from './histogram'
  import LineChart from './line-chart'
  import PieChart from './pie-chart'
  const TABDAFAULTVAL = 0

  export default {
    data() {
      return {
        tabArr: [
          {
            text: '柱状',
            value: 0,
            tabActive: true
          },
          {
            text: '折线',
            value: 1,
            tabActive: false
          },
          {
            text: '饼状',
            value: 2,
            tabActive: false
          }
        ],
        tabVal: TABDAFAULTVAL
      }
    },
    methods: {
      tabChart(index) {
        if (index === this.tabArr[index].value) {
          if (this.tabArr[index].tabActive) {
            return
          }
          for (let i = 0; i < this.tabArr.length; i++) {
            this.tabArr[i].tabActive = false
          }
          this.tabArr[index].tabActive = true
          this.tabVal = this.tabArr[index].value
        }
      }
    },
    components: {
      Histogram,
      LineChart,
      PieChart
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .container
    background: #fff
  .header
    padding: 0 17px
    .title
      height: 90px
      line-height: 90px
      padding: 0 22px
      font-size: $font-size-medium
      font-weight: 300
      border-bottom: 1px solid #ddd
  .tab-chart
    height: 112px
    .tab-btn-group
      float: right
      display: flex
      flex-direction: row
      width: 302px
      height: 48px
      line-height: 48px
      margin-right: 20px
      margin-top: 32px
      justify-content: center
      border: 1px solid $color-theme
      border-radius: 6px
      .btn-item
        flex: 1
        text-align: center
        &.active
          color: #fff
          background-color: $color-theme
</style>
