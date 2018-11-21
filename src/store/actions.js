import * as types from './mutations_types'

export const userLogin = ({ commit }, token) => {
  commit(types.USER_SIGNIN, token);
}

export default {
  //用户登录
  userLogin({ commit }, token) {
    commit(types.USER_SIGNIN, token);
  },
  // 微信路由判断
  routerState({ commit }, routerState) {
    commit(types.ROUTER_STATE, routerState);
  },
  // 返回路由判断
  backState({ commit }, backState) {
    commit(types.BACK_STATE, backState);
  },
  //用户退出
  userLogout({ commit }) {
    commit(types.USER_SIGNOUT);
  },
  //用户信息
  userInfo({commit}, userInfo) {
    commit(types.USER_INFO, userInfo);
  },
  //订单信息
  orderInfo({ commit }, orderInfo) {
    commit(types.ORDER_INFO, orderInfo);
  },
  // 选择的收货地址
  chooseAddress({ commit }, chooseAddress) {
    commit(types.CHOOSE_ADDRESS, chooseAddress);
  }
}
