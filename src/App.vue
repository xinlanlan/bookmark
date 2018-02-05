<template>
	<div id="app">
    <transition :name="transitionName">
      <router-view class="router"></router-view>
    </transition>
	</div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        transitionName: 'slide-right'  // 默认动态路由变化为slide-right
      }
    },
    watch: {
      '$route' (to, from) {
        let isBack = this.$router.isBack  //  监听路由变化时的状态为前进还是后退

        if (isBack) {
          console.log(1)
          this.transitionName = 'slide-right'
        } else {
          console.log(2)
          this.transitionName = 'slide-left'
        }
        this.$router.isBack = false
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .router
    width: 100%
    transition: all .25s cubic-bezier(0, 0, .25, 1)
  .slide-left-enter, .slide-right-leave-active
    position: absolute
    opacity: 0
    transform: translate(45px, 0)
  .slide-left-leave-active, .slide-right-enter
    position: absolute
    opacity: 0
    transform: translate(-45px, 0)
</style>
