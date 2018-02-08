<template>
  <div class="scroll-top">
    <div v-if="showBtn" @click="scrollTo" class="scroll-btn"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        showBtn: false
      }
    },
    created() {
      document.addEventListener('scroll', () => {
        let h = 0
        if (document.body.scrollTop) {
          h = document.body.scrollTop
        } else {
          h = document.documentElement.scrollTop
        }
        if (h > 700) {
          this.showBtn = true
        } else {
          this.showBtn = false
        }
      })
    },
    methods: {
      scrollTo() {
        scroll(0, 0)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .scroll-top
    position: fixed
    right: 25px
    bottom: 12%
    .scroll-btn
      width: 75px
      height: 75px
      background: url("timg.png") no-repeat
      background-size: 100% 100%
</style>
