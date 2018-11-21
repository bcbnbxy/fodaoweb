<template>
  <div class="page pageColor" id="page" v-show="indexShow">
    <div class="swipe">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in turnList" :key="item.id">
          <a href="javascript:;" @click="goclasslist(item)"><img :src="item.cmsImg"></a>
        </mt-swipe-item>
      </mt-swipe>
    </div>    
    <div class="iconNav">
	    <ul class="indexNav">
	    	<li @click="companyIntroductionFun()"><img src="../../assets/img/index_icon1.png">公司简介</li>
	    	<li @click="classIntroductionFun()" ><img src="../../assets/img/index_icon2.png">课程介绍</li>
	    	<li @click="corporateCultureFun()"><img src="../../assets/img/index_icon3.png">企业文化</li>
	    	<li @click="corporateVisionFun()"><img src="../../assets/img/index_icon4.png">企业愿景</li>
	    	<li @click="curriculumSharingFun()"><img src="../../assets/img/index_icon5.png">学员分享</li>
			</ul>
	    <ul class="indexNav">
	      <!--<li @click="curriculumSharingFun()"><img src="../../assets/img/index_icon5.png">课程分享</li>-->
	      <router-link to="/menClassList" tag="li"><img src="../../assets/img/index_icon16.png">购买男性课程</router-link>
	      <router-link to="/broadcast" tag="li"><img src="../../assets/img/index_icon15.png">直播</router-link>
	      <router-link to="/womanClassList" tag="li"><img src="../../assets/img/index_icon14.png">购买女性课程</router-link>
	    	<!--<li @click="goAlert()"><img src="../../assets/img/index_icon6.png">客服咨询</li>	  -->
	    	<router-link to="/callService" tag="li"><img src="../../assets/img/index_icon6.png">客服咨询</router-link>	 
	    	<router-link to="/partnerList" tag="li"><img src="../../assets/img/index_icon13.png">购买合伙人</router-link>
	      <!--<router-link to="/privateTutor" tag="li"><img src="../../assets/img/index_icon7.png">男性辅导</router-link>
	      <router-link to="/womenPrivateTutor" tag="li"><img src="../../assets/img/index_icon8.png">女性辅导</router-link>-->
	    </ul>
	    <!--<ul class="indexNav">
	    	<router-link to="/callService" tag="li"><img src="../../assets/img/index_icon9.png">联系客服</router-link>	      
	      <router-link to="/broadcast" tag="li"><img src="../../assets/img/index_icon10.png">直播</router-link>
	    	<li @click="answerFun()"><img src="../../assets/img/index_icon11.png">常见问题</li>	    
	    	<li></li>-->
	    <!--	<router-link to="/partnerList" tag="li"><img src="../../assets/img/index_icon12.png">加入合伙人</router-link>	      -->
	    	
	    <!--</ul>-->
    </div>    
    <div class="hotRecommendeds">
    	<h2>热门推荐</h2>
    	<div class="hotRecommendeds-list" >
    			<div class="hotRecommendeds-item" v-for="(item,index) in  hotRecommendeds" :key="item.id" @click="godetails(item.goodsType,item.id)">
    				<img :src="item.goodsImg"/>
    				<p><b>￥{{item.unitPrice}}</b><span>{{item.viewNum}}人已学习</span></p>
    				<h3>{{item.shortName}}</h3>
    				<div class="hotRecommendeds-itemdesc">{{item.shortIntroduce}}</div>
    			</div>
    	</div>
    </div>
    <div class="recommendeds marginBottom">
    	<div class="recommendeds-item" v-for="(item,index) in recommendeds" :key="item.id" @click="golearnclass(item.goodsType,item.id)">
    		<img :src="item.goodsImg2"/>
    		<div class="recommendeds-itemright">
    				<h3>{{item.shortName}}</h3>
    				<p>{{item.shortIntroduce}}</p>
    				<span>{{item.viewNum}}人已学习</span>
    				<b>¥{{item.unitPrice}}</b>
    		</div>
    	</div>
    </div>
    <div class="indexTit marginBottom">
      <h5><span>/</span>精选课程<span>/</span></h5>
      <router-link class="indexList" v-for="(item,index) in womenClassList" :key="item.id" to="/womanClassList" tag="a">
	      <img :src="item.goodsImg">
	      <div class="indexListCenter">
	        <p>{{item.goodsName}}</p>	       
	        <span>{{item.viewNum}}人已参与</span>     
	      </div>
	    </router-link>
    </div>
    <div class="indexTit marginBottom">
	    <router-link class="indexList" v-for="(item,index) in goodsClassS" :key="item.id" to="/menClassList" tag="a">
	      <img :src="item.goodsImg">
	      <div class="indexListCenter">
	        <p>{{item.goodsName}}</p>   
	        <span>{{item.viewNum}}人已参与</span>  
	      </div>
	    </router-link>
    </div>
    
    <div class="indexTit marginBottom yangsheng">
      <h5>
      	<span>/</span>养生课堂<span>/</span>
      	<router-link class="yangshengMore"  to="/recuperationList" tag="a">
      		更多
      		<img src="../../assets/img/learnClass/nextActive.png"/>
      	</router-link>	
      </h5>
      <div class="yangshenglist">
      	<router-link class="indexList yangshengItem" v-for="(item,index) in ysList" :key="item.id" :to="'/recuperationDetails/'+item.id" tag="a">
				      <img :src="item.goodsImg">
				      <div class="indexListCenter">
				        <p>{{item.goodsName}}</p>	       
				        <div class="people">
			        		<img v-for="(gitem,index) in Math.round(item.score)" :key="gitem.id" src="../../assets/img/learnClass/green_small.png"/>
			        		<img v-if="Math.round(item.score) < 5" v-for="(aitem,index) in 5-Math.round(item.score)" :key="aitem.id" src="../../assets/img/learnClass/ash_small.png"/>
				 			   	&nbsp;&nbsp;{{item.score}}   
				        </div>
				        <div class="price"><span> {{item.viewNum}}人学过</span> <b>免费</b></div>
				      </div>
		      <!--<div v-for="(item,index) in 3"  :key="item.id">
		      	<div>it</div>
		      </div>-->
		    </router-link>
      </div>      
    </div>
    
    <div class="indexTit marginBottom">
      <h5><span>/</span>成为合伙人<span>/</span></h5>
      <div class="partnerBack" v-if="partnerObj">
	      <div class="partnerSwiper swipe">
		      <mt-swipe :auto="4000" :defaultIndex="1">
		        <mt-swipe-item >
		       	  <img src="../../assets/img/index_partner1.png"  @click="buyPartnerFun(partnerObj[0].id)">
		        </mt-swipe-item>
		        <mt-swipe-item is-active>
		          <img src="../../assets/img/index_partner2.png"  @click="buyPartnerFun(partnerObj[1].id)">
		        </mt-swipe-item>
		        <mt-swipe-item >
		        	<img src="../../assets/img/index_partner3.png"  @click="buyPartnerFun(partnerObj[2].id)">
		        </mt-swipe-item>
		      </mt-swipe>
		    </div>
	    </div>
    </div>

    <div class="indexTit marginBottom">
    	<h5><span>/</span>精选资料<span>/</span></h5>
    	<div class="indexData">
	      <img class="indexDataLeft" src="../../assets/img/book1.png" @click="lookDetail()">
	      <img class="indexDataTop" src="../../assets/img/book2.png" @click="teacherIntroduction()">
	    </div>
    </div>
    
    <div class="indexTit marginBottom">
    	<div class="indexData">
      	<img class="indexDataBottom" src="../../assets/img/book3.png" @click="goIndustry()">
      </div>
    </div>
    
    <div class="bodyBottom">
    	<p></p>
    	<div><span>我是有底线的</span></div>
    </div>
    <alert-box :message="message" @isShow="isShowFun" v-if="isShow"></alert-box>
    <follow-public :page-object="pageObject" v-if="pageObject && $store.getters.getToken"></follow-public>
    <!--<follow-public :page-object="pageObject" v-if="pageObject && !$store.getters.getUserInfo.subscribe"></follow-public>-->
  </div>
</template>

<script>
  import {Swipe, SwipeItem} from 'mint-ui'
  import {cmsBroadCast,goodsClass,partnerList ,womenClass} from '@/api/index'
  import FollowPublic from "../../components/followPublic";
  import wx from 'weixin-js-sdk'
  export default {
    components: {FollowPublic},
    data(){
      return{
        turnList: [],
        goodsClassS: [],
				hotRecommendeds:[],
        // 合伙人对象
        partnerObj: '',
        womenClassList: [],
        recommendeds:[],
        ysList : [] ,
        indexShow: false,
        isShow: false,
				message :"" ,
        pageObject: ''
      }
    },
    mounted(){
      document.title='首页';  
      alert(window.location.href+"-----------------------------------------main.js67")
//     wx.miniProgram.postMessage({ data: {token: '我是网页' }})
      this.turn();
      this.queryGoodsClass();
      this.queryPartner();
      this.pageObject = document.getElementById('page');
      this.womenClassFun();
    },
    methods:{
 			womenClassFun(){
 					let query ={
 						type : "7"
 					}
 				
	        womenClass(query).then((res)=>{
	          if (res.code === 'Y'){
	            this.womenClassList = res.data;
	          }
	        })
	      },
      // 查询合伙人信息
      queryPartner(){
        partnerList().then((res)=>{
          if (res.code === 'Y'){
            this.partnerObj = res.data;
          }
        })
      },
      //从热门推荐跳转详情页
      godetails(goodstype,id){
      	if(goodstype==1){
      		this.$router.push({path: '/classList/' + id})
      	}else if(goodstype==5){
      		this.$router.push({path: '/womanList/' + id})
      	}
      },
     	//从轮播图跳往详情页
     	goclasslist(obj){
     		if(obj.cmsType==12){
     			this.$router.push({path: '/classList/' + obj.comment})
     		}else if(obj.cmsType==13){
     			this.$router.push({path: '/womanList/' + obj.comment})
     		}else if(obj.cmsType==3){
     			window.location.href=obj.cmsLink;
     		}
     	},
      // 查询轮播图
      turn(){
        cmsBroadCast().then((res)=>{
          if (res.code === 'Y'){
            this.turnList = res.data.banner;
            this.ysList = res.data.goodsObjList;
            this.hotRecommendeds=res.data.hotRecommendeds;
            this.recommendeds=res.data.recommendeds;
          }
        })
      },
      // 课程列表
      queryGoodsClass(){
      	let query = {
      		type : 6
      	}
        goodsClass(query).then((res)=>{
          // console.log(res)
          if (res.code === 'Y'){
            this.goodsClassS = res.data;
            this.indexShow = true;
          }
        })
      },
      //公司简介
      companyIntroductionFun(){
      	window.location.href = 'https://mp.weixin.qq.com/s/K9UQ9Wf1x0N1EAghjAG5uQ'
      },
      //课程介绍
      classIntroductionFun(){
      	window.location.href = 'https://mp.weixin.qq.com/s/y4UXVAJV7kZbgzSVJNS9Yw'
      },
      //企业文化
      corporateCultureFun(){
      	window.location.href = 'https://mp.weixin.qq.com/s/pj2tVAzfZf1WsgIfUiFb5Q'
      },
      //企业愿景
      corporateVisionFun(){
      	window.location.href = 'https://mp.weixin.qq.com/s/znKtLiddOMIVt54mpthArQ'
      },
      //课程分享
			curriculumSharingFun(){
      	window.location.href = 'https://mp.weixin.qq.com/s/frSBZC2GqEF3kRRVaymmDg'
      },
      // 权威解答  
      answerFun(){
        this.$router.push({path: '/answer'})
      },
      // 查看课程列表详情
      classListFun(val){
        this.$router.push({path: '/classList/' + val})
      },
      // 查看课程详情
      lookDetail(){
        this.$router.push({path: '/classDetail'})
      },
      // 导师简介详情
      teacherIntroduction(){
        this.$router.push({path: '/teacherIntroduction'})
      },
      // 行业资讯
      goIndustry(){
        this.$router.push({path: '/industry'})
      },
      // 购买合伙人
      buyPartnerFun(id) {
        this.$router.push({path:'/buyPartner/' + id + '/2'})
      },
      // 学员分享
      shareFun(){
        window.location.href = 'https://fudaojt.com/app/index.php?i=3&c=entry&m=ewei_shopv2&do=mobile&r=article&aid=83'
      },
      
      goAlert(){
        this.message = '暂未开通，敬请期待';
        this.isShow = true;
      } ,
      isShowFun(){
        this.isShow = false;
      },
      golearnclass(goodsType,goodsid){
      	if(goodsType==1){
      		this.$router.push({path:'/classList/'+goodsid})
      	}else if(goodsType==5){
      		this.$router.push({path:'/womanList/'+goodsid})
      	}
      }
    },
    destroyed(){
      window.timer = null;
    } ,
    
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  .iframeClass{
    width: 100%;
    height: 100%;
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    z-index: 200;
    background-color: #ffffff;
    overflow: auto;
    -webkit-overflow-scrolling:touch;
    img:nth-of-type(1){
      width: 28*@wu;
      height: 28*@wu;
      position: fixed;
      top: 15*@wu;
      left: 15*@wu;
      z-index: 201;
      border-radius: 50%;
      background-color: rgba(255,255,255,0.7);
      padding: 5*@wu;
      pointer-events: none;
      vertical-align: sub;
    }
    img:nth-of-type(2){
      width: 100%;
      height: auto;
      pointer-events: none;
      vertical-align: sub;
    }
  }
  .swipe{
    width: 375*@wu;
    height: 180*@wu;
    img{
      width: 375*@wu;
      height: 180*@wu;
    }
  }
  
  .partnerSwiper{
  	
  	width: 100%;
  	height: 139*@wu;
  	
  	.mint-swipe-indicator{
  		border: 1px solid #ffd2d6;
  	}
  	.mint-swipe-indicator.is-active{
  		background-color: #ffd2d6;
  	}
		img{
  		width: 86%;
  		height: 100%;
  	}
  	
  }
  .hotRecommendeds{
  	background-color: #fff;
  	margin-bottom:10*@wu;
  	h2{
  		text-align: center;
  		font-size:18*@wu;
  		height:58*@wu;
  		line-height:58*@wu;
  		font-weight: 500;
  		color:#353535;
  		margin:0;
  	}
  	.hotRecommendeds-list{
  		width:100%;
  		padding:0 15*@wu;
  		box-sizing: border-box;
  		display: flex;
  		display: -webkit-flex;
  		justify-content: space-between;
  		flex-wrap:wrap ;
  		.hotRecommendeds-item{
  			width:167*@wu;
  			padding-bottom:20*@wu;
  			img{
  				width:167*@wu;
  				height:129*@wu;
  				display: block;
  				border-radius: 7*@wu;
  			}
  			p{
  				height:38*@wu;
  				display: flex;
  				display: -webkit-flex;
  				justify-content: space-between;
  				align-items: center;
  				margin:0;
  				b{
  					font-size:18*@wu;
  					color:#F88182;
  					font-weight: 500;
  				}
  				span{
  					font-size:9*@wu;
  					color:#F88182;
  				}
  			}
  			h3{
  				font-size:13*@wu;
  				color:#000;
  				line-height:16*@wu;
  				margin:0;
  				margin-bottom:8*@wu;
  				font-weight: 500;  				
  			}
  			h4{
  				font-size:12*@wu;
  				color:#000;
  				line-height:14*@wu;
  				margin:0;
  				margin-bottom:6*@wu;
  				font-weight: 500;  				
  			}
  			.hotRecommendeds-itemdesc{
  				font-size:12*@wu;
  				color:#707070;
  				line-height:16*@wu;
  				padding-right:5*@wu; 
  				text-overflow: -o-ellipsis-lastline;
  				overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
  			}
  		}
  	}
  }
  .iconNav{
  		background-color: #fff;
	    margin: 0 0 10*@wu 0;
	    padding: 15*@wu 0 5*@wu;
	 	  .indexNav{
	    list-style: none;
	    padding: 0;
			margin-bottom: 10*@wu;
	    overflow: hidden;
	    display: flex;
	    justify-content: center;
	    li{
	      flex: 1;
	      text-align: center;
	      font-size: 11*@wu;
	      img{
	        width: 43*@wu;
	        height: 43*@wu;
	        display: block;
	        margin: 0 auto 7*@wu auto;
	      }
	    }
	  }
  }
  .marginBottom{
    margin-bottom: 10*@wu;
    padding: 18*@wu 0 9*@wu;
  }
  .indexTit{
  	zoom: 1;
    text-align: center;
    background-color: #fff;
    margin-top:10*@wu;
    h5{
      font-size: 18*@wu;
      color: #666;
      position: relative;
      font-weight: 600;
      margin: 0;
      margin-bottom: 30*@wu;
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
  .yangsheng{
		padding-bottom: 20*@wu;
		h5{
			margin-bottom: 20*@wu;
			position : relative;
			.yangshengMore{
				text-decoration: none; 
				position: absolute;
				right: 15*@wu;
				top:0;
				font-size: 14*@wu;
				color: #878787;
				img{
					width: 8*@wu;
					height: 13*@wu;
					vertical-align: sub;
					margin-left: 5*@wu ;
				}
			}
		}
		.yangshenglist{
			width:100%;
  		box-sizing: border-box;
  		display: flex;
  		display: -webkit-flex;
  		flex-wrap:wrap ;
  		.yangshengItem{
	    	width: 50%;	    	
	    	padding: 10*@wu 0;
	    	img{
	    		width: 172*@wu;
	    		height: 108*@wu;
	    	}
	    	p{
	    		font-size: 16*@wu;
	    		margin-top: 10*@wu;
	    		color: #1F232D;
	    	}
	    	.people{
	    		display: inline-block;
	    		color: #1F232D;
	    		font-size: 12*@wu;
	    		img{
	    			width: 8*@wu;
	    			height: 8*@wu;
				    float: left;
						margin: 4*@wu 2*@wu 4*@wu 0;
	    		}
	    	}
	    	.price{
	    		margin-top: 10*@wu;
	    		display: flex;
	    		display: -webkit-flex;
	    		flex-direction: column;
	    		b{
	    			color: #1F232D;
	    			font-size: 16*@wu;
	    			font-weight: 500;
	    		}
	    		span{
	    			color: #878787;
	    			/*margin-left: 10*@wu;*/
				    /*vertical-align: text-top;*/
	    		}
	    	}
	    }
		}
	}
	
	.people:after,.yangsheng:after {
    content:""; 
    display: block; 
    clear:both; 
	}
	

  .partnerBack{
    overflow: hidden;
    position: relative;
    z-index: 0;
    padding-top: 15*@wu;
    .partnerBox{
      width: 165*@wu;
      height: 110*@wu;
      float: left;
      margin-bottom: 15*@wu;
      margin-left: 17*@wu;
      &>img{
        width: 100%;
        height: 100%;

      }
    }

  }
  .indexData{
    overflow: hidden;
    padding: 15*@wu 11*@wu 11*@wu 11*@wu;
    position: relative;
    text-align: left;
    .indexDataLeft{
      width: 166*@wu;
      height: 186*@wu;
      margin-right: 12*@wu;
    }
    .indexDataTop{
      width: 166*@wu;
      height: 186*@wu;
    }
    .indexDataBottom{
      width: 100%;
      height: 187*@wu;
    }
  }
  
  .bodyBottom{
  	margin-bottom: 20*@wu;
  	padding: 10*@wu 15*@wu;
  	position: relative;
  	color: #999;
  	text-align: center;
  	p{
  		height: 1*@wu;
  		margin-top: 15*@wu;
  		background-color: #ccc;
  	}
  	div{
  		position: absolute;
  		width: 100%;
  		z-index: 1;
  		top: 12*@wu;
  		left: 0;
	  	span{
	  		font-size: 12*@wu;
	  		background-color: #f5f5f5;
	  		display: inline-block;
	  		padding: 0 15*@wu;
	  	}
  	}
  }
.recommendeds{
	padding:25*@wu 14*@wu 10*@wu 14*@wu;
	background: #fff;
}
.recommendeds-item{
	display: flex;
	display: -webkit-flex;
	margin-bottom:20*@wu;
}
.recommendeds-item>img{
	width:167*@wu;
	height:100*@wu;
	display: block;
	flex-shrink: 0;
	margin-right:16*@wu;
}
.recommendeds-itemright{
	height:100*@wu;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.recommendeds-itemright h3{
	font-size:14*@wu;
	color:#000;
	text-align: left;
	line-height:1;
	margin:0;
	font-weight: 500;
}
.recommendeds-itemright p{
	font-size:11*@wu;
	color:#707070;
	text-align: left;
	line-height: 18*@wu;
	margin:0;
}
.recommendeds-itemright span{
	font-size:10*@wu;
	color:#999;
	text-align: left;
	line-height: 1;
	margin:0;
}
.recommendeds-itemright b{
	font-size:18*@wu ;
	color:#F88182;
	text-align: left;
	line-height: 1;
	margin:0;
	font-weight: 500;
}
</style>
