<template>
	<div class="page">
	<div class="bgBox" v-if="priData">
		<img :src="priData.cmsImg" />
	</div>
	<div v-html="priData.comment" class="privateHtml"></div>
	<div v-if="isShowPrivate" class="noPrivate">
      <img src="../../../assets/img/private_bg.png">
      <!--<p>
        对不起！您暂无权限查看私人辅导老师<br>联系方式哦 ~
      </p>
      <h4>请先购买第三节课程</h4>-->
    </div>
	</div>
</template>
	
<script>
	import {privateTutor} from '@/api/index'
	  export default {
	    data() {
	      return {
	      	priData:"" ,
	      	isShowPrivate : false
	      }
	    },
	    mounted() {
	    	document.title = '女性私人辅导';
		    privateTutor({sex:1}).then((res)=>{
		        if(res.code === 'Y'){
		          this.priData = res.data[0];
		        }else {
		          this.isShowPrivate = true;
		        }
		    })
	    },
	    methods: {	
	
	    }
	  }
</script>
<style lang="less" scoped>
  @wu:100vw / 375;
  .bgBox{
  	width: 100%;
  	height: auto;
  	img{
  		width: 100%;
  		height: auto;
  	}
  }
  .privateHtml{
    overflow: hidden;
  }
  .noPrivate{
    overflow: hidden;
    height: 100%;
    img{
      width: 100%;
      height: 100%;
    }

  }
</style>