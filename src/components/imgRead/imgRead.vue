<template>
  <div class="img-read">
    <m-header :data="headerText" :leftArrow="true"></m-header>
    <read-sentence-box :params="getImportImgParams"></read-sentence-box>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header'
  import ReadSentenceBox from 'base/read-sentence-box/read-sentence-box'

  export default {
    data() {
      return {
        headerText: '图表阅读'
      }
    },
    computed: {
      getImportImgParams() {
        let params = {
          uri: this.$route.query.bookUri,
          keywords: ''
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
