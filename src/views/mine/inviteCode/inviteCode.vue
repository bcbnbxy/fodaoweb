<template>
  <div class='page pageColor'>
    <div class="inviteCode">
      <img :src="userInfo.wechatImg" v-if="userInfo.wechatImg">
      <img src="../../../assets/img/userImg.png" v-else>
      <div class="inviteCodeTit">
       <!-- 微信: -->{{userInfo.name}}
      </div>
      <div class="inviteCodeTopBox">
        <div class="left">
          <div>VIP等级</div>
          <div>{{userInfo.userLevel | userType}}</div>
        </div>
        <div class="center">
          <div></div>
        </div>
        <div class="right">
          <div>加入时间</div>
          <div>{{userInfo.createTime}}</div>
        </div>
      </div>
    </div>
    <div class="inviteCodeCenter">
      <div class="left">
        <div>邀请码总数</div>
        <div>{{inviteData.total}}</div>
      </div>
      <div class="center">
        <div>邀请佣金</div>
        <div>￥{{ inviteData.totalAmout }}</div>
      </div>
      <div class="right">
        <button @click="goWith()">提现</button>
      </div>
    </div>
    <div class="inviteCodeCom">
      <ul>
        <li><span>未使用的邀请码</span><i>{{inviteData.noUse}}</i><div></div></li>
        <li><span>已使用的邀请码</span><i>{{inviteData.used}}</i><div></div></li>
        <li><span>成功邀请</span><i>{{inviteData.successInv}}</i><div></div></li>
        <!--<li><span>失效邀请</span><i>{{inviteData.failInv}}</i><div></div></li>-->
        <li @click="goNext()"><span>最近邀请码</span><i></i><div><img src="../../../assets/img/next.png"></div></li>
      </ul>
    </div>

    <alert-box :message="message" @isShow="isShowFun" v-if="isShow"></alert-box>
  </div>
</template>

<script>
  import {couponNum} from '@/api/index'
  export default {
    data() {
      return {
        userInfo: this.$store.getters.getUserInfo,
        inviteData: '',
        // 错误提醒
        message: '',
        isShow: false,
      }
    },
    mounted() {
      document.title = '邀请码';
      this.queryInviteCode();
    },
    methods: {
      isShowFun(){
        this.isShow = false
      },
      // 查询邀请码
      queryInviteCode(){
        couponNum().then((res)=>{
          if (res.code === 'Y'){
            res.data.totalAmout = res.data.totalAmout || 0;
            this.inviteData = res.data;
          }
        })
      },
      goNext(){
        this.$router.push({path:'/inviteCodeHistory'})
      },
      // 提现
      goWith(){
        if(this.inviteData.totalAmout < 100){
          this.message = '金额不足100元无法提现!';
          this.isShow = true;
        }else {
          this.$router.push({ path:'/withdraw/' + this.inviteData.totalAmout + '/' + 10});  // 10 为邀请码提现
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @wu:100vw/375;
  .inviteCode{
    height: 145*@wu;
    background-color: #ffffff;
    overflow: hidden;
    &>img{
      width: 45*@wu;
      height: 45*@wu;
      border-radius: 50%;
      display: block;
      margin: 18*@wu auto 12*@wu auto;
    }
    .inviteCodeTit{
      font-size: 12*@wu;
      color: #262525;
      text-align: center;
    }
    .inviteCodeTopBox{
      display: flex;
      align-items: center;
      justify-content: center;
      .left{
        width:180*@wu;
        text-align: center;
        div:nth-of-type(1){
          font-size: 10*@wu;
          color: #646363;
          margin-bottom: 4*@wu;
        }
        div:nth-of-type(2){
          font-size: 12*@wu;
          color: #262525;
        }
      }
      .center{
        width:15*@wu;
        display: flex;
        align-items: center;
        justify-content: center;
        div{
          width: 1px;
          height: 20*@wu;
          background-color: #F1F1F1;
        }
      }
      .right{
        width:180*@wu;
        text-align: center;
        div:nth-of-type(1){
          font-size: 10*@wu;
          color: #646363;
          margin-bottom: 4*@wu;
        }
        div:nth-of-type(2){
          font-size: 12*@wu;
          color: #262525;
        }
      }
    }
  }
  .inviteCodeCenter{
    height: 90*@wu;
    background-image: linear-gradient(-101deg, #FFC940 1%, #FFBD30 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    .left{
      width:140*@wu;
      text-align: center;
      div:nth-of-type(1){
        font-size: 14*@wu;
        color: #FFFFFF;
        margin-bottom: 5*@wu;
      }
      div:nth-of-type(2){
        font-size: 18*@wu;
        color: #FFFFFF;
      }
    }
    .center{
      width:160*@wu;
      div:nth-of-type(1){
        font-size: 14*@wu;
        color: #FFFFFF;
        margin-bottom: 4*@wu;
      }
      div:nth-of-type(2){
        font-size: 18*@wu;
        color: #FFFFFF;
      }
    }
    .right{
      width:75*@wu;
      display: flex;
      align-items: center;
      button{
        border: 1px solid #FFFFFF;
        border-radius: 3*@wu;
        width: 65*@wu;
        height: 28*@wu;
        color: #ffffff;
        background-color: transparent;
        outline: none;
      }
    }
  }
  .inviteCodeCom{
    background-color: #ffffff;
    padding: 5*@wu 10*@wu 5*@wu 10*@wu;
    overflow: hidden;
    ul{
      list-style: none;
      margin: 0;
      padding: 0;
      li{
        height: 50*@wu;
        line-height: 45*@wu;
        border-bottom: 1px solid #F1F1F1;
        display: flex;
        align-items: center;
        justify-content: center;
        span{
          font-size: 15*@wu;
          color: #262525;
          display: block;
          vertical-align: middle;
          width: 130*@wu;
        }
        i{
          font-style: inherit;
          display: block;
          vertical-align: middle;
          width: 235*@wu;
          text-align: right;
          font-size: 15*@wu;
          color: #262525;
        }
        div{
          width: 10*@wu;
          img{
            width: 5*@wu;
            height: auto;
          }
        }
      }
      li:last-child{
        border-bottom: none;
      }
    }
  }
</style>
