<template>
  <div class='page pageColor'>
    <div class="topDistance"></div>
    <div class="withdraw">
      可提现金额{{balanceVal}}元 &emsp; <!--<span v-if="balanceVal>2000">提现金额大于2000,请选择线下提现</span>-->
    </div>
    <div class="payTopBox">
      <ul>
        <li>金额(元): <span>{{balanceVal}}</span><!--v-if="withType==='10'" <input type="number" v-model="orderPrice" @input="withdrawFun()" placeholder="请输入要提现的金额" v-else>--></li>
      </ul>
    </div>
    <div class="line"></div>
    <div class="payTopBox2">
      <ul>
        <li @click="balanceVal>2000?'':choosePayWay(1)" :style="{opacity:balanceVal>2000?0.5:1}">
          <img src="../../assets/img/zfb.png" class="payLogo">
          <span>提现至支付宝</span>
          <img src="../../assets/img/choosePayWay.png" class="choosePayWay" v-show="listData[0].isChoose">
        </li>
        <!--<li @click="choosePayWay(2)">
          <img src="../../assets/img/wx.png" class="payLogo">
          <span>提现至微信</span>
          <img src="../../assets/img/choosePayWay.png" class="choosePayWay" v-show="listData[1].isChoose">
        </li>-->
        <li @click="choosePayWay(3)">
          <img src="../../assets/img/back.png" class="payLogo">
          <span>线下提现</span>
          <img src="../../assets/img/choosePayWay.png" class="choosePayWay" v-show="listData[2].isChoose">
        </li>
        <!--<li @click="choosePayWay(3)">
        <img src="../../assets/img/back.png" class="payLogo">
        <span>银行卡支付</span>
        <img src="../../assets/img/choosePayWay.png" class="choosePayWay" v-show="listData[2].isChoose">
        </li>-->
      </ul>
    </div>

    <div class="withSay">
      提现金额<!--{{withType==='6'?10:100}}--> 100元起
    </div>

    <button class="subOrder" @click="submitOrder()">确认提现</button>

    <div class="mask" v-if="showPswEnter"></div>
    <div id="passwordBox" class="passwordBox" v-if="showPswEnter">
      <div class="passwordBoxTit">
        <img src="../../assets/img/close.png" @click="showPswEnter=false">
        输入密码
      </div>
      <ul class="passwordInput">
        <li><span v-if="passwordList[0]"></span></li>
        <li><span v-if="passwordList[1]"></span></li>
        <li><span v-if="passwordList[2]"></span></li>
        <li><span v-if="passwordList[3]"></span></li>
        <li><span v-if="passwordList[4]"></span></li>
        <li><span v-if="passwordList[5]"></span></li>
      </ul>
      <div class="forgetPaw"><i>提现手续费0.6%</i><span @click="forgetPsw()">忘记密码?</span></div>
    </div>
    <ul id="keyBox" class="keyBox" v-if="showPswEnter">
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
      <li class="backgroundColor" @touchstart="removePaw()"><img src="../../assets/img/close2.png"></li>
    </ul>

    <alert-box :message="message" @isShow="isShowFun" v-if="isShow"></alert-box>

  </div>
</template>

<script>
  import { putForward, yzPayPsw, userInfoApi, wxLogin} from '@/api/index'
  import md5 from 'js-md5';
  import {calPosition} from '@/tools/tools'
  import {MessageBox} from 'mint-ui';
  export default {
    data() {
      return {
        // 订单金额
        orderPrice: '',
        // 余额
        balanceVal: Number(this.$route.params.money),
        // 提现佣金对象
        withType: this.$route.params.type,
        // 选择的提现方式
        payWay: 1,
        listData: [
          {name: '支付宝提现', isChoose: true},
          {name: '微信提现', isChoose: false},
          {name: '线下提现', isChoose: false}
        ],
        // 密码
        passwordList: [],
        showPswEnter: false,

        // 错误提醒
        message: '',
        isShow: false,

        userInfo: this.$store.getters.getUserInfo,
        // 金额是否填好
        isOrderPrice: false
      }
    },
    mounted() {
      document.title = '提现';
      this.$nextTick(()=>{
        /*if (this.withType === '10'){*/
          this.orderPrice = this.balanceVal;
          this.isOrderPrice = true;
          if(this.balanceVal > 2000){
              this.listData[0].isChoose = false;
              this.listData[1].isChoose = false;
              this.listData[2].isChoose = true;
              this.payWay = 3;
          }
        /*}*/
      })
    },
    methods: {
      // 提現金額控制
      withdrawFun(){
        if(this.orderPrice > this.balanceVal){
          this.message = '可用金额只有' + this.balanceVal + '元,请重新输入';
          this.isShow = true;
          this.isOrderPrice = false;
        }else {
          this.isOrderPrice = true
        }
      },
      // 选择支付方式
      choosePayWay(val) {
        this.listData.forEach((item, index) => {
          if(index === val-1) {
            item.isChoose = true;
          } else {
            item.isChoose = false;
          }
        });
        this.payWay = val
      },
      // 立即提现
      submitOrder(){
        if(this.payWay === 1 && !this.userInfo.alipay){
          this.message = '请先绑定支付宝';
          this.isShow = true;
          return false;
        }
        if(this.payWay === 2 && !this.userInfo.openId){
          MessageBox({
            title: '温馨提示',
            message: '您还未绑定微信，请先绑定微信',
            confirmButtonText:'立即绑定',
            showCancelButton: false
          }).then(action => {
							var id = localStorage.getItem('userId')?localStorage.getItem('userId'):0;
							var state= Date.parse(new Date())+'|'+id+'|'+sessionStorage.getItem('realmName')+'|1';
							var appid = "wx16ae35cd8aadc3d6"; //正式服： wx16ae35cd8aadc3d6  测试服： wxd57d2db000c7eaef
							window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + 
							appid + '&redirect_uri=https%3A%2F%2Fapi.fudaojt.com%2Fpassport%2Fwxuser%2Fcallback&response_type=code&scope=snsapi_userinfo&state='+state+'#wechat_redirect';
						  	// 正式服: api.fudaojt.com  测试服地址 ：kf.fudaojt.com	

          });
          return false;
        }
        if(this.balanceVal < 100){
          this.message = '金额不足100元无法提现!';
          this.isShow = true;
        }else {
          let val = 100;
          if(this.orderPrice >= val && this.isOrderPrice){
            this.showPswEnter = true;
            this.$nextTick(()=>{ // 计算密码显示位置
              calPosition('#passwordBox','#keyBox');
            })
          }else {
            this.message = '提现金额在' + val + '~' + this.balanceVal + '之间';
            this.isShow = true;
          }
        }
      },
      // 输入密码
      enterPaw(val,e){
        if(this.passwordList.length > 5){
          return false
        }
        this.passwordList.push(val);
        let env = window.event || e;
        env.target.style.backgroundColor = '#F9F9F9';
        setTimeout(function () {
          env.target.style.backgroundColor = ''
        },100)

        if(this.passwordList.length === 6){
          // 发起支付
          let paw = md5(md5(md5(md5(md5(this.passwordList.join(''))))));
          yzPayPsw({paymentPwd: paw}).then((res)=>{
            if(res.code === "Y"){
              // 提现
              putForward({money: this.orderPrice, cashType: this.payWay, capitalType: this.withType}).then((res)=>{
                if(res.code === "Y"){
                  userInfoApi().then((res) => {
                    if (res.code === 'Y') {
                      this.$store.dispatch('userInfo', res.data);
                    }else if(res.code === 'E00000033'){
                      this.$store.dispatch('userInfo', JSON.parse(sessionStorage.getItem('wxUserInfo')));
                    }
                  });
                  this.$router.push({path: '/withdrawState/'+ res.data.money + '/' + res.data.time + '/' + this.payWay})
                }else {
                  this.message = res.msg;
                  this.isShow = true;
                }
              })
            }else {
              this.message = res.msg;
              this.isShow = true;
            }
          })
        }
      },
      // 删除密码
      removePaw(){
        this.passwordList.pop();
      },
      // 关闭弹框
      isShowFun() {
        this.isShow = false;
      },
      // 忘记密码
      forgetPsw(){
        if(this.userInfo.userMobile){
          this.$router.push({path: '/forgetPsw'});
        }else {
          this.message = '请先绑定手机号码';
          this.isShow = true;
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  .payTopBox {
    padding: 0 10*@wu;
    background-color: #ffffff;
    ul {
      margin: 0;
      overflow: hidden;
      list-style: none;
      padding: 14*@wu 0;
      li{
        font-size: 15*@wu;
        color: #646363;
        input {
          margin-left: 10*@wu;
          font-size: 17*@wu;
          color: #262525;
          border: none;
          background-color: #ffffff;
          outline: none;
        }
        input::placeholder{
          font-size: 14*@wu;
        }
      }
    }
  }

  .payTopBox2 {
    padding: 0 10*@wu;
    background-color: #ffffff;
    .payTit {
      font-size: 15*@wu !important;
      padding: 14*@wu 0;
      border-bottom: 1px solid #F1F1F1;
    }
    ul {
      margin: 0;
      overflow: hidden;
      list-style: none;
      padding: 0;
      li {
        font-size: 14*@wu;
        color: #262525;
        display: flex;
        align-items: center;
        padding: 14*@wu 0;
        border-bottom: 1px solid #F1F1F1;
        .payLogo {
          flex: 0 0 20*@wu;
          width: 20*@wu;
          height: auto;
          margin-right: 10*@wu;
        }
        span {
          flex: 1;
        }
        .choosePayWay {
          width: 17*@wu;
          flex: 0 0 17*@wu;
        }
      }
      li:last-child {
        border-bottom: none;
      }
    }
  }

  .subOrder {
    background-color: #414040;
    border-radius: 7*@wu;
    width: 345*@wu;
    height: 42*@wu;
    border: none;
    color: #ffffff;
    font-size: 16*@wu;
    position: fixed;
    bottom: 34*@wu;
    left: 15*@wu;
  }

  .passwordBox{
    width: 345*@wu;
    height: 184*@wu;
    background-color: #FFFFFF;
    border-radius: 8*@wu;
    position: fixed;
    top: 100*@wu;
    left: 15*@wu;
    z-index: 206;
    .passwordBoxTit{
      height: 50*@wu;
      line-height: 50*@wu;
      border-bottom: 2px solid #F1F1F1;
      font-size: 15*@wu;
      color: #262525;
      text-align: center;
      position: relative;
      img{
        width: auto;
        height: 14*@wu;
        position: absolute;
        top:15*@wu;
        left:15*@wu;
      }
    }
    .passwordInput{
      border: 1px solid #A0A0A0;
      border-radius: 5*@wu;
      width: 316*@wu;
      height: 43*@wu;
      margin: 25*@wu 14*@wu 15*@wu 14*@wu;
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
      i{
        float: left;
        font-style: inherit;
        text-indent: 15*@wu;
        color: #333333;
      }
    }
  }
  .keyBox{
    list-style: none;
    padding: 0;
    margin: 0;
    border-top: 1px solid #F1F1F1;
    background-color: #ffffff;
    overflow: hidden;
    position: fixed;
    z-index: 207;
    bottom: 0;
    left: 0;
    li{
      float: left;
      width: 375/3*@wu;
      text-align: center;
      height: 54*@wu;
      line-height: 54*@wu;
      font-size: 24*@wu;
      color: #030303;
      box-sizing: border-box;
      img{
        width: auto;
        height: 15*@wu;
      }
    }
    li:nth-of-type(3n-2){
      border-bottom: 1px solid #F1F1F1;
      border-right: 1px solid #F1F1F1;
    }
    li:nth-of-type(3n-1){
      border-bottom: 1px solid #F1F1F1;
    }
    li:nth-of-type(3n){
      border-bottom: 1px solid #F1F1F1;
      border-left: 1px solid #F1F1F1;
    }
    .backgroundColor{
      background-color: #F9F9F9;
    }
  }
  .withdraw{
    font-size: 14*@wu;
    color: #646363;
    padding-left: 14*@wu;
    padding-bottom: 12*@wu;
    padding-top: 10*@wu;
  }
  .subOrder {
    border-radius: 7*@wu;
    width: 345*@wu;
    height: 42*@wu;
    border: none;
    color: #ffffff;
    font-size: 16*@wu;
    position: fixed;
    bottom: 34*@wu;
    left: 15*@wu;
    background-image: linear-gradient(-101deg, #FFC940 1%, #FFBD30 100%);
  }
  .withSay{
    padding: 20*@wu 0;
    text-align: center;
    color: #c3c3c3;
    font-size: 14*@wu;
  }
</style>
