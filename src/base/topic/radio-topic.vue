<template>
  <div class="radio">
    <topic-name :name="radio.name" :index="radio.index" :num="data.length"></topic-name>
    <div v-for="(item, index) in data" class="topic-item">
      <p class="question-header">
        <span class="question-num">{{index+1}}</span>
        <span class="question-header-text">.{{item.content}}</span>
      </p>
      <div class="sel-box">
        <label v-for="cell in item.optionList" class="sel-row"><input class="aui-radio" type="radio" name="radio">&nbsp;&nbsp;{{cell.option + '.' + cell.content}}</label>
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
        radio: {
          index: '二',
          name: '单选题'
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
  .radio
    background-color: #fff
  .topic-item
    padding: 36px 40px 0
    border-bottom: 10px solid #f5f5f5
  .sel-box
    margin-top: 12px
    padding-bottom: 90px
    .sel-row
      display: block
      height: 72px
      line-height: 72px
      .aui-radio
        vertical-align: middle
</style>

