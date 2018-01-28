<template>
  <div class="page">
    <m-header :data="headerText" :leftArrow="true">
      <span class="iconfont icon-upload upload-save"></span>
    </m-header>
    <pull-list class="pull-list"></pull-list>
    <judge-topic></judge-topic>
    <radio-topic></radio-topic>
    <multiple-topic></multiple-topic>
    <sketch-topic></sketch-topic>
    <discuss-topic></discuss-topic>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header'
  import PullList from 'base/pull-list/pull-list'
  import JudgeTopic from 'base/topic/judge-topic'
  import RadioTopic from 'base/topic/radio-topic'
  import MultipleTopic from 'base/topic/multiple-topic'
  import SketchTopic from 'base/topic/sketch-topic'
  import DiscussTopic from 'base/topic/discuss-topic'
  import {getQuestionList} from './page'

  export default {
    data() {
      return {
        headerText: '题库自测'
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
        })
      }
    },
    components: {
      MHeader,
      PullList,
      JudgeTopic,
      RadioTopic,
      MultipleTopic,
      SketchTopic,
      DiscussTopic
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
