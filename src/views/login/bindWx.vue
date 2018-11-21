<template>
  <div class="page" style="background-color: #DAE9E4">
    <div class="bindWxBox">
      <img class="bindWxLogo noPointerImg" src="../../assets/img/bindWx1.png">
      <div class="inputBox">
        <div>
          <div>手机号</div>
          <input type="number" placeholder="请输入11位数字手机号码" v-model="mobile">
        </div>
        <div>
          <div>验证码</div>
          <input type="number" placeholder="请输入验证码" v-model="code">
          <button @click="setCode()">{{btnTest}}</button>
        </div>
        <img src="../../assets/img/bindWx2.png" class="noPointerImg">
      </div>
      <img class="bindWxSubmit" src="../../assets/img/bindWx3.png" @click.prevent="loginFun()">
    </div>

    <alert-box :message="message" @isShow="isShowFun" v-if="isShow"></alert-box>
  </div>
</template>

<script>
  import {login,sendCode,userInfoApi,userPatch,bindWxMob} from '@/api/index' // wxLogin,
  export default {
    data() {
      return {
        mobile: '',
        code: '',
        btnTest: '发送验证码',
        timeVal:60,
        isSend: true,

        // 错误提醒
        message: '',
        isShow: false
      }
    },
    created(){
      document.title = '验证手机号码';
    },
    methods: {
      // 关闭弹框
      isShowFun() {
        this.isShow = false;
      },
      // 手机号码登录
      showPhone() {
        this.isPhone = true
      },
      // 验证手机号码
      isPhoneFun(mobile) {
        return !(/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(mobile))
      },
      // 发送验证码
      setCode() {
        if (this.isPhoneFun(this.mobile)) {
          this.message = '请输入正确的手机号';
          this.isShow = true;
          return false;
        } else {
          if(this.isSend){
            this.isSend = false;
            sendCode({mobile: this.mobile, type: 4}).then((res)=>{
              if (res.code === 'Y'){
                this.message = "验证码发送成功！";
                this.isShow = true;
                this.timeOver();
              }else {
                this.message = res.msg;
                this.isShow = true;
                this.isSend = true;
              }
            })
          }

        }
      },
      // 倒计时
      timeOver() {
        if (this.timeVal <= 0) {
          this.timeVal = 60;
          this.btnTest = '重获验证码';
          this.isSend = true;
        } else {
          setTimeout(() => {
            this.timeVal--;
            this.btnTest = '验证码(' + this.timeVal + ')';
            this.timeOver();
          }, 1000)
        }
      },
      // 登录
      loginFun() {
        if (this.isPhoneFun(this.mobile)) {
          this.message = '请输入正确的手机号';
          this.isShow = true;
          return false;
        } else {
          if (this.code.length >= 5) {
            let formS = {};     
            //formS.wxuserId = JSON.parse(sessionStorage.getItem('wxUserInfo')).id;
            formS.authorization= sessionStorage.getItem('token') || '';
            formS.mobile = this.mobile;
            formS.code = this.code; 
            bindWxMob(formS).then((res)=>{
              if (res.code === 'Y'){
                sessionStorage.setItem('token', res.data.authorization);
                this.$store.dispatch('userLogin', res.data.authorization);
                // 绑定介绍人
                if(localStorage.getItem('userId')){
                  userPatch({recommendUserid: localStorage.getItem('userId')}).then((res)=>{
                    if(res.code === "Y"){
                      console.log('绑定介绍人！');
                    }
                  })
                }
                userInfoApi().then((res) => {
                  if (res.code === 'Y') {
                    this.$store.dispatch('userInfo', res.data);
                    /*if(res.data.isSubscribe === 0){
                      window.location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzUyNTg5NTExNg==#wechat_redirect'
                    }*/
                    // this.$router.push({path: '/home/index'});
                    this.$router.go(-1);
                  }
                })
              }else {
                this.message = res.msg;
                this.isShow = true;
              }
            })

          }else {
            this.message = '验证码不正确';
            this.isShow = true;
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  .bindWxBox{
    overflow: hidden;
    .bindWxLogo{
      width: 192*@wu;
      height: auto;
      display: block;
      margin: 12*@wu auto 24*@wu auto;
    }
    .inputBox{
      width: 351*@wu;
      height: 157*@wu;
      position: relative;
      padding: 10*@wu 10*@wu 20*@wu 10*@wu;
      box-sizing: border-box;
      margin: 0 auto;
      &>img{
        position: absolute;
        width: 351*@wu;
        height: 157*@wu;
        display: block;
        top: 0;
        left: 0;
        z-index: 0;
      }
      &>div{
        height: 60*@wu;
        position: relative;
        z-index: 10;
        display: flex;
        align-items: center;
        &>div{
          font-size: 15*@wu;
          color: #262525;
          padding:0 15*@wu;
          width: 50*@wu;
        }
        &>input{
          padding: 10*@wu 0;
          border: none;
          width: 150*@wu;
        }
        &>button{
          width: 90*@wu;
          height: 30*@wu;
          background-color: #ffffff;
          border: 1px solid #FFBD30;
          border-radius: 60*@wu;
          color: #FFBD30;
          outline: none;
          font-size: 14*@wu;
          padding: 0 5*@wu;
          margin-left: 5*@wu;
        }
      }
    }
    .bindWxSubmit{
      width: 310*@wu;
      height: auto;
      display: block;
      margin: 30*@wu auto 0 auto;
    }
  }
</style>
