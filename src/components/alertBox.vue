<template>
  <div class='alertBox'>
    <div><img src="../assets/img/danger.png" v-show="warningImg === 1"><div v-html="message"></div></div>
  </div>
</template>

<script>
  export default {
    props:['message','warningImg'], // warningImg === 1 时显示警告图片
    mounted(){
      this.$nextTick(()=>{
        setTimeout(()=>{
          this.$emit('isShow')
        },3000)
      })
    }
  }
</script>

<style lang="less" scoped>
  @wu:100vw / 375;
  .alertBox{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14*@wu;
    z-index: 300;
    &>div{
      padding: 15*@wu 13*@wu;
      background-color: rgba(18,18,18,0.85);
      display: inline-block;
      border-radius: 8*@wu;
      img{
        vertical-align: bottom;
        width: 18*@wu;
        height: 18*@wu;
        margin-right: 6*@wu;
      }
      &>div{
        vertical-align: top;
        color: #ffffff;
        display: inline-block;

      }
    }
  }
</style>
