<template>
  <div class="page pageColor">
    <div class="extensionTop">
    	<div class="top">
      	<img src="../../assets/img/learnClass/prevActive_withe.png" @click="goBackFun()">
        	推广中心
      </div>
      <img :src="$store.getters.getUserInfo.wechatImg" v-if="$store.getters.getUserInfo.wechatImg">
      <img src="../../assets/img/userImg.png" v-else>
      <div class="firstChild">{{$store.getters.getUserInfo.name}}</div>
      <div>推荐人:{{recommendObj.name}} (电话:{{recommendObj.userMobile}})</div>
      <div class="extensionLine"></div>
      <ul class="extensionUl">
        <li>
          <div class="extensionUlTit">成功提现佣金(元)</div>
          <div class="extensionUlPrice">
            {{otherInfo.ineffectiveCommission | numberFixed}}
          </div>
        </li>
        <li>
          <div class="extensionUlTit">可提现佣金(元)</div>
          <div class="extensionUlPrice">
            {{otherInfo.canCarryCommission | numberFixed}}
          </div>
        </li>
      </ul>
      <button @click="goWith()">佣金提现</button>
    </div>
    <ul class="contentListUl">
      <router-link to="/promotionCommission" tag="li" class="magin-bottom15">
      	<img src="../../assets/img/extension_icon1.png"/>
        <div>推广鼓励</div>
        <div><!--{{otherInfo.totel | numberFixed}}<span>元</span>--></div>
        <img src="../../assets/img/next.png">
      </router-link>
      <router-link to="/withdrawDetail" tag="li">
      	<img src="../../assets/img/extension_icon2.png"/>
        <div>鼓励明细</div>
        <div><!--{{otherInfo.capitalCounts}}<span>笔</span>--></div>
        <img src="../../assets/img/next.png">
      </router-link>
      <router-link to="/bringOutDetails" tag="li" class="magin-bottom15">
      	<img src="../../assets/img/extension_icon3.png"/>
        <div>提现明细</div>
        <div><!--{{otherInfo.cashCounts}}<span>笔</span>--></div>
        <img src="../../assets/img/next.png">
      </router-link>

      <router-link to="/promotionRanking" tag="li">
      	<img src="../../assets/img/extension_icon4.png"/>
        <div>鼓励排名</div>
        <div></div>
        <img src="../../assets/img/next.png">
      </router-link>
    </ul>
    <alert-box :message="message" @isShow="isShowFun" v-if="isShow"></alert-box>
  </div>
</template>

<script>
  import {larderUserInfoApi, myStudents, capitalHome} from '@/api/index'

  export default {
    data() {
      return {
        userInfo: this.$store.getters.getUserInfo,
        recommendObj: '',
        allMyClassNum: 0,
        otherInfo: '',

        // 错误提醒
        message: '',
        isShow: false,
      }
    },
    mounted() {
      document.title = "推广中心";
      if (!this.$store.getters.getUserInfo.recommendUserid) {
        setTimeout(() => {
          this.queryInfo();
        }, 1000)
      } else {
        this.queryInfo();
      }
      // this.queryMyClassInfo();
      this.capitalHomeFun();
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
    	
      isShowFun() {
        this.isShow = false
      },
      // 查看推荐人信息
      queryInfo() {
        larderUserInfoApi('/' + this.$store.getters.getUserInfo.recommendUserid).then((res) => {
          if (res.code === 'Y') {
            this.recommendObj = res.data;
          }
        })
      },
      // 查看我的学友人数
      queryMyClassInfo() {
        myStudents().then((res) => {
          if (res.code === 'Y') {
            this.allMyClassNum = res.data.allPromoters || 0;
          }
        })
      },
      // 首页信息查询
      capitalHomeFun() {
        capitalHome().then((res) => {
          // console.log(res)
          if (res.code === 'Y') {
            this.otherInfo = res.data || ''
          }
        })
      },
      // 提现
      goWith() {
        if (this.userInfo.balance1 < 100) {
          this.message = '金额不足100元无法提现!';
          this.isShow = true;
        } else {
          this.$router.push({path: '/withdraw/' + this.userInfo.balance1 + '/' + 5});  // 5 为推广佣金提现
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw/375;
  .extensionTop {
    background-image: linear-gradient(-180deg, #F5C520 3%, #F4BC1A 100%);
    overflow: hidden;
    padding-bottom: 25*@wu;
    position:relative;
    padding-top:  47.5*@wu;
    .top{
    	position: absolute;
    	top: 0;
    	left: 0;
    	width: 100%;
    	height: 47.5*@wu;
      font-size: 18*@wu;
      color: #fff;
      line-height: 47.5*@wu;
    	img:first-child {
        position: absolute;
        left: 20*@wu;
        top: 15*@wu;
        width: 9*@wu;
        height: auto;
        margin: 0;
      }
    }
    img {
      width: 53*@wu;
      height: 53*@wu;
      display: block;
      margin: 50*@wu auto 0 auto;
      border-radius: 50%;
    }
    & > div {
      font-size: 12*@wu;
      color: #ffffff;
      text-align: center;
      letter-spacing: 0.9*@wu;
    }
    .firstChild {
      margin-top: 5*@wu;
      margin-bottom: 3*@wu;
    }
    .extensionLine {
      height: 1px;
      background-color: rgba(255, 255, 255, 0.15);
      margin-top: 15*@wu;
    }
    .extensionUl {
      list-style: none;
      padding: 0;
      margin: 13*@wu 0 29*@wu 0;
      display: flex;
      li {
        flex: 1;
        color: #ffffff;
        text-align: center;
        .extensionUlTit {
          font-size: 10*@wu;
        }
        .extensionUlPrice {
          font-size: 22*@wu;
        }
      }
    }
    button {
      border-radius: 66*@wu;
      background-color: #ffffff;
      font-size: 15*@wu;
      color: #9D7A03;
      letter-spacing: 0.75*@wu;
      border: none;
      padding: 5*@wu 25*@wu;
      display: block;
      margin: 0 auto;
    }
  }

  .contentListUl {
    list-style: none;
    padding: 0;
    margin: 0;
    overflow: hidden;
    li {
      border-bottom: 1px solid #F1F1F1;
      height: 54*@wu;
      line-height: 50*@wu;
      background-color:#fff;
      div {
        display: inline-block;
        vertical-align: middle;
      }
      div:nth-of-type(1) {
        font-size: 14*@wu;
        color: #333;
        width: 80*@wu;
      }
      div:nth-of-type(2) {
        width: 190*@wu;
        font-size: 13*@wu;
        color: #F5A623;
        text-align: right;
        box-sizing: border-box;
        padding-right: 7*@wu;
        span {
          margin-left: 5*@wu;
          color: rgb(203, 203, 203);
        }
      }
      img:first-child{
  		  width: 28*@wu;
  		  margin: 0 20*@wu 0 10*@wu;
        height: auto;
        vertical-align: middle;
      }
      
      img:last-child {
        width: 10*@wu;
        height: auto;
        vertical-align: middle;
        opacity: 0.5;
      }
    }
    .magin-bottom15{
	  	margin-bottom: 15*@wu;
	  }
  }
</style>
