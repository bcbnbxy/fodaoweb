<template>
  <div class='page pageColor'>
    <div class="topDistance"></div>
    <div class="payTopBox">
      <ul>
        <li>订单编号</li>
        <li>{{orderInfo.orderNo}}</li>
      </ul>
      <ul>
        <li>订单金额</li>
        <li class="payMoney">¥ {{orderInfo.needPay}}</li>
      </ul>
    </div>
    <div class="line"></div>
    <div class="payTopBox2">
      <div class="payTit">选择支付方式</div>
      <ul>
        <li @click="choosePayWay(0)">
          <img src="../../assets/img/wx.png" class="payLogo">
          <span>微信支付</span>
          <img src="../../assets/img/choosePayWay.png" class="choosePayWay" v-show="listData[0].isChoose">
        </li>
        <li @click="choosePayWay(1)">
          <img src="../../assets/img/zfb.png" class="payLogo">
          <span>支付宝支付</span>
          <img src="../../assets/img/choosePayWay.png" class="choosePayWay" v-show="listData[1].isChoose">
        </li>
        <!--<li @click="choosePayWay(2)">
          <img src="../../assets/img/back.png" class="payLogo">
          <span>银行卡支付</span>
          <img src="../../assets/img/choosePayWay.png" class="choosePayWay" v-show="listData[2].isChoose">
        </li>-->
        <li @click="choosePayWay(4)">
          <img src="../../assets/img/huabeilogo.png" class="payLogo">
          <span>花呗分期  <b v-show="Flowerstaging" style="font-weight: 500;color:#999;">({{Flowerstaging}})</b></span>
          <img src="../../assets/img/choosePayWay.png" class="choosePayWay" v-show="listData[4].isChoose">
        </li>
        <li @click="choosePayWay(3)" :style="{opacity: balanceVal<orderPrice?0.4:1}">
          <img src="../../assets/img/balance.png" class="payLogo">
          <span>余额支付（{{userInfo.balance2}}元）</span>
          <img src="../../assets/img/choosePayWay.png" class="choosePayWay" v-show="listData[3].isChoose">
        </li>
        
      </ul>
    </div>
    <button class="subOrder" @click="submitOrder()">立即支付</button>

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
      <div class="forgetPaw"><span @click="forgetPsw()">忘记密码?</span></div>
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

    <div class="errorMore" v-if="isErrorMore">
      <div>
        <div>
          <img src="../../assets/img/danger.png">
          <span>您的账户密码已错3次将被锁定24小时</span>
        </div>
        <div @click="isErrorMore = false">
          我知道了
        </div>
      </div>
    </div>
		<mt-popup v-model="popupVisible" position="bottom" style="width:100%;" popup-transition="popup-slide">
			<div class="Flowerstaging">
				<div class="Flowerstaging-title">请选择</div>
				<ul>
					<li v-for="(item,index) in Flowerstaginglist" :key="item.periods" @click="chooseperiods(index)">
						<div class="Flowerstaging-item">
							<p><span>{{item.money}}</span>元X<span>{{item.periods}}</span>期</p>
							<p>手续费<span>{{item.poundage}}</span>元/期</p>
						</div>
						<img src="../../assets/img/choosePayWay.png" class="choosePayWay" v-show="item.isChoose"/>
					</li>
				</ul>
			</div>
		</mt-popup>
    <alert-box :message="message" @isShow="isShowFun" v-if="isShow" :warningImg="warningImg"></alert-box>

  </div>
</template>

<script>
  import {alipayCreate, balancePay, yzPayPsw, lockingPaw, userInfoApi,wxPay,wxLogin,alipayHbfee} from '@/api/index'
  import {Indicator,MessageBox} from 'mint-ui';
  import md5 from 'js-md5';
  import wx from 'weixin-js-sdk'
  import {is_WX,calPosition} from '@/tools/tools'
  export default {
    data() {
      return {
        // 订单金额
        orderPrice: '',
        //花呗分期弹出层
        popupVisible:false,
        //选择的分期数
        Flowerstaging:'',
        // 余额
        balanceVal: this.$store.getters.getUserInfo.balance2,
        // 选择的支付方式
        payWay: 0,
        //分期期数
        fenqishu:0,
        listData: [
          {name: '微信支付', isChoose: true},
          {name: '支付宝支付', isChoose: false},
          {name: '银行卡支付', isChoose: false},
          {name: '余额支付', isChoose: false},
          {name: '花呗分期', isChoose: false},
        ],
        Flowerstaginglist:[
        	{periods:3,moneyrate:0, isChoose: true},
        	{periods:6,moneyrate:0, isChoose: false},
        	{periods:12,moneyrate:0, isChoose: false}
        ],
        // 密码
        passwordList: [],
        showPswEnter: false,
        // 用户信息
        userInfo: '',
        orderInfo: '',

        // 设置
        message: '',
        isShow: false,
        warningImg: '',
        errorNum: 3,
        isErrorMore: false
      }
    },
//  created(){
//  	this.alipayHbfee();
//  },
    mounted() {
      document.title = '收银台';
      this.userInfo = this.$store.getters.getUserInfo;
      this.orderInfo = JSON.parse(this.$store.getters.getOrderInfo);
      this.orderPrice = this.orderInfo.needPay;
    },
    watch:{
    	'orderInfo': 'orderInfoFun'
    },
    methods: {
      // 选择支付方式
      choosePayWay(val) {
        if (val === 3) { // 余额支付
          if (this.balanceVal < this.orderPrice) {
            return false;
          }
        }
        if (val === 2) {
          this.$router.push({path: '/addBack'});
        }
        if (val === 4) {
         this.popupVisible=true;
        }
        this.listData.forEach((item, index) => {
          if (index === val) {
            item.isChoose = true;
          } else {
            item.isChoose = false;
          }
        })
        this.payWay = val;
      },
      //获取支付宝花呗分期费率
//    alipayHbfee(){
//    	alipayHbfee().then((res) => {
//    		if (res.code === 'Y') {
//    			this.Flowerstaginglist[0].moneyrate=res.data.one;
//    			this.Flowerstaginglist[1].moneyrate=res.data.two;
//    			this.Flowerstaginglist[2].moneyrate=res.data.three;
//    		}
//    		console.log(JSON.stringify(this.Flowerstaginglist));
//    	})
//    },
      //计算分期
      orderInfoFun(){
      	alipayHbfee().then((res) => {
      		if (res.code === 'Y') {
      			this.Flowerstaginglist[0].moneyrate=res.data.one;
      			this.Flowerstaginglist[1].moneyrate=res.data.two;
      			this.Flowerstaginglist[2].moneyrate=res.data.three;
      		}
      		if(this.orderInfo){
	      		this.Flowerstaginglist.forEach((item, index) => {
	             item.money = ((parseFloat(this.orderInfo.needPay)+parseFloat(this.orderInfo.needPay)*item.moneyrate)/item.periods).toFixed(2);
							 item.poundage=((parseFloat(this.orderInfo.needPay)*item.moneyrate)/item.periods).toFixed(2);
	          })
	      		this.fenqishu=this.Flowerstaginglist[0].periods;
	      		this.Flowerstaging=this.Flowerstaginglist[0].money+'元X'+this.Flowerstaginglist[0].periods+'期';
	      	}
      	})      	
      },
      //选择分期数量
      chooseperiods(inde){
      	this.Flowerstaginglist.forEach((item, index) => {
          if (index === inde) {
            item.isChoose = true;
            this.Flowerstaging=item.money+'元X'+item.periods+'期'
            this.fenqishu=item.periods;
          } else {
            item.isChoose = false;
          }
        })
      	this.popupVisible=false;
      },
      // 立即支付
      submitOrder() {
        // 余额支付
        if (this.payWay === 3) {
          if(this.userInfo.isPayment === 0){
            MessageBox({
              title: '温馨提示',
              message: '您还未设置支付密码',
              confirmButtonText:'立即设置',
              showCancelButton: true
            }).then(action => {
              if(action === 'confirm'){
                this.$router.push({path: '/payPassword'})
              }
            });
          }else {
            this.showPswEnter = true;
            this.$nextTick(()=>{ // 计算密码显示位置
              calPosition('#passwordBox','#keyBox');
            })
          }
        }
        // 支付宝支付
        if (this.payWay === 1) {
          // 测试
          // window.location.href = sessionStorage.getItem('realmName') + '/payment/alipayCreate?orderNo=' + this.orderInfo.orderNo + '&amount=' + this.orderInfo.needPay;
          // 正式
          // window.location.href = 'https://api.fudaojt.com/payment/alipayCreate?orderNo=' + this.orderInfo.orderNo + '&amount=' + this.orderInfo.needPay;
          let local = sessionStorage.getItem('realmName') + '/payment/alipayCreate?orderNo=' + this.orderInfo.orderNo + '&amount=' + this.orderInfo.needPay;
          if(is_WX()){
            window.location.href= 'http://m.fudaojt.com/aliPay.html?orderNo=' + this.orderInfo.orderNo + '&amount=' + this.orderInfo.needPay + '&aliPay=1' ;
          }else {
            window.location.href = local
          }
        }
        //	花呗分期支付
        if(this.payWay === 4){
        	 // 测试
          // window.location.href = sessionStorage.getItem('realmName') + '/payment/alipayCreate?orderNo=' + this.orderInfo.orderNo + '&amount=' + this.orderInfo.needPay;
          // 正式
          // window.location.href = 'https://api.fudaojt.com/payment/alipayCreate?orderNo=' + this.orderInfo.orderNo + '&amount=' + this.orderInfo.needPay;
        	let local = window.location.href = sessionStorage.getItem('realmName') + '/payment/alipayCreate?orderNo=' + this.orderInfo.orderNo + '&amount=' + this.orderInfo.needPay + '&hbFqNum='+ this.fenqishu;
          if(is_WX()){
            window.location.href= 'http://m.fudaojt.com/aliPay.html?orderNo=' + this.orderInfo.orderNo + '&amount=' + this.orderInfo.needPay + '&hbFqNum='+ this.fenqishu + '&aliPay=1' ;
          }else {
            window.location.href = local
          }
        }
        // 微信支付
        if(this.payWay === 0){
          if(!this.userInfo.openId){
            MessageBox({
              title: '温馨提示',
              message: '您还未绑定微信，请先绑定微信',
              confirmButtonText:'立即绑定',
              showCancelButton: false
            }).then(action => {
							var id = localStorage.getItem('userId')?localStorage.getItem('userId'):0;
							var state= Date.parse(new Date())+'|'+id+'|'+sessionStorage.getItem('realmName')+'|1';
							var appid = "wxd57d2db000c7eaef"; //正式服： wx16ae35cd8aadc3d6  测试服： wxd57d2db000c7eaef
							window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + 
							appid + '&redirect_uri=https%3A%2F%2Fkf.fudaojt.com%2Fpassport%2Fwxuser%2Fcallback&response_type=code&scope=snsapi_userinfo&state='+state+'#wechat_redirect';
						  	// 正式服: api.fudaojt.com  测试服地址 ：kf.fudaojt.com	
            });
            return false;
          }
          // 微信支付
          let formData = {
            orderNo: this.orderInfo.orderNo,
            totalMoney: this.orderInfo.needPay,
            payRemark:''
          };
          let that = this;
          wxPay(formData).then((res) => {
            if(res.code === 'Y'){
              let wxPayData = res.data;
              wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: wxPayData.appId, // 必填，公众号的唯一标识
                timestamp: wxPayData.timeStamp, // 必填，生成签名的时间戳
                nonceStr: wxPayData.nonceStr, // 必填，生成签名的随机串
                signature: wxPayData.paySign,// 必填，签名，见附录1
                jsApiList: ['getBrandWCPayRequest'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
              });
              wx.ready(function(){
                WeixinJSBridge.invoke(
                  'getBrandWCPayRequest', {
                    "appId": wxPayData.appId,     // 公众号名称，由商户传入
                    "timeStamp": wxPayData.timeStamp,    // 时间戳，自1970年以来的秒数
                    "nonceStr": wxPayData.nonceStr, // 随机串
                    "package": wxPayData.package,
                    "signType": wxPayData.signType,         // 微信签名方式：
                    "paySign": wxPayData.paySign // 微信签名
                  },
                  function (res) {
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                      that.$router.go(-1);
                    }// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                  }
                );
              })
            }else{
            	this.message = res.msg;
            	this.isShow = true;
            }
          });
        }
      },
      // 输入密码
      enterPaw(val, e) {
        if (this.passwordList.length > 5) {
          return false;
        }
        this.passwordList.push(val);
        let env = window.event || e;
        env.target.style.backgroundColor = '#F9F9F9';
        setTimeout(function () {
          env.target.style.backgroundColor = '';
        }, 100)

        if (this.passwordList.length === 6) {
          if (this.errorNum <= 0) {
            this.isErrorMore = true;
            return false;
          }
          // 发起支付
          let paw = md5(md5(md5(md5(md5(this.passwordList.join(''))))));
          // 验证密码
          Indicator.open({
            text: '',
            spinnerType: 'fading-circle'
          });
          yzPayPsw({paymentPwd: paw}).then((res) => {
            this.errorNum--;
            if (res.code === "Y") {
              let formData = {
                orderNo: this.orderInfo.orderNo,
                amount: this.orderInfo.needPay,
              };
              // 开始支付
              balancePay(formData).then((res) => {
                Indicator.close();
                if (res.code === "Y") {
                  this.$router.replace({path: '/paySuccess'});
                  userInfoApi().then((res) => {
                    if (res.code === 'Y') {
                      this.$store.dispatch('userInfo', res.data);
                    }else if(res.code === 'E00000033'){
                      this.$store.dispatch('userInfo', JSON.parse(sessionStorage.getItem('wxUserInfo')));
                    }
                  })
                } else {
                  this.message = res.msg;
                  this.isShow = true;
                }
              })
            } else {
              Indicator.close();
              if (this.errorNum <= 0) {
                this.isErrorMore = true;
              } else if (res.code === 'E00000022') {
                this.isErrorMore = true;
                lockingPaw().then((res) => {
                  // console.log(res);
                })
              } else {
                this.message = "密码错误！您还可以输入<i class='iStyle'>" + this.errorNum + "</i>次";
                this.warningImg = 1;
                this.isShow = true;
              }
            }
          })
        }
      },
      // 删除密码
      removePaw() {
        this.passwordList.pop();
      },
      isShowFun() {
        this.isShow = false;
      },
      // 忘记密码
      forgetPsw() {
        if (this.userInfo.userMobile) {
          this.$router.push({path: '/forgetPsw'});
        } else {
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
      border-bottom: 1px solid #F1F1F1;
      li:first-child {
        float: left;
        font-size: 14*@wu;
        color: #262525;
      }
      li:last-child {
        float: right;
        font-size: 15*@wu;
        color: #474545;
      }
      .payMoney {
        font-size: 16*@wu;
        color: #262525;
      }
    }
    ul:last-child {
      border-bottom: none;
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
    /*position: fixed;
    bottom: 34*@wu;
    left: 15*@wu;*/
    margin: 100*@wu 0 0 15*@wu;
  }

  .passwordBox {
    width: 345*@wu;
    height: 184*@wu;
    background-color: #FFFFFF;
    border-radius: 8*@wu;
    position: fixed;
    top: 100*@wu;
    left: 15*@wu;
    z-index: 206;
    .passwordBoxTit {
      height: 50*@wu;
      line-height: 50*@wu;
      border-bottom: 1px solid #F1F1F1;
      font-size: 15*@wu;
      color: #262525;
      text-align: center;
      position: relative;
      img {
        width: auto;
        height: 14*@wu;
        position: absolute;
        top: 15*@wu;
        left: 15*@wu;
      }
    }
    .passwordInput {
      border: 1px solid #A0A0A0;
      border-radius: 5*@wu;
      width: 316*@wu;
      height: 43*@wu;
      margin: 25*@wu 14*@wu 15*@wu 14*@wu;
      padding: 0;
      list-style: none;
      li {
        width: 316/6*@wu;
        float: left;
        border-right: 1px solid #A0A0A0;
        box-sizing: border-box;
        height: 43*@wu;
        line-height: 43*@wu;
        text-align: center;
        span {
          display: inline-block;
          width: 12*@wu;
          height: 12*@wu;
          background-color: #333333;
          border-radius: 50%;
        }
      }
      li:last-child {
        border-right: none;
      }
    }
    .forgetPaw {
      text-align: right;
      font-size: 12*@wu;
      color: #F5A623;
      padding-right: 20*@wu;
    }
  }

  .keyBox {
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

  .errorMore {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14*@wu;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 301;
    & > div {
      background-color: rgba(18, 18, 18, 0.85);
      display: inline-block;
      border-radius: 8*@wu;
      width: 258*@wu;
      height: 136*@wu;
      background-color: #ffffff;
      box-sizing: border-box;
      overflow: hidden;
      div:nth-of-type(1) {
        height: 96*@wu;
        padding: 27*@wu 40*@wu;
        box-sizing: border-box;
        img {
          vertical-align: top;
          width: 20*@wu;
          height: 20*@wu;
          display: inline-block;
        }
        span {
          font-size: 15*@wu;
          color: #262525;
          display: inline-block;
          vertical-align: top;
          width: 150*@wu;
        }
      }
      div:nth-of-type(2) {
        height: 40*@wu;
        line-height: 40*@wu;
        font-size: 15px;
        color: #F8F8F8;
        background-color: #F14317;
      }
    }
  }
  .Flowerstaging{
  	width:101%;
  	background: #fff;
  	position: absolute;
  	left:0;
  	bottom:0;
  	margin-left:-1px;
  }
  .Flowerstaging-title{
  	font-size:16*@wu;
  	text-align: center;
  	line-height: 60*@wu;
  	color:#242424;
  }
  .Flowerstaging ul{
  	margin:0 ;
  	padding:0;
  	list-style: none;  	
  	padding:0 20*@wu;
  	padding-bottom:100*@wu;
  	li{
  		height:80*@wu;
  		width:100%;
  		display: flex;
  		display: -webkit-flex;
  		justify-content: space-between;
  		align-items: center;
  		border-bottom:1px solid #ddd;
  		img{
  				width: 17*@wu;
          flex: 0 0 17*@wu;
  		}
  		.Flowerstaging-item{
  			p{
  					margin: 0;
  					line-height: 1;
  					font-size:14*@wu;
  					color:#242424;
  				}
  				p:last-child{
  					color:#999;
  					margin-top:10*@wu;
  				}
  		}
  	}
  }
</style>
