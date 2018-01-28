<template>
  <div class="judge">
    <topic-name :name="judge.name" :index="judge.index" :num="judge.num"></topic-name>
    <div class="topic-item">
      <p class="question-header">
        <span class="question-num">1</span>
        <span class="question-header-text">.在企业责任杂志基于环境、经济和社会价值方面的表现的85家最佳企业公民中，持续位列榜首。</span>
      </p>
      <div class="sel-box">
        <label class="sel-row"><input class="aui-radio" type="radio" name="radio">&nbsp;&nbsp;A.对</label>
        <label class="sel-row"><input class="aui-radio" type="radio" name="radio">&nbsp;&nbsp;B.错</label>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import TopicName from 'base/topic/topic-name'

  export default {
    data() {
      return {
        judge: {
          index: '一',
          name: '判断题',
          num: 10
        }
      }
    },
    components: {
      TopicName
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .judge
    background-color: #fff
  .topic-item
    padding: 0 40px 10px
    border-bottom: 10px solid #f5f5f5
  .sel-box
    margin-top: 12px
    .sel-row
      display: block
      height: 72px
      line-height: 72px
      .aui-radio
        vertical-align: middle

</style>
