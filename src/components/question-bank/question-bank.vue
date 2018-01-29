<template>
  <div class="page">
    <m-header :data="headerText" :leftArrow="true">
      <span class="iconfont icon-upload upload-save"></span>
    </m-header>
    <pull-list class="pull-list"></pull-list>
    <topic-list :judgeList="judgeList"
                :radioList="radioList"
                :multipleList="multipleList"
                :sketchList="sketchList"
                :discussList="discussList"
    >
    </topic-list>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header'
  import PullList from 'base/pull-list/pull-list'
  import TopicList from 'base/topic/topic-list'
  import {getQuestionList} from './page'
  const OTYPE_0 = 0   // 判断题
  const OTYPE_1 = 1   // 单选题
  const OTYPE_2 = 2   // 多选题
  const OTYPE_3 = 3   // 论述题
  const OTYPE_4 = 4   // 简答题
  const OTYPE_5 = 5   // 填空题

  export default {
    data() {
      return {
        headerText: '题库自测',
        judgeList: [],
        radioList: [],
        multipleList: [],
        sketchList: [],
        discussList: [],
        gapList: []
      }
    },
    created() {
      this._getQuestionList()
    },
    methods: {
      // 获取试题列表接口
      _getQuestionList() {
        let uri = this.$route.query.bookUri
        getQuestionList(uri).then((res) => {
          console.log(res)
          let data = res.list
          let len = data.length
          for (let i = 0; i < len; i++) {
            if (data[i].type === OTYPE_0) {
              this.judgeList.push(data[i])
            } else if (data[i].type === OTYPE_1) {
              this.radioList.push(data[i])
            } else if (data[i].type === OTYPE_2) {
              this.multipleList.push(data[i])
            } else if (data[i].type === OTYPE_3) {
              this.discussList.push(data[i])
            } else if (data[i].type === OTYPE_4) {
              this.sketchList.push(data[i])
            } else if (data[i].type === OTYPE_5) {
              this.gapList.push(data[i])
            }
          }
        })
      }
    },
    components: {
      MHeader,
      PullList,
      TopicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .page
    background-color: $color-highlight-background
  .upload-save
    position: absolute
    display: block
    height: 84px
    right: 20px
    top: 0
    padding: 0 10px
    line-height: 84px
    font-size: 42px
    color: #fff
  .pull-list
    margin-bottom: 8px
</style>
