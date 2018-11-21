<template>
  <div class='page pageColor newAds'>
    <div class="topDistance"></div>

    <div class="newAdsBox">
      <ul>
        <li><span>收货人</span><input type="text" v-model="ruleForm.name" placeholder="请输入收货人姓名"></li>
        <li><span>手机号</span><input type="text" v-model="ruleForm.mobile" placeholder="请输入手机号码"></li>
        <li><span>所在地区</span><i :style="{color: areaAm==='请选择所在地区'?'#cccccc':''}" @click="isChoose = true">{{areaAm}}</i><img src="../../assets/img/next.png"></li>
        <li><span>详细地址</span><input placeholder="请输入详细地址" v-model="ruleForm.address"></li>
      </ul>
    </div>

    <div class="setDetailAds" @click="setDetail()">
      <img src="../../assets/img/choosePayWay.png" v-if="ruleForm.isDefault">
      <img src="../../assets/img/noChoose.png" v-else>
      <span>设为默认收货地址</span>
    </div>

    <button class="subOrder" @click="saveAddress()">保存</button>

    <alert-box :message="message" @isShow="isShowFun" v-if="isShow" :warningImg="warningImg"></alert-box>

    <div class="mask" v-if="isChoose"></div>
    <div class="sureBtn" v-if="isChoose"><i @click="isChoose = false">取消</i><span @click="conShowChoose()">确定</span></div>
    <mt-picker class="pickerSe" :slots="slots1" @change="onValuesChange1" value-key="name" v-if="isChoose"></mt-picker>
    <mt-picker class="pickerSs" :slots="slots2" @change="onValuesChange2" value-key="name" v-if="isChoose"></mt-picker>
    <mt-picker class="pickerSq" :slots="slots3" @change="onValuesChange3" value-key="name" v-if="isChoose"></mt-picker>
    <mt-picker class="pickerSt" :slots="slots4" @change="onValuesChange4" value-key="name" v-show="isChoose"></mt-picker>
  </div>
</template>

<script>
  import {Picker} from 'mint-ui'
  import {addressAdd,addressUpdate} from '@/api/index'
  export default {
    data() {
      return {
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
        slots3: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'center'
          }],
        slots4: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'center'
          }],
        ruleForm: {
          area: '',
          address: '',
          id: '3',
          isDefault: false,
          name: '',
          mobile: ''
        },
        areaData: [],
        isChoose: false,

        province: {},
        city: {},
        district: {},
        town: {},

        areaAm:'请选择所在地区',
        message: '',
        isShow: false,
        warningImg: 0,

        slots: [
          {
            flex: 1,
            values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
            className: 'slot1',
            textAlign: 'right'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
            className: 'slot3',
            textAlign: 'left'
          }
        ]
      }
    },
    created(){
      // 判断能不能使用本地省市区数据
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
    mounted() {
      if (this.$route.params.id === '1') {
        this.ruleForm = JSON.parse(sessionStorage.getItem('address'));
        this.areaAm = this.ruleForm.area;
        document.title = '修改收货地址';
      } else {
        document.title = '新增收货地址';
      }
    },
    methods: {
      // 设为默认
      setDetail(){
        this.ruleForm.isDefault = !this.ruleForm.isDefault;
      },
      // 确定选择省市
      conShowChoose() {
        this.areaAm = this.province.name + (this.city?this.city.name: '') + (this.district?this.district.name: '') + (this.town?this.town.name: '');
        this.isChoose = false;
      },
      // 选择省
      onValuesChange1(picker, values) {
        this.province = values[0];
        this.areaData.forEach((item1) => {
          if (item1.code === values[0].code) {
            if(item1.childs.length > 0){
              this.slots2[0].values = item1.childs;
              item1.childs.forEach((item2) => {
                this.slots3[0].values = item2.childs;
                item2.childs.forEach((item3) => {
                  this.slots4[0].values = item3.childs;
                })
              })
            }else {
              this.slots2[0].values = [];
              this.slots3[0].values = [];
              this.slots4[0].values = [];
            }
          }
        })
      },
      // 选择市
      onValuesChange2(picker, values) {
        this.city = values[0];
        this.slots2[0].values.forEach((item1)=>{
          if (item1.code === values[0].code) {
            this.slots3[0].values = item1.childs;
            item1.childs.forEach((item2) => {
              this.slots4[0].values = item2.childs;
            })
          }
        })
      },
      // 选择区
      onValuesChange3(picker, values) {
        this.district = values[0];
        this.slots3[0].values.forEach((item1)=>{
          if (item1.code === values[0].code) {
            this.slots4[0].values = item1.childs;
          }
        })
      },
      // 选择地方
      onValuesChange4(picker, values) {
        this.town = values[0];
      },
      // 验证手机号码
      isPhoneFun(mobile) {
        return !(/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(mobile))
      },
      // 保存地址
      saveAddress(){
        let flg = false;
        let name = '';
        if(this.ruleForm.name === ''){
          name = '收货人姓名不能为空';
          flg = true;
        }else if(this.ruleForm.mobile === ''){
          name = '手机号不能为空';
          flg = true;
        }else if(this.isPhoneFun(this.ruleForm.mobile)){
          name = '手机号输入不正确';
          flg = true;
        }else if(this.areaAm === ''){
          name = '请选择省市区';
          flg = true;
        }else if(this.ruleForm.address === ''){
          name = '请输入详细地址';
          flg = true;
        }
        if(flg){
          this.message = name;
          this.isShow = true;
          return false
        }
        let fromVal = {
          id: this.ruleForm.id || '',
          name: this.ruleForm.name,
          mobile: this.ruleForm.mobile,
          address: this.ruleForm.address,
          area: this.areaAm,
          isDefault: Number(this.ruleForm.isDefault)
        };
        if (this.$route.params.id === '1'){
          addressUpdate(fromVal).then((res)=>{
            if(res.code === 'Y'){
              this.message = '修改成功';
              this.isShow = true;
              setTimeout(()=>{
                this.$router.go(-1)
              },2000)

            }
          })
        }else {
          addressAdd(fromVal).then((res)=>{
            if(res.code === 'Y'){
              this.message = '新增成功';
              this.isShow = true;
              setTimeout(()=>{
                this.$router.go(-1)
              },2000)
            }
          })
        }
      },
      // 关闭弹框
      isShowFun() {
        this.isShow = false;
      },
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  .newAdsBox {
    padding: 15*@wu;
    background-color: #ffffff;
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      li {
        display: flex;
        align-items: center;
        margin-bottom: 14*@wu;
        border-bottom: 1px solid #F1F1F1;
        padding-bottom: 14*@wu;
        span {
          width: 70*@wu;
          font-size: 15*@wu;
          color: #262525;
        }
        input {
          width: 260*@wu;
          font-size: 15*@wu;
          color: #646363;
          border: none;
          outline: none;
        }
        input::placeholder {
          color: #cccccc;
        }
        i {
          width: 260*@wu;
          font-size: 15*@wu;
          color: #646363;
          font-style: inherit;
          margin-right: 10*@wu;
        }
        img {
          width: 5*@wu;
          height: 10*@wu;
        }
      }
      li:last-child {
        border-bottom: none;
      }
    }
  }

  .setDetailAds {
    padding: 16*@wu 0 0 20*@wu;
    img {
      width: 16*@wu;
      height: 16*@wu;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      font-size: 13*@wu;
      color: #615E5B;
    }
  }

  .subOrder {
    border-radius: 7*@wu;
    width: 345*@wu;
    height: 42*@wu;
    border: none;
    color: #ffffff;
    font-size: 16*@wu;
    background-image: linear-gradient(-101deg, #FFC940 1%, #FFBD30 100%);
    margin-top: 40*@wu;
    margin-left: 15*@wu;
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
  .newAds{
    .picker {
      position: absolute;
      background-color: #ffffff;
      bottom: 0;
      width: 93.75*@wu;
      z-index: 1000;
    }

    .pickerSe {
      left: 0;
    }

    .pickerSs {
      left: 93.75*@wu;
    }

    .pickerSq {
      left: 187.5*@wu;
    }

    .pickerSt {
      left: 281.25*@wu;
    }

    .picker-slot {
      font-size: 15*@wu;
    }

    .picker-center-highlight:before, .picker-center-highlight:after {
      height: 0 !important;
    }
  }
</style>
