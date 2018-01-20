<template>
  <div class="statistics-page">
    <m-header :data="headerText" :left-arrow="true" v-on:back-page="backPage"></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
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
    methods: {
      backPage() {
        this.$router.push({
          path: '/personal'
        })
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
