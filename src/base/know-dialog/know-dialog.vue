<template>
  <div v-show="show" class="know-dialog1">
    <div class="aui-mask1 aui-mask-in1"></div>
    <div class="aui-dialog1 aui-dialog-in1">
      <div @click="closeDialog" class="aui-close-btn">
        <i class="iconfont icon-close"></i>
      </div>
      <div class="aui-dialog-header1">知识点</div>
      <div class="aui-dialog-body1">
        <span v-for="item in lastSentence">{{item.text}}</span>
        <span style="font-weight: 800">{{text}}</span>
        <span v-for="item in nextSentence">{{item.text}}</span>
      </div>
      <div class="aui-dialog-name">《{{name}}》</div>
      <div class="aui-dialog-footer1">
        <div @click="_getLastSentence" class="aui-dialog-btn1">上十句</div>
        <div @click="_getNextSentence" class="aui-dialog-btn1">下十句</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getSentenceByUri, getLastSentence, getNextSentence} from 'api/get-sentence'
  import {alertTn} from 'common/js/confirm'

  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      uri: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        name: '',
        text: '',
        getLastSentenceUri: '',
        getNextSentenceUri: '',
        lastSentence: [],
        nextSentence: []
      }
    },
    methods: {
      // 获取原文句子
      _getSentenceByUri(uri) {
        getSentenceByUri(uri).then((res) => {
          this.name = res.name
          this.text = res.text
        })
      },
      // 获取上十句
      _getLastSentence() {
        getLastSentence(this.getLastSentenceUri).then((res) => {
          let len = res.returnJson
          if (len === 0) {
            alertTn('没有上文了')
          }
          this.getLastSentenceUri = res.returnJson[0].uri
          this.lastSentence = res.returnJson.concat(this.lastSentence)
        })
      },
      // 获取下十句
      _getNextSentence() {
        getNextSentence(this.getNextSentenceUri).then((res) => {
          let len = res.returnJson
          if (len === 0) {
            alertTn('没有下文了')
          }
          this.getNextSentenceUri = res.returnJson[res.returnJson.length - 1].uri
          this.nextSentence = this.nextSentence.concat(res.returnJson)
        })
      },
      closeDialog() {
        this.$emit('close-dialog')
      }
    },
    watch: {
      uri() {
        this.getLastSentenceUri = this.uri
        this.getNextSentenceUri = this.uri
        this.lastSentence = []
        this.nextSentence = []
        this._getSentenceByUri(this.uri)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  .aui-dialog1
    width: 544px
    margin-left: -272px
    top: 20%
    text-align: left !important
  .aui-close-btn
    position: absolute
    right: 19px
    top: 11px
    cursor: pointer
    .iconfont
      font-size: 37px
  .aui-dialog-header1
    height: 55px
  .aui-dialog-body1
    max-height: 506px
    margin-top: 10px
    padding: 0 28px
    overflow: scroll
    span
      font-size: 26px
  .aui-dialog-name
    padding-right: 30px
    font-size: 24px
    text-align: right
    padding: 19px
</style>
