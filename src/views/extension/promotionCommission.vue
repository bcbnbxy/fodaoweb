<template>
  <div class='page pageColor'>
    <div class="promoComTop">
      <div>累计佣金(元)</div>
      <div>{{totalCapita}}</div>
    </div>
    <div class="line"></div>
    <div class="promoCom">
      <ul>
        <li><img src="../../assets/img/promoCom/promoCom1.png"><span>可提现佣金</span><i style="color:#F44E1A">{{capitalData.willCommissions}}元</i></li>
      </ul>
    </div>
    <div class="line"></div>
    <div class="promoCom">
      <ul>
        <li><img src="../../assets/img/promoCom/promoCom7.png"><span>已申请佣金</span><i>{{capitalData.tbCommissions}}元</i></li>
        <li><img src="../../assets/img/promoCom/promoCom2.png"><span>待打款佣金</span><i>{{capitalData.successfulCommission}}元</i></li>
        <li><img src="../../assets/img/promoCom/promoCom6.png"><span>无效佣金</span><i>{{capitalData.commissions}}元</i></li>
        <li><img src="../../assets/img/promoCom/promoCom3.png"><span>成功提现佣金</span><i>{{capitalData.ineffectiveCommission}}元</i></li>
      </ul>
    </div>
    <!--<div class="line"></div>
    <div class="promoCom">
      <ul>
        <li><img src="../../assets/img/promoCom/promoCom4.png"><span>待收货佣金</span><i>0.00元</i></li>
        <li><img src="../../assets/img/promoCom/promoCom1.png"><span>提现手续费</span><i>0.00元</i></li>
      </ul>
    </div>-->
    <div class="line"></div>
    <div class="promoCom">
      <h4>用户须知</h4>
      <p>买家确认收货后,立即获得推广佣金</p>
      <p>注意:可用佣金满<span>100</span>元后才能申请提现</p>
    </div>

    <div class="noContentBox"></div>

    <button class="subOrder" @click="goWith()">佣金提现</button>
    <alert-box :message="message" @isShow="isShowFun" v-if="isShow"></alert-box>
  </div>
</template>

<script>
  import {capitalTol} from '@/api/index'
  export default {
    data() {
      return {
        capitalData: '',
        totalCapita: '0.00',

        // 错误提醒
        message: '',
        isShow: false,
      }
    },
    mounted() {
      document.title = "推广佣金";
      this.queryCapitalTol();
    },
    methods: {
      queryCapitalTol(){
        capitalTol().then((res)=>{
          if(res.code === "Y"){
            this.capitalData = res.data;
            let total = 0;
            for (let key in this.capitalData){
              if(!this.capitalData[key]){
                this.capitalData[key] = '0.00';
              }else {
                if(key !== 'commissions'){
                  total += Number(this.capitalData[key]);
                }
              }
            }
            this.totalCapita = total?total:'0.00';
          }
        })
      },
      // 提现
      goWith(){
        if(this.capitalData.willCommissions < 100){
          this.message = '金额不足100元无法提现!';
          this.isShow = true;
        }else {
          this.$router.push({ path:'/withdraw/' + this.capitalData.willCommissions + '/' + 5});  // 5 为推广佣金提现
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @wu:100vw / 375;
  .promoComTop{
    height: 84*@wu;
    background-color: #F1B402;
    position: relative;
    color: #ffffff;
    padding-left: 10*@wu;
    overflow: hidden;
    div:nth-of-type(1){
      font-size: 15*@wu;
      margin-top: 20*@wu;
    }
    div:nth-of-type(2){
      font-size: 16*@wu;
    }
    button{
      background-color: #FFFFFF;
      border-radius: 66*@wu;
      width: 100*@wu;
      height: 26*@wu;
      border: none;
      outline: none;
      position: absolute;
      right: 12*@wu;
      bottom: 20*@wu;
      font-size: 14*@wu;
      color: #9D7A03;
    }
  }
  .promoCom{
    background-color: #ffffff;
    padding: 0 15*@wu;
    overflow: hidden;
    ul{
      list-style: none;
      margin: 0;
      padding: 0;
      li{
        height: 50*@wu;
        line-height: 45*@wu;
        border-bottom: 1px solid #F1F1F1;
        img{
          width: 20*@wu;
          height: auto;
          vertical-align: middle;
          display: inline-block;
          margin-right: 5*@wu;
        }
        span{
          font-size: 14*@wu;
          color: #262525;
          display: inline-block;
          vertical-align: middle;
          width: 100*@wu;
        }
        i{
          font-style: inherit;
          display: inline-block;
          vertical-align: middle;
          width: 220*@wu;
          text-align: right;
        }
      }
      li:last-child{
        border-bottom: none;
      }
    }
    h4{
      font-size: 15*@wu;
      color: #262525;
      margin: 12*@wu 0;
    }
    p{
      padding: 0;
      margin: 0 0 5*@wu 0;
      font-size: 14*@wu;
      color: #646363;
      span{
        color: #F44E1A;
      }
    }
    p:last-child{
      margin-bottom: 20*@wu;
    }
  }
  .subOrder {
    border-radius: 7*@wu;
    width: 345*@wu;
    height: 42*@wu;
    border: none;
    color: #ffffff;
    font-size: 16*@wu;
    position: fixed;
    bottom: 34*@wu;
    left: 15*@wu;
    background-image: linear-gradient(-101deg, #FFC940 1%, #FFBD30 100%);
  }
  .noContentBox{
    height: 100*@wu;
  }
</style>
