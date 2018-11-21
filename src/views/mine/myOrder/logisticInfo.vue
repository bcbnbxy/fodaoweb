<template>
  <div class='page'>
    <div class="logisticTop">
      <div class="left">
        <img :src="infoS.goodsImg">
        <div>共{{infoS.num}}件商品</div>
      </div>
      <div class="right">
        <div>{{dataS.logisticsState | logisticsType}}</div>
        <div>{{dataS.logisticsName}}: {{dataS.logisticsNo}}</div>
      </div>
    </div>
    <div class="topDistance"></div>
    <div class="logisticCenter">
      <div class="logisticList" v-for="(item,index) in logisticList">
        <div>
          {{item.context}}
        </div>
        <div>{{item.time}}</div>
        <img src="../../../assets/img/logisticInfo.png" v-if="index===0">
        <span v-else></span>
      </div>
    </div>
  </div>
</template>

<script>
  import { logistics } from '@/api/index'
  export default {
    data() {
      return {
        logisticList:[],
        dataS:'',
        infoS:''
      }
    },
    mounted() {
      let info = JSON.parse(sessionStorage.getItem('logisticInfo'));
      if(info){
        this.infoS = info;
        this.queryLogistic();
      }
    },
    methods: {
      // 查看物流
      queryLogistic(){
        logistics({orderNo: this.infoS.orderNo || ''}).then((res)=>{
          if(res.code === 'Y'){
            this.dataS = res.data;
            this.logisticList = res.data.logisticsData?JSON.parse(res.data.logisticsData):[];
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  .logisticTop {
    padding: 16*@wu 14*@wu;
    height: 90*@wu;
    box-sizing: border-box;
    .left{
      width: 86*@wu;
      height: 58*@wu;
      position: relative;
      display: inline-block;
      margin-right: 10*@wu;
      div{
        font-size: 11*@wu;
        color: #FFFFFF;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 22*@wu;
        background-color: rgba(40,40,40,0.75);
        text-align: center;
        line-height: 22*@wu;
      }
      img{
        width: 100%;
        height: 100%;
        vertical-align: top;
      }
    }
    .right{
      display: inline-block;
      vertical-align: top;
      div:nth-of-type(1){
        font-size: 15*@wu;
        color: #F5A623;
        margin: 7*@wu 0;
      }
      div:nth-of-type(2){
        font-size: 13*@wu;
        color: #979797;
      }
    }
  }
  .logisticCenter{
    padding-left: 20*@wu;
    padding-top: 28*@wu;
    .logisticList{
      border-left: 1px solid #f1f1f1;
      padding-bottom: 30*@wu;
      padding-left: 18*@wu;
      position: relative;
      div:nth-of-type(1){
        font-size: 14*@wu;
        color: #979797;
        margin-bottom: 3*@wu;
        margin-top: -5*@wu;
      }
      div:nth-of-type(2){
        font-size: 12*@wu;
        color: #979797;
      }
      span{
        display: inline-block;
        width: 10*@wu;
        height: 10*@wu;
        background-color: #F1F1F1;
        border-radius: 50%;
        position: absolute;
        left: -5*@wu;
        top: 5*@wu;
      }
      img{
        width: 20*@wu;
        height: 20*@wu;
        border-radius: 50%;
        position: absolute;
        left: -10*@wu;
        top: 0;
        background-color: #ffffff;
      }
    }
    .logisticList:first-child{
      div:nth-of-type(1){
        color: #262525;
      }
    }
    .logisticList:last-child{
      border-left: none;
    }
  }
</style>
