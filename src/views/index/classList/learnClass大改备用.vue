<template>
  <div id="page" class='page learnClassBox' v-show="classShow">
    <div class="learnClassTopBox"><img src="../../../assets/img/learnClass/oneSay.png" class="topImg"
                                       v-if="audioList.length > 0"></div>
    <div class="turnBox" v-if="audioList.length > 0">
      <img src="../../../assets/img/learnClass/prev.png" class="turnBoxLeft" v-if="turnShow<=1">
      <img src="../../../assets/img/learnClass/prevActive.png" class="turnBoxLeft" @click="turnLeft()"
           v-if="turnShow>1">
      <img src="../../../assets/img/learnClass/next.png" class="turnBoxRight" v-if="turnShow>=turnList.length">
      <img src="../../../assets/img/learnClass/nextActive.png" class="turnBoxRight" @click="turnRight()"
           v-if="turnShow<turnList.length">
      <img class="turnImg" :src="item.courseLink" v-if="turnShow === (index+1)"
           :class="{moveCss: turnShow === (index+1)}" v-for="(item,index) in turnList">
    </div>
    <div class="turnBox marginTop" v-if="audioList.length > 0">
      <img class="secondImg" src="../../../assets/img/learnClass/secondTec.png" v-if="id!=4">
      <div class="videoBox" v-if="id!=4">
        <video ref="video1" poster="" controls :src="videoList[0].courseLink" v-if="videoList[0]"></video>
      </div>
      <div class="audioBox " v-for="(item,index) in audioList">  <!--v-if="id==4?true:(index < audioList.length-(id==2?2:1))"-->
        <img class="audioTit" :src="item.courseTitle" v-if="!!item.courseTitle">
        <div class="audioCenterBox">
          <img class="playPurse" src="../../../assets/img/learnClass/play.png" @click="playFun(index,item)"
               v-if="!item.isPlay">
          <img class="playPurse" src="../../../assets/img/learnClass/parse.png" @click="pauseFun(index,item)"
               v-if="item.isPlay">
          <div class="progressBox">
            <audio class="audioList" :src="item.courseLink"></audio>
            <div :style="{width: item.moveWidth + '%'}" style="z-index: 9"><span></span></div>
            <div :style="{width: item.progressWidth + '%'}" style="background-color: #a0a0a0"></div>
          </div>
          <div class="audioTime">{{item.courseTime}} {{item.studyVal}}</div>
        </div>
        <img class="audioTit" :src="item.comment" v-if="item.comment">
      </div>
    </div>
    <div class="turnBox marginTop" v-if="id!=4">

      <img class="test8Img" :src="contentImgList[contentImgList.length-1].courseTitle"
           v-if="(contentImgList[contentImgList.length-1]?!!contentImgList[contentImgList.length-1].courseTitle:'') && id==2 && contentImgList.length>0"
      >
      <img class="ewm" :src="contentImgList[contentImgList.length-1].courseLink"
           v-if="(contentImgList[contentImgList.length-1]?!!contentImgList[contentImgList.length-1].courseLink:'') && id==2 && contentImgList.length>0"
      >

      <img class="test8Img" :src="contentImgList[contentImgList.length-1].courseTitle"
           v-if="(contentImgList[contentImgList.length-1]?!!contentImgList[contentImgList.length-1].courseTitle:'') && id==1 && contentImgList.length>0"
      >
      <img class="ewm" :src="contentImgList[contentImgList.length-1].courseLink"
           v-if="(contentImgList[contentImgList.length-1]?!!contentImgList[contentImgList.length-1].courseLink:'') && id==1 && contentImgList.length>0"
      >
      <img class="test9Img" src="../../../assets/img/learnClass/test9.png" v-if="id==1 || id==2">
      <div class="videoBox videoBottom" v-if="id==1 || id==2">
        <video ref="video2" controls :src="videoList[1].courseLink" v-if="videoList[1]"></video>
      </div>

      <img class="secondImg" src="../../../assets/img/learnClass/threeOk.png" v-if="id!=3" style="margin-top: 20px">
      <div class="threeOkBox">
        <img :src="item.courseLink" v-for="(item,index) in contentImgList" v-if="index < contentImgList.length-1">
      </div>
    </div>

    <alert-box :message="message" @isShow="isShowFun" v-if="isShow"></alert-box>
    <follow-public :page-object="pageObject" v-if="pageObject && !$store.getters.getUserInfo.subscribe"></follow-public>
  </div>
</template>

<script>
  import {goodsLearn, updateStudy, freeLearn} from '@/api/index';
  import {Indicator, MessageBox} from 'mint-ui';
  import FollowPublic from "../../../components/followPublic";
  export default {
    components: {FollowPublic},
    data() {
      return {
        // 课程ID
        id: this.$route.params.id,
        goodsNo: this.$route.params.goodsNo,
        // 轮播图页码控制
        turnShow: 1,
        // 是否安卓
        isAndroid: false,
        // 播放的音频控制数组
        audioList: [],
        // 所有的播放对象数组
        audioListObject: [],
        // 播放的视频控制数组
        videoList: [],
        // 轮播图列表
        turnList: [],
        // 评论列表
        contentImgList: [],

        // 错误提醒
        message: '',
        isShow: false,
        // 是否发送已学完的状态
        goStudyFlg: 1,
        // 当前学习的id
        currentStudyId: '',

        classShow: false,
        pageObject: ''
      }
    },
    created() {
      document.title = '课程学习';
      Indicator.open({
        text: '努力加载中...',
        spinnerType: 'fading-circle'
      });
      if (this.goodsNo === 'N000001' && !this.$store.getters.getToken || this.$store.getters.getToken === 'userId') {
        freeLearn({goodsId: this.id}).then((res) => {
          Indicator.close();
          if (res.code === 'Y') {
            this.turnList = res.data.broadcastImgList || [];
            this.videoList = res.data.videoList || [];
            let audios = res.data.audioList || [];
            console.log(JSON.stringify(res.data.audioList));
            // 添加相应属性
            audios.forEach((item, index) => {
              item.isPlay = false;   // 是否播放
              item.moveWidth = 0;   // 播放长度
              item.progressWidth = 0;  // 缓存进度条
              item.studyVal = '未学';
            });
            this.audioList = audios;
            console.log(JSON.stringify(this.audioList));
            this.contentImgList = res.data.contentImgList || [];
            this.classShow = true
          }
        })
      } else {
        goodsLearn({goodsId: this.id}).then((res) => {
          Indicator.close();
          if (res.code === 'Y') {
            this.turnList = res.data.broadcastImgList || [];
            this.videoList = res.data.videoList || [];
            let audios = res.data.audioList || [];
            // 添加相应属性
            audios.forEach((item, index) => {
              item.isPlay = false;   // 是否播放
              item.moveWidth = 0;   // 播放长度
              item.progressWidth = 0;  // 缓存进度条
              if (item.courseStudy === 1) {
                item.studyVal = '未学';
              } else {
                item.studyVal = '已学'
              }
            });
            // 下一条未学可以播放
            for (let k = 0; k < audios.length; k++) {
              if (audios[k].courseStudy === 2) {
                continue;
              } else {
                if (k === audios.length) {
                  break;
                } else {
                  audios[k].courseStudy = 2;
                  audios[k].studyVal = '未学';
                  break;
                }
              }
            }
            this.audioList = audios;
            this.contentImgList = res.data.contentImgList || [];
            this.classShow = true;
          } else if (res.code === 'E00000016') {
            // 请先学习该课程的前面课程
            MessageBox({
              title: '温馨提示',
              message: res.msg,
              confirmButtonText: '返回上一页',
              showCancelButton: false
            }).then(action => {
              this.$router.go(-1);
            });
          } else if (res.code === 'E00000024') {
            // 请先购买此课程
            MessageBox({
              title: '温馨提示',
              message: res.msg,
              confirmButtonText: '立即购买',
              showCancelButton: true
            }).then(action => {
              if (action === 'confirm') {
                this.$router.push({path: '/buyPartner/' + this.id + '/1'})
              } else {
                this.$router.go(-1);
              }
            });
          }
        })
      }
    },
    updated() {
      let audioList = document.querySelectorAll('.audioList');
      this.audioListObject = audioList;
      let that = this;
      if (this.$refs.video1) {
        this.$refs.video1.onplay = function () {
          for (let i = 0; i < that.videoList.length; i++) {
            that.$refs['video2'].pause();
          }
          for (let j = 0; j < that.audioListObject.length; j++) {
            that.audioListObject[j].pause();
            that.audioList[j].isPlay = false;
          }
        };
      }
      if (this.$refs.video2) {
        this.$refs.video2.onplay = function () {
          for (let i = 0; i < that.videoList.length; i++) {
            that.$refs['video1'].pause();
          }
          for (let j = 0; j < that.audioListObject.length; j++) {
            that.audioListObject[j].pause();
            that.audioList[j].isPlay = false;
          }
        };
      }
      this.audioList.forEach((item) => {
        item.onpause = function () {
          item.isPlay = false;
        };
      })
      this.pageObject = document.getElementById('page');
    },
    methods: {
      // 关闭弹框
      isShowFun() {
        this.isShow = false;
      },
      // 左点击切换
      turnLeft() {
        if (this.turnShow <= 1) {
          return false
        } else {
          this.turnShow--;
        }
      },
      // 右点击切换
      turnRight() {
        if (this.turnShow >= this.turnList.length) {
          return false
        } else {
          this.turnShow++;
        }
      },
      // 播放
      playFun(inde, item) {
        if (item.courseStudy === 1 && inde !== 0) {
          this.message = "请将上一条语音听完";
          this.isShow = true;
          return false;
        }
        let that = this;
        this.audioListObject[inde].play();
        this.audioListObject[inde].onprogress = function () {
          let r = this.buffered;
          if (r.length > 0) {
            let timeBuffered = r.end(r.length - 1) / this.duration;
            that.audioList[inde].progressWidth = timeBuffered.toFixed(2) * 100;
          }
        };
        for (let i = 0; i < that.videoList.length; i++) {
          if(that.$refs['video' + (i + 1)]){that.$refs['video' + (i + 1)].pause();}
        }
        this.audioListObject[inde].ontimeupdate = function () { // 获取当前播放进度时间并显示
          if (this.buffered.length > 0) {
            let t = this.buffered.end(this.buffered.length - 1) / this.duration;
            if (t === 1) {
              that.audioList[inde].progressWidth = 100
            }
          }
          let currentTime = this.currentTime;
          let str = this.duration - parseInt(currentTime); // currentTime.toFixed(0)
          let minute = parseInt(str / 60);
          let second = parseInt(str % 60);
          if (minute > 0 && minute < 60) {
            that.audioList[inde].courseTime = (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second : second);
          } else {
            if (second < 10 && second > 0) {
              that.audioList[inde].courseTime = '00:' + '0' + second;
            } else if (second <= 0) {
              that.audioList[inde].courseTime = '00:00';
            } else {
              that.audioList[inde].courseTime = '00:' + second;
            }
          }
          let d = 100 * currentTime / this.duration;
          that.audioList[inde].moveWidth = d.toFixed(1) > 100 ? 100 : d.toFixed(1);
          /*if (Number(this.currentTime.toFixed(0)) === this.duration.toFixed(0)-10) {
            // that.currentStudyId = ;
          }*/
          if (Number(this.currentTime) === this.duration) {
            that.audioList[inde].isPlay = false;
          }
        };
        for (let j = 0; j < that.audioListObject.length; j++) {
          if (j === inde) {
            that.audioList[j].isPlay = true;
          } else {
            that.audioListObject[j].pause();
            that.audioList[j].isPlay = false;
          }
        }
        that.overClass(item.id, inde);
      },
      // 暂停
      pauseFun(index) {
        this.audioListObject[index].pause();
        this.audioList[index].isPlay = false;
      },
      // 课程听完之后发送请求
      overClass(courseId, index) {
        this.audioList[index].studyVal = '已学';
        if (index + 1 < this.audioList.length) {
          this.audioList[index + 1].courseStudy = 2;
        }
        /*for (let k = 0; k < this.audioList.length; k++) {
          if (this.audioList[k].courseStudy === 2) {
            this.audioList[k].studyVal = '已学';
            continue;
          } else {
            if (k === this.audioList.length) {
              break;
            } else {
              this.audioList[k].courseStudy = 2;
              this.audioList[k].studyVal = '未学';
              break;
            }
          }
        }*/
        if (this.goodsNo === 'N000001' && !sessionStorage.getItem('token') || sessionStorage.getItem('token') === 'userId') {
          return false
        }
        updateStudy({courseId: courseId}).then((res) => {
          // 更新学习状态
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  .learnClassTopBox {
    height: 56*@wu;
    background-color: rgba(255, 255, 255, 0.78);
    overflow: hidden;
    .topImg {
      display: block;
      height: 31*@wu;
      width: auto;
      margin-left: 23*@wu;
      margin-top: 25*@wu;
    }
  }

  .learnClassBox {
    background: url("../../../assets/img/learnClass/backImg.png");
    background-size: 100%;
    box-sizing: border-box;
    position: relative;
  }

  .learnClassBox .marginTop {
    /*margin-top: 18*@wu;*/
  }

  .turnBox {
    background-color: rgba(255, 255, 255, 0.78);
    padding: 20*@wu 25*@wu 36*@wu 25*@wu;
    position: relative;
    border-bottom: 2*@wu solid #F1F1F1;
    box-sizing: border-box;
  }

  .turnBox:last-child {
    border-bottom: none;
  }

  .turnBox .turnImg {
    height: 488*@wu;
    width: auto;
    max-width: 268*@wu;
    margin-left: 25*@wu;
    transition: opacity 5s;
  }

  .turnBox .turnBoxLeft {
    position: absolute;
    top: 240*@wu;
    left: 35*@wu;
    width: 7*@wu;
    height: 18*@wu
  }

  .turnBox .turnBoxRight {
    position: absolute;
    top: 240*@wu;
    right: 28*@wu;
    width: 7*@wu;
    height: 18*@wu
  }

  .turnBox .moveCss {
    animation: myMmove 5s infinite;
  }

  .turnBox .secondImg {
    width: auto;
    height: 31*@wu;
    display: block;
    vertical-align: top;
    margin-left: -5px;
  }

  .videoBox {
    display: inline-block;
    vertical-align: top;
    overflow: hidden;
    margin-top: 25*@wu;
    margin-bottom: 5*@wu;
    background-color: #3F3E3E;
    position: relative;
  }

  .videoBoxLastChild {
    margin-bottom: 0;
  }

  .videoBox video {
    width: 325*@wu;
    height: 190*@wu;
    border-radius: 7*@wu;
    position: relative;
    z-index: 10;
    display: block;
  }

  .videoBox img {
    width: 43*@wu;
    height: 43*@wu;
    position: absolute;
    top: 75*@wu;
    left: 140*@wu;
    z-index: 100;
  }

  .videoBottom {
    margin: 20*@wu auto 0 auto;
    display: block;
  }

  .audioBox {
    clear: both;
    padding-bottom: 18*@wu;
  }

  .audioBox .audioTit {
    width: 325*@wu;
    height: auto;
    display: block;
    margin-top: 20*@wu;
  }

  .audioBox .audioCenterBox {
    margin-top: 17*@wu;
    display: flex;
    align-items: center;
  }

  .playPurse {
    display: inline-block;
    width: 30*@wu;
    height: 30*@wu;
    vertical-align: middle;
  }

  .progressBox {
    width: 220*@wu;
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
    width: 76*@wu;
    text-align: right;
  }

  .test6Img {
    width: 250*@wu;
    height: auto;
    display: block;
    margin: 20*@wu 0 0 15*@wu;
  }

  .classImg2 {
    width: 310*@wu;
    height: auto;
    display: block;
    margin: 28*@wu auto 0 auto;
  }

  .classImg3 {
    width: 328*@wu;
    height: auto;
    display: block;
    margin: 28*@wu auto 0 auto;
  }

  .test8Img {
    width: 328*@wu;
    height: auto;
    display: block;
    margin: 50*@wu auto 0 auto;
  }

  .ewm {
    width: 194*@wu;
    height: 194*@wu;
    display: block;
    margin: 20*@wu auto 40*@wu auto;
  }

  .test9Img {
    width: auto;
    height: 12*@wu;
    display: block;
    margin: 50*@wu auto 0 auto;
  }

  .threeOkBox {
    display: block;
    vertical-align: top;
    overflow: hidden;
    margin: 0 auto;
    margin-top: 30*@wu;
    width: 314*@wu;
  }

  .threeOkBox img {
    width: 310*@wu;
    height: auto;
    display: block;
    margin: 0 auto 16*@wu auto;
  }

  .threeOkBox img:last-child {
    margin-bottom: 0;
  }
</style>
