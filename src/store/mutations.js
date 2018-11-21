import * as types from './mutations_types'

export default {
  // 用户登录
  [types.USER_SIGNIN](state, token) {
    if (token) {
      sessionStorage.setItem('token', token);
      state.token = token;
    }
  },
  // 微信路由判断
  [types.ROUTER_STATE](state, routerState) {
    if (routerState) {
      sessionStorage.setItem('routerState', routerState);
      state.routerState = routerState;
    }
  },
  // 微信路由判断
  [types.BACK_STATE](state, backState) {
    if (backState) {
      sessionStorage.setItem('backState', backState);
      state.backState = backState;
    }
  },
  // 用户退出
  [types.USER_SIGNOUT](state) {
    sessionStorage.clear();
    state.token = '';
    state.userName = '';
  },
  // 用户信息
  [types.USER_INFO](state, userInfo) {
    if (userInfo) {
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
      state.userInfo = userInfo;
    }
  },
  // 订单信息
  [types.ORDER_INFO](state, orderInfo) {
    if (orderInfo) {
      sessionStorage.setItem('orderInfo', JSON.stringify(orderInfo));
      state.orderInfo = orderInfo;
    }
  },
  // 选择的收货地址
  [types.CHOOSE_ADDRESS](state, chooseAddress) {
    if (chooseAddress) {
      sessionStorage.setItem('chooseAddress', chooseAddress);
      state.chooseAddress = chooseAddress;
    }
  }
}
