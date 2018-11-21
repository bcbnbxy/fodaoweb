<template>
  <div class='page pageColor'>
    <div class="nickInput">
      <span>{{typeName}}</span>
      <input type="text" v-model="nickName">
      <img src="../../../assets/img/close3.png" @click="nickName=''">
    </div>
    <button class="nickBtn" @click="submitChange()">确认修改</button>
    <alert-box :message="message" @isShow="isShowFun" v-if="isShow"></alert-box>
  </div>
</template>

<script>
  import {userPatch} from '@/api/index'
  export default {
    data() {
      return {
        nickName: this.$route.params.name!=='null'? this.$route.params.name: '',
        message:'',
        isShow: false,
        newName: '',
        isType: this.$route.params.state,   // 修改的名称 1：昵称 ， 2：真实姓名，3：微信号，3：支付宝
        typeName:''
      }
    },
    created(){
      if (this.isType === '1') {
        this.typeName = '昵称';
      }else if(this.isType === '2'){
        this.typeName = '真实姓名';
      }else if(this.isType === '3'){
        this.typeName = '绑定微信号';
      }else if(this.isType === '4'){
        this.typeName = '绑定支付宝';
      }
    },
    methods: {
      submitChange(){
        if(this.nickName !== ''){
          let data = {};
          if (this.isType === '1') {
            data = {
              name: this.nickName
            }
          }else if(this.isType === '2'){
            data = {
              realName: this.nickName
            }
          }else if(this.isType === '3'){
            data = {
              wechatId: this.nickName
            }
          }else if(this.isType === '4'){
            data = {
              alipay: this.nickName
            }
          }
          userPatch(data).then((res)=>{
            if(res.code === "Y"){
              let s = this.$store.getters.getUserInfo;
              if (this.isType === '1') {
                s.name = this.nickName;
              }else if(this.isType === '2'){
                s.realName = this.nickName;
              }else if(this.isType === '3'){
                s.wechatId = this.nickName;
              }else if(this.isType === '4'){
                s.alipay = this.nickName;
              }
              this.$store.dispatch('userInfo', s);
              this.message = '修改成功';
              this.isShow = true;
              setTimeout(()=>{
                this.$router.go(-1);
              },1200)
            }
          })
        }else {
          this.message = this.typeName + '不能为空！';
          this.isShow = true;
        }
      },
      // 关闭弹框
      isShowFun() {
        this.isShow = false;
      }
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  .nickInput{
    position: relative;
    margin: 15*@wu 0 45*@wu 0;
    background-color: #ffffff;
    display: flex;
    justify-items: center;
    align-items: center;
    input{
      height: 50*@wu;
      width: 260*@wu;
      border: none;
      outline: none;
      display: inline-block;
      vertical-align: middle;
    }
    span{
      font-size: 14*@wu;
      color: #646363;
      display: inline-block;
      width: 80*@wu;
      text-align: center;
      vertical-align: middle;
    }
    img{
      display: inline-block;
      width: 13*@wu;
      height: 13*@wu;
      vertical-align: middle;
    }
  }
  .nickBtn{
    background-image: linear-gradient(-101deg, #FFC940 1%, #FFBD30 100%);
    border-radius: 7*@wu;
    width: 310*@wu;
    height: 42*@wu;
    border: none;
    font-size: 16px;
    color: #FFFFFF;
    display: block;
    margin: 0 auto;
  }
</style>
