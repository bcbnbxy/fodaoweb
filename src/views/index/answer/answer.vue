<template>
  <div class='page'>
    <img class="answerImg" :src="answerList[0].goodsImg" v-if="answerList[0]">
    <div class="answerIntro">
      本平台研究世界古老文化,具有最专业的服务,具有权威性的解答,一定可以让您在此得到最满意的答复!
    </div>
    <div class="answerBox">
      <div @click="lookDetail(item)" v-for="item in answerList">
        <img src="../../../assets/img/answerImgW.png">
        <span>{{item.goodsName}}</span>
        <img src="../../../assets/img/next.png">
      </div>
    </div>
  </div>
</template>

<script>
  import {answer} from '@/api/index'
  export default {
    data() {
      return {
        answerList: []
      }
    },
    created(){
      this.queryAnswer();
    },
    mounted(){
      document.title = '权威解答'
    },
    methods:{
      // 查询数据
      queryAnswer(){
        answer().then((res)=>{
          // console.log(res)
          if (res.code === 'Y'){
            this.answerList = res.data;
          }
        })
      },
      lookDetail(item){
        item.goodsImg = this.answerList[0].goodsImg;
        sessionStorage.setItem('answer',JSON.stringify(item));
        this.$router.push({path: '/answerDetail'})
      }
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  .answerImg {
    width: 375*@wu;
    height: 245*@wu;
    display: block;
  }

  .answerIntro {
    height: 40*@wu;
    padding: 15*@wu 30*@wu;
    background-color: rgb(195, 195, 195);
    font-size: 13*@wu;
    color: #FAFAFA;
    letter-spacing: -0.27*@wu;
    line-height: 19*@wu;
  }

  .answerBox {
    padding: 5*@wu 15*@wu 10*@wu 15*@wu;
    div {
      height: 50*@wu;
      line-height: 50*@wu;
      border-bottom: 1px solid rgb(241,241,241);
      display: flex;
      justify-items: center;
      align-items: center;
      img:first-child {
        width: 20*@wu;
        height: 20*@wu;
        display: block;
        vertical-align: middle;
      }
      img:last-child{
        width: 5*@wu;
        height: 10*@wu;
        display: block;
        vertical-align: middle;
      }
      span{
        width: 320*@wu;
        vertical-align: middle;
        display: block;
        font-size: 14*@wu;
        color: #3B3A3A;
        text-indent: 10*@wu;
      }
    }
    /*div:last-child{
      border-bottom:none
    }*/
  }
</style>
