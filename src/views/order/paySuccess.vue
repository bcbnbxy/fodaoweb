<template>
  <div class='page'>
    <img class="withDrawStateImg" src="../../assets/img/choosePayWay.png">
    <div class="withDrawStateTit">
      订单支付成功
    </div>

    <button class="subOrder" @click="backIndex()">返回首页</button>
    <button class="subOrder subOrder2" @click="toLearn()">查看订单</button>

  </div>
</template>

<script>

  export default {
    data() {
      return {
        // 预计到账时间
        expectTime: '2019-10-10 12:00',
        // 余额
        balanceVal: 59,
        // 提现方式
        wxOrZFB: '微信到帐'
      }
    },
    mounted() {
      document.title = '支付成功'
    },
    methods: {
      backIndex(){
        this.$router.replace({path: '/home/index'})
      },
      toLearn(){
        this.$router.replace({path: '/myOrder'})
      }
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;

  .subOrder {
    border-radius: 7*@wu;
    width: 345*@wu;
    height: 42*@wu;
    border: none;
    color: #ffffff;
    font-size: 16*@wu;
    background-image: linear-gradient(-101deg, #FFC940 1%, #FFBD30 100%);
    margin: 50*@wu auto 0 auto;
    display: block;
  }

  .withDrawStateImg {
    width: 63*@wu;
    height: 63*@wu;
    display: block;
    margin: 100*@wu auto 18*@wu auto;
  }

  .withDrawStateTit {
    font-size: 17*@wu;
    color: #262525;
    text-align: center;
  }

  .subOrder2 {
    border: 1px solid #F2B70C;
    border-radius: 7*@wu!important;
    background-image:none;
    background-color: #ffffff;
    color: #F2B70C;
    margin-top: 20*@wu;
  }
</style>
