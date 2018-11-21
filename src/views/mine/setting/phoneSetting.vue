<template>
  <div class='page pageColor'>
    <div class="topDistance"></div>

    <div v-if="!$store.getters.getUserInfo.userMobile || isEnterNewPhone">
      <div class="phoneBox">
        <div class="phoneListBox">
          <span>手机号</span>
          <input type="text" placeholder="请输入11位手机号(登录账号)" v-model="phone">
          <div></div>
        </div>
        <div class="phoneListBox">
          <span>验证码</span>
          <input type="text" placeholder="请输入验证码" v-model="code">
          <button @click="sendCode()">{{btnTest}}</button>
        </div>
      </div>
      <button class="sureBtn" :style="{opacity: disableS?0.5:1}" @click="submitForm()">确认</button>
    </div>

    <div v-if="$store.getters.getUserInfo.userMobile && !isEnterNewPhone">
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
  import {mobileExist, sendCode, userPatch, checkCode} from '@/api/index'
  import {Indicator} from 'mint-ui';
  import {playTel,is_WX} from '@/tools/tools'
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
        isAnswer: false
      }
    },
    watch: {
      'code': 'codeFun'
    },
    mounted() {
      window.timer2 = ''
    },
    methods: {
      // 拨打电话
      playTel2(val){
        playTel(val)
      },
      // 重新获取验证码
      getCode(){
        if(this.btnTest!=='获取验证码' && this.btnTest!=='重获验证码'){
          return false;
        }else {
          this.sendOldCode();
          this.changeCodeList = [];
        }
      },
      // 修改手机号码
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
          checkCode({mobile:this.$store.getters.getUserInfo.userMobile, code:code, type:5}).then((res)=>{
            Indicator.close();
            if (res.code === 'Y') {
              clearTimeout(timer2);
              window.timer2 = null;
              this.btnTest = '获取验证码';
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
      // 判断是否可以提交
      codeFun() {
        if (!this.isPhoneFun(this.phone) && this.code.length >= 5) {
          this.disableS = false;
        } else {
          this.disableS = true;
        }
      },
      // 倒计时
      timeOver() {
        if (this.timeVal <= 0) {
          this.timeVal = 60;
          this.btnTest = '获取验证码'
        } else {
          window.timer2 = setTimeout(() => {
            this.timeVal--;
            this.btnTest = '验证码(' + this.timeVal + ')';
            this.timeOver();
          }, 1000)
        }
      },
      // 关闭弹框
      isShowFun() {
        this.isShow = false;
      },
      // 验证手机号码
      isPhoneFun(mobile) {
        return !(/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(mobile))
      },
      // 发送新手机验证码
      sendCode() {
        if (this.btnTest !== '获取验证码' && this.btnTest !== '重获验证码') {
          return false;
        }
        if (this.isPhoneFun(this.phone)) {
          this.message = '手机号输入不正确';
          this.isShow = true;
          return false;
        } else {
          mobileExist({mobile: this.phone}).then((res) => {
            if (res.code === 'Y') {
              this.message = '手机号已经注册';
              this.isShow = true;
            } else {
              sendCode({mobile: this.phone, type: 5}).then((res) => {
                if (res.code === 'Y') {
                  this.message = "验证码发送成功！";
                  this.isShow = true;
                  this.timeOver();
                }else {
                  this.message = res.msg;
                  this.isShow = true;
                }
              })
            }
          })
        }
      },
      // 发送旧手机验证码
      sendOldCode() {
        sendCode({mobile: this.$store.getters.getUserInfo.userMobile, type: 5}).then((res) => {
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
      // 提交手机号码
      submitForm() {
        if (this.disableS) {
          return false
        }
        userPatch({mobile: this.phone, code: this.code}).then((res) => {
          if (res.code === 'Y') {
            this.message = '保存成功';
            this.isShow = true;
            if(is_WX() && !this.$store.getters.getUserInfo.userMobile){
              let s = this.$store.getters.getUserInfo;
              s.userMobile = this.phone;
              this.$store.dispatch('userInfo', s);
              this.$router.push({path: '/home/index'});
            }else {
              let s = this.$store.getters.getUserInfo;
              s.userMobile = this.phone;
              this.$store.dispatch('userInfo', s);
              this.$router.go(-1);
            }
          }else {
            this.message = res.msg;
            this.isShow = true;
          }
        })
      },
      // 收不到验证码事件
      answerShow(){
        this.isAnswer = true;
      },
      // 我知道了
      IKnow(){
        this.isAnswer = false;
      }
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  .phoneBox {
    background-color: #ffffff;
    overflow: hidden;
    padding-left: 10*@wu;
    .phoneListBox {
      height: 60*@wu;
      border-bottom: 1px solid #F1F1F1;
      display: flex;
      align-items: center;
      justify-content: center;
      & > * {
        display: block;
      }
      span {
        width: 60*@wu;
        font-size: 16*@wu;
        color: #262525;
        height: 25*@wu;
      }
      input {
        width: 195*@wu;
        height: 28*@wu;
        border: none;
        outline: none;
        font-size: 14*@wu;
      }
      input::placeholder {
        color: #C3C3C3;
      }
      button {
        width: 100*@wu;
        height: 30*@wu;
        border: 1px solid #F5A623;
        border-radius: 5*@wu;
        color: #F5A623;
        background-color: transparent;
        outline: none;
      }
      div {
        width: 100*@wu;
        height: 30*@wu;
      }
    }
    .phoneListBox:last-child {
      border-bottom: none
    }
  }

  .sureBtn {
    width: 310*@wu;
    height: 42*@wu;
    background-color: #F5A623;
    color: #ffffff;
    border: 1px solid #F5A623;
    border-radius: 7*@wu;
    outline: none;
    display: block;
    font-size: 16*@wu;
    margin: 50*@wu auto 0 auto;
  }

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
</style>
