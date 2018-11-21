<template>
  <div class='page pageColor'>
    <div class="topDistance"></div>
    <div class="inviteCodeHistoryBox"
       v-infinite-scroll="loadMore"
       infinite-scroll-distance="10"
       infinite-scroll-immediate-check='true'
    >
      <div class="inviteCodeHistory" v-for="item in inviteCodeData">
        <div class="left">
          <div>微信: {{item.wechatName}}</div>
          <div>邀请码: {{item.couponCode}}</div>
          <div>使用日期: {{item.useTime}}</div>
          <div>截止时间: {{item.endTime}}</div>
        </div>
        <div class="right">
          <img :src="item.wechatImg" v-if="item.isWechatImg">
          <img src="../../../assets/img/userImg.png" v-else>
        </div>
      </div>
      <div class="moreClass" v-if="inviteCodeData.length > 10">
        <img src="../../../assets/img/more.gif" v-if="loading">
        <span v-if="!loading && pageNum === pages">没有更多了...</span>
      </div>
    </div>
    <img class="noData" src="../../../assets/img/noData.png" v-if="inviteCodeData.length===0">
  </div>
</template>

<script>
  import {couponList} from '@/api/index'

  export default {
    data() {
      return {
        inviteCodeData: [],
        loading: false,
        pageNum: 1,
        pageSize: 10,
        pages: 1,
        total: 0
      }
    },
    mounted() {
      this.queryData();
    },
    methods: {
      // 下拉加载
      loadMore() {
        if(this.pageNum < this.pages ){
          this.pageNum++;
          this.queryData();
        }
      },
      // 列表查询
      queryData(){
        let query = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        };
        this.loading = true;
        couponList(query).then((res) => {
          this.loading = false;
          if(res.code==="Y"){
            let dataS = res.data.list || [];
            dataS.forEach((item)=>{
              if(!item.wechatImg){
                item.isWechatImg = false;
              }else {
                item.isWechatImg = true;
              }
            });
            this.inviteCodeData = this.inviteCodeData.concat(dataS);
            this.total = res.data.total;
            this.pages = res.data.pages;
          }
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw/375;
  .inviteCodeHistoryBox {
    background-color: #ffffff;
    overflow: hidden;
  }

  .inviteCodeHistory {
    height: 120*@wu;
    box-sizing: border-box;
    margin-left: 10*@wu;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #F1F1F1;
    padding-top: 10*@wu;
    .left {
      width: 305*@wu;
      div {
        font-size: 12*@wu;
        color: #646363;
        margin-bottom: 7*@wu;
      }
      div:nth-of-type(1) {
        font-size: 14*@wu;
        color: #262525;
        margin-bottom: 10*@wu;
      }
    }
    .right {
      width: 60*@wu;
      img {
        width: 35*@wu;
        height: 35*@wu;
      }
    }
  }

  .inviteCodeHistory:last-child {
    border-bottom: none;
  }
</style>
