<template>
	<div class='page pageColor'>
		<video :poster="goods.goodsImg" controls="controls"  :src="goods.goodsImg2" type="video/mp4" autoplay="autoplay" webkit-playsinline="true" x-webkit-airplay="true"  playsinline="true" x5-video-player-type="h5" x5-video-player-fullscreen="true">
		</video>
		<div class="listTab">
			<div :class="tabActive == 1 ? 'active' : ''" @click="tab(1)">介绍</div>
			<div :class="tabActive == 2 ? 'active' : ''" @click="tab(2)">目录</div>
			<div :class="tabActive == 3 ? 'active' : ''" @click="tab(3)">评价</div>
		</div>
		
		<div class="introduceBox" v-if="showIntroduce">
			<div class="introduceTitleBox">
				<p>{{goods.goodsName}}</p>
				<div class="people">
		    		<img v-for="(gitem,index) in introduceSroce" :key="gitem.id" src="../../../assets/img/learnClass/green_small.png"/>
		    		<img v-if="introduceSroce < 5" v-for="(aitem,index) in 5-introduceSroce" :key="aitem.id" src="../../../assets/img/learnClass/ash_small.png"/>
	 			   	<span class="score">{{scoreInfo.score}}</span><span> {{goods.viewNum}}人学过</span>    
		        </div>
		        <div class="price">免费</div>
			</div>
			
			<div class="introduceComment" v-html="goods.comment"></div>
		</div>
		
		<div class="catalogBox" v-if="showCatalogBox">
			<img :src="goods.goodsLink"/>
		</div>
		
		<div class="evaluateBox" v-if="showEvaluateBox">
			<div class="evaluateTitle">
				<p>全部评价 <span>有{{scoreInfo.scoreCnt}}人评价</span></p>
			</div>
			
			<div class="scoreBox">
				<div class="scoreNumText">
					{{scoreInfo.score}} <span>星</span>
				</div>
				
				<div class="scoreList">
					<div>
						<img v-for="(sitem,index) in 5" :key="sitem.id" src="../../../assets/img/learnClass/ash_small.png"/>
					</div>
					<div>
						<img v-for="(sitem,index) in 4" :key="sitem.id" src="../../../assets/img/learnClass/ash_small.png"/>
					</div>
					<div>
						<img v-for="(sitem,index) in 3" :key="sitem.id" src="../../../assets/img/learnClass/ash_small.png"/>
					</div>
					<div>
						<img v-for="(sitem,index) in 2" :key="sitem.id" src="../../../assets/img/learnClass/ash_small.png"/>
					</div>
					<div>
						<img v-for="(sitem,index) in 1" :key="sitem.id" src="../../../assets/img/learnClass/ash_small.png"/>
					</div>
				</div>
			
				<div class="scoreLine">					
					<div class="scoreLineItem">
						<div :style="'width:'+ (scoreInfo.score5 / scoreInfo.scoreCnt ) * 100 +'%' "></div>
					</div>
					<div class="scoreLineItem">
						<div :style="'width:'+ (scoreInfo.score4 / scoreInfo.scoreCnt ) * 100 +'%' "></div>
					</div>
					<div class="scoreLineItem">
						<div :style="'width:'+ (scoreInfo.score3 / scoreInfo.scoreCnt ) * 100 +'%' "></div>
					</div>					
					<div class="scoreLineItem">
						<div :style="'width:'+ (scoreInfo.score2 / scoreInfo.scoreCnt ) * 100 +'%' "></div>
					</div>
					<div class="scoreLineItem">
						<div :style="'width:'+ (scoreInfo.score1 / scoreInfo.scoreCnt ) * 100 +'%' "></div>
					</div>					
				</div>
				
			</div>
			
			
			<ul class="evaluateList"
				v-infinite-scroll="loadMore"
		        infinite-scroll-distance="10"
		        infinite-scroll-immediate-check='true'
				>
				<li v-for="(item,index) in commentList" :key="item.index">
					<div class="peopleImg">
						<img v-if="item.userobj && item.userobj.wechatImg" :src="item.userobj.wechatImg"/>
						<img v-if="!item.userobj || !item.userobj.wechatImg" src="../../../assets/img/userImg.png"/>
					</div>
					<div class="peopleInfo">
						<div class="peopleInfoTitle">
							<div class="peopleName" v-if="item.userobj">{{item.userobj.wechatName ? item.userobj.wechatName : item.userobj.realName}}</div>
							<div class="peopleName" v-if="!item.userobj">匿名用户</div>
							<div class="time">{{item.createTime}}</div>
						</div>
						<div class="statBox">
							<img v-for="(gitem,index) in item.stars" :key="gitem.id" src="../../../assets/img/learnClass/green_small.png"/>
			    			<img v-if="item.stars < 5" v-for="(aitem,index) in 5-item.stars" :key="aitem.id" src="../../../assets/img/learnClass/ash_small.png"/>
						</div>
						<div class="content">{{item.comment}}</div>
					</div>
				</li>
				<div class="moreClass" v-if="commentList.length > 10">
			        <img src="../../../assets/img/more.gif" v-if="loading">
			        <span v-if="!loading && nomore">没有更多了...</span>
			    </div>
			</ul>
			
			
			<div class="writeEvaluate" @click="showWriteEvaluate">
				<img src="../../../assets/img/evaluate_btn.png"/>
			</div>
			
			<div class="writeEvaluateTan" v-show="isStars">
				<div class="writeEvaluateBg" @click="hideWriteEvaluate"></div>
				<div class="writeEvaluateBox">
					<div class="writeEvaluateStars">
						
						<div class="starsTop">
							<img :class="index > stars-1 ? 'opcity' : '' " v-for="(gitem,index) in 5" :key="index" src="../../../assets/img/learnClass/green_big.png" @click="ckStar(index)" />
						</div>
						<div class="starsBottom">
			    			<img v-for="(aitem,index) in 5" :key="index" src="../../../assets/img/learnClass/ash_big.png" @click="ckStar(index)"/>
						</div>

					</div>
					
					<div class="statsText">{{statsText}}</div>
					
					<textarea maxlength="200" v-model="evaluateTextarea" placeholder="请尽可能详尽描述你的学习经历(200字以内)"></textarea>
					
					<div class="evaluateBtnBox">
						<div class="cancle" @click="hideWriteEvaluate">取消</div>
						<div class="confim" @click="saveHealthComment">确定</div>
					</div>
				</div>
			</div>
			
		</div>
			
		<alert-box :message="message" @isShow="isShowFun" v-if="isShow"></alert-box>
	</div>
</template>

<script>
  import {healthtipsDetail , HealthCommentList , saveHealthComment , healthtipsView} from '@/api/index'
  import {Indicator} from 'mint-ui'
  
  export default {
    data() {
      return {
      	goodsId : this.$route.params.goodsId ,
      	goods : {} ,
      	scoreInfo : {} ,
      	commentList : [] ,
      	tabActive : 1 ,
      	
      	introduceSroce : 1,
      	showIntroduce : true ,
      	showCatalogBox : false ,
      	showEvaluateBox : false ,
      	
      	loading : false ,
      	
        pageNum: 1,
        pageSize: 10,
        nomore : false ,
        
        isStars : false ,
        stars : 5 ,
        statsText : "推荐，课程非常棒。",
        evaluateTextarea : "",     
        
        message: '',
        isShow: false,
      }
    },
    mounted() {
        document.title='养生课堂详情';
        this.turn();
     	this.healthtipsView();
    },
    methods: {	
		turn(){

	        let query =
	        {
	        	goodsId : this.goodsId ,
	        }
	        
	        healthtipsDetail(query).then((res)=>{
	            if (res.code === 'Y'&& !!res.data){
		            this.goods = res.data.goods;
		            this.scoreInfo = res.data.scoreInfo;
		            this.commentList = res.data.commentList || [];
		            this.introduceSroce = Math.round(res.data.scoreInfo.score);
		            
		            if( this.commentList > 10)
			   		{
				    	this.getComment();
				    }
		            //console.log(this.goods);
		        }
	        })
	    },
	    //切换导航
	    tab( index ){
	    	this.tabActive = index ;
	    	if( index == 1 )
	    	{
	    		this.showIntroduce = true;
	    		this.showCatalogBox = false;
	    		this.showEvaluateBox = false;
	    	}else if( index == 2 )
	    	{
	    		this.showCatalogBox = true;
	    		this.showIntroduce = false;
	    		this.showEvaluateBox = false;
	    	}else{
	    		this.showEvaluateBox = true;
	    		this.showCatalogBox = false;
	    		this.showIntroduce = false;
	    	}
	    },
	     // 下拉加载
        loadMore() {
        	if( this.commentList.length > 9 && !this.nomore ){
	          this.pageNum++;
	          this.getComment();
	        }
        },
	    //获取评论列表
	    getComment(){
	    	this.loading = true;
       		Indicator.open();
       		
	    	let query ={
	    		goodsId : this.goodsId ,
	    		pageNum : this.pageNum ,
        		pageSize : this.pageSize ,
	    	};
	    	
	    	HealthCommentList(query).then((res)=>{
				this.loading = false;
            	Indicator.close();
	            if (res.code === 'Y'&& !!res.data){
					if( this.commentList )
					{
						this.commentList = this.commentList.concat( res.data.list );	
					}
		                        
		            //console.log(this.commentList);
		        }else if(res.code === 'Y'){
		        	this.nomore = true;
		        }
	        })
	    	
	    },
	    //获取点播次数
	    healthtipsView(){
	    	
	    	let query ={
	    		goodsId : this.goodsId ,
	    	};
	    	
	    	healthtipsView(query).then((res)=>{

	            if (res.code === 'Y'&& !!res.data){
					
		            //this.peopleNum = res.data;            
		            //console.log(res.data);
		        }
	        })
	    },
	    //隐藏填写评论
	    hideWriteEvaluate(){
	    	this.isStars = false;
	    },
	    //显示填写评论
	    showWriteEvaluate(){
	    	this.isStars = true;
	    },
	    //点击评论选择星星
	    ckStar(index){
	    	this.stars = index + 1;
	    	let statsTextList = [
	    		"极差，课程特别糟糕。",
	    		"差，我对课程不满意。",
	    		"中评，课程很一般。",
	    		"良好，课程还可以。",
	    		"推荐，课程非常棒。"
	    	];
	    	this.statsText = statsTextList[index]
	    	//console.log(index);
	    },
	    //提交评论
	    saveHealthComment(){
	    	let query ={
	    		orderNo : this.goods.id ,
	    		comment : this.evaluateTextarea ,
        		stars : this.stars ,
	    	};
	    	this.hideWriteEvaluate();       
	    	saveHealthComment(query).then((res)=>{

	            if ( res && res.code === 'Y'&& !!res.data){
					this.turn();					     
		        }else{
		        	this.message = '提交失败';
        			this.isShow = true;
		        }
	        })
	    },
	    isShowFun(){
	       this.isShow = false;
	    },
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw/375;
  
  video{
  	width: 100%;
  	height: auto;
  }
  
  .listTab{
  	background-color: #fff;
  	padding: 0 12*@wu;
  	div{
  		padding: 15*@wu 0;
  		text-align: center;
  		width: 113.5*@wu;
  		color: #6B7388;
  		font-size: 15*@wu;
  		display: inline-block;
  		border-bottom: 3*@wu solid #fff;
  	}
  	.active{
  		color: #14AB13;
  		border-bottom: 3*@wu solid #14AB13;
  	}
  }
  
  .introduceBox{
  	/*background: tan;*/
  	.introduceTitleBox{
  		background-color: #fff;
  		padding: 0 18*@wu;
  		p{
  			margin: 0;
  			font-size: 20*@wu;
  			color: #1F232D;
  			padding: 20*@wu 0 20*@wu;
  		}
  		.people{
  			line-height: 20*@wu;
			display: inline-block;
			color: #1F232D;
			font-size: 12*@wu;
			padding-bottom: 25*@wu;
			img{
				width: 15*@wu;
				height: 15*@wu;
			    float: left;
				margin: 4*@wu 2*@wu 4*@wu 0;
			}
			span{
				color: #878787;
				margin-left: 10*@wu;
			    vertical-align: text-top;
			}
		
		}
		.price{
			border-top: 1*@wu solid #E7E9ED;
			padding:8*@wu 0 24*@wu ;
			color: #1F232D;
			font-size: 16*@wu;
		}
  	}
  	
  	.introduceComment{
  		width: 100% ;
  		min-height:600*@wu;
  		overflow: hidden;
  	}
  }
  
  .catalogBox{
  	img{
  		width: 100%;
  	}
  }
  
  .evaluateBox{
  	background-color: #fff;
  	margin-top: 2*@wu;
  	padding: 0 10*@wu;
  	.evaluateTitle{
  		p{
  			margin: 0;
  			padding: 35*@wu 0 30*@wu;
  			position: relative;
  			font-size: 15*@wu;
  			color: #1F232D;
  			span{
  				position: absolute;
  				right: 5*@wu;
  				top: 35*@wu;
  				color: #9EA3AD;
  			}
  		}
  	}
  	.scoreBox{
  		padding-bottom: 30*@wu;
  		.scoreNumText{
  			display: inline-block;
  			color: #757575;
  			font-size: 55*@wu;
  			font-weight: 500;
  			span{
  				font-weight: 300;
  				font-size: 20*@wu;
  			}
  		}
  		.scoreList{
  			display: inline-block;
  			text-align: right;
  			div{
  				height: 12*@wu;
	  			img{
	  				width: 8*@wu;
	  				height: 8*@wu;
	  			}
  			}
  		}
  		.scoreLine{
  			display: inline-block;
  			width: 170*@wu;
  			margin-left: 5*@wu;
  			.scoreLineItem{
  				margin-bottom: 8.5*@wu;
  				position: relative;
  				background-color: #E6EAF2;
  				width: 100%;
  				height: 4*@wu;
  				overflow: hidden;
  				border-radius:2*@wu ;
  				div{
  					position: absolute;
  					left: 0;
  					top: 0;
  					z-index: 10;
  					height: 4*@wu;
  					background-color: #A4A9B2;
  				}
  			}
  			.scoreLineItem:last-child{
  				margin-bottom: 0;
  			}
  		}
  	}
  	
  	.evaluateList{
  		padding: 0;
  		list-style: none;
  		li{
  			position: relative;
  			margin: 20*@wu 0 30*@wu;
  			.peopleImg{
  				width: 38*@wu;
  				height: 38*@wu;
  				border-radius: 100%;
  				margin-right: 13*@wu;
  				display: inline-block;
  				vertical-align: top;
			    overflow: hidden;
  				img{
  					width: 100%;
  					height: 100%;
  				}
  			}
  			.peopleInfo{
  				display: inline-block; 				
  				.peopleInfoTitle{
	  				.peopleName{
	  					color: #1F232D;
	  					margin-bottom: 14*@wu;
	  					font-size: 15*@wu;
	  				}
	  				.time{
	  					color: #BABDC5;
	  					font-size: 12*@wu;
	  				}
  				}
  				.statBox{
  					position: absolute;
  					right: 0;
  					top: 2*@wu;
  					img{
  						float: left;
  					}
  				}
  				.content{
  					margin: 20*@wu 0 25*@wu;
  					font-size: 15*@wu;
  					color: #1F232D;
  					max-width: 277*@wu;
				    word-wrap: break-word;
  				}
  			}
  		}
  		
  	}
  	
  }
  
  .writeEvaluate{
  	position: fixed;
  	bottom: 30*@wu;
  	right: 30*@wu;
  	width: 50*@wu;
  	height: 50*@wu;
  	overflow: hidden;
  	border-radius: 100%;
  	background-color: #fff;
  	box-shadow: 0 0 14*@wu rgba(0,0,0,0.4);
  	img{
  		width: 100%;
  		height: 100%;
  	}
  }
  
  .writeEvaluateTan{
  	position: fixed;
  	top: 0;
  	left: 0;
  	z-index: 100;
  	width: 100%;
  	height: 100%;
  	.writeEvaluateBg{
  		background-color: rgba(0,0,0,0.4);
  		width: 100%;
  		height: 100%;
  		position: absolute;
  		z-index: -1;
  		left: 0;
  		top: 0;
  	}
  	.writeEvaluateBox{
  		width: 280*@wu;
  		border-radius: 5*@wu ;
  		background-color: #fff;
  		margin: 150*@wu auto 0;
  		.writeEvaluateStars{
  			width: 190*@wu;
  			position: relative;
  			margin: 0 auto;
  			padding: 20*@wu 0 16*@wu;
  			.starsTop{
  				position: absolute;
  				z-index: 10;
  				width: 100%;
  			}
  			img{
  				width: 25*@wu;
  				height: 24*@wu;
  				margin-right: 10*@wu;
  			}
  			.opcity{
  				opacity: 0;
  			}
  		}
  		.statsText{
  			color: #70788C;
  			font-size: 13*@wu;
  			text-align: center;
  			margin-bottom: 17*@wu;
  		}
  		textarea{
  			width: calc(~'100% -'30 * @wu);;
  			height: 144*@wu;
  			border: 0;
  			resize:none;
  			padding: 15*@wu;
  			background-color: #EBEEF3;
  			outline: none;
  		}
  		.evaluateBtnBox{
  			color: #70788C;
  			font-size: 15*@wu;
  			div{
  				float: left;
  				width: 50%;
  				text-align: center;
  				padding: 20*@wu 0;
  			}
  			.confim{
  				color: #14AB13;
  			}
  		}
	  	.evaluateBtnBox:after {
	    content:""; 
	    display: block; 
	    clear:both; 
		}
  	}
  }
  
</style>