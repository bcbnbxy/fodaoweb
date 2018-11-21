import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

const state = {
  token:'', // 用户token
  routerState: 0, // 微信路由状态
  backState: 0, // 头部返回控制
  userInfo:'',  //  用户信息
  orderInfo: '',
  chooseAddress: ''   // 选择收货地址
}


if (!navigator.cookieEnabled) {
  alert('请允许浏览器使用Cookie');
}else{
  if(state.token === ''){
    state.token = sessionStorage.token;
  }
  if(state.routerState === ''){
    state.routerState = sessionStorage.routerState;
  }
  if(state.backState === ''){
    state.backState = sessionStorage.backState;
  }
  if(state.userInfo === ''){
    state.userInfo = sessionStorage.userInfo?JSON.parse(sessionStorage.userInfo):'';
  }
  if(state.orderInfo === ''){
    state.orderInfo = sessionStorage.orderInfo?JSON.parse(sessionStorage.orderInfo):'';
  }
  if(state.chooseAddress === ''){
    state.chooseAddress = sessionStorage.chooseAddress || '';
  }
}

export default new Vuex.Store({
	state,
  actions,
  getters,
	mutations
})
