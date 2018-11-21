<template>
  <div class="page">
    <div class="teacherInTitBox">
      <!--<div class="teacherInTit">福<br>道<br>主<br>讲<br>导<br>师<br>.<br>悟<br>道</div>-->
      <img :src="tutorData.cmsImg" class="teacherInImg">
    </div>
    <!--<div class="teacherInBox">
      <h2>悟道老师  介绍</h2>
      <!--<div class="teacherInEn">TEACHER INTRODUCTION</div>
      <div class="teacherInLine"></div>
      <div class="teacherInTest">一位普通的老百姓一位朴实的中国人
        <div>中华文化的传承者正确观念的疏导者</div>
      </div>
      <h2>悟道老师  格言</h2>
     
      <p>1. 贪图名利之人,最后必定被名利所困</p>
      <p>2. 人活一世,短短几十年,存于世间,留名于千古</p>
      <p>3. 非淡泊不能明志,非宁静不能致远</p>
      <p>4. 心善是最大的风水,一切美好的事情都是你那善良的心<br>&emsp;吸引过来的</p>
      <p>5. 每个人都有一双发现美的眼,却很少有人能够有一颗感<br>&emsp;受爱的心</p>
      <p>6. 修心不修性,到头没人性,修性不修心,到头没良心</p>
      <p>7. 性欲和食欲一样,都是人之天性,压迫欲望只会火上浇油</p>
      <p>8. 雨之大,不润无根之草,法之宽,不度无缘之人</p>
      <p>9. 信者医之,不信者不医</p>
      <p class="pLastChild">10. 信仰是指引你走向光明的道路,是每个人心中的指明灯</p>
      <!--<img src="../../../assets/img/userImg.png">
      <div class="endTest">一个平凡的中国人</div>-->
      <!--<div v-html="this.tutorData.comment"></div>
    </div>-->
  </div>
</template>

<script>
  import {tutor} from '@/api/index'
  export default {
    data() {
      return {
        tutorData: ''
      }
    },
    created(){
      tutor().then((res)=>{
        if(res.code === 'Y'){
          this.tutorData = res.data[0];
        }
      })
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  .teacherInTitBox {
    overflow: hidden;
    position: relative;
    .teacherInTit {
      position: absolute;
      top: 48*@wu;
      right: 20*@wu;
      z-index: 10;
      font-size: 12*@wu;
      color: #ffffff;
      line-height: 19*@wu;
      text-align: right;
    }
    .teacherInImg {
      width: 375*@wu;
      // height: 255*@wu;
      height: auto;
      display: block;
    }
  }

  .teacherInBox {
    background-color: #F5A623;
    padding: 5*@wu 20*@wu 25*@wu 30*@wu;
    color: #ffffff;
    h2 {
      padding: 0;
      margin: 0;
      font-size: 16*@wu;
      text-align: center;
      margin-bottom: 10*@wu;
    }
    .teacherInEn {
      font-size: 6*@wu;
      text-align: center;
    }
    .teacherInLine {
      width: 20*@wu;
      height: 1px;
      background-color: #ffffff;
      margin: 16*@wu auto 20*@wu auto;
    }
    .teacherInTest {
      text-align: center;
      font-size: 13*@wu;
      margin-bottom: 45*@wu;
      color: rgb(254,254,254);
      div {
        margin-top: 10*@wu;
      }
    }
    p {
      font-size: 13*@wu;
      margin: 0 0 10*@wu 0;
    }
    .pLastChild {
      margin-bottom: 12*@wu;
    }
    img {
      width: 59*@wu;
      height: 57*@wu;
      display: block;
      margin: 0 auto;
    }
    .endTest {
      font-size: 10*@wu;
      text-align: center;
      margin-top: 12*@wu;
    }
  }
</style>
