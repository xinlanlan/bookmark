<template>
  <div class="word-read">
    <m-header :data="headerText" :leftArrow="true"></m-header>
    <read-sentence-box :params="readParams"></read-sentence-box>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header'
  import ReadSentenceBox from 'base/read-sentence-box/read-sentence-box'

  export default {
    data() {
      return {
        headerText: '词库阅读'
      }
    },
    computed: {
      readParams() {
        let query = this.$route.query
        let params = {
          uri: query.uri,
          keywords: query.keywords,
          count: query.count
        }
        return params
      }
    },
    components: {
      MHeader,
      ReadSentenceBox
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
