<template>
  <div class="page">
    <div class="bindWxStateText">
      <img src="../../assets/img/exclamatory.png">
      <span>微信绑定失败!</span>
      <p>当前微信已绑定手机号</p>
    </div>
    <div class="userCurrentWx" @click="goIndex()">返回首页</div>
    <!--<div class="backIndex" @click="wxLoginFun()">使用当前微信登录</div>-->
  </div>
</template>

<script>
  import {wxLogin} from '@/api/index'
  export default {
    data() {
      return {}
    },
    created() {
      document.title = '微信绑定失败';
    },
    methods:{
      wxLoginFun(){
				var id = localStorage.getItem('userId')?localStorage.getItem('userId'):0;
				var state= Date.parse(new Date())+'|'+id+'|'+sessionStorage.getItem('realmName')+'|1';
				var appid = "wx16ae35cd8aadc3d6"; //正式服： wx16ae35cd8aadc3d6  测试服： wxd57d2db000c7eaef
				window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + 
				appid + '&redirect_uri=https%3A%2F%2Fapi.fudaojt.com%2Fpassport%2Fwxuser%2Fcallback&response_type=code&scope=snsapi_userinfo&state='+state+'#wechat_redirect';
			  	// 正式服: api.fudaojt.com  测试服地址 ：kf.fudaojt.com	

      },
      goIndex(){
        this.$router.push({path: '/home/index'})
      }
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  .bindWxStateText {
    margin-top: 80*@wu;
    text-align: center;
    font-size: 16*@wu;
    color: #999999;
    img{
      width: 19*@wu;
      height: 19*@wu;
      vertical-align: middle;
      display: inline-block;
    }
    span{
      vertical-align: middle;
      display: inline-block;
    }
    p{
      color: #ffc940;
    }
  }
  .userCurrentWx{
    width: 80%;
    height: 40*@wu;
    text-align: center;
    line-height: 40*@wu;
    font-size: 14*@wu;
    margin: 40*@wu auto 20*@wu auto;
    background-color: #FFC940 ;
    color: #ffffff;
    border-radius: 5*@wu;
  }
  .backIndex{
    width: 80%;
    height: 40*@wu;
    text-align: center;
    line-height: 40*@wu;
    font-size: 14*@wu;
    margin: 0 auto;
    background-color: #FFC940 ;
    color: #ffffff;
    border-radius: 5*@wu;
  }
</style>
