<template>
  <div id="page" class="page">
    <img :src="dataList.goodsLink" class="classListImg">
    <div class="enterPeople">
      <img src="../../../assets/img/hot.png">
      <span>{{dataList.viewNum}}</span>
      <img src="../../../assets/img/enterPeople.png">
    </div>
   <div class="comment" v-html="dataList.comment"></div>
    <button class="studyList" @click="toStudy()" v-if="isStudy && windowApp!==1">{{ isStudy }}</button>
    <alert-box :message="message" @isShow="isShowFun" v-if="isShow" :warningImg="1"></alert-box>
    <follow-public :page-object="pageObject" v-if="pageObject && !$store.getters.getUserInfo.subscribe"></follow-public>
  </div>
</template>

<script>
  import {goodsDetail, classBuy, classLearn} from '@/api/index'
  import {MessageBox} from 'mint-ui';
  import {is_WX} from '@/tools/tools'
  import FollowPublic from "../../../components/followPublic"
  export default {
    components: {FollowPublic},
    data() {
      return {
        id: this.$route.params.id,
        dataList: {},
        isStudy: '去购买',
        queryBuy: false,

        // 错误信息
        message: '',
        isShow: false,
        windowApp: window.app || '',
        pageObject: ''
      }
    },
    created() {
      goodsDetail({goodsId: this.id}).then((res) => {
      	console.log(JSON.stringify(res));
        if (res.code === 'Y') {
          this.dataList = res.data;
          this.queryBuy = true
        }
      })
    },
    watch: {
      'queryBuy': 'queryBuyFun'
    },
    mounted() {
      document.title = '课程介绍';
      this.pageObject = document.getElementById('page');
      /*MessageBox({
        title: '温馨提示',
        message: this.windowApp,
        confirmButtonText: '立即登录',
        showCancelButton: true
      }).then(action => {
        if (action === 'confirm') {
          this.$router.push({path: '/login'})
        }
      });*/
    },
    methods: {
      isShowFun() {
        this.isShow = false;
      },
      // 查询是否购买
      queryBuyFun() {
        if (this.queryBuy) {
          if (this.$store.getters.getToken && this.$store.getters.getToken!=='userId') {
            classBuy({goodsId: this.dataList.id}).then((res) => {
              if (res.data) {
                this.isStudy = '去学习'
              } else {
                this.isStudy = '去购买'
              }
            })
          }else {
            if(this.dataList.id === 1){
              this.isStudy = '去学习'
            }
          }
        }
      },
      // 判断是否可以去学习
      toStudy() {
        if(this.dataList.id === 1){
          this.$router.push({path: '/learnClass/' + this.id + '/' + this.dataList.goodsNo});
          return false;
        }
        if (this.$store.getters.getToken && this.$store.getters.getToken!=='userId') {
          if (this.isStudy === '去学习') {
            classLearn({goodsId: this.id, goodsType: this.dataList.goodsType}).then((res) => {
              if (res.code === 'Y') {
                this.$router.push({path: '/learnClass/' + this.id+ '/' + this.dataList.goodsNo})
              } else {
                this.message = res.msg;
                this.isShow = true
              }
            })
          } else {
            if (this.dataList.goodsNo === 'N000004') {
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
          if(is_WX()){
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
 						if (this.dataList.goodsNo === 'N000004') {
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
          }else {
            MessageBox({
              title: '温馨提示',
              message: '您还未登录,是否登录?',
              confirmButtonText:'立即登录',
              showCancelButton: true
            }).then(action => {
              if(action === 'confirm'){
                this.$router.push({path: '/login'})
              }
            });
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw/375;
  .classListImg {
    width: 375*@wu;
    height: auto;
    display: block;
  }

  .studyList {
    background-image: linear-gradient(-101deg, #FFC940 1%, #FFBD30 100%);
    border: none;
    width: 375*@wu;
    height: 55*@wu;
    font-size: 17*@wu;
    color: #FFFFFF;
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
  }

  .enterPeople {
    overflow: hidden;
    text-align: center;
    img {
      display: inline-block;
      vertical-align: middle;
    }
    img:nth-of-type(1) {
      height: 15*@wu;
      width: auto;
    }
    img:nth-of-type(2) {
      height: 15*@wu;
      width: auto;
    }
    span {
      display: inline-block;
      vertical-align: middle;
      margin-left: 5*@wu;
      font-weight: 600;
    }
  }
</style>
<style lang="less">
  @wu: 100vw/375;
  .comment {
    width: 100%;
    padding-bottom: 54*@wu;
    img {
      max-width: 100%;
    }
    video {
      width: 325*@wu;
      height: 190*@wu;
      border-radius: 7*@wu;
      display: block;
      margin: 0 auto;
      background-color: #707274;
    }
    p{
      padding: 0;
      margin: 0;
    }
  }
</style>
