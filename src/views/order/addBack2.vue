<template>
  <div class='page pageColor'>
    <div class="topDistance"></div>
    <div class="backNameTit"><span>卡类型</span><i>招商银行 储蓄卡</i></div>
    <div class="line"></div>
    <div class="backInputBox">
      <!--<div class="backInputBoxList">
        <span>姓&emsp;名</span>
        <input type="text" v-model="ruleForm.name" placeholder="请输入储蓄卡户名">
        <img src="../../assets/img/clear.png" @touchstart="closeFun('name')">
      </div>-->
      <div class="backInputBoxList">
        <span>身份证</span>
        <input type="text" v-model="ruleForm.ID" placeholder="请输入身份证号码">
        <img src="../../assets/img/clear.png" @touchstart="closeFun('ID')">
      </div>
      <div class="backInputBoxList">
        <span>手机号</span>
        <input type="number" v-model="ruleForm.phone" placeholder="请输入银行预留手机号码">
        <img src="../../assets/img/clear.png" @touchstart="closeFun('phone')">
      </div>
      <div class="backInputBoxList">
        <span>开户地</span>
        <input type="text" v-model="ruleForm.openAds" placeholder="请选择银行开户地所在城市">
        <img src="../../assets/img/clear.png" @touchstart="closeFun('openAds')">
      </div>
    </div>
    <div class="setDetailAds" @click="agreeFun()">
      <img src="../../assets/img/choosePayWay.png" v-if="isAgree">
      <img src="../../assets/img/noChoose.png" v-else>
      <span>同意<router-link to="/userAgreement" tag="i">《用户协议》</router-link></span>
    </div>
    <button class="backBtn" :disabled="isDisabled" :style="{opacity: isDisabled?'0.5':''}" @click="addBackNext()">下一步</button>

    <alert-box :message="message" @isShow="isShowFun" v-if="isShow"></alert-box>

  </div>
</template>

<script>

  export default {
    data() {
      return {
        isAgree: false,
        isDisabled: true,
        ruleForm:{
         /* name:'', */
          ID: '',
          phone: '',
          openAds:''
        },
        // 错误提醒
        message: '',
        isShow: false
      }
    },
    mounted() {
    },
    methods: {
      agreeFun(){
        this.isAgree = !this.isAgree;
      },
      addBackNext(){

      },
      closeFun(val){
        for (let key in this.ruleForm){
          if(key === val){
            this.ruleForm[key] = '';
          }
        }
      },
      isShowFun(){
        this.isShow = false;
      }
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  .backNameTit{
    height: 60*@wu;
    line-height: 60*@wu;
    padding-left: 20*@wu;
    background-color: #ffffff;
    span{
      font-size: 15*@wu;
      color: #262525;
      margin-right: 15*@wu;
    }
    i{
      font-size: 15*@wu;
      color: #F1B402;
      font-style: inherit;
    }
  }
  .backInputBox{
    background-color: #FFFFFF;
    padding: 0 20*@wu;
    .backInputBoxList{
      border-bottom: 1px solid #F1F1F1;
      height: 48*@wu;
      line-height: 48*@wu;
      box-sizing: border-box;
      font-size: 14*@wu;
      position: relative;
      input{
        width: 278*@wu;
        height: 38*@wu;
        border: none;
        outline: none;
        font-size: 14*@wu;
        &::placeholder{
          color: #D2D2D2;
        }
      }
      span{
        margin-right: 10*@wu;
      }
      img{
        width: 13*@wu;
        height: 13*@wu;
        display: none;
        position: absolute;
        top: 16*@wu;
        right: 0;
      }
      input:focus + img{
        display: inline-block;
      }
    }
    .backInputBoxList:last-child{
      border-bottom:none;
    }
  }
  .setDetailAds {
    padding: 16*@wu 0 0 20*@wu;
    img {
      width: 16*@wu;
      height: 16*@wu;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      font-size: 13*@wu;
      color: #615E5B;
      i{
        font-style: inherit;
        color: #F1B402;
      }
    }
  }
  .backBtn{
    background-image: linear-gradient(-101deg, #FFC940 1%, #FFBD30 100%);
    border-radius: 7*@wu;
    width: 345*@wu;
    height: 42*@wu;
    border: none;
    display: block;
    margin: 0 auto;
    font-size: 16*@wu;
    color: #FFFFFF;
    margin-top: 40*@wu;
  }
</style>
