<template>
  <div id="page" class='page womanClassBox' v-show="classShow">
    <img src="../../../assets/img/womanTop.png" class="womanTopImg">
    <div class="beforeTaking">
      前言<span>一</span>
    </div>
    <img src="../../../assets/img/floor2.png" class="floor1">
    <div class="womanBox">
      <div class="introduction" v-html="turnList[0] && turnList[0].comment">
        随着时代的发展，进步，越来越多的女性被妇科疾病所困扰，我们希望通过从观念上打通，让所有的女性能够清楚的知道自己的病因，明白自己的痛苦，树立正确的女性观念，做到真正的自我保护，远离痛苦，疾病，做一个真正健康幸福的女人！
      </div>
      <div class="teacher">
        <img src="../../../assets/img/teacher.png">
        <span>教&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;程</span>
      </div>
      <div class="videoBox" v-if="videoList.length>0">
        <video ref="video1" poster="" controls :src="videoList[0].courseLink" v-if="videoList[0] && videoList[0].courseLink"></video>
      </div>
      <div class="audioBox " v-for="(item,index) in audioList">
        <div class="audioTit">{{ item.courseTitle }}</div>
        <div class="audioCenterBox">
          <img class="playPurse" src="../../../assets/img/womanPlay.png" @click="playFun(index,item)" v-if="!item.isPlay">
          <img class="playPurse" src="../../../assets/img/womanParse.png" @click="pauseFun(index,item)" v-if="item.isPlay">
          <div class="progressBox">
            <audio class="audioList" :src="item.courseLink"></audio>
            <div :style="{width: item.moveWidth + '%'}" style="z-index: 9"><span></span></div>
            <div :style="{width: item.progressWidth + '%'}" style="background-color: #a0a0a0"></div>
          </div>
          <div class="audioTime">{{item.courseTime}} {{item.studyVal}}</div>
        </div>
        <div class="comment" v-if="item.comment" v-html="item.comment"></div>
      </div>

      <div class="classIntroBox">
        <div class="titleBox" v-if="classIntroIndex!==''">
          {{classIntroAm[classIntroIndex].title}}
          <img src="../../../assets/img/classIntro.png">
        </div>
        <div class="lassDetail" v-html="classIntroAm[classIntroIndex].val" v-if="classIntroIndex!==''"></div>
      </div>

      <div class="explain" v-if="goodsNo !== 'W000003'">
        <div>
          终生免费学习，接受私人辅导
        </div>
      </div>

      <div class="nextClassTit" v-if="goodsNo !== 'W000003'">扫描下方二维码报名学习第{{goodsNo==='W000001'?'二':goodsNo==='W000002'?'三':'四'}}节课</div>
      <div class="buyEwm" v-if="goodsNo !== 'W000003'">
        <img :src="contentImgList[contentImgList.length-1].courseLink" v-if="contentImgList[contentImgList.length-1] && contentImgList[contentImgList.length-1].courseLink">
      </div>

      <div class="effectBox">
        效&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;果
        <img src="../../../assets/img/effectBox.png">
      </div>

      <div class="threeOkBox">
        <img :src="item.courseLink" v-for="(item,index) in contentImgList" v-if="index < contentImgList.length-1">
      </div>
    </div>
    <div class="womanBottomBox">
      您与美丽更进一步~
      <div>You and beauty go further</div>
      <img src="../../../assets/img/womanBottom.png" class="bigImg">
    </div>
    <alert-box :message="message" @isShow="isShowFun" v-if="isShow"></alert-box>
    <follow-public :page-object="pageObject" v-if="pageObject && !$store.getters.getUserInfo.subscribe"></follow-public>
  </div>
</template>

<script>
  import {goodsLearn, updateStudy, freeLearn} from '@/api/index'
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
        // 页面加载完才显示
        classShow: false,
        // 课程介绍对象
        classIntroAm: [
          {goodsNo: 'W000001',title: '第二节课介绍',val: '1. 性生活中要严格注意的事项<br>2. 如何通过一套方法使阴道恢复紧致<br>3. 如何通过一套方法打通全身气机<br>4. 如何通过一套方法打通先天之气<br>5. 如何通过一套方法排除体内毒素'},
          {goodsNo: 'W000002',title: '女性课程的十大好处',val: '1. 打通全身气血，使身体更加顺畅<br>2. 预防妇科疾病，调理轻微的妇科疾病，减缓重度妇科疾病<br>3. 治疗月经不调，痛经等症状<br>4. 治疗内分泌失调，做健康女人<br>5. 收缩阴道，恢复青春紧致，做高潮女人<br>6. 远离干涩，无水等症状，性生活更加和谐<br>7. 改变身体整体素质，让身体年轻至少十岁<br>8. 延缓女性绝经，做长久魅力女人<br>9. 排除体内的淤、寒、毒、宫寒、体寒等症状。<br>10. 皮肤更加光泽，身材更加饱满'}
          ],
        // 当前课程介绍的索引
        classIntroIndex: '',
        pageObject:''
      }
    },
    created() {
      document.title = '课程学习';
      Indicator.open({
        text: '努力加载中...',
        spinnerType: 'fading-circle'
      });
      this.classIntroAm.forEach((item,index)=>{
        if(item.goodsNo === this.goodsNo){
          this.classIntroIndex = index;
        }
      });
      if (this.goodsNo === 'W000001' && !this.$store.getters.getToken || this.$store.getters.getToken === 'userId') {
        freeLearn({goodsId: this.id}).then((res) => {
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
              item.studyVal = '未学';
            });
            this.audioList = audios;
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
      this.pageObject = document.getElementById('page');
      let audioList = document.querySelectorAll('.audioList');
      this.audioListObject = audioList;
      let that = this;
      if (this.$refs.video1) {
        this.$refs.video1.onplay = function () {
          for (let i = 0; i < that.videoList.length; i++) {
            if(that.$refs['video' + (i + 1)] && that.$refs['video' + (i + 1)]!==that.$refs['video' + (i + 1)]){that.$refs['video' + (i + 1)].pause();}
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
        if (this.goodsNo === 'W000001' && !sessionStorage.getItem('token') || sessionStorage.getItem('token') === 'userId') {
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
  .classIntroBox{
    padding: 20*@wu 0 30*@wu 0;
    .titleBox{
      position: relative;
      text-align: center;
      font-size: 15*@wu;
      color: #262525;
      margin-bottom: 10*@wu;
      img{
        position: absolute;
        top: 0;
        left: calc(~'50% -' 93*@wu);
        width: 186*@wu;
        height: auto;
      }
    }
    .lassDetail{
      font-size: 13*@wu;
      color: #474545;
      display: flex;
      justify-content: center;
      line-height: 20*@wu;
    }
  }
  .womanBottomBox{
    font-size: 16*@wu;
    color: #FFFFFF;
    height: 80*@wu;
    text-align: center;
    padding-top: 20*@wu;
    position: relative;
    z-index: 12;
    .bigImg{
      width: 302*@wu;
      height: 170*@wu;
      position: absolute;
      right: 0;
      bottom: 0;
    }
    div{
      font-size: 10*@wu;
      color: #FEECEC;
    }
  }
  .floor1{
    position: absolute;
    top: 380*@wu;
    right: 0;
    z-index: 20;
    width: 56*@wu;
    height: auto;
  }
  .womanClassBox {
    box-sizing: border-box;
    position: relative;
    background-color: rgb(251, 156, 195);
    .womanTopImg {
      width: 153*@wu;
      height: auto;
      display: block;
      margin: 26*@wu 0 0 16*@wu;
    }
    .beforeTaking {
      width: 150*@wu;
      height: 38*@wu;
      line-height: 38*@wu;
      background-color: #E82575;
      box-shadow: 8*@wu 9*@wu 0 0 rgba(232, 37, 117, 0.2);
      border-bottom: 1px solid #F1F1F1;
      color: #ffffff;
      text-align: center;
      font-size: 18*@wu;
      position: absolute;
      top: 174*@wu;
      left: 0;
      z-index: 11;
      span {
        color: rgba(251, 156, 195, 0.5);
        font-weight: 600;
        margin-left: 10*@wu;
      }
    }
    .womanBox {
      background: #FFFFFF;
      box-shadow: 0 0 10*@wu 0 rgba(237, 39, 39, 0.50);
      border-radius: 4*@wu;
      margin: 0 10*@wu;
      box-sizing: border-box;
      padding-top: 87*@wu;
      overflow: hidden;
      // position: relative;
      // z-index: 10;
      .introduction {
        font-size: 15*@wu;
        color: #474545;
        padding: 0 40*@wu 40*@wu 40*@wu;
        line-height: 28*@wu;
        border-bottom: 1px solid rgb(241,241,241);
        margin-bottom: 40*@wu;
      }
      .teacher {
        text-align: center;
        overflow: hidden;
        position: relative;
        img {
          width: 214*@wu;
          height: 46*@wu;
        }
        span {
          display: block;
          width: 214*@wu;
          height: 36*@wu;
          text-align: center;
          font-size: 18*@wu;
          color: #151414;
          position: absolute;
          top: 10*@wu;
          left: 70*@wu;
        }
      }
      .videoBox {
        width: 325*@wu;
        display: block;
        vertical-align: top;
        overflow: hidden;
        margin: 36*@wu auto;
        background: #FFFFFF;
        box-shadow: 0 0 10*@wu 1*@wu rgba(200, 200, 200, 0.5);
        border-radius: 4*@wu;
        position: relative;
        video {
          width: 325*@wu;
          height: 190*@wu;
          border-radius: 7*@wu;
          position: relative;
          z-index: 10;
          display: block;
        }
      }
      .audioBox {
        clear: both;
        padding: 0 25*@wu 18*@wu 25*@wu;
        box-sizing: border-box;
        .audioTit {
          width: 280*@wu;
          height: auto;
          margin-top: 5*@wu;
          font-size: 15*@wu;
          color: #262525;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-left: 30*@wu;
        }
        .comment{
          margin-top: 20*@wu;
          display: flex;
          justify-content: center;
          line-height: 25*@wu;
          font-size: 13px;
          color: #280000;
          word-break: break-all;
          padding-bottom:0;
        }
        .audioCenterBox {
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
      }
      .effectBox{
        height: 71*@wu;
        padding: 25*@wu 0 0 0;
        border-top: 1px solid rgb(241,241,241);
        position: relative;
        line-height: 96*@wu;
        text-align: center;
        font-size: 18*@wu;
        color: #151414;
        img{
          width: auto;
          height: 71*@wu;
          position: absolute;
          left: 50*@wu;
          top: 25*@wu;
          z-index: -1;
        }
      }
      .threeOkBox {
        display: block;
        vertical-align: top;
        overflow: hidden;
        margin: 30*@wu auto 0 auto;
        width: 314*@wu;
        img {
          width: 310*@wu;
          height: auto;
          display: block;
          margin: 0 auto 16*@wu auto;
        }
      }
      .explain{
        width: 290*@wu;
        height: 70*@wu;
        margin: 30*@wu auto 40*@wu auto;
        border: 1px solid #E2DDE4;
        box-sizing: border-box;
        padding: 4*@wu;
        div{
          width: 100%;
          height: 100%;
          background-color: rgb(226,221,228);
          text-align: center;
          line-height: 62*@wu;
        }
      }
      .nextClassTit{
        font-size: 15*@wu;
        color: #262525;
        text-align: center;
      }
      .buyEwm{
        width: 162*@wu;
        height: 162*@wu;
        margin: 20*@wu auto 50*@wu auto;
        padding: 10*@wu;
        img{
          width: 162*@wu;
          height: 162*@wu;
          box-shadow: 18*@wu -15*@wu 0 -5*@wu rgb(255, 243, 248);
          border: 1px solid #dedede;
        }
      }
    }
  }
</style>
