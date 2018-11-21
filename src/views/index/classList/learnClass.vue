<template>
  <div id="page" class='page learnClassBox' v-show="classShow">
    <!--<div class="learnClassTopBox"><img src="../../../assets/img/learnClass/oneSay.png" class="topImg"
                                       v-if="audioList.length > 0"></div>-->
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
    <img class="secondImg" src="../../../assets/img/learnClass/nanxingkecheng.png">      
    <div class="turnBox marginTop" v-if="audioList.length > 0">     
      <div class="videoBox" v-if="id!=4">
        <video ref="video1" :poster="videoList[0].comment" controls :src="videoList[0].courseLink" v-if="videoList[0]"></video>
      </div>                        
      <div class="audioBox " v-for="(item,index) in audioList">        
        <div class="audioBox-left">
        	<p>{{index+1>9?index+1:'0'+(index+1)}}</p>
        	<img class="playPurse" src="../../../assets/img/learnClass/audioplay.png" @click="playFun(index,item)"
               v-if="!item.isPlay">
        	<span class="playPurse"  @click="pauseFun(index,item)"
               v-if="item.isPlay"></span>
        </div>        
        <div class="audioBox-right">
        	<p class="audioTit"><b v-if="!!item.courseTitle" style="font-weight: 500;">{{item.courseTitle}}</b><span>{{item.studyVal}}</span></p>
        	<div class="audioCenterBox">
          	<div class="progressBox">
            	<audio class="audioList" :src="item.courseLink"></audio>
            	<div :style="{width: item.moveWidth + '%'}" style="z-index: 9"><span></span></div>
            	<div :style="{width: item.progressWidth + '%'}" style="background-color: #a0a0a0"></div>
          	</div>
          	<div class="audioTime"><span>{{item.audiocurrenTime}}</span><span>{{item.courseTime}}</span></div>
        	</div>
        	<div  class="audioTit" v-html="item.comment" v-if="item.comment&&item.comment.indexOf('http')==-1&&index!=audioList.length-1">{{item.comment}}</div>
        	<div  class="audioTit" v-if="item.comment&&item.comment.indexOf('http')!=-1&&index!=audioList.length-1"><img :src="item.comment"/></div>
        </div>      
      </div>
      <div class="threeOkBox" v-if="id==4">
      	<h2>寄语</h2>
      	<div v-html="audioList[audioList.length-1].comment"></div>
        <!--<img :src="item.courseLink" v-for="(item,index) in contentImgList" v-if="index < contentImgList.length">-->
      </div>
    </div>
    <div class="turnBoxsaoma marginTop" v-if="id==1 || id==2">
    	<img src="../../../assets/img/learnClass/nanxingsaoma.png"/>
      <img class="ewm" :src="contentImgList[contentImgList.length-1].courseLink">      
    </div>
    	
    <alert-box :message="message" @isShow="isShowFun" v-if="isShow"></alert-box>
    <follow-public :page-object="pageObject" v-if="pageObject && $store.getters.getToken"></follow-public>
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
            // 添加相应属性
            audios.forEach((item, index) => {
              item.isPlay = false;   // 是否播放
              item.moveWidth = 0;   // 播放长度
              item.progressWidth = 0;  // 缓存进度条
              item.audiocurrenTime="00:00";//当前播放时长
              item.studyVal = '未学';
            });
            this.audioList = audios;
            this.contentImgList = res.data.contentImgList || [];
            this.classShow = true;
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
              item.audiocurrenTime="00:00";//当前播放时长
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
//    	console.log(this.audioListObject[inde].currentTime)
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
          let minute1 = parseInt(currentTime / 60);
          let second1 = parseInt(currentTime % 60);
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
          if(minute1 > 0 && minute1 < 60){
          	that.audioList[inde].audiocurrenTime = (minute1 < 10 ? '0' + minute1 : minute1) + ':' + (second1 < 10 ? '0' + second1 : second1);
          }else{
          	if (second1 < 10 && second1 > 0) {
              that.audioList[inde].audiocurrenTime = '00:' + '0' + second1;
            } else if (second1 <= 0) {
              that.audioList[inde].audiocurrenTime = '00:00';
            } else {
              that.audioList[inde].audiocurrenTime = '00:' + second1;
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
    background: url("../../../assets/img/learnClass/zongsebg.png");
    background-size: 100%;
    box-sizing: border-box;
    position: relative;
  }
  .turnBox {
    padding: 20*@wu 13*@wu 36*@wu 13*@wu;
    position: relative;
    box-sizing: border-box;
  }

  .turnBox:last-child {
    border-bottom: none;
  }

  .turnBox .turnImg {
    height: auto;
    width: auto;
    max-width: 349*@wu;
    display: block;
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

  .secondImg {
    width: 375*@wu;    
    display: block;
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
    width: 349*@wu;
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
    background: #fff;
    box-sizing: border-box;
    border-radius: 9*@wu;
    padding:10*@wu 13*@wu 18*@wu 13*@wu;
    margin:15*@wu 0;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
  }
	.audioBox-left{
		width:36*@wu;
		margin-right:17*@wu;
		p{
			margin:0;
			line-height: 1;
			font-size:17*@wu;
			color:#ccc;
		}
		img{
			width:36*@wu;
			height:36*@wu;
			display: block;
			margin-top:14*@wu;
		}	
		span{
			width:36*@wu;
			height:36*@wu;
			display: block;
			margin-top:14*@wu;
			display: block;
			background: url(../../../assets/img/learnClass/audioplay1.png);
			background-size:36*@wu 36*@wu ;
			animation: changecolor 3s linear  infinite;
		}
	}
	@keyframes changecolor{
    0%{
        background-image: url(../../../assets/img/learnClass/audioplay1.png);
    }
    20%{
        background-image: url(../../../assets/img/learnClass/audioplay2.png);
    }
    40%{
        background-image: url(../../../assets/img/learnClass/audioplay.png);
    }
    60%{
        background-image: url(../../../assets/img/learnClass/audioplay1.png);
    }
    80%{
        background-image: url(../../../assets/img/learnClass/audioplay2.png);
    }
    100%{
    	background-image: url(../../../assets/img/learnClass/audioplay.png);
    }    
}
@-moz-keyframes changecolor{
    0%{
        background-image: url(../../../assets/img/learnClass/audioplay1.png);
    }
    20%{
        background-image: url(../../../assets/img/learnClass/audioplay2.png);
    }
    40%{
        background-image: url(../../../assets/img/learnClass/audioplay.png);
    }
    60%{
        background-image: url(../../../assets/img/learnClass/audioplay1.png);
    }
    80%{
        background-image: url(../../../assets/img/learnClass/audioplay2.png);
    }
    100%{
    	background-image: url(../../../assets/img/learnClass/audioplay.png);
    }    
}
@-webkit-keyframes changecolor{
    0%{
        background-image: url(../../../assets/img/learnClass/audioplay1.png);
    }
    20%{
        background-image: url(../../../assets/img/learnClass/audioplay2.png);
    }
    40%{
        background-image: url(../../../assets/img/learnClass/audioplay.png);
    }
    60%{
        background-image: url(../../../assets/img/learnClass/audioplay1.png);
    }
    80%{
        background-image: url(../../../assets/img/learnClass/audioplay2.png);
    }
    100%{
    	background-image: url(../../../assets/img/learnClass/audioplay.png);
    }    
}
@-o-keyframes changecolor{
    0%{
        background-image: url(../../../assets/img/learnClass/audioplay1.png);
    }
    20%{
        background-image: url(../../../assets/img/learnClass/audioplay2.png);
    }
    40%{
        background-image: url(../../../assets/img/learnClass/audioplay.png);
    }
    60%{
        background-image: url(../../../assets/img/learnClass/audioplay1.png);
    }
    80%{
        background-image: url(../../../assets/img/learnClass/audioplay2.png);
    }
    100%{
    	background-image: url(../../../assets/img/learnClass/audioplay.png);
    }    
}
	.audioBox-right{
		flex: 1;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
	}
  .audioBox .audioTit {
    margin:0;
    width:100%;
    margin-top:16*@wu;
    font-size:16*@wu;
    color:#333;
    span{
    	float: right;
    	font-size:13*@wu;
    	color:#ccc;
    	position: relative;
    	top:3*@wu;
    }
    img{
    	max-width: 100%;
    }
  }
  .audioBox .audioCenterBox {
    margin-top: 12*@wu;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
  }

  .playPurse {
    display: inline-block;
    width: 30*@wu;
    height: 30*@wu;
    vertical-align: middle;
  }

  .progressBox {
    
    flex: 1;
    height: 2px;
    display: inline-block;
    background-color: #dedede;
    vertical-align: middle;
    margin-left: 8*@wu;
    position: relative;
  }

  .progressBox > div {
    background-color: #14AB13;
    height: 2px;
    position: absolute;
    z-index: 8;
  }

  .progressBox > div span {
    position: absolute;
    right: -10px;
    top: -8px;
    background-image:url(../../../assets/img/learnClass/nanxingshengyin.png);
    background-size:20px 20px;
    width: 20px;
    height: 20px;
    display: inline-block;
    border-radius: 50%;
    z-index: 10;
  }

  .audioTime {
    font-size: 12*@wu;
    color: #5A5A5A;
    margin-top:8*@wu;
    span:last-child{
    	float:right;
    	
    }
    
  }








  .ewm {
    width: 351*@wu;
    height: 330*@wu;
    display: block;
    margin: 20*@wu auto 40*@wu auto;
  }  
  
  .turnBoxsaoma{
  	img:first-child{
  		width:375*@wu;
  	}
  }
  .threeOkBox {
    display: block;
    vertical-align: top;
    overflow: hidden;
    margin: 0 auto;
  	width:100%;
  	background: #fff;
		border-radius: 9*@wu;
		padding:20*@wu;
		box-sizing: border-box;
		h2{
			font-size:17*@wu;
			color:#333;
			padding-left:41*@wu;
			box-sizing: border-box;
			font-weight: 500;
		}
  }

  .threeOkBox>div{
    width: 100%;
    height: auto;
    display: block;
    padding: 0 21*@wu 16*@wu 41*@wu;
    box-sizing: border-box;
  }
  .margintop{
  	padding-top:20*@wu;
  }
</style>
