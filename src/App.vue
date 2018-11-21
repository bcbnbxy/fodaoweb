<template>
  <div id="app" :class="{goBackBox: $store.getters.getBackState===1}">
    <div id="goBackBox" class="goBackBox" v-if="$store.getters.getBackState===1">
      <div class="goBack">
        <img src="./assets/img/learnClass/prevActive.png" @click="goBackFun()">
      </div>
    </div>
    <div class="openBrowser" v-if="$store.getters.getRouterState === 1">请点击右上角按钮<br>选择在浏览器打开</div>
    <!--用来判断需要隐藏的页面，如果 routerState=1,说明当前路由需要隐藏-->
    <router-view v-else></router-view>
  </div>
</template>

<script>
  import {is_WX} from '@/tools/tools'
  import {wxLogin, userPatch, userInfoApi, wxShare} from '@/api/index'
  export default {
    name: 'App',
    created() {
      if (is_WX() && sessionStorage.getItem('token') && sessionStorage.getItem('token') !== 'userId') {      
        userInfoApi().then((res) => {
          if (res.code === 'Y') {
            this.$store.dispatch('userInfo', res.data);
            // 打开分享之后的页面
            if (localStorage.getItem('location') !== '' && localStorage.getItem('location') !== '/' && localStorage.getItem('location') !== '/login') {
              this.$router.replace({path: localStorage.getItem('location')});
            } else {
              this.$router.replace({path: '/home/index'});
            }
          }
        })
      } else {
      	
        if (is_WX()) {
          this.$store.dispatch('userInfo', JSON.parse(sessionStorage.getItem('wxUserInfo')));
        }
        // 打开分享之后的页面
        if (localStorage.getItem('location') !== '' && localStorage.getItem('location') !== '/' && localStorage.getItem('location') !== '/login') {
        	this.$router.replace({path: localStorage.getItem('location')});
        } else {
          this.$router.replace({path: '/home/index'});
        }
      }
    },
    methods: {
      // 返回上一页
      goBackFun() {
        if (window.history.length <= 1) {
          this.$router.push({path: '/home/index'});
          return false
        } else {
          this.$router.go(-1)
        }
      } ,
      childtitle:function( title ){
      	this.fixedTopTitle = title;
      }
    }
  }
  
</script>

<style lang="less">
  @wu: 100vw / 375;
  #app {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .openBrowser {
    height: 100%;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 5000;
    color: #999999;
    background-color: #ffffff;
    text-align: center;
    box-sizing: border-box;
    padding-top: 100px;
  }

  .goBackBox {
    width: 100%;
    height: 47.5*@wu;
    overflow: auto;
    position: relative;
    .goBack {
      width: 100%;
      height: 47.5*@wu;
      position: fixed;
      z-index: 10000;
      display: flex;
      align-items: center;
      box-shadow: 0 0 2*@wu 0 #cccccc;
      img:first-child {
        width: 9*@wu;
        height: auto;
        margin-left: 20*@wu;
      }
    }
    .page {
      height: calc(~'100% -'47.5 * @wu);
    }
  }





</style>
