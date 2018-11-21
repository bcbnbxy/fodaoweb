<template>
  <div class="page pageColor">
    <div class="contentWrap" :class="{contentWrapActive: chooseImgFlg}">
      <div class="time">上午1:55</div>
      <div class="customer">
        <img class="customerImg" src="../../../assets/img/answer.png">
        <div class="dialog">
          <div class="rightContent">
            <span> 您好,客服正在补充睡眠哦~在线咨询问题请于明天早上9:00-24:00咨询哦~</span>
          </div>
        </div>
      </div>
      <!--<div class="user">
        <img class="userImg" src="../../../assets/img/userImg.png" alt="">
        <div class="dialog">
          <div class="leftContent">
            <span> 您好,你们的课程好难学啊,有没有老师专门教?</span>
          </div>
        </div>
      </div>
      <div class="customer">
        <img class="customerImg" src="../../../assets/img/answer.png">
        <div class="dialog">
          <div class="leftContent">
          </div>
          <div class="rightContent">
            <span> 您好,客服正在补充睡眠哦~在线咨询问题请于明天早上9:00-24:00咨询哦~</span>
          </div>
        </div>
      </div>-->
      <div class="time">下午1:55</div>
      <div class="user" v-for="(item,index) in myList">
        <img class="userImg" src="../../../assets/img/userImg.png" alt="">
        <div class="dialog">
          <div class="leftContent" v-if="item.test">
            <span>{{item.test}}</span>
          </div>
          <div class="audioSrc" v-if="item.audioSrc" @click="playAudio('audio' + index)">
            <audio :id="'audio' + index" :src="item.audioSrc"></audio>
          </div>
          <div class="imgSrc" v-if="item.imgSrc">
            <img :src="item.imgSrc">
          </div>
        </div>
        <p class="readState">{{item.isReady?'已读':'未读'}}</p>
        <img class="exclamatory" src="../../../assets/img/exclamatory.png">
      </div>
    </div>
    <div class="enterBox" :class="{btnBoxHeight: sendFlg}">
      <div class="inputBox">
        <div class="enterAudio" @click="enterAudioFun()"></div>
        <div class="enterSpeak" v-if="enterSpeakFlg" @mousedown="enterSpeakFun()" @touchstart="enterSpeakFun()"
             @touchmove="enterSpeakCancel()" @touchend="enterSpeakEnd()">按住说话
        </div>
        <input type="text" @focus="consultationFocus()" @input="canSendBtnShow()" v-model="sendVal" v-else>
        <div class="addBox">
          <span v-if="sendFlg && sendVal!==''">发送</span>
          <img src="../../../assets/img/jiahao.png" @click="chooseImgFlg = !chooseImgFlg;enterSpeakFlg=false" v-else>
        </div>
      </div>
      <div class="chooseList" v-if="chooseImgFlg">
        <div class="chooseBox" @click="chooseImg()">
          <img src="../../../assets/img/picture.png">
          图片
        </div>
      </div>
    </div>
    <div class="audioShowBox" v-if="clickSpeakFlg">
      <span v-if="speakFlg">说话中</span>
      <span v-else>取消发送</span>
    </div>
  </div>
</template>
<script>
  import wx from 'weixin-js-sdk'
  import {Toast} from 'mint-ui'
  export default {
    data() {
      return {
        sendFlg: true,
        // 是否选择图片
        chooseImgFlg: false,
        // 是否输入语音控制
        enterSpeakFlg: false,
        // 正在发送或者取消发送控制
        speakFlg: true,
        // 点击语音显示状态控制
        clickSpeakFlg: false,

        kfList: [],
        myList: [
          {
            imgSrc: 'https://goss.veer.com/creative/vcg/veer/800water/veer-132289397.jpg',
            audioSrc: '',
            test: '',
            userSrc: '',
            audioLength: 0,
            isReady: 0
          },
          {
            imgSrc: '',
            audioSrc: 'http://p8i1x61e3.bkt.clouddn.com/woman/mp3/WomanFirstFirst.mp3',
            test: '',
            userSrc: '',
            audioLength: 0,
            isReady: 0
          }
        ],
        sendVal: '',
        // 语音播放对象
        audioObj: 0,
        // 录音开始时间
        startTime: 0
      }
    },
    mounted() {
      document.title = '咨询中心';
    },
    methods: {
      // 选择图片发送
      chooseImg() {
        let that = this;
        wx.ready(function () {
          wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
              let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
              that.myList[0].imgSrc = localIds;
            }
          });
        })
      },
      // 获取焦点计算滚动框高度
      consultationFocus() {
        // alert(window.innerHeight)
        this.sendFlg = true;
        this.chooseImgFlg = false;
      },
      // 监控发送按钮的值
      canSendBtnShow() {
        if (this.sendVal !== '') {

        }
      },
      // 切换语音输入事件
      enterAudioFun() {
        this.enterSpeakFlg = !this.enterSpeakFlg;
        this.chooseImgFlg = false;
      },
      // 按住说话事件  开始录音
      enterSpeakFun(e) {
        wx.ready(function () {
          wx.startRecord();
          wx.onVoiceRecordEnd({
            // 录音时间超过一分钟没有停止的时候会执行 complete 回调
            complete: function (res) {
              Toast('最多只能录制一分钟');
              var localId = res.localId;
              // uploadluyin(localId,60000);
            }
          });
        });
        let event = e || window.event;
        event.stopPropagation();
        event.preventDefault();
        this.clickSpeakFlg = true;
        event.target.style.backgroundColor = '#cacaca';
        event.target.style.color = '#ffffff';
        this.startTime = new Date().getTime();

      },
      // 移动出去为取消
      enterSpeakCancel(e) {
        let event = e || window.event;
        let touch = event.targetTouches[0];
        let ele = document.elementFromPoint(touch.pageX, touch.pageY);
        if (ele.className === 'enterSpeak') {
          this.speakFlg = true;
        } else {
          this.speakFlg = false;
        }
      },
      // 语音说话结束
      enterSpeakEnd(e) {
        let that = this;
        let event = e || window.event;
        event.target.removeAttribute('style');
        this.clickSpeakFlg = false;
        this.speakFlg = true;
        let newDate = new Date().getTime();
        if(newDate - this.startTime < 1000){
          Toast('录音时间太短！');
          return false
        }
        wx.ready(function () {  // 停止录音
          wx.stopRecord({
            success: function (res) {
              let localId = res.localId;
              // alert(localId);
              that.audioObj = localId;
              // that.myList[0].audioSrc = localId;
              wx.uploadVoice({
                localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (res) {
                  var serverId = res.serverId; // 返回音频的服务器端ID
                  console.log('服务器端ID:' + serverId);
//                alert(serverId);
                  wx.downloadVoice({
                    serverId: serverId, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: function (res) {
                      var localId = res.localId; // 返回音频的本地ID
                      console.log('本地ID:' + localId);
                      console.log(localId);
                    }
                  });
                }
              });
            }
          });
        });
      },
      // 播放音频
      playAudio(idName){
        let audio = document.getElementById(idName);
        // console.log(audio);
        // alert(audio.id);
        wx.playVoice({
          localId: this.audioObj // 需要播放的音频的本地ID，由stopRecord接口获得
        });
        // audio.play();
      }
    }
  }
</script>
<style lang="less" scoped>
  @wu: 100vw/375;
  .audioShowBox {
    width: 160*@wu;
    height: 160*@wu;
    background-color: rgba(0, 0, 0, 0.6);
    text-align: center;
    position: absolute;
    top: 20%;
    left: 107.5*@wu;
    z-index: 3000;
    color: #ffffff;
    border-radius: 10*@wu;
  }

  .contentWrap {
    height: calc(~'100% -'52 * @wu);
    overflow: auto;
  }

  .contentWrapActive {
    height: calc(~'100% -'168 * @wu);
  }

  .btnBoxHeight {
    height: 50*@wu !important;
  }

  .enterBox {
    height: 200*@wu;
    border-top: 1px outset #dedede;
    .inputBox {
      height: 50*@wu;
      display: flex;
      padding: 5*@wu 0;
      align-items: center;
      background-color: #ffffff;
      box-sizing: border-box;
      .enterAudio {
        width: 27*@wu;
        height: 27*@wu;
        background: url("../../../assets/img/voice.png") no-repeat;
        background-size: 27*@wu;
        margin: 0 15*@wu;
      }
      .enterSpeak {
        height: 32*@wu;
        width: 260*@wu;
        text-align: center;
        font-size: 16*@wu;
        line-height: 32*@wu;
        border: 1px solid #C3C3C3;
        border-radius: 5*@wu;
        -webkit-user-select: none;
        user-select: none;
      }
      input {
        border: 1px solid #C3C3C3;
        border-radius: 5*@wu;
        height: 30*@wu;
        width: 260*@wu;
        text-indent: 5*@wu;
      }
      .addBox {
        text-align: center;
        width: 50*@wu;
        img {
          width: 29*@wu;
        }
        span {
          font-size: 16*@wu;
          color: #FFC940;
        }
      }
    }
    .chooseList {
      text-align: center;
      padding-bottom: 20*@wu;
      .chooseBox {
        width: 60*@wu;
        overflow: hidden;
        text-align: center;
        font-size: 12*@wu;
        color: #6D6C6C;
        margin: 0 auto;
        img {
          width: 28*@wu;
          padding: 16*@wu;
          background-color: #ffffff;
          border-radius: 5*@wu;
          margin: 20*@wu auto 5*@wu auto;
          display: block;
        }
      }
    }
  }

  .time {
    width: 55*@wu;
    height: 21*@wu;
    opacity: 0.43;
    background: #ADABAB;
    border-radius: 3*@wu;
    font-size: 10*@wu;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 21*@wu;
    text-align: center;
    margin-top: 16*@wu;
    margin-left: 50%;
    transform: translateX(-50%);
  }

  .customer {
    display: flex;
    flex-direction: row;
    margin: 18*@wu 0 0 14*@wu;
    .dialog {
      .rightContent:before {
        border: 8*@wu solid;
        border-color: transparent #fff transparent transparent;
        content: "";
        position: absolute;
        width: 0;
        left: -14*@wu;
        height: 0;
      }
      .rightContent {
        width: 229*@wu;
        font-size: 16*@wu;
        color: #474545;
        background-color: #fff;
        border-radius: 10*@wu;
        letter-spacing: 0.53*@wu;
        margin-left: 22*@wu;
        border: 1px solid transparent;
        position: relative;
        span {
          display: block;
          margin: 12*@wu 10*@wu;
          font-size: 15*@wu;
          color: #4C4A4A;
          letter-spacing: 0;
        }
      }
    }
  }

  .user {
    display: flex;
    flex-direction: row-reverse;
    margin: 18*@wu 14*@wu 0 0;
    .dialog {
      width: 240*@wu;
      .leftContent:before {
        border: 8*@wu solid;
        content: "";
        position: absolute;
        width: 0;
        right: -14*@wu;
        height: 0;
        border-color: transparent transparent transparent #ffcf69;
      }
      .leftContent {
        width: 229*@wu;
        font-size: 16*@wu;
        color: #474545;
        background-color: #ffcf69;
        border-radius: 10*@wu;
        letter-spacing: 0.53*@wu;
        border: 1px solid #ffcf69;
        margin-right: 22*@wu;
        position: relative;
        span {
          display: block;
          margin: 12*@wu 10*@wu;
          font-size: 15*@wu;
          color: #4C4A4A;
          letter-spacing: 0;
        }
      }
      .audioSrc {
        height: 40*@wu;
        background-color: #4caf50;
        overflow: hidden;
        border-radius: 5*@wu;
        margin-right: 5%;
        color: #ffffff;
        position: relative;
        audio{
          width: 0;
          height: 0;
          opacity: 0;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
      .imgSrc {
        overflow: hidden;
        img {
          max-width: 95%;
        }
      }
    }
    .exclamatory {
      width: 16.8*@wu;
      height: 16.8*@wu;
      margin-right: 8.1*@wu;
      align-self: center;
    }
    .readState {
      font-size: 11*@wu;
      color: #C3C3C3;
      letter-spacing: 0;
      margin-right: 8.1*@wu;
      align-self: center;
    }
  }

  .customerImg, .userImg {
    width: 35*@wu;
    height: 35*@wu;
    border-radius: 50%;
  }
</style>
