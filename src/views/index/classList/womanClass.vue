<template>
  <div id="page" class='page womanClassBox' v-show="classShow">
  	<div class="beforeTaking">
  		<img src="../../../assets/img/nvxingkecheng/womenclass_daoyu.png" class="daoyu"/>
  		<div v-for="(item,index) in turnList" :key="item.id" v-html="item.comment" class="beforeTaking-text">{{item.comment}}</div>
  	</div>
  	<div class="coursetutorials">
  		<img src="../../../assets/img/nvxingkecheng/womenclass_jiaocheng.png"/>
  	</div>  	
    <div class="womanBox">
      <div class="videoBox" v-if="videoList.length>0">
        <video ref="video1" :poster="videoList[0].comment" controls :src="videoList[0].courseLink" v-if="videoList[0] && videoList[0].courseLink"></video>
      </div>
      <div class="audioBox " v-for="(item,index) in audioList">
      	<div class="audioBox-top">
      		  <div class="audioTit">{{ item.courseTitle }}</div>
      		  <div class="audioCenterBox">
                <img class="playPurse" src="../../../assets/img/nvxingkecheng/nvxingneiyepused.png" @click="playFun(index,item)" v-if="!item.isPlay">
                <img class="playPurse" src="../../../assets/img/nvxingkecheng/nvxingneiyeplayed.png" @click="pauseFun(index,item)" v-if="item.isPlay">
                <div class="progressBox">
                    <audio class="audioList" :src="item.courseLink"></audio>
                    <div :style="{width: item.moveWidth + '%'}" style="z-index: 9"><span></span></div>
                    <div :style="{width: item.progressWidth + '%'}" style="background-color: #a0a0a0"></div>
                </div>
                <div class="audioTime">{{item.courseTime}} {{item.studyVal}}</div>
            </div>
            <div class="audioTime-currenttime">{{item.audiocurrenttime}}</div>
      	</div>        
        <div class="comment" v-if="item.comment&&item.comment.indexOf('http')==-1" v-html="item.comment"></div>
        <div class="comment" v-if="item.comment&&item.comment.indexOf('http')!=-1&&item.comment.indexOf('.mp4')==-1"><img :src="item.comment"/></div>
        <div class="comment" v-if="item.comment&&item.comment.indexOf('http')!=-1&&item.comment.indexOf('.mp4')!=-1"><video ref="video2" :poster="item.comment.substring(item.comment.indexOf(',')+1,item.comment.length)" controls :src="item.comment.substring(0,item.comment.indexOf(','))" ></video></div>
      </div>   
    </div>
    <div class="classIntroBox">
    	<img :src="item.courseLink" v-for="(item,index) in classIntroAm" :key="item.id" />
    </div>
    <div class="explain" v-if="goodsNo !== 'W000003'">
	   		<div class="buyEwm" v-if="goodsNo !== 'W000003'">
           <img :src="contentImgList[contentImgList.length-1].courseLink" v-if="contentImgList[contentImgList.length-1] && contentImgList[contentImgList.length-1].courseLink">
	   		</div>
	   		 <div class="nextClassTit" v-if="goodsNo !== 'W000003'">扫一扫报名学习第{{goodsNo==='W000001'?'二':goodsNo==='W000002'?'三':'四'}}节课</div>
  	</div>
    <div class="threeOkBox">
        <img :src="item.courseLink" v-for="(item,index) in contentImgList" v-if="index < contentImgList.length-1">
    </div>            
   <alert-box :message="message" @isShow="isShowFun" v-if="isShow"></alert-box>
    <follow-public :page-object="pageObject" v-if="pageObject && $store.getters.getToken"></follow-public>
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
        classIntroAm: [],          
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
//    this.classIntroAm.forEach((item,index)=>{
//      if(item.goodsNo === this.goodsNo){
//        this.classIntroIndex = index;
//      }
//    });
      if (this.goodsNo === 'W000001' && !this.$store.getters.getToken || this.$store.getters.getToken === 'userId') {
        freeLearn({goodsId: this.id}).then((res) => {
          Indicator.close();
          if (res.code === 'Y') {
          	this.classIntroAm=res.data.courseInfo || [];
            this.turnList = res.data.broadcastImgList || [];
            this.videoList = res.data.videoList || [];
            let audios = res.data.audioList || [];
            // 添加相应属性
            audios.forEach((item, index) => {
              item.isPlay = false;   // 是否播放
              item.moveWidth = 0;   // 播放长度
              item.progressWidth = 0;  // 缓存进度条
              item.audiocurrenttime="00:00";//音频当前播放时长
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
          	this.classIntroAm=res.data.courseInfo || [];
            this.turnList = res.data.broadcastImgList || [];
            this.videoList = res.data.videoList || [];
            let audios = res.data.audioList || [];
            // 添加相应属性
            audios.forEach((item, index) => {
              item.isPlay = false;   // 是否播放
              item.moveWidth = 0;   // 播放长度
              item.progressWidth = 0;  // 缓存进度条
              item.audiocurrenttime="00:00";//音频当前播放时长
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
          if (minute1 > 0 && minute1 < 60) {
            that.audioList[inde].audiocurrenttime = (minute1 < 10 ? '0' + minute1 : minute1) + ':' + (second1 < 10 ? '0' + second1 : second1);
          } else {
            if (second1 < 10 && second1 > 0) {
              that.audioList[inde].audiocurrenttime = '00:' + '0' + second1;
            } else if (second1 <= 0) {
              that.audioList[inde].audiocurrenttime = '00:00';
            } else {
              that.audioList[inde].audiocurrenttime = '00:' + second1;
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
    width:375*@wu;
    margin-top:50*@wu;
    img {
    	width:375*@wu;
    	display: block;
    }
    
  }
  .explain{
    width: 375*@wu;
    height: 442*@wu;
    box-sizing: border-box;
    background: url(../../../assets/img/nvxingkecheng/nvxingqcode.jpg) center no-repeat;
    background-size:375*@wu 442*@wu;
    position: relative;
    .buyEwm{
    	width:203*@wu;
    	height:200*@wu;
    	border-radius: 4*@wu;
    	position: absolute;
    	left:86*@wu;
    	top:151*@wu;
    	box-sizing: border-box;
    	padding:12*@wu 13*@wu;
    	img{
    		width:177*@wu;
    		height:177*@wu;
    		display: block;
    	}
    }
    .nextClassTit{
    	width:203*@wu;
    	height:46*@wu;
    	position: absolute;
    	left:86*@wu;
    	top:351*@wu;
    	font-size:14*@wu;
    	color:#6B123A;
    	line-height:46*@wu;
    	text-align: center;
    }
  }
  .threeOkBox {
        display: block;
        vertical-align: top;
        overflow: hidden;
        width: 375*@wu;
        img {
          width: 375*@wu;
          height: auto;
          display: block;
          margin: 0 auto;
        }
      }
  .womanClassBox {
    box-sizing: border-box;
    position: relative;
    background-color: rgb(255, 255, 255);
    padding-top:30*@wu;
  }
  .beforeTaking{
  	background: #ffeff5;
  	.beforeTaking-text{
  		padding:0 34*@wu;
  		color:#242424 !important;
  		line-height:24*@wu;
  		font-size:14*@wu;
  		padding-bottom:10*@wu;
  	}
  }
  .daoyu{
  	max-width:375*@wu;
  	display: block;
  }
  .coursetutorials{
  	background: #fff;
  	margin-top:-15*@wu;
  	img{
  		max-width:375*@wu;
  		display: block;
  	}
  }  
  .womanBox {
      background: #FFFFFF;     
      width:375*@wu;
      box-sizing: border-box;
      padding:0 16*@wu;
      padding-top: 34*@wu;      
      .videoBox {
        width: 325*@wu;
        display: block;
        vertical-align: top;
        overflow: hidden;
        margin: 0 auto;
        margin-bottom:36*@wu;
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
      	border-radius: 5*@wu;
        clear: both;
        margin-bottom:15*@wu;
        background: #ffeff5;
        .audioBox-top{
      		box-shadow: 0 3*@wu 8*@wu 1*@wu rgba(221,133,161,0.26);
      		padding: 15*@wu 12*@wu 12*@wu 12*@wu;
      		box-sizing: border-box; 
      		border-radius: 5*@wu;
      		background: #fff;
      		.audioTit {
		          height: auto;
		          font-size: 14*@wu;
		          color: #242424;
		          overflow: hidden;
		          text-overflow: ellipsis;
		          margin-left: 40*@wu;
		      }     		
      	}        
        .comment{
          line-height: 25*@wu;
          font-size: 13px;
          color: #280000;
          word-break: break-all;
          padding-bottom:0;
          img{
          	max-width: 100%;
          }
          video{
          	width: 343*@wu;
          	height:225*@wu;
          }
        }
        .audioCenterBox {
          display: flex;
          align-items: center;
          position: relative;
          top:-5*@wu;
        }
        .playPurse {
          display: inline-block;
          width: 30*@wu;
          height: 30*@wu;
          vertical-align: middle;
          margin-right:8*@wu;
        }
        .progressBox {
          width: 220*@wu;
          height: 3px;
          display: inline-block;
          background-color: #dedede;
          vertical-align: middle;
          margin-left: 8*@wu;
          position: relative;
        }
        .progressBox > div {
          background-color: #ff505e;
          height: 3px;
          position: absolute;
          z-index: 8;
        }
        .progressBox > div span {
          position: absolute;
          right: -1px;
          top: 0px;
          background-color: tan;
          width: 3px;
          height: 3px;
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
    }
.audioTime-currenttime{
	font-size:14*@wu;
	color:#5A5A5A;
	width:200*@wu;
	margin-left:39*@wu;
	margin-top:-10*@wu;
}
</style>
