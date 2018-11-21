<template>
  <div class='page'>
    <img class="answerImg" :src="link">
    <div class="answerIntro">
      本平台研究世界古老文化,具有最专业的服务,具有权威性的解答,一定可以让您在此得到最满意的答复!
    </div>
    <div class="audioBoxAnswer">
      <div class="answerTit">{{title}}<i>(点击播放学习)</i></div>
      <div class="audioCenterBox">
        <img class="playPurse" src="../../../assets/img/learnClass/play.png" @click="playFun()" v-if="!isPlay">
        <img class="playPurse" src="../../../assets/img/learnClass/parse.png" @click="pauseFun()" v-if="isPlay">
        <div class="progressBox">
          <audio ref="audioList" :src="url"></audio>
          <div :style="{width: moveWidth + '%'}" style="z-index: 9"><span></span></div>
          <div :style="{width: progressWidth + '%'}" style="background-color: #a0a0a0"></div>
        </div>
        <div class="audioTime">{{audioLength}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        url: '',
        audioLength: '00:00', // 资源长度
        isPlay: false,  // 播放暂停控制
        duration: 0,  // 当前播放的时间戳
        moveWidth: 0, // 显示进度条
        currentObject: {},
        progressWidth: '', // 标题
        title: '', // 标题
        link:''
      }
    },
    mounted(){
      this.$nextTick(()=>{
        let data = JSON.parse(sessionStorage.getItem('answer'));
        this.url = data.goodsLink;
        this.title = data.goodsName;
        this.link = data.goodsImg;
        this.audioLength = data.goodsTime;
      })
    },
    updated() {
      // 计算每个MP3的长度
      this.currentObject = this.$refs.audioList;
    },
    methods: {
      // 播放
      playFun(inde) {
        let that = this;
        that.currentObject.play();
        that.currentObject.onprogress=function(){
          let r = this.buffered;
          if (r.length > 0){
            let timeBuffered = r.end(r.length - 1) / this.duration;
            this.progressWidth = timeBuffered.toFixed(2)*100;
          }
        }
        this.isPlay = true;
        that.currentObject.ontimeupdate = function () { // 获取当前播放进度时间并显示
          if(this.buffered.length > 0){
            let t = this.buffered.end(this.buffered.length - 1) / this.duration;
            if(t===1){
              this.progressWidth = 100
            }
          }
          let currentTime = this.currentTime;
          let str = this.duration - currentTime.toFixed(0);
          let minute = parseInt(str / 60);
          let second = parseInt(str % 60);
          if (minute > 0 && minute < 60) {
            that.audioLength = (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second : second);
          } else {
            if(second < 10 && second > 0){
              that.audioLength = '00:' + '0' + second;
            }else if(second <= 0){
              that.audioLength = '00:00';
            }else{
              that.audioLength = '00:' + second;
            }
          }
          let d = 100 * currentTime / this.duration;
          that.moveWidth = d.toFixed(1)>100?100:d.toFixed(1);
        };
      },
      // 暂停
      pauseFun(index) {
        this.currentObject.pause();
        this.isPlay = false;
      }
    },
    destroyed(){
      sessionStorage.removeItem('answer')
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  .answerImg {
    width: 375*@wu;
    height: 245*@wu;
    display: block;
  }

  .answerIntro {
    height: 40*@wu;
    padding: 15*@wu 30*@wu;
    background-color: rgb(195, 195, 195);
    font-size: 13*@wu;
    color: #FAFAFA;
    letter-spacing: -0.27*@wu;
    line-height: 19*@wu;
  }

  .audioBoxAnswer {
    clear: both;
    padding-top: 70*@wu;
    .answerTit {
      font-size: 14*@wu;
      color: #3A3939;
      text-align: center;
      i {
        font-style: inherit;
        font-size: 11*@wu;
        color: #B0B0B0;
        margin-left: 8*@wu;
      }
    }
    .audioTit {
      width: 128*@wu;
      height: 12*@wu;
      display: block;
      margin-left: 46*@wu;
      margin-top: 20*@wu;
    }
    .test7Tit {
      width: 64*@wu !important;
      margin-left: 40*@wu !important;
    }
    .audioCenterBoxTest7 {
      padding-left: 12*@wu !important;
    }
    .audioCenterBox {
      margin-top: 17*@wu;
      padding-left: 38*@wu;
      .playPurse {
        display: inline-block;
        width: 27*@wu;
        height: 27*@wu;
        vertical-align: middle;
      }
      .progressBox {
        width: 208*@wu;
        height: 2px;
        display: inline-block;
        background-color: #dedede;
        vertical-align: middle;
        margin-left: 8*@wu;
        position: relative;
      }

      .progressBox > div {
        background-color: #3D3C3C;
        height: 2px;
        position: absolute;
        z-index: 8;
      }

      .progressBox > div span {
        position: absolute;
        right: -5px;
        top: -4px;
        background-color: #3D3C3C;
        width: 10px;
        height: 10px;
        display: inline-block;
        border-radius: 50%;
        z-index: 10;
      }
      .audioTime {
        font-size: 12*@wu;
        color: #5A5A5A;
        display: inline-block;
        width: 33*@wu;
      }
    }
  }
</style>
