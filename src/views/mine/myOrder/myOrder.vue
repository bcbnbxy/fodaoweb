<template>
  <div class='page pageColor'>
    <div class="tabBox">
      <ul>
        <li :class="{active: isOrderActive===''}" @click="orderTab('')">全部</li>
        <li :class="{active: isOrderActive===1}" @click="orderTab(1)">待支付</li>
        <li :class="{active: isOrderActive===7}" @click="orderTab(7)">已完成</li>
      </ul>
    </div>
    <div style="overflow: hidden"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <div class="orderList" v-for="item in orderData">
        <div class="orderTop" @click="lookOrderDetail(item.orderNo)">
          订单编号 {{ item.orderNo }}
          <span :style="{color:item.orderState>4?'#F5A623':'#C3C3C3'}">{{item.orderState | orderState}}</span>
        </div>
        <div class="orderListBox"><!--v-for="item2 in item.listBook"-->
          <img :src="item.goodsImg">
          <div class="titBox">
            <div v-html="orderGoodName(item.goodsName)">{{item.goodsName}}</div>
            <div>{{item.name}}</div>
          </div>
          <div class="priceBox">
            <span>¥{{item.needPay}}</span>
            <span>X{{item.num}}</span>
          </div>
        </div>
        <div class="totalClass">共 {{item.num}} 个商品<span>订单合计 ¥ {{item.needPay}}</span></div>
        <div class="buttonList">
          <!--1-待付款 2-已支付 3-已取消 4-待发货 5-待收货 6-待评价 7-已完成-->
          <button class="toSay" v-if="item.orderState===1" @click="cancelOrderFun(item.orderNo)">取消订单</button>
          <button class="toPay" v-if="item.orderState===1" @click="toPay(item)">去付款</button>
          <button class="toSay" v-if="item.orderState===7" @click="evaluateS(item.orderNo,item.goodsImg)">评价</button>
          <button class="toSay" v-if="item.orderState===2 && item.orderType===3">待发货</button>
          <button class="toSay" v-if="item.orderState===3" @click="deleteOrderFun(item.orderNo)">删除订单</button>
          <button class="toBuyAgain" v-if="item.orderState===3" @click="buyAgain(item.orderType , item.goodsId)">再次购买</button>
          <template v-if="item.orderType === 3">
            <button class="toSay" @click="lookLogistic(item)" v-if="item.orderState===4 || item.orderState===5">查看物流</button>
          </template>
          <button class="toSay" v-if="item.orderState===2 && item.orderType === 2">升级</button>
          <button class="toSay" v-if="item.orderState===2 && item.orderType === 1" @click="listenClass(item.goodsId,item.goodsNo)">听课</button>
          <!--<button class="toSay" v-if="item.orderState===7 && item.orderType === 2 || item.orderType === 1">查看权益</button>-->
        </div>
      </div>
      <!--<div class="moreClass">
        <img src="../../../assets/img/more.gif" v-if="loading && orderData.length>0">
        <span v-if="pageNum === pages && orderData.length > 0">没有更多了...</span>
      </div>-->

      <div class="moreClass" v-if="orderData.length > 10">
        <img src="../../../assets/img/more.gif" v-if="loading">
        <span v-if="!loading && pageNum === pages">没有更多了...</span>
      </div>

    </div>
    <img class="noData" src="../../../assets/img/noData.png" v-if="orderData.length===0">

    <alert-box :message="message" @isShow="isShowFun" v-if="isShow"></alert-box>

  </div>
</template>

<script>
  import {orderList,cancelOrder,deleteOrder} from '@/api/index'
  import { InfiniteScroll } from 'mint-ui';
  export default {
    data() {
      return {
        orderData: [],
        isOrderActive: '',
        loading: false,

        orderState: '',   // 订单状态
        pageNum: 1,   // 查询当前页数
        pageSize: 10,   // 每页展示数量
        pages:1,  // 总页数

        message: '',
        isShow: false
      }
    },
    mounted() {
      document.title = '我的订单';
      this.queryOrder();
    },
    methods: {
      // 隐藏弹框
      isShowFun(){
        this.isShow = false
      },
      // 查询订单
      queryOrder(){
        this.loading = true;
        orderList({orderState:this.orderState,pageNum:this.pageNum,pageSize:this.pageSize}).then((res)=>{
          if(res.code === 'Y'){
            let d = res.data.list || [];
            d.forEach((item)=>{
              this.orderData.push(item);
             // console.log(item);
            });
            this.pages = res.data.pages;
            this.loading = false;
          }
        })
      },
      // 切换tab栏
      orderTab(val){
        this.isOrderActive = val;
        this.orderState = val;
        this.orderData = [];
        this.pageNum = 1;
        this.pages = 1;
        this.queryOrder();
      },
      // 下拉加载
      loadMore() {
        if(!this.loading && this.pageNum < this.pages){
          this.pageNum++;
          this.queryOrder();
        }
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
      // 去付款
      toPay(item){
        this.$store.dispatch('orderInfo', JSON.stringify(item));
        this.$router.push({path: '/orderPay'});
      },
      // 去听课
      listenClass(goodsId,goodsNo){
        this.$router.push({path: '/learnClass/' + goodsId + '/' + goodsNo});
      },
      // 再次购买
      buyAgain(val , id ){
      	      	
        if(val===1){
          this.$router.push({path:'/buyPartner/'+ id + '/' + val })
        }
        if(val===2){
          this.$router.push({path:'/home/partnerList'})
        }
        if(val===3){
          this.$router.push({path:'/classDetail'})
        }
      },
      // 获取分行的标题
      orderGoodName(name){
        let am = name.replace(' ', '<br>');
        return am;
      },
      // 查看物流
      lookLogistic(item){
        sessionStorage.setItem('logisticInfo', JSON.stringify(item));
        this.$router.push({path: '/logisticInfo'});
      },
      // 评价
      evaluateS(val,goodsImg){
        let imgUrl = encodeURIComponent(goodsImg);
        this.$router.push({path: '/evaluateS/' + val + '/' + imgUrl})
      },
      // 查看详情
      lookOrderDetail(orderNo){
        this.$router.push({path: '/orderDetail/' + orderNo})
      }
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  .tabBox {
    height: 55*@wu;
    background-color: #ffffff;
    padding-top: 15*@wu;
    box-sizing: border-box;
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      border-bottom: 1px solid rgba(227, 227, 227, 0.90);
      overflow: hidden;
      li {
        width: 70*@wu;
        display: inline-block;
        height: 40*@wu;
        line-height: 40*@wu;
        font-size: 16*@wu;
        color: #474545;
        text-align: center;
      }
      li:nth-of-type(1) {
        margin-left: 10*@wu;
      }
      li:nth-of-type(2) {
        margin-left: 70*@wu;
      }
      li:nth-of-type(3) {
        margin-left: 68*@wu;
      }
      .active {
        border-bottom: 2*@wu solid #F5A623;
        color: #F5A623;
      }
    }
  }

  .orderList {
    overflow: hidden;
    background-color: #ffffff;
    margin-top: 12*@wu;
    .orderTop {
      margin-left: 10*@wu;
      border-bottom: 1px solid #F1F1F1;
      height: 45*@wu;
      line-height: 45*@wu;
      position: relative;
      font-size: 14*@wu;
      color: #262525;
      span {
        position: absolute;
        right: 20*@wu;
        top: 0;
        font-size: 14*@wu;
        color: #F5A623;
      }
    }
    .orderListBox{
      position: relative;
      overflow: hidden;
      margin: 18*@wu 0 0 12*@wu;
      img{
        width: 113*@wu;
        height: 76*@wu;
        display: inline-block;
        vertical-align: top;
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
        top: 0;
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
    }
    .totalClass{
      height: 40*@wu;
      line-height: 40*@wu;
      font-size: 10*@wu;
      color: #979797;
      text-align: right;
      border-bottom: 1px dashed #F1F1F1;
      padding-right: 12*@wu;
      span{
        font-size: 14*@wu;
        color: #262525;
        margin-left: 5*@wu;
      }
    }
    .buttonList{
      text-align: right;
      padding: 15*@wu 15*@wu 20*@wu 0;
      button{
        padding: 6*@wu 20*@wu;
        font-size: 14*@wu;
        color: #FFFFFF;
        outline: none;
        border-radius: 2*@wu;
      }
      .toPay{
        background-image: linear-gradient(-101deg, #FFC940 1%, #FFBD30 100%);
        border: none;
      }
      .toSay{
        border: 1px solid #979797;
        color: #979797;
        background-color: transparent;
      }
      .toBuyAgain{
        border: 1px solid #F5A623;
        color: #F5A623;
        background-color: transparent;
      }
    }
  }

</style>
