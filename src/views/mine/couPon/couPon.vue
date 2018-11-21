<template>
  <div class="page pageColor">
    <div class="couPonBox" v-for="item in dataList">
      <img :src="item.giftPic">
      <div>
        <div>{{item.name}}</div>
        <div>{{item.comment}}</div>
        <div><img src="../../../assets/img/time.png">还有<span>{{item.expired}}</span>天过期有效期至{{item.useEndDate}}</div>
      </div>
      <img src="../../../assets/img/userNow.png" @click="goBuy()">
    </div>
  </div>
</template>

<script>
  import {myCoupon} from '@/api/index'
  import {Toast} from 'mint-ui'
  export default {
    data() {
      return{
        dataList: []
      }
    },
    created(){
      myCoupon({couponState:1}).then((res)=>{
        if(res.code === 'Y'){
          this.dataList = res.data || [];
        }
      })
    },
    methods:{
      goBuy(){
        Toast({
          position:'top',
          message:'购买课程时，请使用优惠券'
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  .couPonBox{
    display: flex;
    overflow: hidden;
    align-items: center;
    background-color: #ffffff;
    margin-bottom: 5*@wu;
    padding: 5*@wu 10*@wu;
    &>img{
      width: 70*@wu;
      height: auto;
    }
    &>div{
      width: 205*@wu;
      padding: 0 10*@wu;
      div:nth-of-type(1){
        font-size: 14*@wu;
        color: #333333;
      }
      div:nth-of-type(2){
        font-size: 12*@wu;
        color: #999999;
      }
      div:nth-of-type(3){
        font-size: 12*@wu;
        color: #999999;
        img{
          width: 8*@wu;
          height: 8*@wu;
          vertical-align: middle;
        }
        span{
          color: #ff0000;
        }
      }
    }
  }
</style>
