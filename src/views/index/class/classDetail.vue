<template>
  <!--<div class="page">
    &lt;!&ndash;<div class="topDistance"></div>&ndash;&gt;
    <img class="detailBigImg" :src="booksData.goodsImg">
    <div class="detailTitBox">
      <div class="top">{{booksData.goodsName}}</div>
      <div class="center"><img src="../../../assets/img/hot.png"><span>{{booksData.viewNum}}人已购买</span></div>
      <div class="bottom">
        <span>¥{{booksData.unitPrice}}</span><i>¥{{booksData.marketPrice}}</i>
      </div>
    </div>
    <div class="detailTit">
      <span>书籍详情</span>
    </div>
    <div class="bookDetail" v-html="booksData.comment"></div>
    &lt;!&ndash;<div class="detailSay">
      <div><span>书名</span><i>幸福之道</i></div>
      <div><span>ISBN</span><i>幸福之道</i></div>
      <div><span>出版社</span><i>幸福之道</i></div>
      <div><span>出版时间</span><i>幸福之道</i></div>
      <div><span>印刷时间</span><i>幸福之道</i></div>
      <div><span>版次</span><i>幸福之道</i></div>
      <div><span>开本</span><i>幸福之道</i></div>
      <div><span>纸张</span><i>幸福之道</i></div>
    </div>
    <div class="line" style="height: 2px"></div>
    <div class="detailBottom">
      <h4>
        [目录简介]
      </h4>
      <p>幸福之道第一课《性思维体系》</p>
      <p>幸福之道第二课《性知识概论》</p>
      <p>幸福之道第三课《性方法实战》</p>
      <p>幸福之道第四课《性问题总结》</p>
    </div>
    <div class="line"></div>
    <div class="detailBottom">
      <h4>
        [图文详情]<span>点击图片可放大</span>
      </h4>
      <img :class="{scaleBig: isBig}" src="../../../assets/img/learnClass/backImg.png" @click="scaleFun()">
    </div>&ndash;&gt;
    <button class="buyNow" @click="toBuy()">立即购买</button>
  </div>-->
  <div class="page yuSale">
    <!--<img src="http://p8i1x61e3.bkt.clouddn.com/d7e8cc2f83238309a6e75fbe8ab8d8ce">
    <h4>《性福之道》</h4>
    <p>作者: 悟道</p>
    <h5>预售价: 2980</h5>
    <div class="yuTitle">感谢, 85万福道书友们，对课程的关切，认可，喜爱， 悟道老师毕生心血打造出来的课程，一定不负众望，请耐心等待!</div>
    <div class="yuBtn">预计7月30日上架</div>
    <div class="detailBottom">
      <h4>
        [目录简介]
      </h4>
      <p>幸福之道第一课《性思维体系》</p>
      <p>幸福之道第二课《性知识概论》</p>
      <p>幸福之道第三课《性方法实战》</p>
      <p>幸福之道第四课《性问题总结》</p>
    </div>-->
    <img src="../../../assets/img/books_detail.png"/>
  </div>
</template>

<script>
  import {booksList} from '@/api/index'
  export default {
    data() {
      return {
        isBig: false,
        booksData: {},
      }
    },
    mounted(){
      // this.queryBooksList();
    },
    methods:{
      // 书籍列表
//    queryBooksList(){
//      booksList().then((res)=>{
//        if (res.code === 'Y'){
//          this.booksData = res.data[0];
//        }
//      })
//    },
//    toBuy(){
//      sessionStorage.setItem('booksObj', JSON.stringify(this.booksData));
//      this.$router.push({path:'/confirmOrder'})
//    }
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
 
  
  .detailBigImg {
    width: 375*@wu;
    height: 257*@wu;
    border-bottom: 2*@wu solid #ececec;
  }
  .detailTitBox {
    padding: 9*@wu 14*@wu 17*@wu 14*@wu;
    .top {
      font-size: 14*@wu;
      color: #474545;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .center {
      img {
        width: 10*@wu;
        height: 11*@wu;
        vertical-align: middle;
        margin-right: 5*@wu;
      }
      span {
        font-size: 11*@wu;
        color: #777776;
      }
    }
    .bottom {
      span {
        font-size: 15*@wu;
        color: #ED362C;
        margin-right: 9*@wu
      }
      i {
        font-size: 13*@wu;
        color: #C5C5C5;
        text-decoration: line-through;
        font-style: inherit;
      }
    }
  }

  .detailTit {
    height: 38*@wu;
    background-color: #F4F4F4;
    line-height: 38*@wu;
    text-align: center;
    span {
      font-size: 12*@wu;
      color: #979696;
      letter-spacing: 1.63*@wu;
      position: relative;
      &:before {
        content: '';
        width: 56*@wu;
        height: 2*@wu;
        background-color: rgb(231, 231, 231);
        position: absolute;
        left: -64*@wu;
        top: 6*@wu;
      }
      &:after {
        content: '';
        width: 56*@wu;
        height: 2*@wu;
        background-color: rgb(231, 231, 231);
        position: absolute;
        right: -64*@wu;
        top: 6*@wu;
      }
    }
  }

  .detailSay {
    padding: 28*@wu;
    div {
      margin-bottom: 15*@wu;
      span {
        font-size: 12*@wu;
        color: #979696;
        display: inline-block;
        margin-right: 16*@wu;
        width: 60*@wu;
      }
      i {
        font-size: 12*@wu;
        color: #4A4A4A;
        font-style: inherit;
      }
    }
    div:last-child {
      margin-bottom: 0;
    }
  }

  .detailBottom {
    padding: 0 27*@wu 69*@wu 27*@wu;
    font-size: 12*@wu;
    color: #4A4A4A;
    text-align: center;
    margin-top: 25*@wu;
    h4 {
      font-weight: 400;
      margin-bottom: 12*@wu;
      text-align: center;
      span {
        font-size: 11*@wu;
        color: #A0A0A0;
        margin-left: 3*@wu;
      }
    }
    img {
      width: 100%;
    }
    .scaleBig{
      transform: scale(3);
    }
  }
  .buyNow{
    position: fixed;
    bottom:0;
    left: 0;
    width: 375*@wu;
    height: 55*@wu;
    background-image: linear-gradient(-101deg, #FFC940 1%, #FFBD30 100%);
    color: #ffffff;
    border:none;
    // border-top:5*@wu solid rgb(245,245,245) ;
    outline: none;
    font-size: 16*@wu;
  }
  // 预算
  .yuSale{
    & > img{

    }
    &>p{
      margin: 0;
      text-align: center;
      font-size: 10*@wu;
      margin-bottom: 5*@wu;
    }
    h4,h5{
      text-align: center;
      margin: 0;
    }
    h5{
      font-weight: 200;
    }
    .yuTitle{
      text-indent: 2em;
      font-size: 15*@wu;
      color: #D0021B;
      padding: 10*@wu 20*@wu 28*@wu 20*@wu;
    }
    .yuBtn{
      width: 297*@wu;
      height: 43*@wu;
      background-color:  #F5A623;
      margin-left: 37*@wu;
      text-align: center;
      line-height: 43*@wu;
      font-size: 15*@wu;
      color: #FFFFFF;
      box-shadow: 15px 8px 0 0 #F1F1F1;
    }
  }

</style>
<style lang="less">
  @wu: 100vw / 375;
  .bookDetail{
    width: 100%;
    overflow: hidden;
    padding-bottom: 36*@wu;
    img{
      max-width: 100%;
    }
  }
  .yuSale{
  	img{
  	width: 100%;
  	height: 100%;
  	}
  }
</style>
