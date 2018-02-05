<template>
  <div class="my-info">
    <m-header :data="headerText" :leftArrow="true"></m-header>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header'

  export default {
    data() {
      return {
        headerText: '我的消息'
      }
    },
    components: {
      MHeader
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
