<template>
	<div class='page'>
	 	<div class="indexTit marginBottom yangsheng"
	 		v-infinite-scroll="loadMore"
	        infinite-scroll-distance="10"
	        infinite-scroll-immediate-check='true'
	 		>
			<router-link class="indexList" v-for="(item,index) in ysList" :key="item.id" :to="'/recuperationDetails/'+item.id" tag="a">
		      <div class="yangshengItem">
		       <img :src="item.goodsImg">
		       <div class="indexListCenter">
		        <p>{{item.goodsName}}</p>	       
		        <div class="people">
		    		<img v-for="(gitem,index) in Math.round(item.score)" :key="gitem.id" src="../../../assets/img/learnClass/green_small.png"/>
		    		<img v-if="Math.round(item.score) < 5" v-for="(aitem,index) in 5-Math.round(item.score)" :key="aitem.id" src="../../../assets/img/learnClass/ash_small.png"/>
		 			   	&nbsp;&nbsp;{{item.score}}<span> {{item.viewNum}}人学过</span>    
		        </div>
		        <div class="price">免费</div>
		      </div>
		      </div>
		    </router-link>
		    <div class="moreClass" v-if="ysList.length > 10">
		        <img src="../../../assets/img/more.gif" v-if="loading">
		        <span v-if="!loading && nomore">没有更多了...</span>
		     </div>
		</div>
	</div>
</template>

<script>
  import {healthtips} from '@/api/index'
  import {Indicator} from 'mint-ui'
  export default {
    data() {
      return {
      	ysList:[] ,
      	loading : false ,
      	
        pageNum: 1,
        pageSize: 10,
        nomore : false ,
      }
    },
    mounted() {
      document.title='养生课堂列表';
      this.turn();
    },
    methods: {	
		// 查询轮播图
      turn(){
      	this.loading = true;
        Indicator.open();
        let query =
        {
        	pageNum : this.pageNum ,
        	pageSize : this.pageSize ,
        }
        
        healthtips(query).then((res)=>{
    		this.loading = false;
            Indicator.close();	
            if (res.code === 'Y'&& !!res.data){            	
            	this.ysList = this.ysList.concat(res.data);          
	            this.pages = res.data.pages;
	            //console.log(this.ysList);
	        }else if(res.code === 'Y')
	        {
	        	this.nomore = true;
	        }
        })
      },
      // 下拉加载
      loadMore() {
      	if( this.ysList.length > 10  && !this.nomore ){
          this.pageNum++;
          this.turn();
        }  
      },
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw/375;
  
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
   .yangshengItem{
		display: inline-block;
		vertical-align: text-top;
		padding: 10*@wu;
	    max-width: 44%;
   		overflow: hidden;
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
			span{
				color: #878787;
				margin-left: 10*@wu;
			    vertical-align: text-top;
			}
		}
		.price{
			color: #1F232D;
			font-size: 16*@wu;
			margin-top: 10*@wu;
		}
	}
}

	.people:after,.yangsheng:after {
    content:""; 
    display: block; 
    clear:both; 
	}
	
  
</style>