<template>
  <div class="container">
    <div class="header">
      <div class="header-box">
        <h1 class="title" :class="positionClass[positionIndex]">{{title}}</h1>
        <slot></slot>
      </div>
    </div>
    <div v-if="tabChartBtnGroup" class="tab-chart">
      <ul class="tab-btn-group">
        <li v-for="(item, index) in tabArr" @click="tabChart(index)" :class="{active: item.tabActive}" class="btn-item">{{item.text}}</li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      // 默认为0居左，1居中，2居右
      positionIndex: {
        type: Number,
        default: 0
      },
      title: {
        type: String,
        default: '标题'
      },
      tabChartBtnGroup: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        positionClass: ['left', 'center', 'right'],
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
        ]
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
          this.$emit('tab-view', this.tabArr[index].value)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .header
    padding: 0 17px
    .header-box
      border-bottom: 1px solid #ddd
    .title
      height: 90px
      line-height: 90px
      font-size: $font-size-medium
      font-weight: 300
      &.left
        text-align: left
      &.center
        text-align: center
      &.right
        text-align: right
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
