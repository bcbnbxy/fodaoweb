<template>
  <div class="page">
    <div class="routerView">
      <router-view/>
    </div>
    <div class="footer">
      <ul>
        <router-link to="/home/index" exact class="index" tag="li" active-class="indexActive">
          <i></i>
          <p>首页</p>
        </router-link>
        <router-link to="/home/onlineClass" class="onlineClass" tag="li" active-class="onlineClassActive">
          <i></i>
          <p>我的课程</p>
        </router-link>
        <!-- /partnerList  /imList -->
        <!--<router-link to="/imList" class="partner" tag="li" active-class="partnerActive">
          <i></i>
          <p>朋友圈</p>
        </router-link>      -->
        <router-link to="/extendEWM" class="extend" tag="li" active-class="extendActive">
          <i></i>
          <p>二维码</p>
        </router-link>
        <router-link to="/home/mine" class="mine" tag="li" active-class="mineActive">
          <i></i>
          <p>我的</p>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return{
        'router-link-active': 'indexActive'
      }
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  .routerView{
    height: ~"calc(100% - 13.333333vw)";
  }
  .footer {
    height: 50*@wu;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
    z-index: 1200;
    color: #000000;
    border-top: 1px solid #F1F1F1;
    box-sizing: border-box;
    ul {
      width: 100%;
      height: 100%;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    li {
      float: left;
      width: 25%;
      height: 100%;
      position: relative;
    }
    i {
      position: absolute;
      width: 25*@wu;
      height: 25*@wu;
      left: 35*@wu;
      top: 5*@wu;
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;
    }
    p {
      position: absolute;
      bottom: 0;
      height: 22*@wu;
      line-height: 22*@wu;
      width: 100%;
      text-align: center;
      font-size: 10*@wu;
      left: 0;
      padding: 0;
      margin: 0;
      color: #A0A0A0;
    }
    .index {
      i {
        background-image: url(../assets/img/index.png);
      }
    }
    .onlineClass {
      i {
        background-image: url(../assets/img/onlineClass.png);
      }
    }
    .partner {
      i {
        background-image: url(../assets/img/partner.png);
      }
    }
    .extend {
      i {
        background-image: url(../assets/img/extension.png);
      }
    }
    .mine {
      i {
        background-image: url(../assets/img/mine.png);
      }
    }

    .indexActive {
      i {
        background-image: url(../assets/img/indexActive.png);
      }
      p{
      	color: #F5C620;
      }
    }
    .onlineClassActive {
      i {
        background-image: url(../assets/img/onlineClassActive.png);
      }
      p{
      	color: #F5C620;
      }
    }
    .partnerActive {
      i {
        background-image: url(../assets/img/partnerActive.png);
      }
      p{
      	color: #F5C620;
      }
    }
    .extendActive {
      i {
        background-image: url(../assets/img/extensionActive.png);
      }
      p{
      	color: #F5C620;
      } 
    }
    .mineActive {
      i {
        background-image: url(../assets/img/mineActive.png);
      }
      p{
      	color: #F5C620;
      } 
    }
  }
</style>
