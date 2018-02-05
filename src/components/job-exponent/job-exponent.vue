<template>
  <div class="exponent">
    <div class="banner"></div>
    <div class="sel-date">
      <i class="iconfont icon-search search-btn"></i>
      <span class="start-time" v-text="startTimeText"></span>
      <span>-</span>
      <span class="end-time" v-text="endTimeText"></span>
    </div>
    <div class="tab-box">
      <div v-for="(item, index) in tabArr"
           :class="{active: index === tabVal}"
           @click="tabContentType(index)"
           class="tab-item"
      >
        <span class="tab-item-text">{{item.text}}</span>
        <span class="tab-item-border"></span>
      </div>
    </div>
    <div class="list">
      <div v-for="(item, index) in contentArr" class="list-item">
        <div class="item-top">
          <div class="item-num">{{index}}</div>
          <div v-if="item.text" class="item-content">{{item.text}}</div>
          <div v-else class="item-content">
            <img v-lazy="imgBaseUrl + item.filePath" class="img" alt="">
          </div>
        </div>
        <div class="item-footer">
          <i class="iconfont icon-eye"></i>
          <span class="eye-text">{{item.total}}次阅读</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getWeekMill, getDateString} from 'common/js/date'
  import {getExponentSentence, getExponentWord, getExponentImg} from 'api/statistics'
  import {ERR_OK, imgBaseUrl} from 'api/config'
  const TABVALDEFAULT = 0
  const PAGESIZE = 15

  export default {
    data() {
      return {
        startTime: '',
        endTime: '',
        startTimeText: '',
        endTimeText: '',
        tabVal: TABVALDEFAULT,
        contentArr: [],
        imgBaseUrl: imgBaseUrl + '/bookpicture/',
        tabArr: [
          {
            text: '句',
            page: 1,
            arr: []
          },
          {
            text: '词',
            page: 1,
            arr: []
          },
          {
            text: '图',
            page: 1,
            arr: []
          }
        ]
      }
    },
    created() {
      // 时间的处理
      this.startTime = getWeekMill().startTime
      this.endTime = getWeekMill().endTime
      this.startTimeText = getDateString(this.startTime * 1000)
      this.endTimeText = getDateString(this.endTime * 1000 - 3600 * 24 * 1000)
      this._getExponentSentence(this.tabArr[0].page, PAGESIZE)
    },
    methods: {
      // 切换试图
      tabContentType(index) {
        this.tabVal = index
        if (this.tabArr[index].arr.length) {
          this.contentArr = this.tabArr[index].arr
          return
        }
        if (index === 1) {
          this._getExponentWord(this.tabArr[index].page, PAGESIZE)
          return
        }
        if (index === 2) {
          this._getExponentImg(this.tabArr[index].page, PAGESIZE)
          return
        }
      },
      // 获取句子的方法
      _getExponentSentence(page, pageSize) {
        getExponentSentence(this.startTime, this.endTime, page, pageSize).then((res) => {
          if (parseInt(res.code) === ERR_OK) {
            this.contentArr = res.list
            this.tabArr[0].arr = res.list
          }
        })
      },
      // 获取词的方法
      _getExponentWord(page, pageSize) {
        getExponentWord(this.startTime, this.endTime, page, pageSize).then((res) => {
          if (parseInt(res.code) === ERR_OK) {
            this.contentArr = res.list
            this.tabArr[1].arr = res.list
          }
        })
      },
      // 获取图片的方法
      _getExponentImg(page, pageSize) {
        getExponentImg(this.startTime, this.endTime, page, pageSize).then((res) => {
          if (parseInt(res.code) === ERR_OK) {
            this.contentArr = res.list
            this.tabArr[2].arr = res.list
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .banner
    height: 394px
    background: url("banner.png") no-repeat
    background-size: 100% 100%
  .sel-date
    height: 70px
    line-height: 70px
    padding: 0 26px
    background-color: #e5e5e5
    .start-time, .end-time
      font-size: 28px
    .search-btn
      vertical-align: middle
      font-size: 46px
  .tab-box
    display: flex
    height: 86px
    padding: 0 100px
    border-bottom: 1px solid #ddd
    .tab-item
      flex: 1
      display: flex
      flex-direction: column
      padding: 12px 0 15px
      text-align: center
      justify-content: center
      .tab-item-border
        width: 48px
        height: 8px
        margin-left: 50%
        transform: translateX(-50%)
        border-radius: 4px
        background-color: #CCCCCC
      &:nth-child(1).active
        .tab-item-text
          color: #7cdfdb
        .tab-item-border
          background: linear-gradient(to right,#80e0dc,#8ae9e5)
      &:nth-child(2).active
        .tab-item-text
          color: #ffcb8c
        .tab-item-border
          background: linear-gradient(to right,#ffcd90,#ffd991)
      &:nth-child(3).active
        .tab-item-text
          color: #ff8f76
        .tab-item-border
          background: linear-gradient(to right,#ff947c,#ff9b5e)
  .list-item
    padding-top: 36px
    border-bottom: 1px solid #ddd
    .item-top
      display: flex
      min-height: 82px
      .item-num
        display: flex
        flex-direction: column
        flex: 0 0 100px
        width: 100px
        justify-content: center
        text-align: center
        font-size: 38px
        color: #81e5e5
      .item-content
        flex: 1
        padding-right: 42px
        .img
          width: 100%
    .item-footer
      padding-right: 52px
      padding-bottom: 10px
      text-align: right
      color: #959595
      .icon-eye
        font-size: 26px
      .eye-text
        font-size: 26px
    &:nth-child(1)
      .item-num
        background: url("rank_1.png") no-repeat
        background-size: 100%
        background-position: 0 12px
        color: transparent
    &:nth-child(2)
      .item-num
        background: url("rank_2.png") no-repeat
        background-size: 100%
        background-position: 0 12px
        color: transparent
    &:nth-child(3)
      .item-num
        background: url("rank_3.png") no-repeat
        background-size: 100%
        background-position: 0 12px
        color: transparent
</style>
