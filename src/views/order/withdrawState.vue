<template>
  <div class='page pageColor'>
    <img class="withDrawStateImg" src="../../assets/img/choosePayWay.png">
    <div class="withDrawStateTit">
      提现申请已提交
    </div>
    <div class="withDrawStateTime">
      预计{{expectTime}}前到帐
    </div>
    <div class="payTopBox">
      <ul>
        <li>{{ Number($route.params.payType) | wOutType}} <span>提现金额: {{balanceVal}}元</span></li>
      </ul>
    </div>

    <button class="subOrder" @click="submitOrder()">完成</button>

  </div>
</template>

<script>

  export default {
    data() {
      return {
        // 预计到账时间
        expectTime: this.$route.params.dates,
        // 余额
        balanceVal: this.$route.params.money
      }
    },
    mounted() {
      document.title = '提现申请成功'
    },
    methods: {
      submitOrder(){
        this.$router.push({path: '/home/mine'});
      }
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  .payTopBox {
    padding: 0 10*@wu;
    background-color: #ffffff;
    ul {
      margin: 0;
      overflow: hidden;
      list-style: none;
      padding: 24*@wu 0;
      li{
        font-size: 13*@wu;
        color: #979797;
        span {
          float: right;
        }
      }
    }
  }

  .subOrder {
    border-radius: 7*@wu;
    width: 345*@wu;
    height: 42*@wu;
    border: none;
    color: #ffffff;
    font-size: 16*@wu;
    background-image: linear-gradient(-101deg, #FFC940 1%, #FFBD30 100%);
    margin: 68*@wu auto 0 auto;
    display: block;
  }
  .withDrawStateImg{
    width: 63*@wu;
    height: 63*@wu;
    display: block;
    margin: 58*@wu auto 18*@wu auto;
  }
  .withDrawStateTit{
    font-size: 17*@wu;
    color: #262525;
    text-align: center;
  }
  .withDrawStateTime{
    font-size: 11*@wu;
    color: #646363;
    text-align: center;
    margin: 3*@wu 0 25*@wu 0;
  }

</style>
