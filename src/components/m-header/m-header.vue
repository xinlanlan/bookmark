<template>
  <div class="header">
    <div v-if="leftArrow" class="left-arrow" @click="backLastPage">
      <span class="arrow-left"></span>
    </div>
    <div class="title">{{data}}</div>
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      data: {
        type: String,
        default: '头部'
      },
      leftArrow: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      backLastPage() {
        this.$router.go(-1)
        // this.$emit('back-page')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .header
    position: relative
    height: 84px
    background-color: $color-theme
    .left-arrow
      position: absolute
      width: 30px
      height: 100%
      left: 0
      top: 0
      padding: 0 30px
      .arrow-left
        margin-top: 25px
        arrow-left(26px, 2px, #fff)
      &:active
        background-color: $color-theme-active
    .title
      width: 100%
      line-height: 84px
      text-align: center
      font-size: $font-size-medium-x
      color: #fff
</style>
