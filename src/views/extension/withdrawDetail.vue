<template>
  <div class='page pageColor'>
    <div class="withdrawDetailTab">
      佣金明细
    </div>
    <div class="withdrawDetailTop">
      <div>{{capitalAllTolS}}</div>
      <div>总佣金 (元)</div>
    </div>
    <!--<div class="withdrawDetailTab">
      <div :class="{active: isActive===2}">明细列表</div>
      <div :class="{active: isActive===2}" @click="tabClassMate(2)">待收佣金</div>
    </div>-->
    <div class="withdrawDetailIntro">
      共<span>{{total}}</span>条数据,合计佣金<span>{{allMoney}}</span>元
    </div>
    <div v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10"
         class="loadMoreClass"
    >
      <div class="withdrawDetailBox" v-for="item in listData" @click="lookDetail(item)">
        <div class="left">
          <div>{{item.capitalLevel===1?'一级订单':'二级订单'}}: {{item.orderNo}}</div>
          <div>{{item.createTime}}</div>
        </div>
        <div class="center">
          <div>+{{item.amout}}</div>
          <div>已收<!--{{isActive===1?'已结算':'待收'}}--></div> <!--item.capitalState-->
        </div>
        <div class="right">
          <img src="../../assets/img/next.png">
        </div>
      </div>
      <img class="noData thisClass" src="../../assets/img/noData.png" v-if="listData.length===0">
    </div>
  </div>
</template>

<script>
  import {capitalList,capitalAllTol} from '@/api/index'

  export default {
    data() {
      return {
        isActive: 2,
        listData: [],

        pages: 1,
        pageNum: 1,
        pageSize: 15,
        total: 0,
        loading: false,
        // 以收未收总额
        allMoney: 0,
        // 所有佣金总额
        capitalAllTolS: ''
      }
    },
    mounted() {
      document.title = '佣金明细';
      this.queryDetail(this.isActive);
      this.capitalAllTolFun();
    },
    methods: {
      // 总的佣金数
      capitalAllTolFun(){
        capitalAllTol().then((res)=>{
          if (res.code === 'Y') {
            this.capitalAllTolS = res.data || '0.00';
          }
        })
      },
      // 下拉加载
      loadMore() {
        if (!this.loading && this.pageNum < this.pages) {
          this.pageNum++;
          this.queryDetail(this.isActive);
        }
      },
      // 切换tab栏
      tabClassMate(index) {
        this.isActive = index;
        this.listData = [];
        this.pageNum = 1;
        this.pages = 1;
        this.queryDetail(index);
      },
      // 查询佣金明细
      queryDetail(val) {
        capitalList({capitalParType: val}).then((res) => {
          if (res.code === 'Y') {
            let da = res.data.list || [];
            for (let i = 0; i < da.length; i++) {
              this.listData.push(da[i]);
            }
            this.pages = res.data.pages;
            this.total = res.data.total;
            this.allMoney = res.data.parAmount;
          }
        })
      },
      // 查看订单详情
      lookDetail(item) {
        this.$router.push({path: '/withdrawDetails/' + item.id})
      }
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw/375;
  .withdrawDetailTop {
    background-image: linear-gradient(-180deg, #F5C520 3%, #F4BC1A 100%);
    overflow: hidden;
    padding: 35*@wu 0;
    text-align: center;
    div:nth-of-type(1) {
      font-size: 32*@wu;
      color: #FFFFFF;
      height: 42*@wu;
    }
    div:nth-of-type(2) {
      font-size: 13*@wu;
      color: #FFFFFF;
    }
  }

  .withdrawDetailTab {
    height: 42*@wu;
    background-color: #ffffff;
    overflow: hidden;
    text-align: center;
    line-height: 42*@wu;
    font-size: 15*@wu;
    div {
      float: left;
      width: 50%;
      box-sizing: border-box;
      text-align: center;
      line-height: 40*@wu;
      font-size: 15*@wu;
      color: #262525;
    }
    .active {
      border-bottom: 2*@wu solid #F7BD15;
      color: #F7BD15;
    }
  }

  .withdrawDetailBox {
    padding: 18*@wu 10*@wu 12*@wu 10*@wu;
    box-sizing: border-box;
    background-color: #ffffff;
    margin-bottom: 1px;
    display: flex;
    .left {
      width: 230*@wu;
      div:nth-of-type(1) {
        font-size: 12*@wu;
        color: #474545;
        margin-bottom: 3*@wu;
      }
      div:nth-of-type(2) {
        font-size: 10*@wu;
        color: #979797;
      }
    }
    .center {
      width: 109*@wu;
      text-align: right;
      div:nth-of-type(1) {
        font-size: 13*@wu;
        color: #474545;
        margin-bottom: 3*@wu;
      }
      div:nth-of-type(2) {
        font-size: 10*@wu;
        color: #979797;
      }
    }
    .right {
      width: 16*@wu;
      display: flex;
      align-items: center;
      justify-items: center;
      justify-content: center;
      box-sizing: border-box;
      padding-left: 10*@wu;
      img {
        width: 6*@wu;
        height: auto;
        vertical-align: middle;
      }
    }
  }

  .withdrawDetailIntro {
    height: 40*@wu;
    line-height: 40*@wu;
    font-size: 12*@wu;
    color: #979797;
    background-color: #f1f1f1;
    text-indent: 10*@wu;
    span {
      color: #F5A623;
    }
  }

  .thisClass {
    margin-top: 80*@wu !important;
  }
  .loadMoreClass{
    overflow: auto;
    height: calc(~'100% - ' 213*@wu);
  }
</style>
