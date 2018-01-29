<template>
  <div class="topic-list">
    <!-- 判断题 -->
    <div v-if="judgeList.length" class="judge">
      <topic-name :name="judge.name" :index="judge.index" :num="judgeList.length"></topic-name>
      <div v-for="(item, index) in judgeList" class="topic-item">
        <p class="question-header">
          <span class="question-num">{{index+1}}</span>
          <span class="question-header-text">.{{item.content}}</span>
        </p>
        <div class="sel-box">
          <label class="sel-row"><input class="aui-radio" type="radio" name="radio">&nbsp;&nbsp;A.对</label>
          <label class="sel-row"><input class="aui-radio" type="radio" name="radio">&nbsp;&nbsp;B.错</label>
        </div>
        <topic-footer :learn="item.learn" :good-number="item.goodNumber" :bad-number="item.badNumber" :is-like="item.isLike"></topic-footer>
      </div>
    </div>
    <!-- 单选题 -->
    <div v-if="radioList.length" class="radio">
      <topic-name :name="radio.name" :index="radio.index" :num="radioList.length"></topic-name>
      <div v-for="(item, index) in radioList" class="topic-item">
        <p class="question-header">
          <span class="question-num">{{index+1}}</span>
          <span class="question-header-text">.{{item.content}}</span>
        </p>
        <div class="sel-box">
          <label v-for="cell in item.optionList" class="sel-row"><input class="aui-radio" type="radio" name="radio">&nbsp;&nbsp;{{cell.option + '.' + cell.content}}</label>
        </div>
        <topic-footer :learn="item.learn" :good-number="item.goodNumber" :bad-number="item.badNumber" :is-like="item.isLike"></topic-footer>
      </div>
    </div>
    <!-- 多选题 -->
    <div v-if="multipleList.length" class="multiple">
      <topic-name :name="multiple.name" :index="multiple.index" :num="multipleList.num"></topic-name>
      <div class="topic-item">
        <p class="question-header">
          <span class="question-num">2</span>
          <span class="question-header-text">.在企业责任杂志基于环境、经济和社会价值方面的表现的85家最佳企业公民中，持续位列榜首。</span>
        </p>
        <div class="sel-box">
          <label class="sel-row"><input class="aui-checkbox" type="checkbox" name="radio">&nbsp;&nbsp;A.对</label>
          <label class="sel-row"><input class="aui-checkbox" type="checkbox" name="radio">&nbsp;&nbsp;B.错</label>
          <label class="sel-row"><input class="aui-checkbox" type="checkbox" name="radio">&nbsp;&nbsp;C.对</label>
          <label class="sel-row"><input class="aui-checkbox" type="checkbox" name="radio">&nbsp;&nbsp;D.错</label>
        </div>
        <topic-footer></topic-footer>
      </div>
    </div>
    <!-- 简答题 -->
    <div v-if="sketchList.length" class="sketch">
      <topic-name :name="sketch.name" :index="sketch.index" :num="sketchList.length"></topic-name>
      <div v-for="(item, index) in sketchList" class="topic-item">
        <p class="question-header">
          <span class="question-num">{{index+1}}</span>
          <span class="question-header-text">.{{item.content}}</span>
        </p>
        <div class="user-answer-box">
          <textarea class="user-answer"></textarea>
        </div>
        <topic-footer :learn="item.learn" :good-number="item.goodNumber" :bad-number="item.badNumber" :is-like="item.isLike"></topic-footer>
      </div>
    </div>
    <!-- 论述题 -->
    <div v-if="discussList.length" class="discuss">
      <topic-name :name="discuss.name" :index="discuss.index" :num="discussList.num"></topic-name>
      <div class="topic-item">
        <p class="question-header">
          <span class="question-num">5</span>
          <span class="question-header-text">.在企业责任杂志基于环境、经济和社会价值方面的表现的85家最佳企业公民中，持续位列榜首。</span>
        </p>
        <div class="user-answer-box">
          <textarea class="user-answer"></textarea>
        </div>
        <topic-footer></topic-footer>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import TopicName from 'base/topic/topic-name'
  import TopicFooter from 'base/topic/topic-footer'

  export default {
    props: {
      judgeList: {
        type: Array,
        default: null
      },
      radioList: {
        type: Array,
        default: null
      },
      multipleList: {
        type: Array,
        default: null
      },
      sketchList: {
        type: Array,
        default: null
      },
      discussList: {
        type: Array,
        default: null
      }
    },
    data() {
      return {
        judge: {
          index: '一',
          name: '判断题'
        },
        radio: {
          index: '二',
          name: '单选题'
        },
        multiple: {
          index: '三',
          name: '多选题',
          num: 10
        },
        sketch: {
          index: '四',
          name: '简答题'
        },
        discuss: {
          index: '五',
          name: '论述题',
          num: 10
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

  .topic-list
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
        .aui-radio,.aui-checkbox
          vertical-align: middle
    .user-answer-box
      height: 274px
      margin: 12px 0 90px
    .user-answer
      height: 100%
      padding: 0 20px
      border: 1px solid $color-theme
</style>
