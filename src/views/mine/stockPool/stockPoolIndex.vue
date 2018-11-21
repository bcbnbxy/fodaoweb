<template>
  <div class='page'>
    <div class="stockTop" v-if="userInfo.isBonus==1">
      <img src="../../../assets/img/poolTopBg.png" class="stockBackImg">
      <div class="stockUserInfo">
        <img :src="userInfo.wechatImg" v-if="userInfo.wechatImg">
        <img src="../../../assets/img/userImg.png" v-else>
        <div>
          <span>{{userInfo.name || '无昵称'}}</span>
          <span> vip等级 </span>
          <span> {{userInfo.userLevel | userType}} </span>
        </div>
        <p>利润池:{{stockTotal}}</p>
      </div>
      <div class="btnWOut">
        <button @click="goWith()">提现</button>
        <span>可提现分润金额<span>¥{{userInfo.balance3}}</span></span>
      </div>
    </div>
    <div class="stockCenter" v-if="userInfo.isBonus==1">
      <div class="box" v-for="item in stockList">
        <ul>
          <li><img src="../../../assets/img/promoCom/time.png"><span>{{item.date}}</span></li>
          <li>{{item.amout}}
            <div>利润池</div>
          </li>
          <li>{{item.userAmout}}
            <div>分润</div>
          </li>
        </ul>
      </div>
    </div>
    <img class="noData" src="../../../assets/img/noData.png" v-if="userInfo.isBonus!==1">
    <alert-box :message="message" @isShow="isShowFun" v-if="isShow"></alert-box>
  </div>
</template>

<script>
  import {stockPool,getProfit} from '@/api/index'
  export default {
    data() {
      return {
        stockList: '',
        userInfo: this.$store.getters.getUserInfo,
        // 错误提醒
        message: '',
        isShow: false,
        stockTotal: '0'
      }
    },
    mounted() {
      if(this.userInfo.isBonus === 1){
        stockPool().then((res)=>{
          if(res.code === 'Y'){
            this.stockList = res.data;
          }
        });
        getProfit().then((res)=>{
          if(res.code === 'Y'){
            this.stockTotal = res.data || '0';
          }
        })
      }else {
        this.message = '您当前没有享受分红权限';
        this.isShow = true;
      }
    },
    methods: {
      isShowFun(){
        this.isShow = false
      },
      // 提现
      goWith(){
        if(this.userInfo.balance3 < 100){
          this.message = '金额不足100元无法提现!';
          this.isShow = true;
        }else {
          this.$router.push({ path:'/withdraw/' + this.userInfo.balance3 + '/' + 8});  // 8 为利润池提现
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  .stockTop {
    overflow: hidden;
    height: 220*@wu;
    position: relative;
    .stockBackImg {
      width: 375*@wu;
      height: 220 @wu;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
    }
    .stockUserInfo {
      position: relative;
      z-index: 1;
      background-color: rgba(0, 0, 0, 0.85);
      height: 100%;
      img {
        width: 60*@wu;
        height: 60*@wu;
        border-radius: 50%;
        display: inline-block;
        vertical-align: top;
        margin: 70*@wu 0 0 14*@wu;
      }
      div {
        margin-top: 70*@wu;
        display: inline-block;
        vertical-align: top;
        span {
          width: auto;
          height: 22*@wu;
          line-height: 20*@wu;
          border-radius: 37*@wu;
          border: none;
          font-size: 11*@wu;
          color: #ffffff;
          display: block;
        }
        span:nth-of-type(1) {
          font-size: 17*@wu;
        }
        span:nth-of-type(2) {
          font-size: 9*@wu;
        }
        span:nth-of-type(3) {
          font-size: 11*@wu;
          color: #FEC546;
        }
      }
      p {
        font-size: 18*@wu;
        color: #FFFFFF;
        text-indent: 14*@wu;
        line-height: 35*@wu;
      }
    }

    .btnWOut {
      position: absolute;
      right: 20*@wu;
      bottom: 40*@wu;
      z-index: 3;
      color: #ffffff;
      button {
        width: 114*@wu;
        height: 30*@wu;
        border: none;
        background-color: #FEC546;
        border-radius: 66*@wu;
        color: #ffffff;
        outline: none;
        font-size: 15*@wu;
        margin-bottom: 5*@wu;
      }
      & > span {
        font-size: 10*@wu;
        display: block;
        text-align: center;
        span {
          display: block;
          color: #FEC546
        }
      }
    }
  }

  .stockCenter {
    padding: 14*@wu 12*@wu 0 12*@wu;
    .box {
      background-color: #FFFFFF;
      box-shadow: 0 0 2*@wu 0 rgba(167, 167, 167, 0.50);
      border-radius: 3*@wu;
      height: 80*@wu;
      margin-bottom: 10*@wu;
      ul {
        list-style: none;
        margin: 0;
        overflow: hidden;
        padding: 25*@wu 0 0 0;
        li {
          float: left;
          text-align: center;
        }
        li:nth-of-type(1) {
          width: 86*@wu;
          margin-left: 10*@wu;
          img {
            width: 12*@wu;
            height: auto;
            vertical-align: middle;
            margin-right: 3*@wu;
          }
          span {
            vertical-align: middle;
            font-size: 11*@wu;
            color: #979797;
          }
        }
        li:nth-of-type(2) {
          width: 160*@wu;
          font-size: 18*@wu;
          color: #262525;
          font-weight: 600;
          div {
            font-size: 12*@wu;
            color: #280000;
            line-height: 20*@wu;
            font-weight: 200;
          }
        }
        li:nth-of-type(3) {
          width: 94*@wu;
          font-size: 18*@wu;
          color: #D90909;
          font-weight: 600;
          div {
            font-size: 12*@wu;
            color: #280000;
            line-height: 20*@wu;
            font-weight: 200;
          }
        }
      }
    }
  }
</style>
