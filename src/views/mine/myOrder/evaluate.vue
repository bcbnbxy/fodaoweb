<template>
  <div class='page'>
    <div class="evaluateBox">
      <div class="top">
        <img :src="imgUrl">
        <div class="scoreBox">
          <div>评分：</div>
          <div>
            <template v-for="(item,index) in starList">
              <img src="../../../assets/img/starActive.png" @click="starFun(index)" v-if="item.isStar">
              <img src="../../../assets/img/star.png" @click="starFun(index)" v-if="!item.isStar">
            </template>
          </div>
        </div>
      </div>
      <div class="enterTestBox">
        <textarea v-model="evaluateTest" placeholder="写下购买体会和使用感受来帮助其他小伙伴吧"></textarea>
        <span>{{evaluateTest.length}}/300</span>
      </div>
      <ul class="evaluateImg">
        <li class="imgLi" v-for="(item,index) in evaluateImgList">
          <img :src="item"/>
          <img src="../../../assets/img/close.png" class="closeImg" @click="removeImg(index)">
        </li>
        <li class="addLi" v-if="evaluateImgList.length < 5">
          <img src="../../../assets/img/canma.png">
          添加图片
          <upload-img :maxSize="2" :className="'upeValuateImg'" @uploadImgFun="uploadImgFun"></upload-img>
        </li>
      </ul>
      <button class="evaluateBtn" @click="submitEvaluate()" v-if="isEnter">提交</button>

      <alert-box :message="message" @isShow="isShowFun" v-if="isShow"></alert-box>
    </div>
  </div>
</template>

<script>
  import uploadImg from '@/components/uploadImg'
  import {commentOrder} from '@/api/index'

  export default {
    components: {
      uploadImg
    },
    data() {
      return {
        // 订单评价图片
        imgUrl: decodeURIComponent(this.$route.params.imgUrl),
        // 评价内容
        evaluateTest: '',
        // 选择的星星
        starList: [{isStar: false}, {isStar: false}, {isStar: false}, {isStar: false}, {isStar: false}],
        // 评价图片
        evaluateImgList: [],

        message: '',
        isShow: false,

        isEnter: true
      }
    },
    watch: {
      'evaluateTest': 'evaluateTestFun'
    },
    mounted() {
      document.title = '评价晒单'
    },
    methods: {
      // 删除评价图片
      removeImg(index) {
        this.evaluateImgList.splice(index, 1)
      },
      // 上传评价图片
      uploadImgFun(url) {
        this.evaluateImgList.push(url);
      },
      // 内容监控
      evaluateTestFun() {
        if (this.evaluateTest.length > 300) {
          this.evaluateTest = this.evaluateTest.substring(0, 300);
        }
      },
      // 选择星星
      starFun(val) {
        this.starList.forEach((item, index) => {
          if (index <= val) {
            item.isStar = true;
          } else {
            item.isStar = false;
          }
        })
      },
      submitEvaluate() {
        let star = '';
        this.starList.forEach((item, index) => {
          if(item.isStar){
            star = index + 1;
          }
        });
        if(!star){
          this.message = '请选择星星';
          this.isShow = true;
          return false;
        }
        if(!this.evaluateTest){
          this.message = '评论不能为空';
          this.isShow = true;
          return false;
        }
        commentOrder({orderNo: this.$route.params.orderNum,orderStar: star,comment: this.evaluateTest,commentPic: this.evaluateImgList.join(',')}).then((res)=>{
          if(res.code === "Y"){
            this.message = '评论成功';
            this.isShow = true;
            setTimeout(()=>{
              this.$router.go(-1);
            })
          }else {
            this.message = res.msg;
            this.isShow = true;
          }
        })
      },
      // 关闭弹框
      isShowFun() {
        this.isShow = false;
      },
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  .evaluateBox {
    margin: 24*@wu 10*@wu;
    .top {
      overflow: hidden;
      margin-bottom: 23*@wu;
      & > img {
        width: 93*@wu;
        height: 63*@wu;
        display: inline-block;
        margin-right: 14*@wu;
        vertical-align: top;
      }
      .scoreBox {
        display: inline-block;
        vertical-align: top;
        div:nth-of-type(1) {
          font-size: 15*@wu;
          color: #262525;
          margin: 5*@wu 0 8*@wu 0;
        }
        div:nth-of-type(2) {
          overflow: hidden;
          img {
            width: 21*@wu;
            height: 21*@wu;
            margin-right: 5*@wu;
          }
        }
      }
    }
    .enterTestBox {
      width: 355*@wu;
      height: 125*@wu;
      overflow: hidden;
      position: relative;
      border: 1px solid #CDCDCD;
      padding: 10*@wu 15*@wu;
      box-sizing: border-box;
      margin-bottom: 12*@wu;
      textarea {
        width: 325*@wu;
        height: 95*@wu;
        resize: none;
        border-radius: 1px;
        outline: none;
        border: none;
        background-color: transparent;
      }
      span {
        color: rgb(180, 176, 176);
        position: absolute;
        bottom: 0;
        right: 15*@wu;
        font-size: 12*@wu;
      }
    }
    .evaluateImg {
      list-style: none;
      padding: 0;
      margin: 0;
      height: 200*@wu;
      li {
        width: 78*@wu;
        height: 78*@wu;
        display: inline-block;
        margin-right: 12*@wu;
        position: relative;
        overflow: hidden;
      }
      .imgLi {
        img {
          width: 78*@wu;
          height: 78*@wu;
          vertical-align: top;
        }
        .closeImg {
          position: absolute;
          width: 14*@wu;
          height: 14*@wu;
          top: 0;
          right: 0;
          border-radius: 50%;
          background-color: #ffffff;
          padding: 2*@wu;
          border: 1px solid #cccccc;
        }
      }
      li:nth-of-type(4n) {
        margin-right: 0;
      }
      .addLi {
        border: 1px dashed #CDCDCD;
        box-sizing: border-box;
        text-align: center;
        font-size: 12*@wu;
        color: rgb(180, 176, 176);
        img {
          width: 43*@wu;
          height: 31*@wu;
          display: block;
          margin: 15*@wu auto 6*@wu auto;
        }
      }
    }
  }

  .evaluateBtn {
    background-image: linear-gradient(-101deg, #FFC940 1%, #FFBD30 100%);
    border-radius: 7*@wu;
    font-size: 16*@wu;
    color: #FFFFFF;
    width: 345*@wu;
    height: 42*@wu;
    border: none;
    outline: none;
    margin-top: 40*@wu;
  }
</style>
<style lang="less">
  @wu: 100vw / 375;
  .upeValuateImg {
    position: absolute;
    top: 0;
    right: 0;
    width: 78*@wu !important;
    height: 78*@wu;
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
