<template>
  <div class='page pageColor bringOut'>
    <mt-navbar v-model="selected">
      <mt-tab-item id="">全部</mt-tab-item>
      <mt-tab-item id="1">待审核</mt-tab-item>
      <mt-tab-item id="2">待打款</mt-tab-item>
      <mt-tab-item id="5">已提现</mt-tab-item>
      <mt-tab-item id="3">无效</mt-tab-item>
    </mt-navbar>
    <div class="bringOutTotal">
      共<span>{{totalObj.parTol || 0}}</span>条数据,提现累计 - <span>{{totalObj.parAmount || '0.00'}}</span>元
    </div>
    <!-- tab-container -->
    <div v-infinite-scroll="loadMore"
              infinite-scroll-disabled="loading"
              infinite-scroll-distance="10" style="overflow: hidden">
      <div class="bringOutBox" v-for="item in listData">
        <div class="left">
          <div>{{ item.cashTypeStr }}</div>  <!--item.cashType | wOutType-->
          <div>编码:{{item.capitalNo}}</div>
          <div>{{item.capitalState | capitalState}}</div>
        </div>
        <div class="right">
          <div>-{{item.amout}}元</div>
          <div>{{item.createTime}}</div>
        </div>
      </div>
      <div class="moreClass">
        <img src="../../assets/img/more.gif" v-if="loading && listData.length>=pageSize">
        <span v-if="pageNum === pages && listData.length > 10">没有更多了...</span>
      </div>
    </div>

  </div>
</template>

<script>
  import { Navbar, InfiniteScroll} from 'mint-ui';
  import  { capitalCashList } from '@/api/index'

  export default {
    data() {
      return {
        selected: "",
        listData: [],

        pageNum: 1,
        pageSize:10,
        pages:1,

        totalObj: '',  // 数据总对象

        loading: false
      }
    },
    watch:{
      'selected': 'selectedFun'
    },
    mounted() {
      this.queryBringList();
    },
    methods: {
      // 下拉加载
      loadMore() {
        if(!this.loading && this.pageNum < this.pages){
          this.pageNum++;
          this.queryBringList();
        }
      },
      // tab查询
      selectedFun(){
        this.queryBringList();
      },
      // 数据查询
      queryBringList(){
        capitalCashList({capitalState: this.selected,pageNum: this.pageNum,pageSize:this.pageSize}).then((res)=>{
          if(res.code === 'Y'){
            this.pages = res.data.parList.pages;
            this.listData = res.data.parList.list;
            this.totalObj = res.data;
          }
        })
      },
    }
  }
</script>
<style lang="less" scoped>
  @wu:100vw/375;
  .bringOutTotal{
    background-color: #F1F1F1;
    height: 42*@wu;
    line-height: 42*@wu;
    font-size: 12*@wu;
    color: #979797;
    text-indent: 12*@wu;
    span{
      color: #F5A623;
    }
  }
  .bringOutBox{
    height: 80*@wu;
    border-bottom: 1px solid #F1F1F1;
    padding: 0 10*@wu;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    .left{
      width: 60%;
      div:nth-of-type(1){
        font-size: 15*@wu;
        color: #474545;
        margin-bottom: 3*@wu;
      }
      div:nth-of-type(2){
        color: #979797;
        font-size: 11*@wu;
        margin-bottom: 2*@wu;
      }
      div:nth-of-type(3){
        color: #979797;
        font-size: 11*@wu;
      }
    }
    .right{
      width: 40%;
      text-align: right;
      div:nth-of-type(1){
        font-size: 15*@wu;
        color: #3E3E3E;
      }
      div:nth-of-type(2){
        font-size: 11*@wu;
        color: #979797;
      }
    }
  }
  .bringOutBox:last-child{
    border-bottom:none;
  }
</style>
<style lang="less">
  @wu: 100vw /375;
  .bringOut{
    .mint-navbar .mint-tab-item.is-selected{
      border-bottom: 2*@wu solid #F5A623;
      margin-bottom: -2*@wu;
      color: #F5A623;
    }
    .mint-tab-item-label{
      font-size: 15*@wu!important;
    }
    .mint-navbar .mint-tab-item{
      padding: 25*@wu 0 12*@wu 0!important;
    }
  }
</style>
