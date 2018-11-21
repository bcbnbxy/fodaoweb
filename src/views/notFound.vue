<template>
  <div class='page pageColor'>
    <img src="../assets/img/noFound.png" class="noFoundImg">
    <h4>哎呀，网页走丢了...</h4>
    <div class="noFoundBtn">
      <button @click="$router.replace({path: '/home/index'})">返回首页</button>
      <button @click="$router.go(-1)">返回上一页</button>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  .noFoundImg{
    width: 100*@wu;
    height: 100*@wu;
    display: block;
    margin: 100*@wu auto 0 auto;
    border-radius: 50%;
  }
  h4{
    text-align: center;
    margin: 30*@wu 0;
    color: #999999;
  }
  .noFoundBtn{
    text-align: center;
    margin-top: 60*@wu;
    button{
      border: 1px solid #C3C3C3;
      border-radius: 3*@wu;
      padding: 5*@wu 0;
      color: #C3C3C3;
      background-color: #F5F5F5;
      display: inline-block;
      width: 100*@wu;
    }
    button:nth-of-type(1){
      margin-right: 20*@wu
    }
  }
</style>
