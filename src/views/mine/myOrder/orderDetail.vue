<template>
  <div class='page'>
    <div class="line"></div>
    <div class="orderInformation">
      <div class="information">订单信息</div>
      <div class="orderNumber" >
        <div>
          <span>订单号</span><span class="number">{{detailInfo.orderNo}}</span>
        </div>
      </div>
      <div class="orderTime">
        <div>
          <span>下单时间</span><span class="time">{{detailInfo.createTime}}</span>
        </div>
      </div>
      <div class="orderStatus">
        <div>
          <span>订单状态</span>
          <span class="status">{{detailInfo.orderState | orderState}}</span>
          <div class="buttonList">
            <!--
            <button class="contact" v-if="detailInfo.orderState===6">售后客服</button>
            <button class="contact">联系客服</button>
            -->
            <button class="toSay" v-if="detailInfo.orderState===1" @click="cancelOrderFun(detailInfo.orderNo)">取消订单</button>
            <button class="toPay" v-if="detailInfo.orderState===1" @click="toPay(detailInfo)">去付款</button>
            <button class="toSay" v-if="detailInfo.orderState===7" @click="evaluateS(detailInfo.orderNo,detailInfo.list[0].goodsImg)">评价</button>
            <button class="toSay" v-if="detailInfo.orderState===2 && detailInfo.orderType === 3">待发货</button>
            <button class="toSay" v-if="detailInfo.orderState===3" @click="deleteOrderFun(detailInfo.orderNo)">删除订单</button>
            <button class="toBuyAgain" v-if="detailInfo.orderState===3" @click="buyAgain(detailInfo.orderType)">再次购买</button>
            <template v-if="detailInfo.orderType === 3">
              <button class="toSay" @click="lookLogistic()" v-if="detailInfo.orderState===4 || detailInfo.orderState===5">查看物流</button>
            </template>
            <button class="toSay" v-if="detailInfo.orderState===2 && detailInfo.orderType === 2">升级</button>
            <button class="toSay" v-if="detailInfo.orderState===2 && detailInfo.orderType === 1">听课</button>
          </div>
        </div>
      </div>
    </div>
    <div class="line" v-if="detailInfo.orderType===3"></div>
    <div class="distributionInformation" v-if="detailInfo.orderType===3">
      <div class="information">配送信息</div>
      <div class="distributionAddress">
        <div>
          <span>配送地址</span>
          <p class="address">{{detailInfo?detailInfo.area + detailInfo.address:''}}</p>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="orderListBox" v-for="item in detailInfo.list">
      <img :src="item.goodsImg">
      <div class="titBox">
        <div>性福书籍</div>
        <div>《{{item.goodsName}}》</div>
      </div>
      <div class="priceBox">
        <span>¥{{item.unitPrice}}</span>
        <span>X{{item.num}}</span>
      </div>
    </div>
    <div class="orderPrice">
      <p class="OrderTotalPrice">
        <span>订单总价</span>
        <span style="float: right;">￥{{detailInfo.totalPay}} <i>(含运费{{ totalYF }}元)</i></span>
      </p>
      <p class="wxPrice">
        <span>支付方式: {{detailInfo.payType | payType}}</span>
        <!--<span style="text-decoration:line-through;float: right;">￥99</span>-->
      </p>
    </div>
  </div>
</template>

<script>
  import {orderDetail,cancelOrder,deleteOrder} from '@/api/index'
  export default {
    data() {
      return {
        detailInfo: '',
        totalYF: 0
      }
    },
    mounted() {
      document.title='订单详情';
      this.queryOrderDetail();
    },
    methods: {
      // 去付款
      toPay(item){
        item.needPay = item.totalPay;
        this.$store.dispatch('orderInfo', JSON.stringify(item));
        this.$router.push({path: '/orderPay'});
      },
      // 查询详情数据
      queryOrderDetail(){
        orderDetail({orderNo: this.$route.params.id}).then((res)=>{
          if(res.code === 'Y'){
            this.detailInfo = res.data;
            let str = 0;
            this.detailInfo.list.forEach((item)=>{
              str = item.num * item.freightPrice;
            });
            this.totalYF = str
          }
        })
      },
      // 取消订单
      cancelOrderFun(orderNo){
        cancelOrder({orderNo:orderNo}).then((res)=>{
          if (res.code === 'Y'){
            this.message = '取消成功';
            this.isShow = true;
            this.pageNum = 1;
            this.orderData = [];
            this.queryOrder();
          }
        })
      },
      // 删除订单
      deleteOrderFun(orderNo){
        deleteOrder({orderNo:orderNo}).then((res)=>{
          if (res.code === 'Y'){
            this.message = '删除成功';
            this.isShow = true;
            this.pageNum = 1;
            this.orderData = [];
            this.queryOrder();
          }
        })
      },
      // 再次购买
      buyAgain(val){
        if(val===1){
          this.$router.push({path:'/home/onlineClass'})
        }
        if(val===2){
          this.$router.push({path:'/home/partner'})
        }
        if(val===3){
          this.$router.push({path:'/classDetail'})
        }
      },
      // 查看物流
      lookLogistic(){
        let s = this.detailInfo;
        s.goodsImg = s.list[0].goodsImg;
        sessionStorage.setItem('logisticInfo', JSON.stringify(s));
        this.$router.push({path: '/logisticInfo'})
      },
      // 评价
      evaluateS(val,goodsImg){
        let imgUrl = encodeURIComponent(goodsImg);
        this.$router.push({path: '/evaluateS/' + val + '/' + imgUrl})
      },
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  .tabBox {
    height: 64*@wu;
    background-color: #000;
    text-align: center;
    .tabText {
      font-size: 18*@wu;
      color: #FFFFFF;
      letter-spacing: 0;
      position: relative;
      top: 30*@wu;
    }
  }
  .line {
    height: 14*@wu;
    background-color: rgb(245,245,245);
  }
  .information{
    border-bottom: 1px solid #F1F1F1;
    height: 45*@wu;
    line-height: 45*@wu;
    font-size: 14*@wu;
    color: #262525;
    letter-spacing: 0.7*@wu;
    text-indent: 17*@wu;
  }
  .orderInformation {
    .orderNumber{
      position: relative;
      height: 44*@wu;
      font-size: 14px;
      color: #646363;
      letter-spacing: 0.7px;
      div{
        line-height:44*@wu ;
        margin-left: 17*@wu;
        border-bottom: 1px solid #F1F1F1;
        .number {
          position: absolute;
          left: 92*@wu;
        }
      }
    }
    .orderTime{
      position: relative;
      height: 44*@wu;
      font-size: 14px;
      color: #646363;
      letter-spacing: 0.7px;
      div{
        line-height:44*@wu ;
        margin-left: 17*@wu;
        border-bottom: 1px solid #F1F1F1;
        .time {
          position: absolute;
          left: 92*@wu;
        }
      }
    }
    .orderStatus {
      position: relative;
      font-size: 14px;
      color: #646363;
      letter-spacing: 0.7px;
      height: 54*@wu;
      div{
        line-height: 54*@wu;
        margin-left: 17*@wu;
        .status{
          position: absolute;
          left: 92*@wu;
        }
        .buttonList{
          position: absolute;
          right: 0;
          top: 0;
          button {
            margin-right: 12*@wu;
            padding: 6*@wu 10*@wu;
            font-size: 14*@wu;
            color: #979797;
            outline: none;
            border-radius: 2*@wu;
            border: 1px solid #646363;
            background-color: transparent;
          }
          .toPay{
            background-image: linear-gradient(-101deg, #FFC940 1%, #FFBD30 100%);
            border: 1px solid #ffbd30;
            color: #ffffff;
          }
        }
      }
    }
  }
  .distributionInformation {
    .distributionAddress{
      position: relative;
      height: 61*@wu;
      font-size: 14px;
      color: #646363;
      letter-spacing: 0.7px;
      div{
        margin-left: 17*@wu;
        // border-bottom: 1px solid #F1F1F1;
        span{
          position: absolute;
          top: 11*@wu;
        }
        .address{
          position: absolute;
          margin: 0;
          top: 11*@wu;
          left: 92*@wu;
          width: 269*@wu;
          color: #262626;
        }
      }
    }
  }
  .orderListBox {
    position: relative;
    overflow: hidden;
    padding: 24*@wu 0 18*@wu 12*@wu;
    border-bottom: 1px solid #f1f1f1;
    img {
      width: 113*@wu;
      height: 76*@wu;
      display: inline-block;
      vertical-align: top;
    }
  }
  .titBox{
    display: inline-block;
    vertical-align: top;
    box-sizing: border-box;
    padding-left: 10*@wu;
    div:nth-of-type(1){
      font-size: 14*@wu;
      color: #646363;
      margin-top: 5*@wu;
      margin-bottom: 5*@wu;
    }
    div:nth-of-type(2){
      font-size: 15*@wu;
      color: #262525;
      text-indent: -7*@wu;
    }
  }
  .priceBox{
    position: absolute;
    right: 15*@wu;
    top: 24*@wu;
    span{
      font-size: 12*@wu;
      color: #474545;
      display: block;
      text-align: right;
    }
    span:nth-of-type(2){
      color: #979797;
    }
  }
  .orderPrice{
    .OrderTotalPrice {
      height: 20*@wu;
      margin: 13*@wu 15*@wu 0 12*@wu;
      font-size: 14px;
      color: #262525;
      letter-spacing: 0.7px;
    }
    .wxPrice {
      font-size: 12px;
      color: #979797;
      letter-spacing: 0.6px;
      margin: 13*@wu 15*@wu 0 12*@wu;
    }
    i{
      font-size: 12*@wu;
      font-style: inherit;
    }
  }

</style>
