<template>
  <div class="page">
    <div class="partnerTop">
      <img :src="turnListData[defaultIndex]?turnListData[defaultIndex].partnerImg:'#'">
      <div class="mineUserInfo">
        <img :src="userInfo.wechatImg" v-if="userInfo.wechatImg">
        <img src="../../assets/img/userImg.png" v-else>
        <div>
          <p @click="goLogin()">{{userInfo.name?userInfo.name:userInfo.wechatName?userInfo.wechatName: ($store.getters.getToken?userInfo.userMobile:'请登录')}}</p>
          <span v-if="userInfo && userInfo.userLevel">< {{ userInfo.userLevel | userType }} ></span>
        </div>
      </div>
    </div>
    <div class="partnerPage">
      <div class="moveBox" v-for="(item,index) in turnListData" @touchstart="touchStart()" @touchmove="touchMove(index)" @touchend="touchEnd()">
        <h3>
          <img src="../../assets/img/partner1.png" v-if="index === 0">
          <img src="../../assets/img/partner2.png" v-if="index === 1">
          <img src="../../assets/img/partner3.png" v-if="index === 2">
          <img src="../../assets/img/partner4.png" v-if="index === 3">
        </h3>
        <p>{{item.partnerName}}</p>
        <span @click="buyPartnerFun(item.id)">立即购买</span>
        <div class="partnerContent" v-html="item.comment"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {partnerList,userInfoApi} from '@/api/index'
  import { MessageBox } from 'mint-ui';
  export default {
    data(){
      return{
        userInfo: JSON.parse(sessionStorage.getItem('wxUserInfo')) || '',
        defaultIndex: 0,  // 默认合伙人
        translateVal: 0, // 移动系数left的判断值
        turnListData: [], // 列表对象
        boxWidth: 0, // 盒子的宽度
        leftOrRight: 1, // 1为右，2为左
      }
    },
    mounted(){
      document.title = '合伙人';
      partnerList().then((res)=>{
        if (res.code === 'Y'){
          this.turnListData = res.data;
          this.$nextTick(()=>{
            this.moveBoxFun();
          })
        }
      })
      if(this.$store.getters.getToken && this.$store.getters.getToken!=='userId'){
        this.getUserInfo();
      }
    },
    methods:{
      // 移动公共方法
      moveBoxFun(coefficient){
        var coefficient = coefficient || 0;
        let allBox = document.getElementsByClassName('moveBox');
        this.boxWidth = allBox[0].offsetWidth || 304; // 盒子的宽度
        let moreVal = (window.innerWidth - this.boxWidth) / 2 - 15; // 间距的宽度
        for (let i = 0; i < allBox.length; i++){
          if(this.defaultIndex === i){
            allBox[i].style.transform = "translateX(0) scale(1,1)";
          }else {
            allBox[i].style.transform = "translateX(0) scale(0.9,0.9)";
          }
          allBox[i].style.left = coefficient + (i - this.defaultIndex) * (this.boxWidth) + moreVal + 15 + 'px';
          // 加上下面这句，整个世界都好了
          allBox[i].style.transition = 'all .3s ease';
        }
      },
      // 去登录
      goLogin(){
        if(!this.$store.getters.getToken){
          this.$router.push({path: '/login'})
        }
      },
      // 查询个人信息
      getUserInfo() {
        userInfoApi().then((res) => {
          if (res.code === 'Y') {
            this.userInfo = res.data;
            this.$store.dispatch('userInfo', res.data);
            if(res.data.userLevel===7){
              this.defaultIndex = 0
            }else if (res.data.userLevel===1){
              this.defaultIndex = 3
            }else if (res.data.userLevel===2){
              this.defaultIndex = 2
            }else if (res.data.userLevel===3){
              this.defaultIndex = 1
            }
            this.moveBoxFun();
          }
        })
      },
      // 购买合伙人
      buyPartnerFun(id) {
      	
        if(this.$store.getters.getToken==='userId'){
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
        }else {
          this.$router.push({path:'/buyPartner/' + id + '/2'})
        }
      },
      // 滑动切换开始
      touchStart(e) {
        this.translateVal = 0;
        let ev = e || window.event;
        this.startX = ev.changedTouches[0].pageX;
        this.startY = ev.changedTouches[0].pageY;
      },
      // 滑动切换移动
      touchMove(index,e) {
        let ev = e || window.event;
        let moveEndX = ev.changedTouches[0].pageX;
        let moveEndY = ev.changedTouches[0].pageY;
        let X = moveEndX - this.startX;
        let Y = moveEndY - this.startY;
        if (Math.abs(X) > Math.abs(Y) && X > 0) { // right
          this.translateVal += 5;
          this.moveBoxFun(this.translateVal);
          this.leftOrRight = 1;
        }
        else if (Math.abs(X) > Math.abs(Y) && X < 0) { // left
          this.translateVal -= 5;
          this.moveBoxFun(this.translateVal);
          this.leftOrRight = 2;
        }
        else if (Math.abs(Y) > Math.abs(X) && Y > 0) {
          //console.log("top 2 bottom")
        }
        else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
          //console.log("bottom 2 top")
        }
        else {
          //console.log("just touch");
        }
      },
      // 滑动切换结束
      touchEnd() {
        if(this.leftOrRight === 1){
          // 往右
          if(this.defaultIndex > 0){
            this.defaultIndex = this.defaultIndex - 1;
          }
        }else if(this.leftOrRight === 2){
          // 往左
          if(this.defaultIndex < this.turnListData.length-1){
            this.defaultIndex = this.defaultIndex + 1;
          }
        }
        this.moveBoxFun();
        this.translateVal = 0;
        this.startX = 0;
        this.startY = 0;
      }
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  .partnerTop{
    width: 375*@wu;
    height: 233*@wu;
    position: relative;
    overflow: hidden;
    &>img{
      width: 375*@wu;
      height: 143*@wu;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
    }
    .mineUserInfo{
      margin-top: 23*@wu;
      position: relative;
      z-index: 10;
      img{
        width: 42*@wu;
        height: 42*@wu;
        border-radius: 50%;
        margin-left: 28*@wu;
        display: inline-block;
        vertical-align: middle;
      }
      div{
        display: inline-block;
        vertical-align: middle;
        opacity: 0.9;
        p{
          margin: 0;
          font-size: 10*@wu;
          color: rgba(255,255,255,0.9);
          text-shadow: 0 0 5px #000;
        }
        span{
          font-size: 13*@wu;
          color: rgba(255,255,255,0.9);
          display: inline-block;
          text-shadow: 0 0 5px #000;
        }
      }
    }
  }
  .partnerPage{
    position: relative;
    width: 100%;
    height: 460*@wu;
    overflow: hidden;
    margin-top: -160*@wu;
    padding-bottom: 5*@wu;
    .moveBox{
      width: 304*@wu;
      height: 460*@wu;
      border-radius: 8*@wu;
      white-space:nowrap;
      position: absolute;
      top: 0;
      letter-spacing: 0;
      text-align: center;
      box-shadow: 0 0 5*@wu 0 rgba(128,119,119,0.50);
      background-color: #ffffff;
      h3{
        font-size: 16*@wu;
        margin-top: 27*@wu;
        margin-bottom: 1*@wu;
        font-weight: 400;
        img{
          width: 114*@wu;
          height: 47*@wu;
        }
      }
      p{
        font-size: 15*@wu;
        margin: 0 0 14*@wu 0;
        padding: 0;
        color: #262525;
      }
      span{
        width: 80*@wu;
        font-size: 12*@wu;
        background-color: #D0021B;
        border-radius: 8*@wu;
        color: #ffffff;
        text-align: center;
        padding: 5*@wu 15*@wu;
        display: block;
        margin: 0 auto;
      }
    }
  }
  .partnerContent{
    width: 100%;
    overflow: hidden;
    height: 320*@wu;
  }
</style>
<style lang="less">
  @wu: 100vw / 375;
  .partnerContent{
    img{
      width: auto;
      height: 320*@wu;
      border-bottom-right-radius: 8*@wu;
      border-bottom-left-radius: 8*@wu;
      pointer-events: none;
    }
    p{
      margin: 0;
      padding: 0;
    }
  }
</style>
