<template>
  <div class='page'>
    <!--<div class="refereeBox">
      <img class="topImg" src="../../assets/img/userImg.png">
      <div class="refereeName">{{larderInfo.realName || '无'}}</div>
      <div class="refereeList marginBom"><img class="wxName2" src="../../assets/img/wxName2.png"><span>{{larderInfo.name || '无'}}</span></div>
      <div class="refereeList"><img class="tel" src="../../assets/img/tel.png"><span>{{larderInfo.userMobile || '无'}}</span></div>
    </div>
    <img class="refereeEWM" :src="larderInfo.wechatIdUrl" v-if="larderInfo.wechatIdUrl">
    <img class="refereeBtn" src="../../assets/img/myRefree.png">-->
    <div class="inviteCode"></div>
    <img class="refereeImg" :src="larderInfo.wechatImg" v-if="larderInfo.wechatImg">
    <img class="refereeImg" src="../../assets/img/userImg.png" v-else>
    <div class="inviteCodeCom">
      <ul>
        <li><span>真实姓名</span><i>{{larderInfo.realName?larderInfo.realName:'未填'}}</i><div></div></li>
        <li><span>微信昵称</span><i>{{larderInfo.name?larderInfo.name:'未填'}}</i><div></div></li>
        <li><span>手机号码</span><i>{{larderInfo.userMobile?larderInfo.userMobile:'未绑定'}}</i><div></div></li>
      </ul>
    </div>
    <div class="refereeEwm" v-if="larderInfo.wechatIdUrl">
      <img :src="larderInfo.wechatIdUrl">
      <span>扫码添加推荐人微信</span>
    </div>
  </div>
</template>

<script>
  import {larderUserInfoApi} from '@/api/index'
  export default {
    data() {
      return {
        userInfo: this.$store.getters.getUserInfo,
        larderInfo: ''
      }
    },
    mounted() {
      document.title = '推荐人';
      larderUserInfoApi('/' + this.userInfo.recommendUserid).then((res)=>{
        if (res.code === 'Y'){
          this.larderInfo = res.data;
        }
      })
    },
    methods: {}
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  /*.refereeBox {
    width: 293*@wu;
    height: 235*@wu;
    background: #FFFFFF;
    box-shadow: 0 0 12*@wu 0 rgba(217, 217, 217, 0.50);
    border-radius: 4*@wu;
    margin: 65*@wu auto 0 auto;
    overflow: hidden;
    .topImg {
      width: 80*@wu;
      height: 80*@wu;
      display: block;
      margin: 30*@wu auto 10*@wu auto;
    }
    .refereeName {
      width: 230*@wu;
      height: 30*@wu;
      margin: 0 auto;
      text-align: center;
      font-size: 15*@wu;
      color: #747474;
      border-bottom: 1px solid #E5DFDF;
      margin-bottom: 12*@wu;
    }
    .refereeList {
      font-size: 15*@wu;
      color: #747474;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      .wxName2 {
        width: auto;
        height: 13*@wu;
      }
      .tel {
        width: auto;
        height: 13*@wu;
      }
      img{
        vertical-align: middle;
        margin-right: 5*@wu;
      }
      span{
        vertical-align: middle;
      }
    }
    .marginBom{
      margin-bottom: 5*@wu;
    }
  }
  .refereeEWM{
    width: 94*@wu;
    height: 94*@wu;
    display: block;
    margin: 36*@wu auto 0 auto;
  }
  .refereeBtn{
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
    z-index: 0;
  }*/
  .inviteCode{
    height: 64*@wu;
    background-color: #F1F1F1;
    overflow: hidden;
  }
  .refereeImg{
    width: 52*@wu;
    height: 52*@wu;
    border-radius: 50%;
    display: block;
    margin: -26*@wu auto 12*@wu auto;
  }
  .refereeEwm{
    margin-top: 20*@wu;
    overflow: hidden;
    text-align: center;
    font-size: 12*@wu;
    color: #646363;
    img{
      width: 180*@wu;
      height: 180*@wu;
      //box-shadow: 8*@wu -10*@wu 2*@wu #F1F1F1;
      margin: 10*@wu 0 5*@wu 0;
      border: 1px solid #F1F1F1;
      padding: 2px;
      box-sizing: border-box;
    }
    span{
      display: block;
      text-align: center;
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
          color: #646363;
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
    }
  }
</style>
