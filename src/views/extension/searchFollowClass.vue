<template>
  <div class='page pageColor'>
    <div class="searchBox">
      <span>微信名称</span>
      <input type="text" v-model="inputVal" placeholder="找寻好友">
      <img src="../../assets/img/search.png" @click="searchClass()">
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
          <span>微信名:{{item.nickname}}</span>
          <span>关注时间 {{ item.createTime }}</span>
        </div>
      </li>
      <div class="moreClass" v-if="listData.length > 10">
        <img src="../../assets/img/more.gif" v-if="loading">
        <span v-if="!loading && pageNum === pages">没有更多了...</span>
      </div>

      <img class="noData" src="../../assets/img/noData.png" v-if="listData.length===0">
    </ul>

    <alert-box :message="message" @isShow="isShowFun" v-if="isShow" :warningImg="1"></alert-box>
  </div>
</template>

<script>
  import { searchFollowClassFun } from '@/api/index'
  import { InfiniteScroll,Indicator } from 'mint-ui';
  export default {
    data() {
      return {
        id: this.$route.params.id,
        inputVal: '',
        loading: false,
        listData: [],

        pageNum:1,
        pageSize: 10,
        pages:1,

        message:'',
        isShow: false
      }
    },
    mounted() {
      document.title = '搜索关注学员';
      let that = this;
      this.$nextTick(()=>{
        document.onkeyup = function (e) {
          var code = e.charCode || e.keyCode;
          if (code === 13) {
            that.searchClass()
          }
        }
      })
    },
    methods: {
      // 关闭弹框
      isShowFun(){
        this.isShow = false
      },
      // 下拉加载
      loadMore() {
        if(this.pageNum < this.pages ){
          this.pageNum++;
          this.searchClass();
        }
      },
      searchClass(){
        if(!!this.inputVal){
          let query = {
            nickname: this.inputVal,
            pageNum: this.pageNum,
            pageSize: this.pageSize
          };
          if(this.pageNum>1){
            this.loading = true;
          }
          searchFollowClassFun(query).then((res) =>{
            if(res.code === 'Y'){
              let dataS = res.data.list || [];
              dataS.forEach((item)=>{
                if(!item.wechatImg){
                  item.isWechatImg = false
                }else {
                  item.isWechatImg = true
                }
              });
              this.listData = this.pageNum===1?dataS:this.listData.concat(dataS);
              this.pages = res.data.pages;
              if(this.listData.length===0 && this.pageNum===1){
                this.message = '抱歉没有找到您要的信息';
                this.isShow = true;
              }else {
                this.loading = false;
              }
            }
          })
        }
      },
      //时间戳转换
      getTime (item) {
        let timestamp = new Date(item);
        return timestamp.toLocaleDateString().replace(/\//g, "-") + " " + timestamp.toTimeString().substr(0, 8)
      }
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  .searchBox{
    background-color: #ffffff;
    border: 1px solid #979797;
    border-radius: 5*@wu;
    width: 340*@wu;
    height: 34*@wu;
    margin: 8*@wu auto;
    position: relative;
    span{
      display: inline-block;
      width: 90*@wu;
      height: 34*@wu;
      line-height:34*@wu;
      border-top-left-radius:5*@wu;
      border-bottom-left-radius:5*@wu;
      border: none;
      box-sizing: border-box;
      border-right: 1px solid #979797;
      outline: none;
      background-color: #ffffff;
      font-size: 14*@wu;
      text-align: center;
    }
    input{
      width: 210*@wu;
      height: 32*@wu;
      border: none;
      outline: none;
      text-indent: 10*@wu;
      position: absolute;
      top: 0;
      left: 90*@wu;
      background-color: transparent;
      box-sizing: border-box;
    }
    img{
      width: 19*@wu;
      height: auto;
      position: absolute;
      right: 16*@wu;
      top: 7*@wu;
    }
  }
  .classmateList{
    list-style: none;
    margin: 0;
    padding: 0;
    height: calc(~'100% - ' 52*@wu);
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
