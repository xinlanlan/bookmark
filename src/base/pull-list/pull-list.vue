<template>
  <div class="select">
    <div @click.stop="unfoldList(index)" v-for="(item, index) in filterArr" class="filter">
      <span class="text">{{item.text}}</span>
      <span class="iconfont icon-pull-down"></span>
      <ul v-if="item.unfold" class="filter-pull">
        <li @click.stop="changeFilterType(index, num)"
            v-for="(cell, num) in item.pullList"
            :class="{active: num === item.defaultActive}"
            class="pull-item"
            v-text="cell"
        >
        </li>
      </ul>
    </div>
    <!--<div class="filter">
      <span class="text">考试程度</span>
      <span class="iconfont icon-pull-down"></span>
      <ul class="filter-pull">
        <li class="pull-item active">全部</li>
        <li class="pull-item">已会</li>
        <li class="pull-item">不会</li>
      </ul>
    </div>-->
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        filterArr: [
          {
            title: '筛选题型',
            text: '筛选题型',
            pullList: ['全部', '判断题', '简答题'],
            defaultActive: 0,
            unfold: false
          },
          {
            title: '考试程度',
            text: '考试程度',
            pullList: ['全部', '已会', '不会'],
            defaultActive: 0,
            unfold: false
          }
        ]
      }
    },
    created() {
      document.addEventListener('click', (e) => {
        for (let i = 0; i < this.filterArr.length; i++) {
          this.filterArr[i].unfold = false
        }
      })
    },
    methods: {
      unfoldList(index) {
        for (let i = 0; i < this.filterArr.length; i++) {
          if (index === i) {
            this.filterArr[index].unfold = !this.filterArr[index].unfold
          } else {
            this.filterArr[i].unfold = false
          }
        }
      },
      changeFilterType(index, num) {
        let cell = this.filterArr[index]
        cell.defaultActive = num
        cell.unfold = false
        if (num === 0) {
          cell.text = cell.title
        } else {
          cell.text = cell.pullList[num]
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .select
    padding: 0 40px
    color: $color-theme
    border-bottom: 1px solid #ddd
    background-color: #fff
    .filter
      position: relative
      display: inline-block
      width: 180px
      height: 73px
      margin-right: 10px
      line-height: 73px
      text-align: center
      .iconfont
        font-size: 30px
      .filter-pull
        position: absolute
        width: 180px
        left: 0
        top: 73px
        background-color: #fff
        box-shadow: 0 6px 16px rgba(0,0,0,0.2)
        .pull-item
          height: 72px
          line-height: 72px
          text-align: center
          color: #000
          border-bottom: 1px solid #ddd
          &.active
            color: $color-theme
            background-color: #dbf1e7
</style>
