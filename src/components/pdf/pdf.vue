<template>
  <div class="page">
    <pdf src="static/pdf.pdf"></pdf>
  </div>
</template>

<script type="text/ecmascript-6">
  import pdf from 'vue-pdf'
  import {baseUrl} from 'api/config'

  export default {
    computed: {
      pdfPath() {
        let path = this.$route.query.path
        return baseUrl + path
      }
    },
    components: {
      pdf
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
