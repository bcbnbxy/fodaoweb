<template>
	<div class='page pageColor'>
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
	          <span v-if="isActive === 1">姓名:{{item.realName}}-{{item.userMobile}}</span>
	          <!--<div><img src="../../assets/img/classmate.png">{{ item.userLevel | userType }}</div>-->
	          <span>成为会员时间: {{item.createTime}}</span>
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
  import {getShareInfo} from '@/api/index'
  import {Indicator} from 'mint-ui'
    export default {
    data() {
      return {
        listData: [],
        
        isActive : 1 ,

        total1: 0,
        total2: 0,

        loading: false,
        title: this.$route.params.name,
        total: 0,

        pageNum: 1,
        pageSize: 10,
        pages: 1 ,

      }
    },
    mounted() {
      document.title = "已邀请学友";
      
      this.queryData( this.$route.query.tabIndex );
    },
    methods: {
			// 返回上一页
      goBackFun() {
        if (window.history.length <= 1) {
          this.$router.push({path: '/home/index'});
          return false
        } else {
          this.$router.go(-1)
        }
      } ,
    	
      // 下拉加载
      loadMore() {
        if (this.pageNum < this.pages) {
          this.pageNum++;
          this.queryData(this.isActive);
        }
      },
      // 列表查询
      queryData(activeVal) {

        this.loading = true;
        Indicator.open();
        getShareInfo().then((res) => {
        	
          this.loading = false;
          Indicator.close();
          if (res.code === "Y" && !!res.data) {
            let dataS = res.data.shareList.list || [];
            dataS.forEach((item) => {
              if (!item.wechatImg) {
                item.isWechatImg = false
              } else {
                item.isWechatImg = true;
              }
            });
            this.listData = this.listData.concat(dataS);
            //console.log(res.data);
            //activeVal === 1 ? this.total1 = res.data.total : this.total2 = res.data.total;
            this.pages = res.data.pages;
          }
        })
      },
      
    
      // 人员详情
      classMateDetail(item) {
        sessionStorage.setItem('classMateDetail', JSON.stringify(item));
        this.$router.push({path: '/myClassmateDetail/' + item.id + '/' + this.isActive})
      },
    }
  }

</script>

<style lang="less" scoped>
  @wu: 100vw/375;
  .classmateList {
    list-style: none;
    margin: 0;
    padding: 0;
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
        }
        span:nth-of-type(2) {
          font-size: 13*@wu;
          color: #262525;
          margin-bottom: 4*@wu;
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