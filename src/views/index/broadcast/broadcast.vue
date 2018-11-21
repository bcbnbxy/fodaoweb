<template>
  <div class='page'>
    <img class="broadcast" :src="broadcastData[0].goodsImg" @click="goOnlinePlay(broadcastData[0].goodsLink)">
    <div class="broadcastTitle">精彩推荐</div>
    <div class="broadcastContent">
      <div class="broadcastBox" v-for="(item,index) in broadcastData" v-if="index!==0" @click="goOnlinePlay(item.goodsLink)">
        <img :src="item.goodsImg">
        <div>{{item.goodsName}}</div>
        <span>{{item.viewNum}}人已观看</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {onlinePlay} from '@/api/index'
  export default {
    data() {
      return {
        broadcastData:[
          {
            goodsImg: '',
            goodsLink: '',
            goodsName: '',
            viewNum: ''
          }
        ]
      }
    },
    created() {
      onlinePlay().then((res)=>{
        this.broadcastData = res.data;
      })
    },
    methods: {
      goOnlinePlay(link){
        window.location.href= link;
      }
    }
  }
</script>

<style lang="less" scoped>
  @wu:100vw / 375;
  .broadcast{
    width: 100%;
    height: 174*@wu;
    display: block;
  }
  .broadcastTitle{
    font-size: 16px;
    color: #262525;
    border-bottom: 1px solid rgb(234,234,234);
    padding: 15*@wu 0 5*@wu 13*@wu;
  }
  .broadcastContent{
    padding: 19*@wu 10*@wu;
    .broadcastBox{
      width: 170*@wu;
      overflow: hidden;
      float: left;
      margin-bottom: 10*@wu;
      img{
        display: block;
        width: 170*@wu;
        height: 108*@wu;
        border-radius: 5*@wu;
      }
      div{
        font-size: 13*@wu;
        color: #474545;
        margin: 8*@wu 0 3*@wu 0;
        padding-left: 2*@wu;
        box-sizing: border-box;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      span{
        font-size: 9*@wu;
        color: rgb(199,199,199);
        padding-left: 2*@wu;
        box-sizing: border-box;
        display: block;
      }
    }
    .broadcastBox:nth-of-type(2n-1){
      margin-right: 15*@wu;
    }
  }
</style>
