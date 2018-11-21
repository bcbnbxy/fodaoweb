<template>
  <div class='page pageColor'>
    <div class="topDistance"></div>
    <div v-if="!isEnterNewPhone">
      <div class="changePhoneBox">
        请输入{{$store.getters.getUserInfo.userMobile | telStar}}收到的验证码 <span @click="getCode()">{{btnTest}}</span>
      </div>
      <ul class="changePhoneEnter">
        <li>{{changeCodeList[0]?changeCodeList[0]:''}}</li>
        <li>{{changeCodeList[1]?changeCodeList[1]:''}}</li>
        <li>{{changeCodeList[2]?changeCodeList[2]:''}}</li>
        <li>{{changeCodeList[3]?changeCodeList[3]:''}}</li>
        <li>{{changeCodeList[4]?changeCodeList[4]:''}}</li>
      </ul>
      <div class="getCode" @click="answerShow()">收不到验证码?</div>
      <ul class="keyBox">
        <li @touchstart="enterCode(1)">1</li>
        <li @touchstart="enterCode(2)">2</li>
        <li @touchstart="enterCode(3)">3</li>
        <li @touchstart="enterCode(4)">4</li>
        <li @touchstart="enterCode(5)">5</li>
        <li @touchstart="enterCode(6)">6</li>
        <li @touchstart="enterCode(7)">7</li>
        <li @touchstart="enterCode(8)">8</li>
        <li @touchstart="enterCode(9)">9</li>
        <li class="backgroundColor"></li>
        <li @touchstart="enterCode('0')">0</li>
        <li class="backgroundColor" @touchstart="removeCode()"><img src="../../../assets/img/close2.png"></li>
      </ul>
    </div>

    <div class="passwordBox" v-if="isEnterNewPhone">
      <div class="newPawTop">
        请输入 6 位数字的新密码
      </div>
      <ul class="passwordInput">
        <li><span v-if="passwordList[0]"></span></li>
        <li><span v-if="passwordList[1]"></span></li>
        <li><span v-if="passwordList[2]"></span></li>
        <li><span v-if="passwordList[3]"></span></li>
        <li><span v-if="passwordList[4]"></span></li>
        <li><span v-if="passwordList[5]"></span></li>
      </ul>
      <div class="newPawBottom">
        再次确认新密码
      </div>
      <ul class="passwordInput">
        <li><span v-if="passwordListRe[0]"></span></li>
        <li><span v-if="passwordListRe[1]"></span></li>
        <li><span v-if="passwordListRe[2]"></span></li>
        <li><span v-if="passwordListRe[3]"></span></li>
        <li><span v-if="passwordListRe[4]"></span></li>
        <li><span v-if="passwordListRe[5]"></span></li>
      </ul>

      <ul class="keyBox">
        <li @touchstart="enterPaw(1)">1</li>
        <li @touchstart="enterPaw(2)">2</li>
        <li @touchstart="enterPaw(3)">3</li>
        <li @touchstart="enterPaw(4)">4</li>
        <li @touchstart="enterPaw(5)">5</li>
        <li @touchstart="enterPaw(6)">6</li>
        <li @touchstart="enterPaw(7)">7</li>
        <li @touchstart="enterPaw(8)">8</li>
        <li @touchstart="enterPaw(9)">9</li>
        <li class="backgroundColor"></li>
        <li @touchstart="enterPaw('0')">0</li>
        <li class="backgroundColor" @touchstart="removePaw()"><img src="../../../assets/img/close2.png"></li>
      </ul>

    </div>

    <alert-box :message="message" @isShow="isShowFun" v-if="isShow"></alert-box>
    <div class="mask" v-if="isAnswer"></div>
    <div class="noGetCode" v-if="isAnswer">
      <div class="top">
        <div class="tit">收不到验证码</div>
        <div class="pContent">1. 请查看短信是否被安全拦截,若是双卡双待手机,请检查副卡短信情况.</div>
        <div class="pContent">2.由于运营商网络问题,可能存在短信延迟,请耐心等待或稍后再试.</div>
        <div class="pContent">3.若您最近操作过携带号或转网,请等待1-2天后再试.</div>
      </div>
      <div class="bottom">
        <div @click="playTel2(4008376868)">联系客服</div>
        <div @click="IKnow()">我知道了</div>
      </div>
    </div>

  </div>
</template>

<script>
  import {mobileExist, sendCode, userPatch, checkCode,setPayPsw} from '@/api/index'
  import {Indicator} from 'mint-ui';
  import md5 from 'js-md5';
  import {playTel} from '@/tools/tools'
  export default {
    data() {
      return {
        btnTest: '获取验证码',
        disableS: true,
        phone: '',
        code: '',

        message: '',
        isShow: false,
        timeVal: 60,
        // 修改的验证码对象
        changeCodeList: [],
        // 是否可以输入新手机号码
        isEnterNewPhone: false,
        // 收不到验证码控制器
        isAnswer: false,

        // 新密码
        passwordList: [],
        // 确认新密码
        passwordListRe: []
      }
    },
    mounted() {
    },
    methods: {
      // 拨打电话
      playTel2(val){
        playTel(val)
      },
      isShowFun(){
        this.isShow = false;
      },
      // 我知道了
      IKnow(){
        this.isAnswer = false;
      },
      // 收不到验证码事件
      answerShow() {
        this.isAnswer = true;
      },
      // 重新获取验证码
      getCode(){
        if(this.btnTest!=='获取验证码' && this.btnTest!=='重获验证码'){
          return false;
        }else {
          this.changeCodeList = [];
          this.sendOldCode();
        }
      },
      // 发送旧手机验证码
      sendOldCode() {
        sendCode({mobile: this.$store.getters.getUserInfo.userMobile, type: 3}).then((res) => {
          if (res.code === 'Y') {
            this.message = "验证码发送成功！";
            this.isShow = true;
            this.timeOver();
          }else {
            this.message = res.msg;
            this.isShow = true;
          }
        })
      },
      // 倒计时
      timeOver() {
        if (this.timeVal <= 0) {
          this.timeVal = 60;
          this.btnTest = '重获验证码'
        } else {
          window.timer2 = setTimeout(() => {
            this.timeVal--;
            this.btnTest = '验证码(' + this.timeVal + ')';
            this.timeOver();
          }, 1000)
        }
      },
      // 验证手机号码
      enterCode(val) {
        if (this.changeCodeList.length > 5) {
          return false
        }
        this.changeCodeList.push(val);
        if (this.changeCodeList.length === 5) {
          // 发送验证码
          Indicator.open({
            spinnerType: 'fading-circle'
          });
          let code = Number(this.changeCodeList.join(''));
          checkCode({mobile:this.$store.getters.getUserInfo.userMobile, code:code, type:3}).then((res)=>{
            Indicator.close();
            if (res.code === 'Y') {
              clearTimeout(window.timer2);
              window.timer2 = null;
              this.btnTest = '重获验证码';
              this.timeVal = 60;
              this.isEnterNewPhone = true;
            }else {
              this.message = res.msg;
              this.isShow = true;
            }
          })
        } else if (this.changeCodeList.length <= 5) {
          let env = window.event || e;
          env.target.style.backgroundColor = '#F9F9F9';
          setTimeout(function () {
            env.target.style.backgroundColor = ''
          }, 100)
        }
      },
      // 删除验证码
      removeCode() {
        this.changeCodeList.pop();
      },
      // 输入密码
      enterPaw(val,e){
        if(this.passwordList.length < 6){
          this.passwordList.push(val);
        }else {
          this.passwordListRe.push(val);
        }
        if(this.passwordListRe.length === 6){
          let psw = this.passwordList.join('');
          let rePsw = this.passwordListRe.join('');
          if(psw === rePsw){
            // 发起请求提交新密码
            let paw = md5(md5(md5(md5(md5(rePsw)))));
            setPayPsw({paymentPwd: paw}).then((res)=>{
              if(res.code === "Y"){
                this.message = '密码重置成功';
                this.isShow = true;
                let s = this.$store.getters.getUserInfo;
                s.isPayment = 1;
                this.$store.dispatch('userInfo', s);
                setTimeout(()=>{
                  this.$router.go(-1)
                },2000)
              }else {
                this.message = res.msg;
                this.isShow = true;
              }
            })
          }else {
            this.message = '两次密码输入不一致！';
            this.isShow = true;
          }
        }
        let env = window.event || e;
        env.target.style.backgroundColor = '#F9F9F9';
        setTimeout(function () {
          env.target.style.backgroundColor = ''
        },100)
      },
      // 删除密码
      removePaw(){
        if(this.passwordListRe.length === 0){
          this.passwordList.pop();
        }else {
          this.passwordListRe.pop();
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  .changePhoneBox {
    height: 64*@wu;
    background-color: #ffffff;
    text-align: center;
    line-height: 64*@wu;
    font-size: 16*@wu;
    color: #262525;
    span {
      color: #F5A623;
    }
  }

  .changePhoneEnter {
    list-style: none;
    margin: 0;
    padding: 0 5*@wu;
    display: flex;
    height: 40*@wu;
    align-items: center;
    justify-content: center;
    li {
      width: 55*@wu;
      border-bottom: 1px solid #262525;
      height: 40*@wu;
      line-height: 40*@wu;
      text-align: center;
      font-size: 15*@wu;
      color: #262525;
      margin: 40*@wu 15*@wu 0 0;
    }
    li:last-child {
      margin-right: 0;
    }
  }

  .getCode {
    font-size: 12*@wu;
    color: #F5A623;
    margin-top: 60*@wu;
    text-align: center;
  }

  .keyBox {
    list-style: none;
    padding: 0;
    margin: 0;
    border-top: 1px solid #F1F1F1;
    background-color: #ffffff;
    overflow: hidden;
    position: fixed;
    z-index: 204;
    bottom: 0;
    left: 0;
    li {
      float: left;
      width: 375/3*@wu;
      text-align: center;
      height: 54*@wu;
      line-height: 54*@wu;
      font-size: 24*@wu;
      color: #030303;
      box-sizing: border-box;
      img {
        width: auto;
        height: 15*@wu;
      }
    }
    li:nth-of-type(3n-2) {
      border-bottom: 1px solid #F1F1F1;
      border-right: 1px solid #F1F1F1;
    }
    li:nth-of-type(3n-1) {
      border-bottom: 1px solid #F1F1F1;
    }
    li:nth-of-type(3n) {
      border-bottom: 1px solid #F1F1F1;
      border-left: 1px solid #F1F1F1;
    }
    .backgroundColor {
      background-color: #F9F9F9;
    }
  }
  .noGetCode{
    width: 258*@wu;
    height: 255*@wu;
    background-color: #FFFFFF;
    border-radius: 8*@wu;
    position: fixed;
    top: 100*@wu;
    left: 58*@wu;
    z-index: 210;
    overflow: hidden;
    .top{
      overflow: hidden;
      padding: 18*@wu 15*@wu 0 15*@wu;
      .tit{
        font-size: 16*@wu;
        color: #262525;
        text-align: center;
        font-weight: 600;
      }
      .pContent{
        font-size: 14*@wu;
        color: #262525;
        letter-spacing: -0.02px;
        line-height: 23*@wu;
        margin-top: 5*@wu;
      }
    }
    .bottom{
      position: absolute;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 48*@wu;
      text-align: center;
      border-top:1px solid rgb(245,245,245);
      font-size: 15*@wu;
      & > div{
        height: 48*@wu;
        line-height: 48*@wu;
      }
      div:nth-of-type(1){
        width: 50%;
        color: #262525;
      }
      div:nth-of-type(2){
        width: 50%;
        background-image: linear-gradient(-101deg, #FFC940 1%, #FFBD30 100%);
        color: #ffffff;
      }
    }
  }
  .passwordBox{
    width: 345*@wu;
    height: 184*@wu;
    border-radius: 8*@wu;
    margin: 0 auto;
    .passwordBoxTit{
      font-size: 14*@wu;
      color: #646363;
      text-align: center;
      position: relative;
      margin: 40*@wu 0 25*@wu 0;
    }
    .newPawTop{
      font-size: 14*@wu;
      color: #646363;
      margin: 25*@wu 0 10*@wu 18*@wu;
    }
    .newPawBottom{
      font-size: 14*@wu;
      color: #646363;
      margin: 25*@wu 0 10*@wu 18*@wu;
    }
    .passwordInput{
      border: 1px solid #A0A0A0;
      border-radius: 5*@wu;
      width: 316*@wu;
      height: 43*@wu;
      margin: 0 14*@wu 10*@wu 14*@wu;
      padding: 0;
      list-style: none;
      li{
        width: 316/6*@wu;
        float: left;
        border-right: 1px solid #A0A0A0;
        box-sizing: border-box;
        height: 43*@wu;
        line-height: 43*@wu;
        text-align: center;
        span{
          display: inline-block;
          width: 12*@wu;
          height: 12*@wu;
          background-color: #333333;
          border-radius: 50%;
        }
      }
      li:last-child{
        border-right: none;
      }
    }
    .forgetPaw{
      text-align: right;
      font-size: 12*@wu;
      color: #F5A623;
      padding-right: 20*@wu;
    }
  }
</style>
