<template>
  <div class='page pageColor'>
    <div class="topDistance"></div>
    <div class="addNewAddress" v-if="addressListData.length===0">
      <div class="addNewAddressBox" @click="addNewAds()">
        <img src="../../assets/img/addAddress.png">
        <div>添加收货地址</div>
      </div>
    </div>
    <div class="addNewAddress" style="height: auto" v-else>
      <div class="fixedBox">
        <div class="addressList">
          <div>{{thisAddress.name}} {{this.thisAddress.mobile | telStar}}</div>
          <div>{{thisAddress.area + thisAddress.address}}</div>
        </div>
        <div class="addressListImg" @click="goAddressManage()">
          <img src="../../assets/img/next.png">
        </div>
      </div>
      <div class="sendGoodsWay">配送方式 <span
        v-if="booksData.freightPrice">(快递费: <i>{{booksData.freightPrice}}元</i>)</span><span v-else>(包邮)</span>
      </div>
    </div>
    <div class="line"></div>
    <div class="confirmBookDetail">
      <img class="booksImg" :src="booksData.goodsImg">
      <div class="booksList">
        <p>《{{booksData.goodsName}}》</p>
        <div class="booksNumber">
          <div @click="reduceFun()">
            <img src="../../assets/img/reduce.png" v-if="buyNumber > 1">
            <img src="../../assets/img/reduceNo.png" v-else>
          </div>
          <span>{{buyNumber}}</span>
          <div @click="addNumber()"><img class="imgRight" src="../../assets/img/addNumber.png"></div>
        </div>
        <span>支持7天无理由退货</span>
      </div>
    </div>
    <div class="line"></div>
    <div class="bookPrice">
      <div>共计:<span>¥ {{booksData.unitPrice + booksData.freightPrice}}</span></div>
      <p>(含快递费 : {{booksData.freightPrice?booksData.freightPrice:0}}元)</p>
    </div>
    <button class="subOrder" @click="submitOrder()">确认订单</button>

    <alert-box :message="message" @isShow="isShowFun" v-if="isShow"></alert-box>
  </div>
</template>

<script>
  import {addressList, orderCreate} from '@/api/index'

  export default {
    data() {
      return {
        // 购买数量
        buyNumber: 1,
        // 是否有地址
        isHasAddress: 2,
        // 是否包邮
        isNoPrice: 12,
        // 书籍对象
        booksData: '',
        // 地址列表
        addressListData: [],
        // 当前选择的地址对象
        thisAddress: {id:''},
        // 书籍总价格
        totalBook: 0,
        // 弹框
        message: '',
        isShow: false
      }
    },
    mounted() {
      document.title = '确认订单';
      this.booksData = JSON.parse(sessionStorage.getItem('booksObj'));
      this.totalBook = this.booksData.unitPrice;
      this.queryList();
    },
    methods: {
      // 查询地址列表
      queryList() {
        addressList().then((res) => {
          // console.log(res)
          if (res.code === 'Y') {
            let val = this.$store.getters.getChooseAddress; // 获取点击的索引
            this.addressListData = res.data || [];
            if(this.addressListData.length === 0){return false}
            let flg = false;
            this.addressListData.forEach((item,index) => {
              if(val){
                if (index === Number(val)-1) {
                  this.thisAddress = item;
                  flg = true;
                }
              }else {
                if (item.isDefault === 1) {
                  this.thisAddress = item;
                  flg = true;
                }
              }
            })
            if (!flg) {
              this.thisAddress = this.addressListData[0];
            }
          }
        })
      },
      // 减少
      reduceFun() {
        if (this.buyNumber > 1) {
          this.buyNumber--;
          this.booksData.unitPrice = this.totalBook * this.buyNumber;
        }
      },
      // 增加
      addNumber() {
        this.buyNumber++;
        this.booksData.unitPrice = this.totalBook * this.buyNumber;
      },
      // 提交订单
      submitOrder() {
        let sB = [{
          goodsId: this.booksData.id,
          num: this.buyNumber,
          needPay: this.booksData.unitPrice + this.booksData.freightPrice
        }];
        if(!this.thisAddress.id){
          this.message = '请先添加收货地址';
          this.isShow = true;
          return false
        }
        let data = {
          orderType: 3,
          orderChannel: 1,
          addressId: this.thisAddress.id,
          needPay: this.booksData.unitPrice + this.booksData.freightPrice,
          suborderList: JSON.stringify(sB)
        };
        orderCreate(data).then((res) => {
          if (res.code === 'Y') {
            this.$store.dispatch('orderInfo', JSON.stringify(res.data));
            this.$router.replace({path: '/orderPay'});
          } else {
            this.message = res.msg;
            this.isShow = true;
          }
        })
      },
      // 地址管理
      goAddressManage() {
        this.$router.push({path: '/addressManage/1'});
      },
      // 新增地址
      addNewAds() {
        this.$router.push({name: 'newAds'})
      },
      isShowFun() {
        this.isShow = false
      }
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  .addNewAddress {
    height: 106*@wu;
    padding: 15*@wu;
    background-color: #ffffff;
    box-sizing: border-box;
    .addNewAddressBox {
      height: 100%;
      box-sizing: border-box;
      border: 1px dashed rgb(172, 172, 172);
      img {
        display: block;
        margin: 15*@wu auto 4*@wu auto;
        width: 20*@wu;
        height: 20*@wu;
      }
      div {
        text-align: center;
        font-size: 15*@wu;
        color: #565656;
      }
    }
  }

  .confirmBookDetail {
    padding: 30*@wu 12*@wu 36*@wu 12*@wu;
    background-color: #ffffff;
    .booksImg {
      width: 130*@wu;
      height: 100*@wu;
      display: inline-block;
      vertical-align: middle;
    }
    .booksList {
      display: inline-block;
      vertical-align: middle;
      padding: 0 18*@wu;
      p {
        margin: 0 0 10*@wu 0;
        padding: 0;
        text-indent: -10*@wu;
        font-size: 15*@wu;
        color: #262525;
      }
      .booksNumber {
        width: 82*@wu;
        height: 25*@wu;
        border: 1px solid #F0EEE8;
        margin-bottom: 13*@wu;
        div {
          width: 25*@wu;
          height: 25*@wu;
          text-align: center;
          display: inline-block;
          float: left;
          img {
            width: 10*@wu;
            height: auto;
            display: block;
            margin: 12*@wu auto 0 auto;
          }
          .imgRight {
            margin-top: 8*@wu;
          }
        }
        span {
          width: 32*@wu;
          display: inline-block;
          vertical-align: middle;
          float: left;
          box-sizing: border-box;
          border-left: 1px solid #F0EEE8;
          border-right: 1px solid #F0EEE8;
          height: 25*@wu;
          line-height: 25*@wu;
          text-align: center;
          font-size: 12*@wu;
          color: #383838;
        }
      }
      & > span {
        font-size: 12*@wu;
        color: #A0A0A0;
        clear: both;
        display: block;
      }
    }
  }

  .bookPrice {
    height: 60*@wu;
    background-color: #ffffff;
    padding-right: 36*@wu;
    text-align: right;
    padding-top: 8*@wu;
    box-sizing: border-box;
    div {
      color: rgb(170, 170, 170);
      font-size: 15*@wu;
      span {
        font-size: 20*@wu;
        color: #F44F4F;
        letter-spacing: -1*@wu;
        margin-left: 5*@wu;
      }
    }
    p {
      font-size: 10*@wu;
      margin: 0;
      color: #C3C3C3;
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

  .fixedBox {
    width: 100%;
    display: flex;
    height: auto !important;
    align-items: center;
    border-bottom: 1px solid #F1F1F1;
    padding-bottom: 10*@wu;
    margin-bottom: 10*@wu;
    .addressList {
      flex: 1;
      font-size: 14*@wu;
      color: #474545;
    }
    .addressListImg {
      flex: 0 0 5*@wu;
      padding-left: 20*@wu;
      img {
        width: 5*@wu;
        height: 10*@wu;
      }
    }
  }

  .sendGoodsWay {
    font-size: 12*@wu;
    color: #474545;
    i {
      color: #F44F4F;
      font-style: inherit;
      font-weight: 600;
    }
  }
</style>
