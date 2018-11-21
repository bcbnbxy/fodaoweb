<template>
  <div class="page pageColor">
    <div class="topDistance"></div>
    <ul class="contentListUl">
      <li>
        <div>本人姓名</div>
        <div><input type="text" v-model="name" @blur="upDataRealName()" placeholder="请填写本人姓名"></div>
      </li>
      <li>
        <div>联系电话</div>
        <div><input type="number" v-model="mobile" :placeholder="userMobile" @blur="upDataContactMobile()"></div>
      </li>
    </ul>
    <div class="topDistance"></div>
    <div class="buyPartnerBox" v-if="payType === '1'">
      <img :src="partnerData.goodsImg">
      <div>
        <div>{{partnerData.goodsName}}</div>
        <div>幸福课程</div>
        <div>¥ {{partnerData.unitPrice}}<span>¥{{partnerData.marketPrice}}</span></div>
      </div>
    </div>
    <div class="buyPartnerBox" v-if="payType === '2'">
      <img :src="partnerData.partnerImg">
      <div>
        <div>{{ partnerData.partnerName }}</div>
        <div>终身合伙人</div>
        <div>¥ {{ partnerData.unitPrice }}<span>¥{{ partnerData.marketPrice }}</span></div>
      </div>
    </div>
    <div class="topDistance"></div>
    <div class="userYHQ" @click="userYHQFun()">使用优惠券<img src="../../assets/img/next.png"><span v-if="denomination>0">已减免{{denomination}}元</span></div>
    <div class="buyPartnerTotal">
      共计: <span>¥ {{partnerData.unitPrice - denomination}}</span>
    </div>

    <button class="subOrder" @click="submitOrder()">确认订单</button>

    <div class="YHQBox" v-if="isCouponCode">
      <div class="couPonBox" v-for="item in dataList">
        <img :src="item.giftPic">
        <div>
          <div>{{item.name}}</div>
          <div>{{item.comment}}</div>
          <div><img src="../../assets/img/time.png">还有<span>{{item.expired}}</span>天过期有效期至{{item.useEndDate}}</div>
        </div>
        <img src="../../assets/img/userNow.png" @click="userNow(item.coupon_code,item.denomination)">
      </div>
    </div>

    <alert-box :message="message" @isShow="isShowFun" v-if="isShow" :warningImg="1"></alert-box>

  </div>
</template>

<script>
  import {buyPartner,orderCreate,goodsDetail,userPatch,myCoupon} from '@/api/index'
  export default {
    data(){
      return{
        userInfo: this.$store.getters.getUserInfo,
        name: '',
        mobile:'',
        userMobile:'',
        partnerData: '',
        id: this.$route.params.id,
        payType: this.$route.params.payType, // 1 为课程，2为合伙人
        // 错误提醒
        message: '',
        isShow: false,
        dataList: [],
        couponCode: '',
        isCouponCode: false,
        denomination: 0
      }
    },
    created(){
      myCoupon({couponState:1}).then((res)=>{
        if(res.code === 'Y'){
          this.dataList = res.data || [];
        }
      })
    },
    mounted(){
      this.$nextTick(()=>{
        if(typeof this.$store.getters.getUserInfo.userMobile === 'undefined'){
          setTimeout(()=>{
            this.userInfo = this.$store.getters.getUserInfo;
            if(this.userInfo.userMobile){
              this.userMobile = this.userInfo.userMobile;
            }
            if(this.userInfo.realName){
              this.name = this.userInfo.realName;
            }
          },1000)
        }else {
          if(this.userInfo.userMobile){
            this.userMobile = this.userInfo.userMobile;
          }
          if(this.userInfo.realName){
            this.name = this.userInfo.realName;
          }
        }
      });
      if(this.payType==='1'){
        document.title = '购买课程';
        this.queryClass();
      }
      if(this.payType==='2'){
        document.title = '购买合伙人';
        this.queryPartner();
      }
    },
    methods:{
      userYHQFun(){
        if(this.dataList.length > 0 && this.partnerData.unitPrice > 100){
          this.isCouponCode = true;
        }
      },
      userNow(val,denomination){
        this.couponCode = val;
        this.denomination = denomination;
        this.isCouponCode = false;
      },
      // 查询合伙人信息
      queryPartner() {
        buyPartner({partnerId: this.$route.params.id}).then((res) => {
          if (res.code === 'Y') {
            this.partnerData = res.data;
          }
        })
      },
      // 查询课程信息
      queryClass() {
        goodsDetail({goodsId: this.id}).then((res)=>{
          if (res.code === 'Y'){
            this.partnerData = res.data;
          }
        })
      },
      // 提交订单
      submitOrder() {
        if(this.name === ''){
          this.message = '请填写姓名';
          this.isShow = true;
          return false
        }
        if(!this.userMobile){
          if(this.mobile===''){
            this.message = '请输入联系电话';
            this.isShow = true;
            return false
          }
        }
        let sB = [{
          goodsId : this.partnerData.id,
          num: 1,
          orderPay: this.partnerData.unitPrice,
          needPay: this.partnerData.unitPrice - this.denomination
        }];
        let data = {
          orderType: this.payType,
          orderChannel: 1,
          addressId: '',
          couponCode: this.couponCode,
          needPay: this.partnerData.unitPrice - this.denomination,
          suborderList: JSON.stringify(sB)
        };
        orderCreate(data).then((res) => {
          if (res.code === 'Y') {
            this.$store.dispatch('orderInfo', JSON.stringify(res.data));
            this.$router.replace({path: '/orderPay'});
          } else {
            this.message = res.msg;
            this.isShow = true;
          }
        })
      },
      // 更新真实姓名
      upDataRealName(){
        if(this.name === ''){
          return false
        }else {
          userPatch({realName: this.name}).then((res)=>{
            if(res.code === "Y"){
              let s = this.$store.getters.getUserInfo;
              s.realName = this.name;
              this.$store.dispatch('userInfo', s);
            }
          })
        }
      },
      // 更新联系方式
      upDataContactMobile(){
        if(this.mobile==='' && this.userMobile){
          return false
        }else {
          if (this.isPhoneFun(this.mobile)) {
            this.message = '请输入正确的手机号';
            this.isShow = true;
            return false;
          } else {
            userPatch({contactMobile: this.mobile}).then((res)=>{
              if(res.code === "Y"){
                let s = this.$store.getters.getUserInfo;
                s.contactMobile = this.mobile;
                this.$store.dispatch('userInfo', s);
              }
            })
          }
        }
      },
      // 验证手机号码
      isPhoneFun(mobile) {
        return !(/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(mobile))
      },
      // 关闭弹框
      isShowFun() {
        this.isShow = false;
      }
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  .YHQBox{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    background-color: #ffffff;
    padding-top: 40*@wu;
    box-sizing: border-box;
  }
  .userYHQ{
    height: 36*@wu;
    line-height: 36*@wu;
    text-indent: 10*@wu;
    font-size: 14*@wu;
    color: #999999;
    background-color: #ffffff;
    margin-bottom: 2*@wu;
    img{
      width: 8*@wu;
      height: auto;
      float: right;
      margin-top: 10*@wu;
      margin-right: 10*@wu;
    }
    span{
      float: right;
      margin-right: 8*@wu;
    }
  }
  .contentListUl{
    list-style: none;
    padding-left: 10*@wu;
    margin: 0;
    overflow: hidden;
    background-color: #ffffff;
    li{
      border-bottom: 1px solid #F1F1F1;
      height: 50*@wu;
      line-height: 50*@wu;
      div{
        display: inline-block;
        vertical-align: middle;
      }
      div:nth-of-type(1){
        font-size: 15*@wu;
        color: #262525;
        width: 100*@wu;
      }
      div:nth-of-type(2){
        width: 250*@wu;
        font-size: 13*@wu;
        color: #646363;
        text-align: right;
        box-sizing: border-box;
        input{
          width: 100%;
          height: 32*@wu;
          border: none;
          outline: none;
        }
      }
    }
    li:last-child{
      border-bottom: none;
    }
  }
  .buyPartnerBox{
    background-color: #ffffff;
    padding: 30*@wu 0 38*@wu 0;
    img{
      width: 133*@wu;
      height: 98*@wu;
      display: inline-block;
      margin-left: 10*@wu;
      margin-right: 20*@wu;
      vertical-align: top;
      border: none;
    }
    &>div{
      display: inline-block;
      width: 200*@wu;
      overflow: hidden;
      vertical-align: top;
      div:nth-of-type(1){
        font-size: 15*@wu;
        color: #383838;
        margin-top: 10*@wu;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      div:nth-of-type(2){
        font-size: 12*@wu;
        color: #A1A1A1;
        margin-top: 5*@wu;
        text-indent: 5*@wu;
      }
      div:nth-of-type(3){
        font-size: 15*@wu;
        color: #383838;
        margin-top: 10*@wu;
        font-weight: 600;
        span{
          font-size: 13*@wu;
          color: #E2E2E2;
          margin-left: 15*@wu;
          font-weight: 200;
          text-decoration:line-through;
        }
      }
    }
  }
  .buyPartnerTotal{
    height: 60*@wu;
    line-height: 60*@wu;
    font-size: 14*@wu;
    color: #A1A1A1;
    background-color: #ffffff;
    text-align: right;
    padding-right: 30*@wu;
    span{
      font-size: 20*@wu;
      color: #F44F4F;
      margin-left: 5*@wu;
    }
  }
  .subOrder {
    background-color: #414040;
    border-radius: 7*@wu;
    width: 345*@wu;
    height: 42*@wu;
    border: none;
    color: #ffffff;
    font-size: 16*@wu;
    margin:100*@wu 0 0 15*@wu;
  }
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
