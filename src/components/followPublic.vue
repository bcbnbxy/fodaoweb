<template>
  <div>
    <div class="sidebar" id="sidebar" v-show="isHiddenSidebar">
      <div class="closeBtn" @click="closeKeFu">x</div>
      <div class="kefuText" @click="isWx=true">关注公众号</div>
    </div>
    <div class="wxImg" v-if="isWx" @click="isWx=false">
      <div @click.stop>
        <img src="../assets/img/wxgzh.jpg">
        <img src="../assets/img/close.png" @click="isWx=false">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['pageObject'],
    data() {
      return {
        isHiddenSidebar: true,
        isWx: false
      }
    },
    mounted() {
      window.timer = '';
      let that = this;
      let scrollTopVal = 0;
      let doDom = document.getElementById('sidebar');
      this.pageObject.onscroll = function () {
        clearTimeout(window.timer);
        that.isHiddenSidebar = true;
        scrollTopVal = this.scrollTop;
        doDom.style.opacity = 1 - (this.scrollTop / this.scrollHeight).toFixed(1) - 0.1;
        let topVal = this.scrollTop / (this.scrollHeight - this.clientHeight) * this.scrollHeight - doDom.offsetHeight;
        doDom.style.top = topVal < this.clientHeight/2 ? this.clientHeight / 2 + 'px' : topVal + 'px';
        doDom.style.transition = 'all 1s ease';
        window.timer = setTimeout(() => {
          if (scrollTopVal === this.scrollTop) {
            that.isHiddenSidebar = false;
            clearTimeout(window.timer)
          }
        }, 3000)
      }
    },
    methods: {
      //关闭客服侧边栏
      closeKeFu() {
        this.isHiddenSidebar = false
      },
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  .sidebar {
    position: absolute;
    right: 0;
    top: 268*@wu;
    .closeBtn {
      width: 14*@wu;
      height: 14*@wu;
      border-radius: 50%;
      background-color: #ff0000; //#FFCB4E
      color: #fff;
      font-size: 13*@wu;
      text-align: center;
      line-height: 14*@wu;
      display: inline-block;
    }
    .kefuText {
      height: 31*@wu;
      // background-image: linear-gradient(-101deg, #FFC940 1%, #FFBD30 100%); // -101deg, #85c12a 1%, #3f8c62 100%
      border-radius: 5*@wu;
      font-size: 14*@wu;
      color: #FFFFFF;
      text-align: center;
      line-height: 31*@wu;
      padding: 0 5*@wu;
      background-color: #ff0000;
    }
  }

  .wxImg {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 4000;
    background-color: rgba(0, 0, 0, 0.8);
    div {
      width: 70%;
      padding: 10*@wu;
      background-color: #ffffff;
      margin: 25% auto 0 auto;
      box-sizing: border-box;
      border-radius: 5*@wu;
      img:nth-of-type(1) {
        width: 100%;
        height: auto;
        display: block;
      }
      img:nth-of-type(2) {
        width: 14*@wu;
        height: 14*@wu;
        align-self: center;
        display: block;
        margin: 10*@wu auto;
      }
    }
  }

</style>
