<template>
  <div class='page'>
    <div class="myClassmateDetailTop"></div>
    <div class="myClassmateDetailBox">
      <div class="top">
        <img :src="userData.wechatImg" v-if="userData.wechatImg">
        <img src="../../assets/img/userImg.png" v-else>
        <div>
          <img src="../../assets/img/wxName.png">
          <span>{{userData.name?userData.name:userData.wechatName?userData.wechatName:'无'}}</span>
        </div>
        <div v-if="$route.params.class === '1'">
          手机号码: {{userData.userMobile?userData.userMobile:'无'}}
        </div>
      </div>
     <!-- <div class="center">
        <div>一级推广员数量</div>
        <div>{{otherData.firstLevelPromoters}} 人</div>
      </div>
      <div class="center">
        <div>二级推广员数量</div>
        <div>{{otherData.twoLevelPromoters}} 人</div>
      </div>-->
      <div class="center">
        <div>可提现佣金</div>
        <div>{{otherData.cashAmount}} 元</div>
      </div>
      <div class="center">
        <div>邀请码佣金</div>
        <div>{{otherData.couponAmount | numberFixed}} 元</div>
      </div>
      <div class="center">
        <div>累计金额</div>
        <div>{{otherData.amount | numberFixed}} 元</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {myStudentDetail} from '@/api/index'
  export default {
    data() {
      return {
        userData: '',
        otherData: ''
      }
    },
    mounted() {
      document.title = "下级推广员详情";
      this.userData = JSON.parse(sessionStorage.getItem('classMateDetail'));
      this.queryClassDetail();
    },
    methods: {
      queryClassDetail(){
        myStudentDetail('/' + this.$route.params.id).then((res)=>{
          if(res.code === 'Y'){
            this.otherData = res.data;
            for (let key in this.otherData) {
              if(!this.otherData[key]){
                this.otherData[key] = 0;
              }
            }
          }
        })
      }
    },
    destroyed(){
      sessionStorage.removeItem('classMateDetail');
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw/375;
  .myClassmateDetailTop {
    height: 64*@wu;
    background-color: #F1F1F1;
  }
  .myClassmateDetailBox{
    padding: 0 12*@wu;
    .top{
      margin-top: -28*@wu;
      font-size: 14*@wu;
      color: #262525;
      text-align: center;
      margin-bottom: 20*@wu;
      &>img{
        display: block;
        margin: 0 auto;
        width: 54*@wu;
        height: 54*@wu;
        border-radius: 50%;
      }
      div:nth-of-type(1){
        margin: 10*@wu 0;
        img{
          display: inline-block;
          width: 16*@wu;
          height: auto;
          vertical-align: middle;
        }
        span{
          vertical-align: middle;
        }
      }
    }
    .center{
      height:50*@wu;
      border-bottom: 1px solid #F1F1F1;
      display: flex;
      font-size: 14*@wu;
      color: #262525;
      line-height: 50*@wu;
      div:nth-of-type(1){
        width: 50%;
      }
      div:nth-of-type(2){
        width: 50%;
        text-align: right;
      }
    }
  }
</style>
