// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import Vuex from 'vuex'
import 'babel-polyfill'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import '@/assets/css/reset.less'
import alertBox from '@/components/alertBox'
import * as filters from './filters/index'
import {is_WX,wxShareFun} from '@/tools/tools'
import {wxLogin, userInfoApi} from '@/api/index'
Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(Mint);

Vue.component('alert-box', alertBox);

/* eslint-disable no-new */
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));  // 注册过滤

router.beforeEach((to,from,next)=>{
	
	//alert("to.path：" + to.path + "===location.pathname：" + location.pathname +"===to.fullPath：" + to.fullPath);
	 //console.log(to);
  // 判断是否在微信内并且已登录
  var islogin =  to.fullPath.indexOf("/login");
  if(is_WX() && !sessionStorage.getItem('token') &&
  		islogin == -1 &&
	  ( to.fullPath != '/home/index' &&
	  to.fullPath != '/partnerList' &&
	  to.fullPath != '/onlineClass' &&
	  to.fullPath != '/callService' &&
	  to.fullPath != '/broadcast' &&
	  to.fullPath != '/industry' &&
	  to.fullPath != '/teacherIntroduction' &&
	  to.fullPath != '/classDetail' &&
	  to.fullPath != '/womanClassList' &&
	  to.fullPath != '/menClassList' 
//	  to.fullPath != '/classList/1' &&
//	  to.fullPath != '/womanList/39' 
	  //&&to.fullPath != '/home/onlineClass' 我的課程頁面需要獲取token進行登錄驗證
	 )){
		//
		localStorage.setItem("oldPath" , to.path);
		var id = localStorage.getItem('userId')?localStorage.getItem('userId'):0;
		var state= Date.parse(new Date())+'|'+id+'|'+sessionStorage.getItem('realmName')+'|1';
		var appid = "wxd57d2db000c7eaef"; //正式服： wx16ae35cd8aadc3d6  测试服： wxd57d2db000c7eaef  
		window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + 
		appid + '&redirect_uri=https%3A%2F%2Fkf.fudaojt.com%2Fpassport%2Fwxuser%2Fcallback&response_type=code&scope=snsapi_userinfo&state='+state+'#wechat_redirect';
	  	// 正式服: api.fudaojt.com  测试服地址 ：kf.fudaojt.com
	  	
	  //console.log( 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
		//appid + '&redirect_uri=https%3A%2F%2Fkf.fudaojt.com%2Fpassport%2Fwxuser%2Fcallback&response_type=code&scope=snsapi_userinfo&state='+state+'#wechat_redirect' );
  }else if( is_WX() && sessionStorage.getItem('token') == "userId" ){
  	 	if( localStorage.getItem('oldPath') )
      	{
      		location.assign(localStorage.getItem('oldPath')); 
  			localStorage.removeItem('oldPath');
      	}else{
      		next();
      	}
  }else{
    if (is_WX()) {
      // 为了实现微信分享，每个页面都需刷新一遍
      console.log(1111);
      if (to.path !== location.pathname) {
      	if( localStorage.getItem('oldPath') )
      	{
      		location.assign(localStorage.getItem('oldPath')); 
      		localStorage.removeItem('oldPath');
      	}else{
      		location.assign(to.fullPath); 
    	}             
        //alert("to.fullPath：" + to.fullPath);
      } else {
      	
        if(to.fullPath === '/' || to.Path === '/'){
          location.assign('/home/index');

        }else {
    	
		    if( localStorage.getItem('oldPath') )
	      	{
	      		location.assign(localStorage.getItem('oldPath')); 
      			localStorage.removeItem('oldPath');
	      	}else{
         		next();
			}
        }
      }
    } else {
      next();
    }
  }
});

// 微信路由判断
router.afterEach((to, from) => {
  if (is_WX() && !!router.app.$route) {  // 判断是否登录
    if(!!to.meta.requireAuth){  // requireAuth的值为true时当前进入的路由需要隐藏
      router.app.$store.dispatch('routerState', 1)
    }else {
      router.app.$store.dispatch('routerState', 2)
    }
  }
  if(!!router.app.$route){
    if(!!to.meta.backState && window.app!==1){  // 判断是否在app内，不在内并且backState为真就显示：返回状态栏，
      router.app.$store.dispatch('backState', 1)
    }else {
      router.app.$store.dispatch('backState', 2)
    }
  }
  if(is_WX()){
    wxShareFun(store.getters.getUserInfo || {id:'',userLevel:''});
  }
});

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
