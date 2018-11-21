<template>
  <div class='page'>
    <img src="../../assets/img/ewmBj.jpg" id="ewmBj" style="display: none">
    <div class="topTit" v-if="canvasShow">
      长按图片保存到手机,分享给您的朋友
    </div>
    <div id="canvas" class="canvas" v-show="canvasShow">
      <img class="userImg" src="../../assets/img/userImg.png" v-if="!$store.getters.getUserInfo.wechatImg">
    </div>
    <img class="partnerShow" src="../../assets/img/partnerNo.png" v-if="partnerShow">
    <button class="goBindPhone" @click="bindFun()" v-if="partnerShow">立即验证手机号</button>
  </div>
</template>

<script>
  import {toShareCode,imageBase64} from '@/api/index'
  import {Indicator, MessageBox} from 'mint-ui';
  import {is_WX} from '@/tools/tools'
  import QRCode from 'qrcodejs2'

  export default {
    data() {
      return {
        codeUrl: '',
        canvasShow: false,
        partnerShow: false,
        isDrawCanvas: false
      }
    },
    mounted() {
      document.title = '推广二维码';
      this.$nextTick(() => {
        if (this.$store.getters.getToken && this.$store.getters.getToken !== 'userId') {
          if (typeof this.$store.getters.getUserInfo.userLevel === 'undefined') {
            setTimeout(() => {
              // 获取64位编码头像
              if(this.$store.getters.getUserInfo.wechatImg){
                imageBase64({url: this.$store.getters.getUserInfo.wechatImg}).then((res)=>{
                  this.shareCodeFun(res.data);
                });
              }else {
                this.shareCodeFun();
              }
            }, 1000)
          } else {
            // 获取64位编码头像
            if(this.$store.getters.getUserInfo.wechatImg){
              imageBase64({url: this.$store.getters.getUserInfo.wechatImg}).then((res)=>{
                this.shareCodeFun(res.data);
              });
            }else {
              this.shareCodeFun();
            }
          }
        } else {
          if(is_WX()){
            this.partnerShow = true;
          }else {
            MessageBox({
              title: '温馨提示',
              message: '您还未登录，请登录',
              confirmButtonText: '登录',
              showCancelButton: true
            }).then(action => {
              this.$router.push({path: '/login'})
            });
          }
        }
      })
    },
    methods: {
      // 验证手机号
      bindFun(){
        this.$router.push({path: '/bindWx'})
      },
      shareCodeFun(userImg) {
        Indicator.open({
          text: '',
          spinnerType: 'fading-circle'
        });
        toShareCode({userId: this.$store.getters.getUserInfo.id}).then((res) => {
          if (res.code === 'Y') {
            imageBase64({url: res.data}).then((res)=>{
              this.drawCanvas(res.data,userImg);
            })
          }
        })
      },
      drawCanvas(url,userImg) {
        let that = this;
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');
        let ewmBj = document.getElementById("ewmBj");
        if (ewmBj.complete) {
          drawFun();
        } else {
          ewmBj.onload = function () {
            drawFun();
          }
        }
        function drawFun() {
          // 画背景
          canvas.width = ewmBj.width;
          canvas.height = ewmBj.height;
          context.drawImage(ewmBj, 0, 0, canvas.width, canvas.height);
          let ewmImg = new Image();
          ewmImg.src = "data:image/png;base64," + url;
          ewmImg.onload = function () {
            context.drawImage(ewmImg, 223, 645, 180, 180);
            context.font = "18px '微软雅黑'";
            context.fillText("我是福道文化传播推广大使", 204, 640);
            // 填充名字
            let test = !!that.$store.getters.getUserInfo.name ? that.$store.getters.getUserInfo.name : !!that.$store.getters.getUserInfo.wechatName ? that.$store.getters.getUserInfo.wechatName : !!that.$store.getters.getUserInfo.userMobile?that.$store.getters.getUserInfo.userMobile:'福道学友';
           context.fillText("我是"+test, 204, 615);
           	//填充推荐人ID
           	let ID=that.$store.getters.getUserInfo.id;
           	context.fillText("推荐码:"+ID, 204, 590);
            // 画头像
            let userImage = new Image();
            if(userImg){
              userImage.src = "data:image/png;base64," + userImg;
              userImage.onload = function () {
                context.drawImage(userImage, 150, 585, 44, 44);
                // canvas转为64位编码图片
                let newImg = document.createElement('img');
                newImg.src = canvas.toDataURL("image/jpg");
                newImg.setAttribute('class', 'newImg');
                document.getElementById('canvas').appendChild(newImg);
                that.canvasShow = true;
                Indicator.close();
              }
            }else {
              let newImg = document.createElement('img');
              newImg.src = canvas.toDataURL("image/jpg");
              newImg.setAttribute('class', 'newImg');
              document.getElementById('canvas').appendChild(newImg);
              that.canvasShow = true;
              Indicator.close();
            }
          };
        }
      }
    },
    destroyed(){
      Indicator.close();
    }
  }
</script>

<style lang="less">
  @wu: 100vw / 375;
  .topTit {
    font-size: 15*@wu;
    color: #979797;
    height: 50*@wu;
    line-height: 50*@wu;
    text-align: center;
  }

  .canvas {
    width: 295*@wu;
    height: 474*@wu;
    margin: 5*@wu 0 0 40*@wu;
    box-shadow: 0 0 10*@wu 3*@wu #cccccc;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .userImg {
      position: absolute;
      width: 22*@wu;
      height: 22*@wu;
      top: 285*@wu;
      left: 74*@wu;
    }
  }

  .partnerShow {
    width: 100%;
    height: auto;
    display: block;
  }
  .goBindPhone{
    position: absolute;
    z-index: 200;
    top: 295*@wu;
    left: 135*@wu;
    background-color: #ff0000;
    color: #ffffff;
    border: none;
    padding: 3*@wu 5*@wu;
    font-size: 14*@wu;
    border-radius: 5*@wu;
    font-weight: 600;
  }
</style>
