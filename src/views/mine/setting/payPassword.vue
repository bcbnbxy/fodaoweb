<template>
  <div class='page pageColor'>
    <div class="passwordBox" v-if="!isFirst">
      <div class="passwordBoxTit">
        请输入支付密码
      </div>
      <ul class="passwordInput">
        <li><span v-if="passwords[0]"></span></li>
        <li><span v-if="passwords[1]"></span></li>
        <li><span v-if="passwords[2]"></span></li>
        <li><span v-if="passwords[3]"></span></li>
        <li><span v-if="passwords[4]"></span></li>
        <li><span v-if="passwords[5]"></span></li>
      </ul>
      <div class="forgetPaw"><span @click="forgetPsw()">忘记密码?</span></div>
    </div>

    <div class="passwordBox" v-if="isFirst">
      <div class="newPawTop">
        请输入 6 位数字的新密码
      </div>
      <ul class="passwordInput">
        <li><span v-if="passwordList[0]"></span></li>
        <li><span v-if="passwordList[1]"></span></li>
        <li><span v-if="passwordList[2]"></span></li>
        <li><span v-if="passwordList[3]"></span></li>
        <li><span v-if="passwordList[4]"></span></li>
        <li><span v-if="passwordList[5]"></span></li>
      </ul>
      <div class="newPawBottom">
        再次确认新密码
      </div>
      <ul class="passwordInput">
        <li><span v-if="passwordListRe[0]"></span></li>
        <li><span v-if="passwordListRe[1]"></span></li>
        <li><span v-if="passwordListRe[2]"></span></li>
        <li><span v-if="passwordListRe[3]"></span></li>
        <li><span v-if="passwordListRe[4]"></span></li>
        <li><span v-if="passwordListRe[5]"></span></li>
      </ul>
    </div>

    <ul class="keyBox" v-if="showPswEnter">
      <li @touchstart="enterPaw(1)">1</li>
      <li @touchstart="enterPaw(2)">2</li>
      <li @touchstart="enterPaw(3)">3</li>
      <li @touchstart="enterPaw(4)">4</li>
      <li @touchstart="enterPaw(5)">5</li>
      <li @touchstart="enterPaw(6)">6</li>
      <li @touchstart="enterPaw(7)">7</li>
      <li @touchstart="enterPaw(8)">8</li>
      <li @touchstart="enterPaw(9)">9</li>
      <li class="backgroundColor"></li>
      <li @touchstart="enterPaw('0')">0</li>
      <li class="backgroundColor" @touchstart="removePaw()"><img src="../../../assets/img/close2.png"></li>
    </ul>

    <alert-box :message="message" @isShow="isShowFun" v-if="isShow"></alert-box>

  </div>
</template>

<script>
  import {setPayPsw,yzPayPsw} from '@/api/index'
  import md5 from 'js-md5';
  export default {
    data() {
      return {
        showPswEnter: true,
        // 老密码
        passwords: [],
        // 新密码
        passwordList: [],
        // 确认新密码
        passwordListRe: [],
        // 是否验证完老密码
        isFirst: (this.$store.getters.getUserInfo.isPayment === 0?true:false),
        // 是否填完新密码
        isRePaw: false,
        // 是否确认新密码
        isRePawTrue: false,

        message: '',
        isShow: false,

        userInfo: this.$store.getters.getUserInfo
      }
    },
    mounted() {
      if(this.isFirst){
        document.title = "设置支付密码"
      }else {
        document.title = "修改支付密码"
      }
    },
    methods: {
      // 输入密码
      enterPaw(val,e){
        if (this.isFirst){
          if(this.isRePaw){
            // 确认新密码，提交新密码
            if(this.passwordListRe.length < 6){this.passwordListRe.push(val);}
            if(this.passwordListRe.length === 6){
              let psw = this.passwordList.join('');
              let rePsw = this.passwordListRe.join('');
              if(psw === rePsw){
                // 发起请求提交新密码
                let paw = md5(md5(md5(md5(md5(rePsw)))));
                setPayPsw({paymentPwd: paw}).then((res)=>{
                  if(res.code === "Y"){
                    this.message = '设置成功';
                    this.isShow = true;
                    let s = this.$store.getters.getUserInfo;
                    s.isPayment = 1;
                    this.$store.dispatch('userInfo', s);
                    setTimeout(()=>{
                      this.$router.go(-1)
                    },2000)
                  }else {
                    this.message = res.msg;
                    this.isShow = true;
                  }
                })
              }else {
                this.message = '两次密码输入不一致！';
                this.isShow = true;
              }
            }
          }else {
            // 新密码填写
            this.passwordList.push(val);
            if(this.passwordList.length === 6){
              this.isRePaw = true;
            }
          }
        }else {
          // 旧密码填写验证
          if(this.passwords.length < 6){
            this.passwords.push(val);
          }else {
            return false;
          }
          if(this.passwords.length === 6){
            // this.showPswEnter = false;
            // 发起请求验证旧密码
            let paw = md5(md5(md5(md5(md5(this.passwords.join(''))))));
            yzPayPsw({paymentPwd: paw}).then((res)=>{
              if(res.code === "Y"){
                this.message = '验证成功，请输入新密码';
                this.isShow = true;
                this.showPswEnter = true;
                this.passwordList = [];
                this.isFirst = true;
              }else {
                this.message = res.msg;
                this.isShow = true;
              }
            })
          }
        }
        let env = window.event || e;
        env.target.style.backgroundColor = '#F9F9F9';
        setTimeout(function () {
          env.target.style.backgroundColor = ''
        },100)
      },
      // 删除密码
      removePaw(){
        if (this.isFirst){
          if(this.isRePaw){
            this.passwordListRe.pop();
            if(this.passwordListRe.length===0){
              this.passwordList.pop();
              this.isRePaw = false;
            }
          }else {
            this.passwordList.pop();
          }
        }else {
          this.passwords.pop();
        }
      },
      // 返回弹框
      isShowFun(){
        this.isShow = false
      },
      // 忘记密码
      forgetPsw(){
        if(this.userInfo.userMobile){
          this.$router.push({path: '/forgetPsw'});
        }else {
          this.message = '请先绑定手机号码';
          this.isShow = true;
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  .passwordBox{
    width: 345*@wu;
    height: 184*@wu;
    border-radius: 8*@wu;
    margin: 0 auto;
    .passwordBoxTit{
      font-size: 14*@wu;
      color: #646363;
      text-align: center;
      position: relative;
      margin: 40*@wu 0 25*@wu 0;
    }
    .newPawTop{
      font-size: 14*@wu;
      color: #646363;
      margin: 25*@wu 0 10*@wu 18*@wu;
    }
    .newPawBottom{
      font-size: 14*@wu;
      color: #646363;
      margin: 25*@wu 0 10*@wu 18*@wu;
    }
    .passwordInput{
      border: 1px solid #A0A0A0;
      border-radius: 5*@wu;
      width: 316*@wu;
      height: 43*@wu;
      margin: 0 14*@wu 10*@wu 14*@wu;
      padding: 0;
      list-style: none;
      li{
        width: 316/6*@wu;
        float: left;
        border-right: 1px solid #A0A0A0;
        box-sizing: border-box;
        height: 43*@wu;
        line-height: 43*@wu;
        text-align: center;
        span{
          display: inline-block;
          width: 12*@wu;
          height: 12*@wu;
          background-color: #333333;
          border-radius: 50%;
        }
      }
      li:last-child{
        border-right: none;
      }
    }
    .forgetPaw{
      text-align: right;
      font-size: 12*@wu;
      color: #F5A623;
      padding-right: 20*@wu;
    }
  }
  .keyBox{
    list-style: none;
    padding: 0;
    margin: 0;
    border-top: 1px solid #F1F1F1;
    background-color: #ffffff;
    overflow: hidden;
    position: fixed;
    z-index: 207;
    bottom: 0;
    left: 0;
    li{
      float: left;
      width: 375/3*@wu;
      text-align: center;
      height: 54*@wu;
      line-height: 54*@wu;
      font-size: 24*@wu;
      color: #030303;
      box-sizing: border-box;
      img{
        width: auto;
        height: 15*@wu;
      }
    }
    li:nth-of-type(3n-2){
      border-bottom: 1px solid #F1F1F1;
      border-right: 1px solid #F1F1F1;
    }
    li:nth-of-type(3n-1){
      border-bottom: 1px solid #F1F1F1;
    }
    li:nth-of-type(3n){
      border-bottom: 1px solid #F1F1F1;
      border-left: 1px solid #F1F1F1;
    }
    .backgroundColor{
      background-color: #F9F9F9;
    }
  }
</style>
