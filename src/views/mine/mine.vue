<template>
  <div class="page pageColor">
    <div class="mineTop">
      <div class="mineSetting" @click="goNext('/setting')">
        <img src="../../assets/img/setting.png">
      </div>
      <div class="mineUserInfo">
        <img :src="userInfo.wechatImg" v-if="weChatImg===1" @click="goNext('/infoList')">
        <img src="../../assets/img/userImg.png" v-if="weChatImg===2" @click="goNext('/infoList')">
        <div>
          <p>{{!!$store.getters.getUserInfo.name?$store.getters.getUserInfo.name: !!$store.getters.getUserInfo.wechatName?$store.getters.getUserInfo.wechatName: ''}}</p>
          <span v-if="userInfo.userLevel>0"> < {{userInfo.userLevel | userType}} > </span>
        </div>
      </div>
    </div>
    <div class="topDistance"></div>
    <ul class="mineUlLine">
      <li>我的余额<span>￥ {{userInfo.balance2 || '0.00'}}</span> <i @click="goWith()">余额提现</i></li>
    </ul>
    <ul class="contentListUl">
      <li @click="goNext('/myOrder')">
        <img src="../../assets/img/myOrder.png">
        <div>我的订单</div>
      </li>
      <li @click="goNext('/referee')">
        <img src="../../assets/img/referee.png">
        <div>推荐人</div>
      </li>
      <li @click="goNext('/myClass')">
        <img src="../../assets/img/myClass.png">
        <div>我的课程</div>
      </li>
      <li @click="goNext('/inviteCode')">
        <img src="../../assets/img/yqCord.png">
        <div>邀请码</div>
      </li>
      <!--@click="goNext('/consultationCenter')"-->
      <li @click="goNext('/myClassmate')"> 
        <img src="../../assets/img/consulting2.png">
        <div>我的学友</div>
      </li>
     
      <li @click="goNext('/extendEWM')">
        <img src="../../assets/img/ewm.png">
        <div>推广二维码</div>
      </li>
      <li @click="goNext('/couPon')">
        <img src="../../assets/img/point.png">
        <!-- <div>我的积分 : 0</div> -->
        <div>我的优惠券</div>
      </li>
      <li @click="goNext('/extend')">
        <img src="../../assets/img/extension_center.png">
        <div>推广中心</div>
      </li>
      <li @click="stockPoolIndexFun()">
        <img src="../../assets/img/gC.png">
        <div>股池</div>
      </li>
    </ul>
    <alert-box :message="message" @isShow="isShowFun" v-if="isShow"></alert-box>
  </div>
</template>

<script>
  import {userInfoApi} from '@/api/index'
  import { MessageBox } from 'mint-ui';
  export default {
    data() {
      return {
        userInfo: '',
        message: '',
        isShow: false,
        weChatImg: 1 ,
        userInfo: this.$store.getters.getUserInfo,
      }
    },
    created(){
      document.title = '我的';
      this.getUserInfo();       
      let that = this;
      setTimeout(function(){that.tel()} , 400) ;
    },
    methods: {
      // 获取用户信息
      getUserInfo() {
        userInfoApi().then((res) => {
          if (res.code === 'Y') {
            this.userInfo = res.data;
            this.$store.dispatch('userInfo', res.data);
            if(this.userInfo.wechatImg){
              this.weChatImg = 1;
            }else {
              this.weChatImg = 2;
            }
          }else if(res.code === 'E00000033'){
            this.$store.dispatch('userInfo', JSON.parse(sessionStorage.getItem('wxUserInfo')));
            this.userInfo = JSON.parse(sessionStorage.getItem('wxUserInfo'));
          }
        })
      },
      //老用户验证手机号  数据合并
      tel(){
      		let tel =  this.userInfo.userMobile || JSON.parse( sessionStorage.getItem("userInfo") ).userMobile;  				
      		if( !tel )
      		{ 			      		
	          MessageBox({
		          title: '温馨提示',
		          message: '为了您更好的用户体验<br>请先验证手机号',
		          confirmButtonText: '立即验证',
		          showCancelButton: true
		        }).then(action => {
		          if (action === 'confirm') {
		            this.$router.push({path: '/bindWx'})
		          }
	         });
         }
      },
      // 弹框盒子
      publicFun(){
        /*MessageBox({
          title: '温馨提示',
          message: '您还未登录,是否登录?',
          confirmButtonText:'立即登录',
          showCancelButton: true
        }).then(action => {
          if(action === 'confirm'){
            this.$router.push({path: '/login'})
          }
        });*/
        this.message= '验证好手机号再点我哦';
        this.isShow= true;
      },
      // 跳下级页面
      goNext(path){
        if(this.$store.getters.getToken && this.$store.getters.getToken!=='userId'){
          this.$router.push({path: path})
        }else {
          this.publicFun();
        }
      },
      // 提现
      goWith(){
        if(this.$store.getters.getToken && this.$store.getters.getToken!=='userId'){
          if(this.userInfo.balance2 < 100){
            this.message = '您的金额不足100元!';
            this.isShow = true;
          }else {
            this.$router.replace({ path:'/withdraw/' + this.userInfo.balance2 + '/' + 6});  // 6 为推广佣金提现
          }
        }else {
          this.publicFun();
        }
      },
      isShowFun(){
        this.isShow = false;
      },
      goAlert(){
        this.message = '程序猿哥哥，光速在开发期待哦';
        this.isShow = true;
      } ,
      stockPoolIndexFun(){
      	 if(this.userInfo.isBonus === 1){
      	 	this.goNext('/stockPoolIndex');		        
	      }else
	      {
	      	this.message = '您当前没有享受分红权限';
	        this.isShow = true;
	      }
      	
      },
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  .mineTop {
    background: url(../../assets/img/mine_top.png) ;
    overflow: hidden;
    padding-bottom: 27*@wu;
    position: relative;
    height: 141*@wu;
    .mineSetting {
      position: absolute;
      top: 19*@wu;
      right: 24*@wu;
      img {
        width: 17*@wu;
        height: auto;
      }
    }
    .mineUserInfo {
      margin-top: 30*@wu;
      text-align: center;
      img {
        width: 58*@wu;
        height: 58*@wu;
        border-radius: 50%;
        display: inline-block;
        vertical-align: middle;
      }
      div {
        margin-top: 10*@wu;
        p {
          margin: 0;
          font-size: 12*@wu;
          color: #ffffff;
        }
        span {
          width: auto;
          height: 22*@wu;
          line-height: 20*@wu;
          background-color: #F1B402;
          border-radius: 37*@wu;
          border: none;
          font-size: 11*@wu;
          color: #ffffff;
          display: inline-block;
          text-align: center;
        }
      }
    }
  }

  .mineUlLine {
    list-style: none;
    overflow: hidden;
    height: 50*@wu;
    line-height: 50*@wu;
    background-color: #ffffff;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    li {
      font-size: 11*@wu;
      text-indent: 10*@wu;
      span {
        font-size: 14*@wu;
        color: #262525;
      }
      i{
        font-style: inherit;
        padding-left: 10*@wu;
        color: #f1b402;
      }
    }
  }

  .contentListUl {
    list-style: none;
    padding: 0;
    margin: 13*@wu 0 2*@wu 0;
    overflow: hidden;
    background-color: #ffffff;
    li {
      width: 375/3*@wu;
      height: 104*@wu;
      box-sizing: border-box;
      float: left;
      text-align: center;
      img {
        width: auto;
        height: 35*@wu;
        display: block;
        margin: 22*@wu auto 9*@wu auto;
      }
      div {
        font-size: 12*@wu;
        color: #262525;
      }
    }
    li:nth-of-type(1) {
      border-right: 1px solid rgb(233, 233, 233);
      border-bottom: 1px solid rgb(233, 233, 233);
    }
    li:nth-of-type(2) {
      border-bottom: 1px solid rgb(233, 233, 233);
    }
    li:nth-of-type(3) {
      border-left: 1px solid rgb(233, 233, 233);
      border-bottom: 1px solid rgb(233, 233, 233);
    }
    li:nth-of-type(4) {
      border-right: 1px solid rgb(233, 233, 233);
    }
    li:nth-of-type(6) {
      border-left: 1px solid rgb(233, 233, 233);
    }
    li:nth-of-type(7) {
      border-top: 1px solid rgb(233, 233, 233);
      border-right: 1px solid rgb(233, 233, 233);
    }
    li:nth-of-type(8) {
      border-top: 1px solid rgb(233, 233, 233);
    }
    li:nth-of-type(9) {
      border-top: 1px solid rgb(233, 233, 233);
      border-left: 1px solid rgb(233, 233, 233);
    }
  }
</style>
