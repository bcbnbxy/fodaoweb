<template>
  <div id="page" class="page">
    <img :src="dataList.goodsLink" class="classListImg">
    <div class="buyNumbers">
      &emsp;&emsp;<img src="../../../assets/img/hot.png"/>&nbsp;
      {{dataList.viewNum}}&nbsp;人已参与
    </div>
    <div class="comment" v-html="dataList.comment"></div>
    <img id="androidImg" width="100%" :style="{height: imgShow?'40px':'1000px'}">
    <button class="studyList" @click="toStudy()" v-if="isStudy">{{ isStudy }}</button> <!--&& windowApp!==1-->
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

        imgShow: false,
        pageObject:''
      }
    },
    created() {
      let that = this;
      goodsDetail({goodsId: this.id}).then((res) => {
        if (res.code === 'Y') {
        	//console.log(res.data);
          this.dataList = res.data;
          this.queryBuy = true;
          let imgs = new Image();
          imgs.setAttribute('class','classListImg');
          imgs.src = res.data.goodsLink;
          if(imgs.complete){
            this.imgShow = true;
          }else {
            imgs.onload = function () {
              that.imgShow = true;
            }
          }
        }
      })
    },
    watch: {
      'queryBuy': 'queryBuyFun'
    },
    mounted() {
      document.title = '课程介绍';
      this.pageObject = document.getElementById('page');
    },
    methods: {
      isShowFun() {
        this.isShow = false;
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
    background-color: #f92f77;
    border: none;
    width: 375*@wu;
    height: 48*@wu;
    font-size: 17*@wu;
    color: #FFFFFF;
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
  }
  .buyNumbers{
    height: 44*@wu;
    background-color: #e92675;
    color: #ffffff;
    font-size: 14*@wu;
    display: flex;
    align-items: center;
    img{
      width: 15*@wu;
      height: auto;
    }
  }
</style>
<style lang="less">
  @wu: 100vw/375;
  .comment {
    width: 100%;
    padding-bottom:0;
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
