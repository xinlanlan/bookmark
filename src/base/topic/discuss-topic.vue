<template>
  <div class="discuss">
    <topic-name :name="discuss.name" :index="discuss.index" :num="discuss.num"></topic-name>
    <div class="topic-item">
      <p class="question-header">
        <span class="question-num">5</span>
        <span class="question-header-text">.在企业责任杂志基于环境、经济和社会价值方面的表现的85家最佳企业公民中，持续位列榜首。</span>
      </p>
      <div class="user-answer-box">
        <textarea class="user-answer"></textarea>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import TopicName from 'base/topic/topic-name'

  export default {
    data() {
      return {
        discuss: {
          index: '五',
          name: '论述题',
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
  @import "~common/stylus/variable"

  .discuss
    background-color: #fff
  .topic-item
    padding: 0 40px 10px
    border-bottom: 10px solid #f5f5f5
    .user-answer-box
      height: 274px
      margin: 12px 0 10px
    .user-answer
      height: 100%
      padding: 0 20px
      border: 1px solid $color-theme
</style>
