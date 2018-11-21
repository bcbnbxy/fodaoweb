<template>
  <div class='page'>
    <img :src="dataS[$route.params.url]" class="lookImg">
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dataS: [
          'http://p8i1x61e3.bkt.clouddn.com/06e0f57f32a5c4e5d93e1f783f993b50',
          'http://p8i1x61e3.bkt.clouddn.com/34b0519436c4a364838a840d9d8cc2af',
          'http://p8i1x61e3.bkt.clouddn.com/b9301efcd54f7f56dfa17a5a03326e74',
          'http://p8i1x61e3.bkt.clouddn.com/1e6dca6bd5a4b2a51c13d17368b1ec0d'
        ]
      }
    },
    created(){
      document.title = '女性课程介绍'
    }
  }
</script>

<style lang="less" scoped>
  .lookImg{
    width: 100%;
    height: auto;
    display: block;
  }
</style>
