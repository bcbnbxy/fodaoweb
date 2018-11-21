<template>
  <div id="page" class="page" >
    <div class="page-swiper">
    	<div class="page-swiper-head" :class="{headactive:headactive}" ref="head">
    		<img :src="backimg" @click="goBackFun()"/>
    	</div>
    	<div class="swipe">
	      <mt-swipe :defaultIndex="index" @change="handleChange" :auto="0">
	      	<mt-swipe-item v-for="(item,index) in videolist" :key="item.id">
	          <video :poster="item.comment" controls="controls"  :src="item.courseLink" type="video/mp4" autoplay="autoplay" webkit-playsinline="true" x-webkit-airplay="true"  playsinline="true" x5-video-player-type="h5" x5-video-player-fullscreen="true"></video>		
	        </mt-swipe-item>
	        <mt-swipe-item v-for="(item,index) in imgList" :key="item.id">
	          <a href="javascript:;"><img :src="item.courseLink"/></a>
	        </mt-swipe-item>
	      </mt-swipe>
	      <p class="swipe-serial" v-if="(imgList.length+videolist.length)>1"><span>{{index+1}}</span>/<span>{{imgList.length+videolist.length}}</span></p>
	    </div>
    </div>
    <div class="page-title">
    	<p><b>￥{{goods.unitPrice}}</b><span>{{goods.viewNum}}人已参加</span></p>
    	<p>{{goods.goodsName}}</p>
    </div>
    <div class="page-main">
    	<div class="navbar" ref="navs" :class="{fixed:navactive}">
    		<ul>
	    		<li @click="tabnav(1)"><a :class="{addbg:1==activeindex}" href="#page-main-goodsdesc">课程详情</a></li>
	    		<li @click="tabnav(2)"><a :class="{addbg:2==activeindex,addyuanjiao:1==activeindex}" href="#page-main-comment">效果评价</a></li>
	    		<li @click="tabnav(3)"><a :class="{addbg:3==activeindex,addyuanjiao:2==activeindex}" href="#page-main-chengnuo">我们承诺</a></li>
	    		<li @click="tabnav(4)"><a :class="{addbg:4==activeindex,addyuanjiao:3==activeindex}" href="#page-main-daoshi">导师简介</a></li>
	    	</ul>
    	</div>
    	<div class="page-main-list">    		
    			<div id="page-main-goodsdesc" class="page-main-goodsdesc">
    				<p>
    						<img src="../../../assets/img/nvxingkecheng/nvxingjieshao.png"/>
    						<img :src="goodsDesc&&goodsDesc.courseLink">
    				</p>
    			</div>   			
    			<div class="page-main-comment" id="page-main-comment">
    				<img class="page-main-comment-item" v-for="(item,index) in goodscomment" :key="item.id" :src="item.courseLink"/>
    			</div>
    			<div class="page-main-chengnuo" id="page-main-chengnuo" >
    				<img src="../../../assets/img/nvxingkecheng/nvxingmychengnuo.png"/>
    			</div>
    			<div class="page-main-daoshi" id="page-main-daoshi">
    				<img src="../../../assets/img/nvxingkecheng/nvxingdaoshia.png"/>
    				<img src="../../../assets/img/nvxingkecheng/nvxinglaotou.png"/>
    				<p>【悟道】</p>
    				<div class="page-main-daoshi-text">
    						<p>一位普通的老百姓，一位朴实的中国人，中华文化的传承正确观念的疏导者，皆因夫妻生活的不和谐，时代变更，发展速度越来越快，互联网加剧，思想开放，却人人都不能 被正确性智慧所引导，不能够防身所用，便立志。</p>
   							<p>将功法传于世人，真理智慧，大道至简传世间，让每个人都能够被正确性智慧所引导，让每个家庭都能够真真正正的获得幸福感。</p>         
    				</div>
    				<img src="../../../assets/img/nvxingkecheng/nvxingend.png"/>
    			</div>
    	</div>
    </div>
    <div class="studyList">
    	<router-link to="/home/index"  tag="p"><img src="../../../assets/img/home.png"/><span>首页</span></router-link>
    	<p @click="goAlert()"><img src="../../../assets/img/zixun.png"/><span>咨询</span></p>
    	<!--<button @click="toStudy()" v-if="isStudy && windowApp!==1">{{ isStudy }}</button>-->
    	<button  @click="toStudy()" v-if="isStudy">{{ isStudy }}</button>
    </div>
    <alert-box :message="message" @isShow="isShowFun" v-if="isShow" :warningImg="1"></alert-box>
    <follow-public :page-object="pageObject" v-if="pageObject && $store.getters.getToken"></follow-public>
  </div>
</template>

<script>
import {goodsDetail, classBuy, classLearn,detailWithCourse} from '@/api/index'
import {Swipe, SwipeItem,MessageBox} from 'mint-ui';
import {is_WX} from '@/tools/tools'
import FollowPublic from "../../../components/followPublic"
export default{
	components: {FollowPublic},
	data(){
		return {
			index:0,
			id:this.$route.params.id,
			imgList:[],
			dataList: {},
			videolist:[],
			activeindex:1,
			goods:{},
			goodsDesc:{},
			goodscomment:[],
			fixed:false,
			backimg:require('../../../assets/img/goback.png'),
			headactive:false,
			navactive:false,
			headScrollTop:'',
			navoffsetTop:'',
			isStudy: '去购买',
			windowApp: window.app || '',
			message: '',
			isShow: false,
			pageObject: '',
			queryBuy: false,			
		}
	},
	created(){
		this.getDetailWithCourse();
		goodsDetail({goodsId: this.id}).then((res) => {
        if (res.code === 'Y') {
        	this.dataList = res.data;
          this.queryBuy = true
        }
      })
	},
	mounted () {	
		document.title = '课程介绍';
    this.pageObject = document.getElementById('page');
		this.headScrollTop=this.$refs.head.offsetHeight;
		this.navoffsetTop=this.$refs.navs.offsetTop;
	  window.addEventListener('scroll', this.handleScroll,true)
	},
	watch: {
  	'queryBuy': 'queryBuyFun'
	},
	methods:{
		isShowFun() {
    	this.isShow = false;
  	},
		//获取当前swiper的索引
		handleChange(index){
			this.index=index;
		},
		//返回上一页
		 goBackFun() {
	        if (window.history.length <= 1) {
	          this.$router.push({path: '/home/index'});
	          return false
	        } else {
	          this.$router.go(-1)
	        }
	      } ,
		//获取当前页面数据
		getDetailWithCourse(){
			var that=this;
			detailWithCourse({goodsId: this.id}).then((res) => {
				if (res.code === 'Y') {
							that.goods=res.data.goods;
							that.goodsDesc=res.data.goodsDesc[0];
							that.goodscomment=res.data.comment;
			        for (let i=0;i<res.data.banner.length;i++){
			        	if(res.data.banner[i].courseType=='7'){
			        		that.videolist.push(res.data.banner[i]);
			        	}else if(res.data.banner[i].courseType=='6'){
			        		that.imgList.push(res.data.banner[i]);
			        	}
			        }
			    }
			})
		},
		//导航栏的点击切换事件
		tabnav(index){
			this.activeindex=index;
			if(index==1){
				this.fixed=!this.fixed;
				console.log(document.getElementById('page-main-goodsdesc').offsetTop);
			}
		},
		handleScroll () {
			var scrollTop=document.querySelector('#page').scrollTop;			
		  if(scrollTop>=this.headScrollTop/2){
		  	this.headactive=true;
		  	this.backimg=require('../../../assets/img/goback000.png');
//		  	this.shareimg=require('../../../assets/img/share000.png')
		  }else{
		  	this.headactive=false;
		  	this.backimg=require('../../../assets/img/goback.png');
//		  	this.shareimg=require('../../../assets/img/fffshare.png')
		  }
		  if(scrollTop>=this.navoffsetTop){
		  	this.navactive=true;
		  }else{
		  	this.navactive=false;
		  }
		},
		  // 判断是否可以去学习
      toStudy() {
        if (this.dataList.goodsNo === 'W000001') {
          this.$router.push({path: '/womanClass/' + this.id + '/' + this.dataList.goodsNo});
          return false;
        }
        if (this.$store.getters.getToken && this.$store.getters.getToken !== 'userId') {
          if (this.isStudy === '去学习') {
            classLearn({goodsId: this.id, goodsType: this.dataList.goodsType}).then((res) => {
              if (res.code === 'Y') {
                this.$router.push({path: '/womanClass/' + this.id + '/' + this.dataList.goodsNo})
              } else {
                this.message = res.msg;
                this.isShow = true
              }
            })
          } else {
            if (this.dataList.goodsNo === 'W000004') {
              MessageBox({
                title: '温馨提示',
                message: '请先购买第三节课！',
                confirmButtonText: '确定',
                showCancelButton: false
              }).then(action => {
              });
            } else {
              this.$router.push({path: '/buyPartner/' + this.id + '/1'})
            }
          }
        } else {
          if (is_WX()) {
//          MessageBox({
//            title: '温馨提示',
//            message: '为了您更好的用户体验<br>请先验证手机号',
//            confirmButtonText: '立即验证',
//            showCancelButton: true
//          }).then(action => {
//            if (action === 'confirm') {
//              this.$router.push({path: '/bindWx'})
//            }
//          });
						if (this.dataList.goodsNo === 'W000004') {
              MessageBox({
                title: '温馨提示',
                message: '请先购买第三节课！',
                confirmButtonText: '确定',
                showCancelButton: false
              }).then(action => {
              });
            } else {
              this.$router.push({path: '/buyPartner/' + this.id + '/1'})
            }
          } else {
            MessageBox({
              title: '温馨提示',
              message: '您还未登录,是否登录?',
              confirmButtonText: '立即登录',
              showCancelButton: true
            }).then(action => {
              if (action === 'confirm') {
                this.$router.push({path: '/login'})
              }
            });
          }
        }
      },
      // 查询是否购买
      queryBuyFun() {
        if (this.queryBuy) {
          if (this.$store.getters.getToken && this.$store.getters.getToken !== 'userId') {
            classBuy({goodsId: this.dataList.id}).then((res) => {
              if (res.data) {
                this.isStudy = '去学习'
              } else {
                if (this.dataList.goodsNo === 'W000001') {
                  this.isStudy = '去学习'
                } else {
                  this.isStudy = '去购买'
                }
              }
            })
          } else {
            if (this.dataList.goodsNo === 'W000001') {
              this.isStudy = '去学习'
            }
          }
        }
      },
      goAlert(){
        this.message = '暂未开通，敬请期待';
        this.isShow = true;
      }
  },
  destroyed () {
	  window.removeEventListener('scroll', this.handleScroll)
	},
}
</script>

<style lang="less" scoped>
 @wu: 100vw/375;
 .studyList {
    background: #fff;
    border-top:1px solid #DCDCDC ;
    width: 375*@wu;
    height: 55*@wu;
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    p{
    	margin-right:30*@wu;
    	font-size:16*@wu;
    	color:#36444F;
    	img{
    		display: inline;
    		margin-right:10*@wu;
    	}
    }
    p:first-child{
    	margin-left:14*@wu;
    }
    p:first-child img{
    	width:19*@wu;
    	height:20*@wu;
    }
    p:nth-child(2) img{
    	width:20*@wu;
    	height:18*@wu;
    }		
    button{
    	width:166*@wu;
    	height:41*@wu;
    	background: #f92f77;
    	color:#fff;
    	text-align: center;
    	line-height:41*@wu;
    	font-size:16*@wu;
    	border:none;
    	border-radius: 21*@wu;
    }
  }
 .page-swiper{
 	 width: 375*@wu;
    height: 283*@wu;
    background: #000;
    position: relative;
 }
 .page-swiper-head{
 	width:100%;
 	height:50*@wu;
 	position: fixed;
 	left:0;
 	top:0;
 	display: flex;
 	display: -webkit-flex;
 	justify-content: space-between;
 	align-items: center;
 	transition: all 0.3s;
 	z-index: 1000;
 	img:first-child{
 		width: 11*@wu;
    height: 18*@wu;
    margin-left: 15*@wu;
 	}
 }
 .swipe{
    width: 375*@wu;
    height: 283*@wu;
    position: relative;
    img{
      width: 375*@wu ;
      height: auto;
    }
    video{
    	width: 375*@wu ;
      height: 283*@wu;
    }
  }
  .swipe-serial{
  	padding:5*@wu 9*@wu;
  	box-sizing: border-box;
  	text-align: center;
  	font-size:14*@wu;
  	color:#fff;
  	background: rgba(255,255,255,.3);
  	position: absolute;
  	border-radius: 10*@wu;
  	right:15*@wu;
  	bottom:12*@wu;
  }
  .page-title{
  	width: 375*@wu;
    height: 89*@wu;
    background:#ffeff5;
    box-sizing: border-box;
    padding:0 15*@wu;
    p{
    	margin:0;
    }
    p:first-child{
    	height:40*@wu;
    	display: flex;
    	display: -webkit-flex;
    	justify-content: space-between;
    	align-items: flex-end;    	
    	b{
    		font-size:16*@wu;
    		color:#ff2788;
    	}
    	span{
    		font-size:14*@wu;
    		color:#999;
    	}
    }
    p:last-child{
    	line-height: 1;
    	font-size:16*@wu;
    	color:#000000;
    	margin-top:10*@wu;
    }
  }
  .page-main{
  	width:375*@wu;
  	height:auto;
  	background:#ffeff5;
  	padding-bottom:55*@wu;
  	.navbar{
  		width:100%;
  		padding:0 16*@wu;
  		box-sizing: border-box;
  		background: #ffeff5;
  		ul{
  			width:100%;
  			background: #fff;
  			box-sizing: border-box;
  			height:43*@wu;
  			padding-bottom:5*@wu;
  			border-top:1px solid #f92f77;
  			margin:0;
  			padding:0;
  			display: flex;
  			display: -webkit-flex;
  			justify-content: flex-start;
  		}
  		li{
  			flex: 1;
  			border-right: 1px solid #fff;
  			list-style: none;
  			a{
  				display: block;
  				height:37*@wu;
  				line-height:37*@wu;
  				text-align: center;
  				text-decoration: none;
  				font-size:15*@wu;
  				background: #f92f77;
  				color:#fff;
  			}
  		}
  		li:last-child{
  			border-right: none;
  		}
  	}  	
  }
  .addbg{
  	background:none !important;
  	color:#f92f77 !important;
  }
  .addyuanjiao{
  	border-radius: 0 0 0 10*@wu;
  }
  .page-main-list img{
  	max-width: 375*@wu !important; 	
  	display: block;
  }
  .page-main-goodsdesc{  	
  		width:100%;
  		padding:0 16*@wu;
  		box-sizing: border-box;
  		background: #ffeff5;
  		border-radius: 0 0 10*@wu 10*@wu ;
  		padding-bottom:30*@wu;
  		p{
  			padding:30*@wu 0;
  			width:100%;
  			overflow: hidden;
  			margin:0 auto;
  			background: #fff;
  			border-radius: 0 0 10*@wu 10*@wu;
  			img:first-child{
  				width:242*@wu;
  				margin:0 auto;
  			}
  			img:last-child{
	  			width:100%;
	  			display: block;
	  		}
  		}  		
  }
  .page-main-comment{
  	padding-bottom:40*@wu ;
  	background: #fff;
  }
  .page-main-daoshi{
  	background: #fff;
  	img:nth-child(2){
  		width:74*@wu;
  		height:74*@wu;
  		margin:0 auto;
  		margin-top:-18*@wu;
  	}
  	p{
  		margin:0;
  		font-size:16*@wu;
  		color:#242424;
  		text-align: center;
  		line-height:1;
  		margin-top:13*@wu;
  		margin-bottom:15*@wu;
  	}
  }
  .page-main-daoshi-text{
  	padding:0 34*@wu;
  	p{
  		font-size:14*@wu;
  		line-height:24*@wu;
  		color:#242424;
  		text-align: left;
  	}
  }
  .fixed{
  	position: fixed;
  	top:50*@wu;
  	left:0;
  	background:url(../../../assets/img/zongsebg.png) repeat;  	
  	box-shadow: 0 2*@wu 6*@wu rgba(0, 0, 0, 0.2);
  }
  .page-swiper .headactive{
  	background: #fff;
  	transition: all 0.3s;
  }
</style>
