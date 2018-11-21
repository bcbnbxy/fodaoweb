<template>
  <div id="page" class="page pageColor">  	
    <div class="myClassBox">
      <div class="listBox" v-for="item in myClassData" @click="goLearnClass(item.id,item.goodsNo, item.goodsType)">
        <img :src="item.goodsImg">
        <div class="rightBox">
          <div>{{item.goodsName}}</div>
          <div>{{item.goodsIntroduce}}</div>
          <div><img src="../../assets/img/time.png"><span>{{item.goodsTime}}</span></div>
        </div>
      </div>
    </div>
    <img class="noData" src="../../assets/img/noData.png" v-if="myClassData.length===0">
    <alert-box :message="message" @isShow="isShowFun" v-if="isShow" :warningImg="1"></alert-box>
    <follow-public :page-object="pageObject" v-if="pageObject && $store.getters.getToken"></follow-public>
  </div>
</template>
<script>
	import {myClassList,classLearn,userInfoApi} from '@/api/index'
  import { MessageBox } from 'mint-ui';
  import {is_WX} from '@/tools/tools'
  import FollowPublic from "../../components/followPublic";
  export default {
    components: {FollowPublic},
    data() {
      return {
        myClassData:[],
        message:'',
        isShow:false,
        pageObject: '',
        userInfo: this.$store.getters.getToken,
      }
    },
    mounted(){
      document.title = "我的课程";
      this.getUserInfo();
      let that = this;
      setTimeout(function(){that.queryList();} , 400) ;      
      this.pageObject = document.getElementById('page');
    },
    methods: {
      // 关闭弹框
      isShowFun(){
        this.isShow = false
      },
      // 查询列表
      queryList(){
        myClassList().then((res)=>{
          if(res.code === 'Y'){
            this.myClassData = res.data;
          }
        })
      },
      //獲取用戶信息
      getUserInfo() {
        userInfoApi().then((res) => {
          if (res.code === 'Y') {          	
            this.userInfo = res.data;
            this.$store.dispatch('userInfo', res.data);
          }else if(res.code === 'E00000033'){
            this.$store.dispatch('userInfo', JSON.parse(sessionStorage.getItem('wxUserInfo')));
            this.userInfo = JSON.parse(sessionStorage.getItem('wxUserInfo'));
          }
        })
      },
      // 学习我的课程
      goLearnClass(id,goodsNo,goodsType){
        let routerVal = goodsNo.indexOf('N') >= 0 ? 'learnClass':'womanClass';
        classLearn({goodsId: id, goodsType: goodsType}).then((res)=>{
          if(res.code === 'Y'){
            this.$router.push({path: '/' + routerVal + '/' + id + '/' + goodsNo})
          }else {
            this.message = res.msg;
            this.isShow = true
          }
        })
      }
    }
  }
</script>

<!--<style lang="less" scoped>
  @wu: 100vw / 375;
  .marginBottom{
    margin-bottom: 10*@wu;
    padding: 18*@wu 0 9*@wu;
  }
  .indexTit{
    text-align: center;
    background-color: #fff;
    h5{
      font-size: 18*@wu;
      color: #666;
      position: relative;
      font-weight: 600;
      margin: 0;
      span{
      	font-size: 8*@wu;
      	color: rgba(204,204,204,0.5);
      	vertical-align: text-top;
      	margin: 0 14*@wu;
      }
      
    }
  }
  .indexList{
      text-decoration: none;  	
    overflow: hidden;
    &>img{
      width: 100%;
      height: 187*@wu;
      display: block;
      margin: 0 auto;
      pointer-events: none;
      vertical-align: sub;
    }
    .indexListCenter{
    	padding: 0 15*@wu;
      text-align: left;
      p{
        font-style: inherit;
        font-size: 13*@wu;
        color: #515050;
        margin: 0;
      }      
	    span{
	    	color: #F88182;
	    	font-size: 12*@wu;
	      vertical-align: middle;
	      display: inline-block;
	    }

    }
  }
</style>-->
<style lang="less" scoped>
  @wu: 100vw / 375;
  .myClassBox{
    padding: 12*@wu 10*@wu;
    .listBox{
      padding: 18*@wu;
      background-color: #ffffff;
      overflow: hidden;
      margin-bottom: 14*@wu;
      border-radius: 3*@wu;
      &>img{
        display: block;
        float: left;
        width: 70*@wu;
        height: 57*@wu;
        margin-right: 20*@wu;
      }
      .rightBox{
        float: left;
        width: 228*@wu;
        overflow: hidden;
        div:nth-of-type(1){
          font-size: 14*@wu;
          color: #F5A623;
          margin-bottom: 2*@wu;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        div:nth-of-type(2){
          font-size: 12*@wu;
          color: #646363;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin-bottom: 2*@wu;
        }
        div:nth-of-type(3){
          font-size: 9*@wu;
          color: #A0A0A0;
          img{
            width: 8*@wu;
            height: 8*@wu;
            vertical-align: middle;
            margin-right: 5*@wu;
          }
          span{
            vertical-align: middle;
          }
        }
      }
    }
  }
</style>

