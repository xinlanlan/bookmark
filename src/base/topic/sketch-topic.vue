<template>
  <div class="sketch">
    <topic-name :name="sketch.name" :index="sketch.index" :num="data.length"></topic-name>
    <div v-for="(item, index) in data" class="topic-item">
      <p class="question-header">
        <span class="question-num">{{index+1}}</span>
        <span class="question-header-text">.{{item.content}}</span>
      </p>
      <div class="user-answer-box">
        <textarea class="user-answer"></textarea>
      </div>
      <topic-footer></topic-footer>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import TopicName from 'base/topic/topic-name'
  import TopicFooter from 'base/topic/topic-footer'

  export default {
    props: {
      data: {
        type: Array,
        default: null
      }
    },
    data() {
      return {
        sketch: {
          index: '四',
          name: '简答题'
        }
      }
    },
    components: {
      TopicName,
      TopicFooter
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .sketch
    background-color: #fff
  .topic-item
    padding: 36px 40px 0
    border-bottom: 10px solid #f5f5f5
    .user-answer-box
      height: 274px
      margin: 12px 0 90px
    .user-answer
      height: 100%
      padding: 0 20px
      border: 1px solid $color-theme
</style>
