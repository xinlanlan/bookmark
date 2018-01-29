<template>
  <div class="title">
    <span>{{index}}、</span>
    <span>{{name}}</span>
    <span>({{num}}道)</span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      index: {
        type: String,
        default: '一'
      },
      name: {
        type: String,
        default: '试题类型名称'
      },
      num: {
        type: Number,
        default: 0
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .title
    padding: 30px 40px 0
    background-color: #fff
</style>
