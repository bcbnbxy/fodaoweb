<template>
  <div class='page pageColor'>
    <div class="classmateListTit">
      关注总人数：({{total}})
      <img src="../../assets/img/search.png" @click="goSearch()">
    </div>
    <ul class="classmateList"
        v-infinite-scroll="loadMore"
        infinite-scroll-distance="10"
        infinite-scroll-immediate-check='true'
    >
      <li v-for="item in listData">
        <img :src="item.headimgurl" v-if="item.headimgurl">
        <img src="../../assets/img/userImg.png" v-else>
        <div>
          <span>微信名:{{item.nickname?item.nickname:'无'}}</span>
          <span>关注时间: {{item.createTime}}</span>
        </div>
      </li>
      <div class="moreClass" v-if="listData.length > 10">
        <img src="../../assets/img/more.gif" v-if="loading">
        <span v-if="!loading && pageNum === pages">没有更多了...</span>
      </div>
      <img class="noData" src="../../assets/img/noData.png" v-if="listData.length===0">
    </ul>
  </div>
</template>

<script>
  import { InfiniteScroll } from 'mint-ui';
  import  { followStudentApi } from '@/api/index'
  export default {
    data() {
      return {
        loading: false,
        total: 0,
        listData: [],

        pageNum:1,
        pageSize: 10,
        pages:1
      }
    },
    mounted() {
      document.title = "关注学员";
      this.queryData();
    },
    methods: {
      // 搜索关注学员路由
      goSearch(){
        this.$router.push({path: '/searchFollowClass'})
      },
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
        followStudentApi(query).then((res) => {
          this.loading = false;
          if(res.code==="Y" && !!res.data){
            let dataS = res.data.list || [];
            dataS.forEach((item)=>{
              if(!item.wechatImg){
                item.isWechatImg = false
              }else {
                item.isWechatImg = true
              }
            });
            this.listData = this.listData.concat(dataS);
            this.total = res.data.total;
            this.pages = res.data.pages;
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw/375;
  .classmateListTit {
    height: 50*@wu;
    background-color: #ffffff;
    font-size: 15*@wu;
    color: #262525;
    line-height: 50*@wu;
    text-indent: 20*@wu;
    margin: 4*@wu 0 1px 0;
    position: relative;
    img{
      position: absolute;
      top: 16*@wu;
      right: 20*@wu;
      width: 19*@wu;
      height: auto;
    }
  }
  .classmateList{
    list-style: none;
    margin: 0;
    padding: 0;
    height: calc(100% - 38*@wu);
    overflow: auto;
    li{
      border-bottom: 1px solid #f1f1f1;
      height: 85*@wu;
      display: flex;
      align-items: center;
      background-color: #ffffff;
      padding-left: 10*@wu;
      box-sizing: border-box;
      img{
        width: 52*@wu;
        height: 52*@wu;
        border-radius: 50%;
      }
      div{
        padding-left: 10*@wu;
        span{
          display: block;
        }
        span:nth-of-type(1){
          font-size: 13*@wu;
          color: #262525;
          margin-bottom: 4*@wu;
        }
        span:nth-of-type(2){
          font-size: 13*@wu;
          color: #262525;
          margin-bottom: 4*@wu;
        }
        span:nth-of-type(3){
          font-size: 9*@wu;
          color: #C3C3C3;
        }
      }
    }
    li:last-child{
      border-bottom: none;
    }
  }
</style>
