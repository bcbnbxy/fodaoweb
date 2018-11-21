<template>
  <div class='page pageColor'>
    <div class="topDistance"></div>
    <ul class="contentListUl">
      <router-link to="/phoneSetting" tag="li">
        <div>{{userInfo.userMobile?'修改':'绑定'}}手机号</div>
        <div>{{userInfo.userMobile | telStar}}</div>
        <img src="../../../assets/img/next.png">
      </router-link>
      <li>
        <div>绑定微信</div>
        <div>{{userInfo.openId?'已绑定':'未绑定'}}</div>
        <img src="../../../assets/img/next.png">
      </li>
      <router-link :to="{path: '/nickName/' + userInfo.alipay + '/4'}" tag="li">
        <div>绑定支付宝</div>
        <div>{{userInfo.alipay}}</div>
        <img src="../../../assets/img/next.png">
      </router-link>
      <li>
        <div>客服电话</div>
        <div @click="playTel2(tel)">{{tel}}</div>
      </li>
      <router-link to="/payPassword" tag="li">
        <div>{{userInfo.isPayment===0?'设置':'修改'}}支付密码</div>
        <div></div>
        <img src="../../../assets/img/next.png">
      </router-link>
      <router-link to="/aboutUs" tag="li">
        <div>关于我们</div>
        <div></div>
        <img src="../../../assets/img/next.png">
      </router-link>
    </ul>
    <div @click="quitLogin()" class="quitLogin" v-if="!isWx">退出登录</div>
  </div>
</template>

<script>
  import {playTel,is_WX} from '@/tools/tools'
  import {logOut} from '@/api/index'
  import { MessageBox } from 'mint-ui';
  export default {
    data() {
      return {
        userInfo: this.$store.getters.getUserInfo,
        tel: '4008376868',
        isWx: is_WX()
      }
    },
    mounted() {
      document.title = '设置';
    },
    methods: {
      // 拨打电话
      playTel2(val){
        playTel(val)
      },
      quitLogin(){
        MessageBox.confirm('确定退出登录吗?').then(action => {
          logOut().then((res)=>{
            if (res.code === 'Y'){
              this.$store.dispatch('userLogout');
              this.$router.replace('/login');
            }
          })
        });
      }
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  .contentListUl{
    list-style: none;
    padding: 0 10*@wu;
    margin: 0;
    overflow: hidden;
    background-color: #ffffff;
    li{
      border-bottom: 1px solid #F1F1F1;
      height: 54*@wu;
      line-height: 50*@wu;
      div{
        display: inline-block;
        vertical-align: middle;
      }
      div:nth-of-type(1){
        font-size: 15*@wu;
        color: #262525;
        width: 125*@wu;
      }
      div:nth-of-type(2){
        width: 207*@wu;
        font-size: 13*@wu;
        color: #646363;
        text-align: right;
        box-sizing: border-box;
      }
      &>img{
        width: 6*@wu;
        height: auto;
        vertical-align: middle;
        margin-left: 5*@wu;
      }
    }
    li:last-child{
      border-bottom: none;
    }
  }
  .quitLogin{
    border: 1px solid #F5A623;
    border-radius: 7*@wu;
    width: 310*@wu;
    height: 38*@wu;
    line-height: 38*@wu;
    font-size: 14*@wu;
    color: #F5A623;
    margin: 40*@wu auto 0 auto;
    text-align: center;
  }

</style>
