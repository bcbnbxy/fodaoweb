<template>
  <div class='page pageColor'>
    <div class="classmateTitle">
      <div class="top">
      	<img src="../../assets/img/learnClass/prevActive_withe.png" @click="goBackFun()">
        	我的学友
        <img src="../../assets/img/search_withe.png" @click="goSearch()">
      </div>
      <!--<div class="center">
        <div :class="{active: isActive === 1}" @click="tabClassMate(1)">一级({{ total1 }})</div>
        <div :class="{active: isActive === 2}" @click="tabClassMate(2)">二级({{ total2 }})</div>
      </div>-->
      <div class="topAllBox">人员数量（{{ total1  }}）</div>
    </div>
    <div class="topDistance"></div>
    
    <ul class="contentListUl">
      <router-link to="/followStudent" tag="li" class="magin-bottom15">
      	<img src="../../assets/img/myClassmateIcon1.png"/>
        <div>关注学员</div>
        <div><!--{{allMyClassNum}}<span>人</span>--></div>
        <img src="../../assets/img/next.png">
      </router-link>

 			<li @click="ordinaryFun()">
      	<img src="../../assets/img/myClassmateIcon2.png"/>
        <div>普通学员</div>
        <div><!--{{allMyClassNum}}<span>人</span>--></div>
        <img src="../../assets/img/next.png">
      </li>
      
 			<li @click="primaryFun()" class="magin-bottom15">
      	<img src="../../assets/img/myClassmateIcon3.png"/>
        <div>初级学员</div>
        <div><!--{{allMyClassNum}}<span>人</span>--></div>
        <img src="../../assets/img/next.png">
      </li>

     	<li @click="lifetimeFun()">
      	<img src="../../assets/img/myClassmateIcon4.png"/>
        <div>终生学员</div>
        <div><!--{{allMyClassNum}}<span>人</span>--></div>
        <img src="../../assets/img/next.png">
      </li>
      <li @click="partnerDataListFun()"  class="magin-bottom15">
      	<img src="../../assets/img/myClassmateIcon5.png"/>
        <div>我的合伙人</div>
        <div><!--{{allMyClassNum}}<span>人</span>--></div>
        <img src="../../assets/img/next.png">
      </li>

		  <li v-if="isShow">
      	<img src="../../assets/img/myClassmateIcon6.png"/>
        <div>已邀请学友</div>
        <div class="peopleNum"><!--{{allMyClassNum}}<span>人</span>--></div>
        <div class="people"><span>{{peopleNum}}</span>人</div>
      </li>
      
      <router-link to="/invitedClass" tag="li" v-else class="people">
      	<img src="../../assets/img/myClassmateIcon6.png"/>
        <div>已邀请学友</div>
        <div class="peopleNum"></div>
        <span>{{peopleNum}}</span>人
        <img src="../../assets/img/next.png">
      </router-link>
      
       
    </ul>
    
    <!--<ul class="classmateList"
        v-infinite-scroll="loadMore"
        infinite-scroll-distance="10"
        infinite-scroll-immediate-check='true'
    >
      <li v-for="item in listData" @click="classMateDetail(item)">
        <img :src="item.wechatImg" v-if="item.isWechatImg">
        <img src="../../assets/img/userImg.png" v-else>
        <div>
          <span>微信名:{{item.wechatName?item.wechatName:'无'}}</span>
          <span v-if="isActive === 1">姓名:{{item.realName}}-{{item.userMobile}}</span>
          <div><img src="../../assets/img/classmate.png">{{ item.userLevel | userType }}</div>
          <span>成为会员时间: {{item.createTime}}</span>
        </div>
      </li>
      <div class="moreClass" v-if="listData.length > 10">
        <img src="../../assets/img/more.gif" v-if="loading">
        <span v-if="!loading && pageNum === pages">没有更多了...</span>
      </div>
      <img class="noData" src="../../assets/img/noData.png" v-if="listData.length===0">
    </ul>-->
  </div>
</template>

<script>
  import {myStudents, myStudentList , capitalHome , studentsCount} from '@/api/index'
  import {Indicator} from 'mint-ui'
  export default {
    data() {
      return {
        isActive: 1,
        listData: [],

        total1: 0,
        total2: 0,

        loading: false,
        title: this.$route.params.name,
        total: 0,

        pageNum: 1,
        pageSize: 10,
        pages: 1 , 
        
        isShow : false ,
        
        peopleNum :  0 ,

      }
    },
    mounted() {
      document.title = "我的学友";
      
      studentsCount().then((res) =>{
      	if (res.code === "Y" && !!res.data) {
      		this.total1 = res.data.firstStudentCount;
        	this.total2 = res.data.secondStudentCount;   		
      	}
      });
      
      var userInfo = sessionStorage.getItem("userInfo") || "{}";
      userInfo = JSON.parse(userInfo);
      
      if( userInfo )
      {
	      if( userInfo.userLevel != 1 && userInfo.userLevel != 2 && userInfo.userLevel != 3 && userInfo.userLevel != 7 )
	      {
	      	this.isShow =true ;  
	      }

	    }
      console.log(this.isShow + userInfo.userLevel)
	    capitalHome().then((res) =>{
	      	if (res.code === "Y" && !!res.data) {
	      		this.peopleNum = res.data.subordinate;		   		
	      	}
      });
      
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
    	
      
      // 切换tab栏
      tabClassMate(index) {
        if(this.loading){
          return false;
        }
        if(this.isActive === index){
          return false
        }
        this.isActive = index;
    
      },
      // 搜索路由
      goSearch() {
        this.$router.push({path: '/searchClassmate/' + this.isActive})
      },
      //普通学员
      ordinaryFun(){
      	this.$router.push({path: '/ordinaryClass/' + this.isActive})
      },
      
      //初级学员
      primaryFun(){
      	this.$router.push({path: '/primaryClass/' + this.isActive})
      },
      
      //终生学员
      lifetimeFun(){
      	this.$router.push({path: '/lifetime/' + this.isActive})
      },
      
      //我的合伙人
      partnerDataListFun(){
      	this.$router.push({path: '/partnerDataList/' + this.isActive})
      },
      
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw/375;
 
  .classmateTitle {
  	background: url(../../assets/img/mine_top.png) ;
    overflow: hidden;
    background-size: 100%;
    .topAllBox{
    	border: 1px solid #fff;
	    color: #fff;
	    width: 111px;
	    font-size: 14px;
	    text-align: center;
	    padding: 5px 0;
	    margin: 10px auto 20px;
	    border-radius: 5px;
    }
    .top {
      height: 47.5*@wu;
      font-size: 18*@wu;
      line-height: 47.5*@wu;
      text-indent: 10*@wu;
      color: #fff;
      position: relative;
      text-align: center;
      margin-bottom: 10*@wu;
      img:first-child {
        position: absolute;
        left: 20*@wu;
        top: 15*@wu;
        width: 9*@wu;
        height: auto;
      }
      img:last-child {
        position: absolute;
        right: 20*@wu;
        top: 15*@wu;
        width: 20*@wu;
        height: auto;
      }
    }
    .center {
      height: 38*@wu;
      padding: 0 13*@wu;
      div {
        float: left;
        width: 50%;
        box-sizing: border-box;
        text-align: center;
        line-height: 38*@wu;
        font-size: 16*@wu;
        color: #999;
        border-radius: 8*@wu;
      }
      .active {
        background-color: #F5C520;
        color: #ffffff;
      }
    }
  }

  .classmateList {
    list-style: none;
    margin: 0;
    padding: 0;
    height: calc(100% - 65 * @wu);
    overflow: auto;
    li {
      border-bottom: 1px solid #f1f1f1;
      height: 85*@wu;
      display: flex;
      align-items: center;
      background-color: #ffffff;
      padding-left: 10*@wu;
      box-sizing: border-box;
      img {
        width: 52*@wu;
        height: 52*@wu;
        border-radius: 50%;
      }
      & > div {
        padding-left: 10*@wu;
        span {
          display: block;
        }
        span:nth-of-type(1) {
          font-size: 13*@wu;
          color: #262525;
          margin-bottom: 4*@wu;
        }
        span:nth-of-type(2) {
          font-size: 13*@wu;
          color: #262525;
          margin-bottom: 4*@wu;
        }
        span:nth-of-type(3) {
          font-size: 9*@wu;
          color: #C3C3C3;
        }
        & > div {
          font-size: 10*@wu;
          color: #ff0000;
          display: flex;
          align-items: center;
          img {
            width: 14*@wu;
            height: auto;
            margin-right: 5*@wu;
          }
                
        }
        
        
      }
    }
    li:last-child {
      border-bottom: none;
    }
  }
  
	.contentListUl {
    list-style: none;
    padding: 0;
    margin: 0;
    overflow: hidden;
    .people{
	    	font-size: 14*@wu;    	
	    	span{
	    		color: #F5C520;
	    	}
	    	div:nth-of-type(2) {
	    		width:160*@wu;
	    	}
	    	img:last-child {
	    		margin-left: 5*@wu;
	    	}
	  }
    li {
      border-bottom: 1px solid #F1F1F1;
      height: 54*@wu;
      line-height: 50*@wu;
      background-color: #fff;
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
        width:190*@wu;
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
      
      div:nth-of-type(2).peopleNum{
      	width:170*@wu;
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
