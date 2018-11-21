<template>
  <div class='page'>
    <div class="teacherInTitBox">
      <!--<div class="teacherInTit">福<br>道<br>主<br>讲<br>导<br>师<br>.<br>悟<br>道</div>-->
      <img :src="tutorData[0].comment" class="teacherInImg" v-if="tutorData[0]">
    </div>
    <div class="industryList" v-for="item in tutorData" @click="goIndustryDetail(item.cmsLink)">
      <div><span>{{item.cmsTitle}}</span></div>
      <img :src="item.cmsImg">
    </div>
  </div>
</template>

<script>
  import {industry} from '@/api/index'
  export default {
    data() {
      return {
        tutorData: ''
      }
    },
    created(){
      industry().then((res)=>{
        if(res.code === 'Y'){
          this.tutorData = res.data;
        }
      })
    },
    methods:{
      goIndustryDetail(link){
        window.location.href = link;
      }
    }
  }
</script>

<style lang="less" scoped>
  @wu:100vw / 375;
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
  .industryList{
    display: flex;
    padding: 0 18*@wu;
    overflow: hidden;
    align-items: center;
    justify-items: center;
    div{
      width: 270*@wu;
      height: 56*@wu;
      padding: 10*@wu 0;
      border-bottom:1px solid #F1F1F1;
      font-size: 14*@wu;
      display: flex;
      align-items: center;
      justify-items: center;
    }
    img{
      width: 72*@wu;
      height: 56*@wu;
    }
  }
</style>
