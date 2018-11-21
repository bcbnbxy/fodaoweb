<template>
  <div class='page backColor'>
    <div class="changeEwm" v-if="!userInfo.wechatIdUrl">
      <img src="../../../assets/img/jiahao.png">
      <span>上传二维码</span>
      <upload-img :maxSize="2" :widths="800" :heights="800" :className="'upDataMyEWM'" @uploadImgFun="uploadImgFun"></upload-img>
    </div>
    <div class="ewmImg"><img :src="userInfo.wechatIdUrl" v-if="userInfo.wechatIdUrl"></div>
    <img src="../../../assets/img/clear.png" class="closeImg" @click="closeImgFun()" v-if="userInfo.wechatIdUrl">
    <alert-box :message="message" @isShow="isShowFun" v-if="isShow"></alert-box>
  </div>
</template>

<script>
  import wx from 'weixin-js-sdk'
  import uploadImg from '@/components/uploadImg'
  import {userPatch} from '@/api/index'

  export default {
    components: {
      uploadImg
    },
    data() {
      return {
        userInfo: this.$store.getters.getUserInfo,
        hasImg: false,

        message:'',
        isShow: false
      }
    },
    mounted() {
      document.title = '我的微信二维码';
    },
    methods: {
      closeImgFun(){
        this.userInfo.wechatIdUrl = '';
      },
      // 上传我的二维码
      uploadImgFun(url) {
        userPatch({wxUrl: url}).then((res) => {
          if(res.code === "Y"){
            this.userInfo.wechatIdUrl = url;
            this.$store.dispatch('userInfo', this.userInfo);
            this.message = '保存成功';
            this.isShow = true;
          }
        })
      },
      // 关闭弹框
      isShowFun() {
        this.isShow = false;
      }
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  .backColor {
    background-color: #ffffff;
  }

  .ewmImg {
    width: 340*@wu;
    height: 340*@wu;
    margin: 64*@wu auto 0 auto;
    border: 1px solid #dedede;
    border-radius:10*@wu;
    img{
      width: 340*@wu;
      height: 340*@wu;
      display: block;
      border-radius:10*@wu;
    }
  }

  .changeEwm {
    position: absolute;
    top: 230*@wu;
    left: 137*@wu;
    color: #F5A623;
    font-size: 9*@wu;
    width: 100*@wu;
    img {
      width: 58*@wu;
      height: 58*@wu;
      display: block;
      margin: 0 auto;
    }
    span {
      vertical-align: middle;
      text-align: center;
      display: block;
      font-size: 14*@wu;
      margin-top: 5*@wu;
    }
  }

  .closeImg{
    position: absolute;
    top: 108*@wu;
    right: 21*@wu;
    width: 26*@wu;
    height: 26*@wu;
  }
</style>
<style lang="less">
  @wu: 100vw / 375;
  .upDataMyEWM {
    position: absolute;
    top: 0;
    right: 0;
    width: 90*@wu !important;
    height: 80*@wu;
    input[type='file'] {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      display: block;
      opacity: 0;
    }
  }
</style>
