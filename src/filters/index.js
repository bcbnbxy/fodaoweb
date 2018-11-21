/**
 * filters
 */

// 用户级别
export const userType = type => {
  let str = '';
  switch (type) {
    case 1:
      str = '黄金合伙人.'; //钻石合伙人
      break;
    case 2:
      str = '黄金合伙人';
      break;
    case 3:
      str = '白银合伙人';
      break;
    case 4:
      str = '终身学员 ';
      break;
    case 5:
      str = '初级学员';
      break;
    case 6:
      str = '普通用户';
      break;
    case 7:
      str = '高级合伙人';
      break;
  }
  return str;
}

// 电话号码中间四位显示*
export const telStar = val => {
  if (!val) {
    return ''
  }
  let bef = val.substring(0, 3);
  let end = val.substring(val.length - 4, val.length);
  return bef + '****' + end;
}

// 订单状态
export const orderState = type => {
  let str = '';
  switch (type) {
    case 1:
      str = '待付款';
      break;
    case 2:
      str = '已支付';
      break;
    case 3:
      str = '已取消';
      break;
    case 4:
      str = '待发货';
      break;
    case 5:
      str = '待收货';
      break;
    case 6:
      str = '待评价';
      break;
    case 7:
      str = '已完成';
      break;
  }
  return str;
}

// 支付方式
export const payType = type => {
  let str = '';
  switch (type) {
    case 1:
      str = '支付宝支付';
      break;
    case 2:
      str = '微信支付';
      break;
    case 3:
      str = '余额支付';
      break;
    case 4:
      str = '其它';
      break;
  }
  return str;
}

// 提现方式
export const wOutType = type => {
  let str = '';
  switch (type) {
    case 1:
      str = '支付宝提现';
      break;
    case 2:
      str = '微信提现';
      break;
    case 3:
      str = '线下提现';
      break;
    /*case 3:
    str = '银行提现';
    break;*/
  }
  return str;
}

// 数字默认加0.00
export const numberFixed = type => {
  let str = '';
  switch (type) {
    case 0:
      str = '0.00';
      break;
    default:
      str = type;
  }
  return str;
}

// 提现状态
export const capitalState = type => {   // 1:待审核/申请中 2：已审核 /待打款 3：驳回/无效 4：再待审核 5：完成操作/已提现
  let str = '';
  switch (type) {
    case 1:
      str = '待审核';
      break;
    case 2:
      str = '待打款';
      break;
    case 3:
      str = '提现失败';
      break;
    case 4:
      str = '再待审核';
      break;
    case 5:
      str = '提现成功';
      break;
  }
  return str;
}

// 物流类型
export const logisticsType = type => {
  let str = '';
  switch (type) {
    case 0:
      str = '运输中';
      break;
    case 1:
      str = '已揽件';
      break;
    case 2:
      str = '疑难件';
      break;
    case 3:
      str = '已签收';
      break;
    case 4:
      str = '退回并签收';
      break;
    case 5:
      str = '正在派件中';
      break;
    case 6:
      str = '退回中';
      break;
  }
  return str;
}
