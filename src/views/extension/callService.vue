<template>
	<div class='page pageColor'>
		<div class="top">
	      	<img src="../../assets/img/learnClass/prevActive.png" @click="goBackFun()">
	      	  联系客服
        </div>
        <div class="bgBox">
        	<img src="../../assets/img/call_bg.png"/>
        </div>
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
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw/375;
   .top {
   		width: 100%;
      height: 47.5*@wu;
      font-size: 18*@wu;
      background-color: #fff;
      line-height: 47.5*@wu;
      text-indent: 10*@wu;
      border-bottom: 1px solid #f2f2f2;
      position: fixed;
      text-align: center;
      box-shadow: 0 0 2*@wu 0 #cccccc;
      img:first-child {
        position: absolute;
        left: 20*@wu;
        top: 15*@wu;
        width: 9*@wu;
        height: auto;
      }
 
   }
   
   .bgBox{
   		margin-top:47.5*@wu;
   		width: 100%;
   		min-height: 100%;
   		img{
   			width: 100%;
   			height: auto;
   		}
   }
  
</style>