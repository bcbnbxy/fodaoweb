<template>
  <div class='page'>
    <div class="proRanking">
      <ul>
        <li>
          <div>我的排名:</div>
          <div>第{{userRank?userRank.rowId?userRank.rowId:0:0}}名</div>
        </li>
        <li>
          <div>提现佣金:</div>
          <div>{{userRank?userRank.capitalTol?userRank.capitalTol:'0.00':'0.00'}}元</div>
        </li>
      </ul>
      <img :src="$store.getters.getUserInfo.wechatImg" v-if="$store.getters.getUserInfo.wechatImg">
      <img src="../../assets/img/userImg.png" v-else>
      <div class="verticalLine"></div>
    </div>
    <div class="rankListBox">
      <ul>
        <li v-for="(item,index) in rankDatas.rankingList">
          <div>
            <img src="../../assets/img/promoCom/first.png" v-if="index === 0">
            <img src="../../assets/img/promoCom/second.png" v-else-if="index===1">
            <img src="../../assets/img/promoCom/third.png" v-else-if="index===2">
            <span v-else>{{index+1}}</span>
          </div>
          <img :src="item.wechatImg" v-if="item.wechatImg">
          <img src="../../assets/img/userImg.png" v-else>
          <div>{{item.name}}</div>
          <div>{{item.capitalTol?item.capitalTol:'0.00'}}元</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {commissionRanking} from '@/api/index'
  export default {
    data() {
      return {
        rankData: [],
        rankDatas: {},
        userRank: ''
      }
    },
    mounted() {
      document.title = "佣金排名";
      commissionRanking().then( (res) => {
        // console.log(res)
        if(res.code === 'Y'){
          this.rankDatas = res.data;
          this.userRank = res.data.currRankingObj;
        }
      })
    },
    methods: {}
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  .proRanking {
    background: #FFFEFC;
    box-shadow: 0 2*@wu 8*@wu 0 rgba(206, 206, 206, 0.50);
    border-radius: 7*@wu;
    width: 316*@wu;
    height: 80*@wu;
    margin: 45*@wu auto 34*@wu auto;
    position: relative;
    ul {
      list-style: none;
      padding: 17*@wu 0;
      margin: 0;
      overflow: hidden;
      li {
        float: left;
        text-align: center;
        width: 50%;
        div:nth-of-type(1) {
          font-size: 11*@wu;
          color: #474545;
          margin-bottom: 1*@wu;
        }
        div:nth-of-type(2) {
          font-size: 17*@wu;
          color: #001313;
        }
      }
    }
    img {
      width: 50*@wu;
      height: 50*@wu;
      border-radius: 50%;
      position: absolute;
      top: -25*@wu;
      left: 130*@wu;
    }
    .verticalLine {
      width: 2*@wu;
      height: 24*@wu;
      position: absolute;
      top: 25*@wu;
      left: 154*@wu;
      background-color: rgb(250, 252, 248);
    }
  }

  .rankListBox {
    background-color: #F1B402;
    padding: 0 15*@wu;
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      li {
        border-bottom: 1px solid rgba(255, 255, 255, 0.20);
        height: 70*@wu;
        line-height: 70*@wu;
        div {
          display: inline-block;
          vertical-align: middle;
          color: rgba(255, 255, 255, 0.9);
        }
        div:nth-of-type(1) {
          width: 33*@wu;
          text-align: center;
          font-size: 22*@wu;
          img {
            width: 33*@wu;
            height: auto;
            display: inline-block;
            vertical-align: middle;
          }
        }
        & > img {
          width: 40*@wu;
          height: 40*@wu;
          border-radius: 50%;
          vertical-align: middle;
          display: inline-block;
          margin: 0 10*@wu 0 5*@wu;
        }
        div:nth-of-type(2) {
          width: 120*@wu;
          font-size: 13*@wu;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        div:nth-of-type(3) {
          width: 120*@wu;
          text-align: right;
          font-size: 14*@wu;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      li:last-child {
        border-bottom: none;
      }
    }
  }
</style>
