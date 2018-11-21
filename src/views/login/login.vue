<template>
  <div class="page">
  	
  	<div class="selectLoginBox"  v-if="!isPhone">
	    <div class="selectLoginType">
	    	选择登录方式
	    </div>
	    <div class="button" @click="wxLoginFun()">
	    	<img src="../../assets/img/weixin_icon.png"/>
	    	微信登录
	    </div>
	    
	    <div class="payed">已经在平台购买用户？</div>
	    <div class="telBox"  @click="showTelBtn()">请使用其他方式登录</div>
	
	    <div class="privacyClause" @click="goPrivacyClause()"> 
	      	已阅读并同意服务协议与隐私政策
	    </div>
    </div>
    
    <div class="btnMessageBox" v-if="isBtn && !isPhone">
    	<div class="btnMessageBg showBg" @click="hideTelBtn()"></div>
    	<div class="btnList">
    		<div class="telBtn"  @click="showPhone()">
    			<img src="../../assets/img/mobile_ phone.png"/>
    			手机号登录
    		</div>
    		<div class="cancle-telBrn" @click="hideTelBtn()">取消</div>
    	</div>
    </div>
    
   	<div class="loginInput" v-if="isPhone">
	   	<div class="backSelectType" >
	   		<img src="../../assets/img/learnClass/prev.png" @click="hidePhone()"/>
	   		手机号登录
	   	</div>
	    
			<div class="phoneLogin phoneFirst" >
	      <input type="number" placeholder="请输入手机号码" maxlength="11" v-model="mobile">
	    </div>
	    <div class="phoneLogin" >
	      <input type="number" placeholder="请输入验证码" maxlength="6" v-on:input="inputFun" v-model="code">
	      <button @click="setCode()">{{btnTest}}</button>
	    </div>
	    
      <div :class="btnClass" @click="loginFun()">登录</div>
				
			<div class="privacyClauseLogin" >
				<img v-if="!isYes" src="../../assets/img/learnClass/radio.png" @click="radio()"/>
				<img v-if="isYes" src="../../assets/img/learnClass/radioed.png" @click="radioed()"/>
				我已阅读并同意
				<span @click="goPrivacyClause()">《用户协议和隐私政策》</span>
			</div>	
    </div>
    
    <alert-box :message="message" @isShow="isShowFun" v-if="isShow"></alert-box>
  </div>
</template>

<script>
  import {login,sendCode,userInfoApi,userPatch,wxLogin} from '@/api/index'
  export default {
    data() {
      return {
        isPhone: false,
        isBtn : false ,
        isYes: true,
        mobile: '',
        code: '',
        btnClass :"loginBtn",
        btnTest: '发送验证码',
        timeVal:60,
        isSend: true,

        // 错误提醒
        message: '',
        isShow: false,
      }
    },
    methods: {
      // 关闭弹框
      isShowFun() {
        this.isShow = false;
      },
      // 手机号码登录
      showPhone() {
        this.isPhone = true;
      },
      hidePhone(){
      	this.isPhone = false;
 				this.isBtn = false;
      },
      //显示手机登录弹窗
      showTelBtn(){
      	this.isBtn = true;
      },
      hideTelBtn(){
      	this.isBtn = false;
      },
      radio(){
      	this.isYes = true;
      },
      radioed(){
      	this.isYes = false;
      },
      inputFun(){
      	if( this.mobile != "" & this.code != "" )
      	{
      		this.btnClass="changeBtn";
      	}else{
      		this.btnClass="loginBtn";     		
      	}
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
            login({mobile:this.mobile, code:this.code, recommendUserid: localStorage.getItem('userId')}).then((res)=>{
              if (res.code === 'Y'){
                sessionStorage.setItem('token', res.data.authorization);
                this.$store.dispatch('userLogin', res.data.authorization);
                let location = localStorage.getItem('location')!=='' && localStorage.getItem('location')!=='/' && localStorage.getItem('location')!=='/login'?localStorage.getItem('location'):'/home/index';
                this.$router.push({path: location});
                userInfoApi().then((res) => {
                  if (res.code === 'Y') {
                    this.$store.dispatch('userInfo', res.data);
                  }else if(res.code === 'E00000033'){
                    this.$store.dispatch('userInfo', JSON.parse(sessionStorage.getItem('wxUserInfo')));
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
      },
      // 微信登录
      wxLoginFun(){
				var id = localStorage.getItem('userId')?localStorage.getItem('userId'):0;
				var state= Date.parse(new Date())+'|'+id+'|'+sessionStorage.getItem('realmName')+'|1';
				var appid = "wx16ae35cd8aadc3d6"; //正式服： wx16ae35cd8aadc3d6  测试服： wxd57d2db000c7eaef
				window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + 
				appid + '&redirect_uri=https%3A%2F%2Fapi.fudaojt.com%2Fpassport%2Fwxuser%2Fcallback&response_type=code&scope=snsapi_userinfo&state='+state+'#wechat_redirect';
			  	// 正式服: api.fudaojt.com  测试服地址 ：kf.fudaojt.com	
      },
      // 隐私条款
      goPrivacyClause(){
        this.$router.push({path: '/privacyClause'})
      }
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  .selectLoginBox{
  	position: relative;
  	background-color: #f0f2f5;
  	width: 100%;
  	height: 100%;
	  .selectLoginType {
	 		font-size: 16*@wu;
	 		text-align: center;
	 		color: #121515;
	 		padding-top: 100*@wu;
	    margin: 0 auto 33*@wu auto;
	  }
	
	  .button {
	    width: 310px;
	    height: 42px;
	    background-color: #11C301;
	    border-radius: 6*@wu;
	    border: none;
	    margin: 0 auto 55*@wu;
	    line-height: 48*@wu;
	    display: block;
	    font-size: 14*@wu;
	    color: #ffffff;
	    text-align: center; 
	    img{
	    	width: 18*@wu;
	    	height: 15*@wu;
	      vertical-align: sub;
	    }
	    &:focus {
	      border: none;
	    }
	    outline: none;
	  }
	  
	  .telBox{
	  	color: #067CFF;
	  	text-align: center;
	  	font-size: 12*@wu;
	  }
	
		.payed{
			color: #9B9B9B;
			text-align: center;
			font-size: 12*@wu;
			margin-bottom: 8*@wu;
		}
	}
  .orFont {
    height: 47*@wu;
    text-align: center;
    line-height: 47*@wu;
    font-size: 14*@wu;
    color: #636363;
  }

  .phoneLogin {
    width: 300*@wu;
    margin: 0 auto;
    position: relative;
    box-sizing: border-box;
    border-bottom: 1px solid #E0E0E0;
    height: 42*@wu;
    input {
      width: 220*@wu;
      height: 40*@wu;
      outline: none;
      box-sizing: border-box;
      text-indent: 20*@wu;
      border-radius: 6px;
      border: none;
      &::placeholder {
        color: #dedede;
      }
    }
    button {
      width: 90*@wu;
      height: 40*@wu;
      background-color: #ffffff;
      border: none;
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
      color: #FFBD30;
      outline: none;
      position: absolute;
      right: 0;
      top: 0;
      font-size: 14*@wu;
      padding: 0;
    }
  }

  .phoneFirst {
    margin-bottom: 14*@wu;
  }
  .privacyClause{
  	position: absolute;
  	bottom: 20*@wu;
  	left: 0;
  	text-align: center;
  	width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12*@wu;
    color: #9B9B9B;
   
  }
  
  .btnMessageBox{
  	position: fixed;
  	top: 0;
  	left: 0;
  	z-index: 10;
  	width: 100%;
  	height: 100%;
  	.btnMessageBg{
  		background-color: rgba(0,0,0,0.1);
			width: 100%;
  		height: 100%;
  		transition: background-color 1s;
  	}
  	.showBg{
  		background-color: rgba(0,0,0,0.8);
  	}
  	.btnList{
  		position: absolute;
  		bottom: 0;
  		left: 0;
  		width: 100%;
  		background-color: #F2F2F2;
  	}
  	.telBtn{
  		background-color: #fff;
  		text-align: center;
  		color: #121515;
  		font-size: 14*@wu;
  		padding: 10*@wu 0;
  		margin-bottom: 7*@wu;
  		img{
  			width: 24*@wu;
  			height: 24*@wu;
  			vertical-align: middle;
  			margin-right: 6*@wu;
  		}
  	}
  	.cancle-telBrn{
  		background-color: #fff;
  		text-align: center;
  		color: #121515;
  		font-size: 14*@wu;
  		padding: 10*@wu 0;
  	}
  	
  }
  
  .backSelectType{
  	color: #121515;
  	font-size: 16*@wu;
  	text-align: center;
  	padding: 5*@wu 20*@wu;
  	position: relative;
  	font-weight: 400;
  	margin: 20*@wu 0 100*@wu;
  	img{
  		position: absolute;
  		width: 11*@wu;
  		height: 20*@wu;
  		top: 8*@wu;
  		left: 15*@wu;
  	}
  }
  
  .loginBtn{
  	background:linear-gradient(270deg,rgba(255,193,189,1) 0%,rgba(254,220,165,1) 100%);
  	text-align: center;
  	font-size: 18*@wu;
  	color: #fff;
  	padding: 8*@wu 0;
  	width: 303*@wu;
  	border-radius:20*@wu ;
  	margin: 46*@wu auto 12*@wu;
  }
  
  .changeBtn{
  	background:linear-gradient(270deg,rgba(248,133,125,1) 0%,rgba(252,195,89,1) 100%);
  	box-shadow:0px 0px 11px 0px rgba(252,204,173,1);
  	text-align: center;
  	font-size: 18*@wu;
  	color: #fff;
  	padding: 8*@wu 0;
  	width: 303*@wu;
  	border-radius:20*@wu ;
  	margin: 46*@wu auto 12*@wu;
  }
  
  .privacyClauseLogin{
  	width: 300*@wu;
  	margin: 0 auto;
  	color: #999999;
  	font-size: 10*@wu;
  	img{
  		width: 14*@wu;
  		height: 14*@wu;
  		margin-right: 5*@wu;
  		vertical-align: bottom;
  	}
  	span{
  		color: #F56136;
  		margin-left: 5*@wu;
  	}
  }
  
</style>
