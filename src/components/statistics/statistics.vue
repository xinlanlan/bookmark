<template>
  <div class="statistics-page">
    <m-header :header-text="headerText"></m-header>
    <tab></tab>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header'
  import Tab from './tab/tab'

  export default {
    data() {
      return {
        headerText: '统计管理'
      }
    },
    components: {
      MHeader,
      Tab
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .statistics-page
    background-color: $color-highlight-background
</style>
