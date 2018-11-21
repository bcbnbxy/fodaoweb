<template>
	<div class='page'>
		
		<div class="bannerBox">
			<img src="../../../assets/img/womenList_banner.png"/>
		</div>
		
		<div class="indexList" v-for="(item,index) in womenClassList" :key="item.id">
	      <img :src="item.goodsImg2">
	      <div class="indexListCenter">
	        <p>{{item.goodsName}}</p>
	        <div class="price">￥{{item.unitPrice}}</div>
	        <span>{{item.viewNum}}人已参与</span>
	        <div class="btn"  @click="womenClassListFun(item.id)">立即学习</div>
	      </div>
	    </div>
	</div>
</template>

<script>
	
    import {womenClass} from '@/api/index'
	export default {
	    data() {
	      return {
	      	 womenClassList: [],
	      }
	    },
	    mounted() {
	    	document.title='女性智慧课程';
	     	this.womenClassFun();
	    },
	    methods: {	
		// 女性课程预售跳外联
	      womenClassListFun(id){
//	      	var time=new Date().getTime();
	        this.$router.push({path:'/womanList/' + id})
	      },
	      // 女性课程预售
	      womenClassFun(){
	        womenClass().then((res)=>{
	          if (res.code === 'Y'){
	            this.womenClassList = res.data;
	          }
	        })
	      },
	    }
	 }
</script>

<style lang="less" scoped>
  @wu: 100vw/375;
  
  .bannerBox{
  	width: 100%;
  	height: 140*@wu;
  	&>img{
  		width: 100%;
  		height: 100%;
  	}
  }
  
  .indexList{
    overflow: hidden;
    padding: 21*@wu 0 ;
    margin: 0 15*@wu;
    border-bottom: 1px solid #F6F6F6;
    &>img{
      width: 120*@wu;
      height: 90*@wu;
      pointer-events: none;
    }
    .indexListCenter{
    	position: relative;
       margin-left:5*@wu ;
       display: inline-block;
       vertical-align: top;
	   p{
		    font-style: inherit;
		    font-size: 14*@wu;
		    color: #333;
		    max-width: 200*@wu;
		    margin: 10*@wu 0 15*@wu;
	   }  
	    .price{
	   		color: #F88182;
	   		font-size: 15*@wu;
	    }
	    span{
	 		color: #999;
	        font-size: 12*@wu;
	    }
		.btn{
			position: absolute;
			right: 0;
			bottom: 18*@wu;
			background-color: #FFC73E;
			color: #fff;
			font-size: 14*@wu;
			border-radius: 12*@wu;
			text-align: center;
			width: 78*@wu;
			height: 28*@wu;
			line-height: 28*@wu;
		}
    }
    
     
  }
   .indexList:last-child{
    	border-bottom: 0;
    }
  
</style>