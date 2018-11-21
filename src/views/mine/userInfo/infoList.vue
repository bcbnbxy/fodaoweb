<template>
  <div class='page pageColor infoList'>
    <!--<div class="topDistance"></div>-->
    <ul class="contentListUl">
      <li>
        <div>修改头像</div>
        <div>
          <img :src="userInfo.wechatImg" v-if="userInfo.wechatImg">
          <span v-else>请上传头像</span>
          <upload-img :maxSize="2" :widths="800" :heights="800" :className="'upUserImg'" @uploadImgFun="uploadImgFun"></upload-img>
        </div>
      </li>
      <router-link :to="{path: '/nickName/' + userInfo.name + '/1'}" tag="li">
        <div>昵称</div>
        <div>{{userInfo.name}}</div>
        <img src="../../../assets/img/next.png">
      </router-link>
      <router-link :to="{path: '/nickName/' + userInfo.realName + '/2'}" tag="li">
        <div>真实姓名</div>
        <div>{{userInfo.realName}}</div>
        <img src="../../../assets/img/next.png">
      </router-link>
      <li>
        <div>性别</div>
        <div @click="isMask=true;isSex = true;">{{userInfo.sex===1?'男':'女'}}</div>
        <img src="../../../assets/img/next.png" @click="isMask=true;isSex = true;">
      </li>
      <li>
        <div>所在城市</div>
        <div @click="isMask=true;isChoose = true;">{{userInfo.city}}</div>
        <img src="../../../assets/img/next.png" @click="isMask=true;isChoose = true;">
      </li>
      <router-link to="/addressManage/2" tag="li">
        <div>收货地址</div>
        <div></div>
        <img src="../../../assets/img/next.png">
      </router-link>
      <router-link :to="{name: 'myEwm', params: {url: userInfo.wechatIdUrl }}"tag="li">
        <div>我的微信二维码</div>
        <div></div>
        <img src="../../../assets/img/next.png">
      </router-link>
    </ul>

    <div class="mask" @click="closeMask()" v-if="isMask"></div>
    <div class="sexChooseBox" v-if="isSex">
      <div @click="changeSix(1)">男</div>
      <div @click="changeSix(2)">女</div>
    </div>

    <div class="sureBtn" v-show="isChoose"><i @click="closeMask()">取消</i><span @click="conShowChoose()">确定</span></div>
    <mt-picker class="pickerSe" :slots="slots1" @change="onValuesChange1" value-key="name" v-show="isChoose"></mt-picker>
    <mt-picker class="pickerSs" :slots="slots2" @change="onValuesChange2" value-key="name" v-show="isChoose"></mt-picker>

    <alert-box :message="message" @isShow="isShowFun" v-if="isShow"></alert-box>
  </div>
</template>

<script>
  import {Picker} from 'mint-ui'
  import uploadImg from '@/components/uploadImg'
  import {userPatch} from '@/api/index'
  export default {
    components:{
      uploadImg
    },
    data() {
      return {
        isMask: false,
        isSex: false,
        isChoose: false,
        userInfo: this.$store.getters.getUserInfo,
        slots1: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'center'
          }
        ],
        slots2: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'center'
          }],
        areaData: [],
        province: '',
        city: '',

        message: '',
        isShow: false
      }
    },
    created(){
      // 判断能不能使用本地省市区数据
      document.title = '完善信息';
      if(!localStorage.getItem('area')){
        let script = document.createElement('script');
        script.src='/static/Cities.js?' + new Date().getTime();
        document.body.appendChild(script);
        let that = this;
        script.onload = function(){
          localStorage.setItem('area', JSON.stringify(datas));
          that.areaData = datas;
          that.slots1[0].values = that.areaData;
        };
      }else {
        this.areaData = JSON.parse(localStorage.getItem('area'));
        this.slots1[0].values = this.areaData;
      }
    },
    methods: {
      isShowFun(){
        this.isShow = false
      },
      closeMask(){
        this.isSex = false;
        this.isMask = false;
        this.isChoose = false;
      },
      // 修改省市
      conShowChoose(){
        this.closeMask();
        userPatch({province: this.province.name, city: this.city.name}).then((res)=>{
          if(res.code === 'Y'){
            this.userInfo.city = this.city.name;
          }
        })
      },
      // 选择省
      onValuesChange1(picker, values) {
        this.province = values[0];
        this.areaData.forEach((item1) => {
          if (item1.code === values[0].code) {
            if(item1.childs.length > 0){
              this.slots2[0].values = item1.childs;
            }else {
              this.slots2[0].values = [];
            }
          }
        })
      },
      // 选择市
      onValuesChange2(picker, values) {
        this.city = values[0];
      },
      // 上传头像
      uploadImgFun(url){
        this.userInfo.wechatImg = url;
        userPatch({wechatImg: url}).then((res)=>{
          if(res.code === 'Y'){
            let s = this.$store.getters.getUserInfo;
            s.wechatImg = url;
            this.$store.dispatch('userInfo', s);
            this.message = '头像上传成功';
            this.isShow = true
          }else {
            this.message = res.msg;
            this.isShow = true
          }
        })
      },
      // 修改性别
      changeSix(val){
        this.closeMask();
        if(val !== this.userInfo.sex){
          userPatch({sex: val}).then((res)=>{
            if(res.code === 'Y'){
              this.userInfo.sex = val;
            }
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  .contentListUl{
    list-style: none;
    padding: 0 10*@wu;
    margin: 0;
    overflow: hidden;
    background-color: #ffffff;
    li{
      border-bottom: 1px solid #F1F1F1;
      height: 54*@wu;
      line-height: 50*@wu;
      div{
        display: inline-block;
        vertical-align: middle;
      }
      div:nth-of-type(1){
        font-size: 15*@wu;
        color: #262525;
        width: 125*@wu;
      }
      div:nth-of-type(2){
        width: 207*@wu;
        font-size: 13*@wu;
        color: #646363;
        text-align: right;
        box-sizing: border-box;
        position: relative;
      }
      &>img{
        width: 6*@wu;
        height: auto;
        vertical-align: middle;
        margin-left: 5*@wu;
      }
    }
    li:first-child{
      height: 74*@wu;
      line-height: 68*@wu;
      div>img{
        width: 50*@wu;
        height: 50*@wu;
        vertical-align: middle;
        border-radius: 50%;
      }
    }
    li:last-child{
      border-bottom: none;
    }
  }
  .sexChooseBox{
    width: 317*@wu;
    height: 120*@wu;
    background-color: #ffffff;
    position: fixed;
    bottom: 24*@wu;
    left: 30*@wu;
    z-index: 208;
    border-radius: 7*@wu;
    div{
      height: 60*@wu;
      box-sizing: border-box;
      text-align: center;
      font-size: 16px;
      color: #262525;
      line-height: 58*@wu;
    }
    div:last-child{
      border-top: 1px solid #E5E5E5;
    }
  }
  .sureBtn {
    position: absolute;
    height: 40px;
    background-color: #EDEDED;
    bottom: 180px;
    width: 100%;
    left: 0;
    z-index: 1000;
    line-height: 40px;
    font-weight: 600;
    font-size: 13*@wu;
    color: rgb(109,109,109);
    i{
      font-style: inherit;
      padding-left: 15*@wu;
    }
    span {
      position: absolute;
      bottom: 0;
      right: 0;
      text-align: center;
      display: inline-block;
      float: right;
      height: 40px;
      width: 60px;
      line-height: 40px;
    }
  }
</style>
<style lang="less">
  @wa: 100vw;
  @wu: @wa / 375;
  .infoList{
    .picker {
      position: absolute;
      background-color: #ffffff;
      bottom: 0;
      width: 187.5*@wu;
      z-index: 1000;
    }

    .pickerSe {
      left: 0;
    }

    .pickerSs {
      left: 187.5*@wu;
    }
    .picker-slot {
      font-size: 15*@wu;
    }

    .picker-center-highlight:before, .picker-center-highlight:after {
      height: 0 !important;
    }
    .upUserImg{
      position: absolute;
      top: 10*@wu;
      right: 0;
      width: 50*@wu!important;
      height: 50*@wu;
      input[type='file']{
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        display: block;
        opacity: 0;
      }
    }
  }
</style>
