<template>
  <div v-show="showDialog" class="know-dialog">
    <div class="aui-mask aui-mask-in"></div>
    <div class="aui-dialog aui-dialog-in">
      <div @click="closeDialog" class="aui-close-btn">
        <i class="iconfont icon-close"></i>
      </div>
      <div class="aui-dialog-header">知识点</div>
      <div class="aui-dialog-body">
        <span>在企业责任杂志基于环境、经济和社会价值方面的表现的100家最佳企业公民中，持续位列榜首。</span>
      </div>
      <div class="aui-dialog-name">《微软案例之高管薪酬》</div>
      <div class="aui-dialog-footer">
        <div class="aui-dialog-btn">上十句</div>
        <div class="aui-dialog-btn">下十句</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        showDialog: false
      }
    },
    created() {
      this.showDialog = this.show
    },
    methods: {
      closeDialog() {
        this.showDialog = false
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  .aui-dialog
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
  .aui-dialog-header
    height: 55px
  .aui-dialog-body
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
    padding-bottom: 19px
</style>
