<template>
  <div>我是书架页面</div>
</template>

<script type="text/ecmascript-6">
  export default {
    created() {
      console.log(this.$route.params)
      console.log(this.$route.query)
      console.log(this.$route.name)
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
