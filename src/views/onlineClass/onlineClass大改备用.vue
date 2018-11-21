<template>
  <div id="page" class="page pageColor">  	
    <div class="indexTit marginBottom">
      <router-link class="indexList" v-for="(item,index) in womenClassS" :key="item.id" to="/womanClassList" tag="a">
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
    <alert-box :message="message" @isShow="isShowFun" v-if="isShow" :warningImg="1"></alert-box>
    <follow-public :page-object="pageObject" v-if="pageObject && !$store.getters.getUserInfo.subscribe"></follow-public>
  </div>
</template>

<script>
  import {goodsClass,womenClass} from '@/api/index'
  import { MessageBox } from 'mint-ui';
  import {is_WX} from '@/tools/tools'
  import FollowPublic from "../../components/followPublic";
  export default {
    components: {FollowPublic},
    data() {
      return {
        goodsClassS: [],
        womenClassS: [],
        message:'',
        isShow:false,
        pageObject: ''
      }
    },
    mounted(){
      document.title='在线课程';
      this.queryGoodsClass();
      this.pageObject = document.getElementById('page');
    },
    methods: {
      // 关闭弹框
      isShowFun(){
        this.isShow = false
      },
      // 课程列表
      queryGoodsClass(){
        goodsClass({type:6}).then((res)=>{
          // console.log(res)
          if (res.code === 'Y'){
            this.goodsClassS = res.data;
          }
        })
        womenClass({type:7}).then((res)=>{
          // console.log(res)
          if (res.code === 'Y'){
            this.womenClassS = res.data;
          }
        })
      },
    }
  }
</script>

<style lang="less" scoped>
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
</style>
