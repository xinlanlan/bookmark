<template>
  <div class="page">
    <m-header :data="headerText" :leftArrow="true">
      <span class="iconfont icon-upload upload-save"></span>
    </m-header>
    <pull-list></pull-list>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header'
  import PullList from 'base/pull-list/pull-list'

  export default {
    data() {
      return {
        headerText: '题库自测'
      }
    },
    components: {
      MHeader,
      PullList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
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
</style>
