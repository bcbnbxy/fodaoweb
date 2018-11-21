<template>
  <div class='page pageColor'>
    <div class="searchBox">
      <select v-model="searchVal">
        <option value="1" v-if="id==='1'">真实姓名</option>
        <option value="2" v-if="id==='1'">手机号码</option>
        <option value="3">微信名称</option>
        <option value="4">钻石合伙人</option>
        <option value="5">黄金合伙人</option>
        <option value="6">白银合伙人</option>
        <option value="7">终身学员</option>
        <option value="8">初级学员</option>
        <option value="9">普通用户</option>
        <option value="10">高级合伙人</option>
      </select>
      <input type="text" v-model="inputVal" :placeholder="parseInt(searchVal)>3?'请点击搜索按钮直接搜索--→':'请输入要找寻好友'" :disabled="parseInt(searchVal)>3">
      <img src="../../assets/img/search.png" @click="searchClassFun()">
    </div>
    <ul class="classmateList"
        v-infinite-scroll="loadMore"
        infinite-scroll-distance="10"
        infinite-scroll-immediate-check='true'
    >
      <li v-for="item in listData" @click="classMateDetail(item)">
        <img :src="item.wechatImg" v-if="item.isWechatImg">
        <img src="../../assets/img/userImg.png" v-else>
        <div>
          <span>微信名:{{item.wechatName?item.wechatName:'无'}}</span>
          <span v-if="id === '1'">姓名:{{item.realName}} - {{item.userMobile}}</span>
          <div><img src="../../assets/img/classmate.png">{{ item.userLevel | userType }}</div>
          <span>成为会员时间 {{ item.createTime }}</span>
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
  import {myStudentList} from '@/api/index'
  import {InfiniteScroll, Indicator} from 'mint-ui';

  export default {
    data() {
      return {
        id: this.$route.params.id,
        searchVal: '3',
        inputVal: '',
        loading: false,
        listData: [],

        pageNum: 1,
        pageSize: 10,
        pages: 1,

        message: '',
        isShow: false
      }
    },
    mounted() {
      let that = this;
      this.$nextTick(() => {
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
      isShowFun() {
        this.isShow = false
      },
      // 下拉加载
      loadMore() {
        if (this.pageNum < this.pages) {
          this.pageNum++;
          this.searchClass();
        }
      },
      // 人员详情
      classMateDetail(item) {
        sessionStorage.setItem('classMateDetail', JSON.stringify(item));
        this.$router.push({path: '/myClassmateDetail/' + item.id + '/' + this.id})
      },
      searchClassFun() {
        if(parseInt(this.searchVal) > 3){
          this.inputVal = '';
        }else {
          if(!this.inputVal){
            return false;
          }
        }
        this.listData = [];
        this.pageNum = 1;
        this.searchClass();
      },
      searchClass() {
        let query = {
          studentsType: this.id,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        };
        if (this.searchVal === '1') {
          query.name = this.inputVal;
        } else if (this.searchVal === '2') {
          query.userMobile = this.inputVal;
        } else if (this.searchVal === '3') {
          query.wechatName = this.inputVal;
        } else {
          query.userLevel = parseInt(this.searchVal) - 3;
        }
        if (this.pageNum > 1) {
          this.loading = true;
        }
        myStudentList(query).then((res) => {
          if (res.code === 'Y' && !!res.data) {
            let dataS = res.data.list || [];
            dataS.forEach((item) => {
              if (!item.wechatImg) {
                item.isWechatImg = false
              } else {
                item.isWechatImg = true
              }
            });
            // this.listData = this.listData.concat(dataS);
            this.listData = this.pageNum === 1 ? dataS : this.listData.concat(dataS);
            this.pages = res.data.pages;
            if (this.listData.length === 0 && this.pageNum === 1) {
              this.message = '抱歉没有找到您要的信息';
              this.isShow = true;
            } else {
              this.loading = false;
            }
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  .searchBox {
    background-color: #ffffff;
    border: 1px solid #979797;
    border-radius: 5*@wu;
    width: 340*@wu;
    height: 34*@wu;
    margin: 8*@wu auto;
    position: relative;
    select {
      width: 90*@wu;
      height: 34*@wu;
      border-top-left-radius: 5*@wu;
      border-bottom-left-radius: 5*@wu;
      border: none;
      padding-left: 10*@wu;
      box-sizing: border-box;
      border-right: 1px solid #979797;
      outline: none;
      background-color: #ffffff;
    }
    input {
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
    img {
      width: 19*@wu;
      height: auto;
      position: absolute;
      right: 16*@wu;
      top: 7*@wu;
    }
  }

  .classmateList {
    list-style: none;
    margin: 0;
    padding: 0;
    height: calc(~'100% - '52 * @wu);
    overflow: auto;
    li {
      border-bottom: 1px solid #f1f1f1;
      height: 85*@wu;
      display: flex;
      align-items: center;
      background-color: #ffffff;
      padding-left: 10*@wu;
      box-sizing: border-box;
      img {
        width: 52*@wu;
        height: 52*@wu;
        border-radius: 50%;
      }
      & > div {
        padding-left: 10*@wu;
        span {
          display: block;
        }
        span:nth-of-type(1) {
          font-size: 13*@wu;
          color: #262525;
          margin-bottom: 4*@wu;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          width: 90%;
        }
        span:nth-of-type(2) {
          font-size: 13*@wu;
          color: #262525;
          margin-bottom: 4*@wu;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          width: 90%;
        }
        span:nth-of-type(3) {
          font-size: 9*@wu;
          color: #C3C3C3;
        }
        & > div {
          font-size: 10*@wu;
          color: #ff0000;
          display: flex;
          align-items: center;
          img {
            width: 14*@wu;
            height: auto;
            margin-right: 5*@wu;
          }
        }
      }
    }
    li:last-child {
      border-bottom: none;
    }
  }
</style>
