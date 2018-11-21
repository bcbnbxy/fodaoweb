<template>
  <div class='page'>
    <div class="withdrawDetailsTop">
      {{capitalData.capitalLevelStr}}: +{{capitalData.amout}}
    </div>
    <div class="withdrawDetailsBox">
      <div class="box">
        <div>被动收入人:</div>
        <div>{{capitalData.userName}}</div>
      </div>
      <div class="box">
        <div>真实姓名:</div>
        <div>{{capitalData.realName}}</div>
      </div>
      <div class="box">
        <div>产品:</div>
        <div>{{capitalData.goodsName}}</div>
      </div>
      <div class="box">
        <div>订单编号:</div>
        <div>{{capitalData.orderNo}}</div>
      </div>
      <div class="box">
        <div>订单状态:</div>
        <div>{{capitalData.orderStateStr}}</div>
      </div>
      <div class="box">
        <div>订单时间:</div>
        <div>{{capitalData.orderTime}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {capitalDetail} from '@/api/index'
  export default {
    data() {
      return {
        capitalData: ''
      }
    },
    mounted() {
      document.title = '佣金详情';
      this.queryCapitalDetail();
    },
    methods: {
      queryCapitalDetail(){
        capitalDetail({capitalId:this.$route.params.id}).then((res)=>{
          if(res.code === 'Y'){
            this.capitalData = res.data;
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw/375;
  .withdrawDetailsTop {
    height: 75*@wu;
    line-height: 75*@wu;
    background-color: #F1F1F1;
    text-align: center;
    font-size: 16*@wu;
    color: #262525;
  }

  .withdrawDetailsBox {
    padding: 0 12*@wu;
    .box{
      height: 50*@wu;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #F1F1F1;
      div{
        width: 50%;
        font-size: 14*@wu;
        color: #646363;
      }
      div:nth-of-type(2){
        text-align: right;
        color: #262525;
      }
    }
  }
</style>
