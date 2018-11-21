<template>
  <div class='page pageColor'>
    <div class="backTit">信息智能加密,仅用于银行验证</div>
    <div class="backInputBox">
      <span>持卡人</span>
      <input type="text" v-model="ruleForm.name" placeholder="请输入绑定银行卡姓名" @blur="nameFun">
      <img src="../../assets/img/clear.png" @click="closeFun(1)">
    </div>
    <div class="backInputBox">
      <span>卡&emsp;号</span>
      <input type="number" v-model="ruleForm.cardNumber" placeholder="仅支持储蓄卡" @blur="cardNumberFun">
      <img src="../../assets/img/clear.png" @click="closeFun(2)">
    </div>
    <button class="backBtn" :disabled="isDisabled" :style="{opacity: isDisabled?'0.5':''}" @click="addBackNext()">下一步</button>

    <alert-box :message="message" @isShow="isShowFun" v-if="isShow"></alert-box>

  </div>
</template>

<script>
  function luhnCheck(bankno) {
    let lastNum = bankno.substr(bankno.length - 1, 1);//取出最后一位（与luhn进行比较）

    let first15Num = bankno.substr(0, bankno.length - 1);//前15或18位
    let newArr = new Array();
    for (let i = first15Num.length - 1; i > -1; i--) {    //前15或18位倒序存进数组
      newArr.push(first15Num.substr(i, 1));
    }
    let arrJiShu = new Array();  //奇数位*2的积 <9
    let arrJiShu2 = new Array(); //奇数位*2的积 >9

    let arrOuShu = new Array();  //偶数位数组
    for (let j = 0; j < newArr.length; j++) {
      if ((j + 1) % 2 === 1) {//奇数位
        if (parseInt(newArr[j]) * 2 < 9)
          arrJiShu.push(parseInt(newArr[j]) * 2);
        else
          arrJiShu2.push(parseInt(newArr[j]) * 2);
      }
      else //偶数位
        arrOuShu.push(newArr[j]);
    }

    let jishu_child1 = new Array();//奇数位*2 >9 的分割之后的数组个位数
    let jishu_child2 = new Array();//奇数位*2 >9 的分割之后的数组十位数
    for (let h = 0; h < arrJiShu2.length; h++) {
      jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
      jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
    }

    let sumJiShu = 0; //奇数位*2 < 9 的数组之和
    let sumOuShu = 0; //偶数位数组之和
    let sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
    let sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
    let sumTotal = 0;
    for (let m = 0; m < arrJiShu.length; m++) {
      sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
    }

    for (let n = 0; n < arrOuShu.length; n++) {
      sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
    }

    for (let p = 0; p < jishu_child1.length; p++) {
      sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
      sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
    }
    //计算总和
    sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

    //计算luhn值
    let k = parseInt(sumTotal) % 10 === 0 ? 10 : parseInt(sumTotal) % 10;
    let luhn = 10 - k;
    if (lastNum == luhn) {
      // console.log("验证通过");
      return true;
    } else {
      // console.log("银行卡号必须符合luhn校验");
      return false;
    }
  }

  export default {
    data() {
      return {
        isDisabled: true,
        ruleForm: {
          name: '',
          cardNumber: ''
        },
        // 错误提醒
        message: '',
        isShow: false,
        // 是否通过验证
        nameGo: false,
        cardNumberGo: false
      }
    },
    methods: {
      // 清空值
      closeFun(val) {
        if (val === 1) {
          this.ruleForm.name = '';
        } else {
          this.ruleForm.cardNumber = '';
        }
      },
      // 验证姓名
      nameFun() {
        if (!/^[\u4e00-\u9fa5]+$/.test(this.ruleForm.name)) {
          this.message = '请输入中文姓名';
          this.isShow = true;
          this.ruleForm.name = '';
          this.nameGo = false;
        }else {
          this.nameGo = true;
          if(this.cardNumberGo){this.isDisabled = false;}else {this.isDisabled = true}
        }
      },
      // 验证卡号
      cardNumberFun(){
        if(this.ruleForm.cardNumber === ''){
          return false;
        }
        if (this.ruleForm.cardNumber.length < 16 || this.ruleForm.cardNumber.length > 19) {
          this.message = '银行卡号长度必须在16到19之间';
          this.isShow = true;
          this.cardNumberGo = false;
        }
        //开头6位
        let strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
        if (strBin.indexOf(this.ruleForm.cardNumber.substring(0, 2)) === -1) {
          this.message = "银行卡号开头6位不符合规范";
          this.isShow = true;
          this.cardNumberGo = false;
        }
        if(!luhnCheck(this.ruleForm.cardNumber)){
          this.message = '银行卡号输入有误，请检查';
          this.isShow = true;
          this.isDisabled = true;
          this.cardNumberGo = false;
        }else {
          if(this.nameGo){this.isDisabled = false;}else {this.isDisabled = true}
          this.cardNumberGo = true;
        }
      },
      // 下一步
      addBackNext() {
        if(this.cardNumberGo && this.nameGo){
          this.$router.push({name: "addBack2", params: {items: JSON.stringify(this.ruleForm)}})
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
  .backTit {
    font-size: 13*@wu;
    color: #979797;
    margin: 30*@wu 0 10*@wu 35*@wu;
  }

  .backInputBox {
    background: #FFFFFF;
    border: 1px solid #F1F1F1;
    box-shadow: 0 1px 2px 0 rgba(240, 240, 240, 0.50);
    border-radius: 3*@wu;
    width: 355*@wu;
    height: 48*@wu;
    line-height: 48*@wu;
    margin: 0 auto 10*@wu auto;
    box-sizing: border-box;
    padding-left: 18*@wu;
    font-size: 14*@wu;
    position: relative;
    input {
      width: 245*@wu;
      height: 38*@wu;
      border: none;
      outline: none;
      font-size: 14*@wu;
      &::placeholder {
        color: #D2D2D2;
      }
    }
    span {
      margin-right: 10*@wu;
    }
    img {
      width: 13*@wu;
      height: 13*@wu;
    }
  }

  .backBtn {
    background-image: linear-gradient(-101deg, #FFC940 1%, #FFBD30 100%);
    border-radius: 7*@wu;
    width: 345*@wu;
    height: 42*@wu;
    border: none;
    display: block;
    margin: 0 auto;
    font-size: 16*@wu;
    color: #FFFFFF;
    margin-top: 40*@wu;
  }
</style>
