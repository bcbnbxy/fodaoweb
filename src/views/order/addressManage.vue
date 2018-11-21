<template>
  <div class='page pageColor paddingBottom'>
    <div class="addressManageBox" v-for="(item,index) in addressListData" @click="chooseAds(index)">
      <div class="addressManageBoxLeft">
        <img src="../../assets/img/choosePayWay.png" v-if="item.isDefault">
      </div>
      <div class="addressManageBoxRight">
        <p>{{item.name}} {{item.mobile}}</p>
        <p>{{item.area + item.address}}</p>
        <div class="addressManageLine"></div>
        <div class="addressManageBottom">
          <button @click.stop="removeAds(item.id)">删除</button>
          <button @click.stop="changeAds(item)">编辑</button>
        </div>
      </div>
    </div>

    <div class="addNewAddress">
      <div class="addNewAddressBox" @click="addNewAds()">
        <img src="../../assets/img/addNumber.png">
        <div>添加收货地址</div>
      </div>
    </div>

    <button class="subOrder" @click="chooseAddressFun()" v-if="$route.params.id === '1'">确定</button>
    <alert-box :message="message" @isShow="isShowFun" v-if="isShow"></alert-box>
  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui';
  import {addressDelete,addressList} from '@/api/index'
  export default {
    data() {
      return {
        // 选择的地址id
        adsId: '',
        addressListData: [],

        message: '',
        isShow: false
      }
    },
    mounted() {
      this.queryList();
    },
    methods: {
      // 查询地址
      queryList() {
        addressList().then((res) => {
          if (res.code === 'Y') {
            this.addressListData = res.data;
            let val = this.$store.getters.getChooseAddress;
            if(Number(val)){
              this.addressListData.forEach((item, index) => {
                if (index === Number(val)-1) {
                  item.isDefault = true;
                } else {
                  item.isDefault = false;
                }
              })
            }
          }
        })
      },
      // 选择地址
      chooseAds(val) {
        if (this.$route.params.id === '2') {
          return false;
        }
        this.adsId = val;
        this.addressListData.forEach((item, index) => {
          if (index === val) {
            item.isDefault = true;
          } else {
            item.isDefault = false;
          }
        })
      },
      // 删除地址
      removeAds(id) {
        MessageBox.confirm('确定要删除改地址吗？').then(action => {
          if (action) {
            addressDelete({id:id}).then((res)=>{
              if (res.code === 'Y'){
                this.message = '删除成功';
                this.isShow = true;
                this.queryList()
              }
            })
          }
        });
      },
      // 编辑地址
      changeAds(item) {
        sessionStorage.setItem('address', JSON.stringify(item));
        this.$router.push({path: '/newAds/' + 1})
      },
      // 新增地址
      addNewAds() {
        this.$router.push({path: '/newAds/' + 2})
      },
      // 关闭弹框
      isShowFun(){
        this.isShow = false
      },
      // 确认选择地址
      chooseAddressFun(){
        if (this.$route.params.id === '2') {
          return false;
        }
        sessionStorage.setItem('chooseAddress', this.adsId+1);
        this.$store.dispatch('chooseAddress', this.adsId+1);
        this.$router.go(-1);
      }
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  .addressManageBox {
    width: 355*@wu;
    margin: 11*@wu auto;
    background-color: #ffffff;
    padding: 18*@wu 25*@wu 15*@wu 18*@wu;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .addressManageBoxLeft {
      width: 22*@wu;
      margin-right: 18*@wu;
      box-sizing: border-box;
      img {
        width: 20*@wu;
        height: 20*@wu;
      }
    }
    .addressManageBoxRight {
      p {
        margin: 0;
        padding: 0;
        font-size: 14*@wu;
        color: #262525;
        width: 274*@wu;
      }
      p:first-child {
        font-size: 13*@wu;
        color: #3E3E3E;
        margin-bottom: 8*@wu;
      }
      .addressManageLine {
        height: 1px;
        background-color: #F1F1F1;
        margin: 10*@wu 0 15*@wu 0;
      }
      .addressManageBottom {
        text-align: right;
        button {
          border: 1px solid #979797;
          border-radius: 2*@wu;
          width: 68*@wu;
          height: 32*@wu;
          color: rgb(161, 161, 161);
          background-color: #ffffff;
        }
      }
    }
  }

  .addNewAddress {
    width: 355*@wu;
    height: 95*@wu;
    padding: 15*@wu;
    margin:11*@wu;
    background-color: #ffffff;
    box-sizing: border-box;
    .addNewAddressBox {
      height: 100%;
      box-sizing: border-box;
      img {
        display: block;
        margin: 20*@wu auto 4*@wu auto;
        width: 13*@wu;
        height: 13*@wu;
      }
      div {
        text-align: center;
        font-size: 13*@wu;
        color: #F2BB19;
      }
    }
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

  .paddingBottom {
    box-sizing: border-box;
    padding-bottom: 100*@wu;
  }
</style>
