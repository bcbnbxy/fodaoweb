<template>
	<div class='page pageColor'>
	    <div class="top">
	      	<img src="../../assets/img/learnClass/prevActive.png" @click="goBackFun()">
	        	终身学员({{total}})
	        <img src="../../assets/img/search.png" @click="goSearch()">
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
	          <div v-if="isActive == 1">姓名:{{item.realName}}-{{item.userMobile}}</div>
<!--	          <div v-if="isActive === 1"><img src="../../assets/img/classmate.png">{{ item.userLevel | userType }}</div>
-->	          <span>成为会员时间: {{item.createTime}}</span>
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
  import {listStudentsByType} from '@/api/index'
  import {Indicator} from 'mint-ui'
    export default {
    data() {
      return {
        listData: [],
        loading: false,
        title: this.$route.params.name,
        total: 0,
        pageNum: 1,
        pageSize: 10,
        pages: 1 ,
      }
    },
    mounted() {
       document.title = "终身学员";   
       this.isActive = this.$route.params.studentsType;
       this.queryData( this.$route.params.studentsType );
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
    	// 搜索路由
      goSearch() {
        this.$router.push({path: '/searchClassmate/' + this.isActive})
      },
      // 下拉加载
      loadMore() {
        if (this.pageNum < this.pages) {
          this.pageNum++;
          this.queryData(this.isActive);
        }
      },
      // 列表查询
      queryData(activeVal) {
        let query = {
          studentsType: activeVal,
          pageNum: this.pageNum,
          userLevels : "4" ,
          authorization : sessionStorage.getItem("token") ,
          pageSize: this.pageSize,
        };
        this.loading = true;
        Indicator.open();
        listStudentsByType(query).then((res) => {
          this.loading = false;
          Indicator.close();
          if (res.code === "Y" && !!res.data) {
            let dataS = res.data.list || [];
            dataS.forEach((item) => {
              if (!item.wechatImg) {
                item.isWechatImg = false
              } else {
                item.isWechatImg = true;
              }
            });
            this.listData = this.listData.concat(dataS);
            this.total = res.data.total;
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

<style  lang="less" scoped>
  @wu: 100vw/375;
  	.pageColor{
  		height:100%;
  		display: flex;
  		display: -webkit-flex;
  		flex-direction: column;
  		overflow: hidden;
  	}
  	.top {
      height: 47.5*@wu;
      font-size: 18*@wu;
      line-height: 47.5*@wu;
      background-color: #fff;
      text-indent: 10*@wu;
      position: relative;
      text-align: center;
      margin-bottom: 10*@wu;
      img:first-child {
        position: absolute;
        left: 20*@wu;
        top: 15*@wu;
        width: 9*@wu;
        height: auto;
      }
      img:last-child {
        position: absolute;
        right: 20*@wu;
        top: 15*@wu;
        width: 20*@wu;
        height: auto;
      }
    }  
  .classmateList {
    list-style: none;
    margin: 0;
    padding: 0;
	flex: 1;
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
          font-size: 16*@wu;
          color: #333;
          margin-bottom: 4*@wu;
        }
        span:nth-of-type(2) {
          font-size: 12*@wu;
          color: #ccc;
          margin-bottom: 4*@wu;
        }
        span:nth-of-type(3) {
          font-size: 9*@wu;
          color: #C3C3C3;
        }
        & > div {
          font-size: 14*@wu;
          color: #333;
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