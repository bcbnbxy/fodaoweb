<template>
  <div class="audioCenterBox">
    <img class="playPurse" src="../assets/img/learnClass/play.png" @click="playFun()" v-if="!isPlay">
    <img class="playPurse" src="../assets/img/learnClass/parse.png" @click="pauseFun()" v-if="isPlay">
    <div class="progressBox">
      <audio ref="audioList" :src="item.url"></audio>
      <div :style="{width:moveWidth + '%'}"><span v-if="moveWidth>0"></span></div>
    </div>
    <div class="audioTime">{{audioLength}}</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        url: 'http://ting666.yymp3.com:86/new27/liyugang6/6.mp3',
        audioLength: '', // 资源长度
        isPlay: false,  // 播放暂停控制
        duration: 0,  // 当前播放的时间戳
        moveWidth: 0, // 显示进度条
        currentObject: {}
      }
    },
    mounted() {
      this.$nextTick(() => {
        let that = this;
        // 计算每个MP3的长度
        this.currentObject = this.$refs.audioList
        this.currentObject.ondurationchange = function () {
          if (this.duration !== 0) {
            let str = this.duration;
            let minute = parseInt(str / 60);
            let second = parseInt(str % 60);
            if (minute > 0 && minute < 60) {
              that.audioList[index].audioLength = (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second : second);
            } else {
              that.audioList[index].audioLength = (second < 10 ? '0' + second : second)
            }
            that.audioList[index].duration = str;
          }
        }
      })
    },
    methods: {
      // 播放
      playFun(inde) {
        this.$nextTick(() => {
          let that = this;
          this.audioListObject.forEach((item, index) => {
            if (index === inde) {
              this.currentObject.play();
              this.isPlay = true;
              this.currentObject.ontimeupdate = function () { // 获取当前播放进度时间并显示
                let currentTime = this.currentTime;
                that.audioList[index].moveWidth = 100 * currentTime / that.audioList[index].duration;
                if (that.audioList[index].moveWidth >= 100) {
                  that.audioList[index].isPlay = false;
                }
              };
            } else {
              item.pause();
              this.audioList[index].isPlay = false;
            }
          })
        })
      },
      // 暂停
      pauseFun(index) {
        this.audioListObject[index].pause();
        this.audioList[index].isPlay = false;
      }
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  .audioBox {
    clear: both;
    padding-top: 18*@wu;
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
      padding-left: 20*@wu;
      .playPurse {
        display: inline-block;
        width: 27*@wu;
        height: 27*@wu;
        vertical-align: middle;
      }
      .progressBox {
        width: 218*@wu;
        height: 2*@wu;
        display: inline-block;
        background-color: #3D3C3C;
        vertical-align: middle;
        margin-left: 6*@wu;
        & > div {
          background-color: #dedede;
          height: 2*@wu;
          position: relative;
          span {
            position: absolute;
            right: -4.5*@wu;
            top: -4.5*@wu;
            background-color: #3D3C3C;
            width: 9*@wu;
            height: 9*@wu;
            display: inline-block;
            border-radius: 50%;
          }
        }
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
