<template>
  <div class='page'>
    <img :src="priData.cmsImg" class="privateImg">
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
  import { MessageBox } from 'mint-ui';
  export default {
    data() {
      return {
        priData: '',
        isShowPrivate: false
      }
    },
    mounted() {
      document.title = '男性私人辅导';
      privateTutor().then((res)=>{
        if(res.code === 'Y'){
          this.priData = res.data[0];
        }else {
          this.isShowPrivate = true;
        }
      })
    }
  }
</script>

<style lang="less" scoped>
  @wu:100vw / 375;
  .privateImg{
    width: 100%;
    height: auto;
    display: block;
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
