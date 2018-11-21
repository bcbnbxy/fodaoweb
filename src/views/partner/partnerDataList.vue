<template>
	<div class='page pageColor'>
		<div class="top">
	      	<img src="../../assets/img/learnClass/prevActive.png" @click="goBackFun()">
	                       我的合伙人
        </div>
        
    <ul class="contentListUl">
      <li @click="detail(7)" class="magin-bottom15">
      	<img src="../../assets/img/partnerIcon1.png"/>
        <div>高级合伙人</div>
        <div><!--{{allMyClassNum}}<span>人</span>--></div>
        <img src="../../assets/img/next.png">
      </li>

 	  <li @click="detail(3)">
      	<img src="../../assets/img/partnerIcon2.png"/>
        <div>白银合伙人</div>
        <div><!--{{allMyClassNum}}<span>人</span>--></div>
        <img src="../../assets/img/next.png">
      </li>
      
	  <li @click="detail(2)" class="magin-bottom15">
      	<img src="../../assets/img/partnerIcon3.png"/>
        <div>黄金合伙人</div>
        <div><!--{{allMyClassNum}}<span>人</span>--></div>
        <img src="../../assets/img/next.png">
      </li>

 	  <!--<li @click="detail(1)">
      	<img src="../../assets/img/partnerIcon4.png"/>
        <div>钻石合伙人</div>
        <div><!--{{allMyClassNum}}<span>人</span></div>
        <img src="../../assets/img/next.png">
      </li>-->

    </ul>
        
	</div>
</template>

<script>
  import {myStudents, myStudentList} from '@/api/index'
  export default {
    data() {
      return {
      }
    },
    mounted() {
      document.title = "我的合伙人";
      this.isActive = this.$route.params.studentsType;
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
      //跳转合伙人数据列表
    	detail( val ){
    		this.$router.push({path: '/partnerDataDetail/' + this.$route.params.studentsType + '/' + val })
    	},

    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw/375;
   .top {
      height: 47.5*@wu;
      font-size: 18*@wu;
      background-color: #fff;
      line-height: 47.5*@wu;
      text-indent: 10*@wu;
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