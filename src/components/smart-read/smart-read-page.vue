<template>
  <div class="page">
    <m-header :data="headerText" :left-arrow="true"></m-header>
    <read-sentence-box :params="getSentenceParam"></read-sentence-box>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header'
  import ReadSentenceBox from 'base/read-sentence-box/read-sentence-box'

  export default {
    data() {
      return {
        headerText: '智能阅读'
      }
    },
    computed: {
      getSentenceParam() {
        console.log(this.$route.query)
        let params = {
          uri: sessionStorage.getItem('selectBookUri'),
          count: this.$route.query.sentenceNum,
          keywords: this.$route.query.keyword
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
  @import '~common/stylus/variable'

  .page
    min-height: 100%
    background-color: $color-highlight-background
</style>
