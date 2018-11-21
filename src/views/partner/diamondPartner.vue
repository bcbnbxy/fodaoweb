<template>
	<div class='page pageColor'>
		<div class="top">
	      	<img src="../../assets/img/learnClass/prevActive.png" @click="goBackFun()">
	      	  钻石合伙人
        </div>
        
        <div class="bgBox">
        	<img src="../../assets/img/partner_bg4.png"/>
        </div>
        
        <div class="jionUs" @click="buyPartnerFun(jionID)">立即加入</div>
	</div>
</template>

<script>
	
	import {partnerList,userInfoApi} from '@/api/index'
    import { MessageBox } from 'mint-ui';
    export default {
	    data() {
	      return {
	      	jionID : ""
	      }
	    },
	    mounted() {
	      document.title = "钻石合伙人";
	      partnerList().then((res)=>{
		        if (res.code === 'Y'){
		          
		          for( let i = 0 ; i < res.data.length ; i++)
		          {
		          	if( res.data[i].partnerName == "钻石合伙人" )
		          	{
		          		this.jionID =  res.data[i].id;
		          	}
		          }
		          
		         // console.log(  res.data) ;
		          
		        }
		    })
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
	     
	    	// 购买合伙人
	      buyPartnerFun(id) {
	        if(this.$store.getters.getToken==='userId'){
	          MessageBox({
	            title: '温馨提示',
	            message: '为了您更好的用户体验<br>请先验证手机号',
	            confirmButtonText: '立即验证',
	            showCancelButton: true
	          }).then(action => {
	            if (action === 'confirm') {
	              this.$router.push({path: '/bindWx'})
	            }
	          });
	        }else {
	          this.$router.push({path:'/buyPartner/' + id + '/2'})
	        }
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
      box-shadow: 0 0 2*@wu 0 #cccccc;
      border-bottom: 1px solid #f2f2f2;
      text-align: center;
      img:first-child {
        position: absolute;
        left: 20*@wu;
        top: 15*@wu;
        width: 9*@wu;
        height: auto;
      }

    
 
   }
   .bgBox{
	  	width: 100%;
	  	height: 100%;
	  	position: fixed;
	  	z-index: 0;
	  	img{
	  		width: 100%;
	  		height: calc(~'100% -'46 * @wu);
	  	}
  	}
  	
    .jionUs{
  		position: fixed;
  		bottom: 35*@wu;
  		left: 15*@wu;
  		background-color: #FFC73E;
  		color: #fff;
  		text-align: center;
  		height: 57*@wu;
  		line-height: 57*@wu;
  		width: 348*@wu;
  		border-radius: 8*@wu;
    }
</style>