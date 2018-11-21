/**
 * axios
 */
import axios from 'axios'
import router from '../router'
import qs from 'qs';
import {is_WX} from '@/tools/tools'
import {MessageBox} from 'mint-ui';
let URL = 'https://kf.fudaojt.com:443'; // 测试接口
//let URL = 'https://api.fudaojt.com';  // 正式接口
// let URL = '/api';
// let URL = 'http://172.31.3.91:8080'; // 正式ip接口

let $http = axios.create({
  baseURL: URL,
  timeout: 5000
});

// 头部带token
$http.interceptors.request.use(
  config => {
    // 让每个请求携带token
    let token = sessionStorage.getItem('token') || '';
    config.headers.authorization = token;
    Object.assign(config.headers);
    return config
  }, error => {
    Promise.reject(error)
  });

// 拦截响应
$http.interceptors.response.use(
  response => {
    switch (response.data.code) {
      case 'E00000010':
        MessageBox({
          title: '温馨提示',
          message: '您还未登录，请登录',
          confirmButtonText: '登录',
          showCancelButton: true
        }).then(action => {
          if (action === 'confirm') {
            // router.app.$router.push({path: '/login'});
            if(is_WX()){
              //wxLogin({recommendUserid: localStorage.getItem('userId')?localStorage.getItem('userId'):0, url: window.location.href, isLogin:1}).then((res) => {
                //window.location.href = res.data;
                //console.log(res.data);
              //})
              
				var id = localStorage.getItem('userId')?localStorage.getItem('userId'):0;
				var state= Date.parse(new Date())+'|'+id+'|'+sessionStorage.getItem('realmName')+'|1';
				var appid = "wx16ae35cd8aadc3d6"; //正式服： wx16ae35cd8aadc3d6  测试服： wxd57d2db000c7eaef
				window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + 
				appid + '&redirect_uri=https%3A%2F%2Fapi.fudaojt.com%2Fpassport%2Fwxuser%2Fcallback&response_type=code&scope=snsapi_userinfo&state='+state+'#wechat_redirect';
			  	// 正式服: api.fudaojt.com  测试服地址 ：kf.fudaojt.com			
            }else {
              router.app.$router.push({path: '/login'})
            }
          }
        });
        break;
      case 'E00000028':
        MessageBox({
          title: '温馨提示',
          message: '有效期已过期或其他设备登录<br>请重新登录',
          confirmButtonText: '重新登录',
          showCancelButton: false
        }).then(action => {
          if (action === 'confirm') {
            // router.app.$router.push({path: '/login'})
            if(is_WX()){
				var id = localStorage.getItem('userId')?localStorage.getItem('userId'):0;
				var state= Date.parse(new Date())+'|'+id+'|'+sessionStorage.getItem('realmName')+'|1';
				var appid = "wx16ae35cd8aadc3d6"; //正式服： wx16ae35cd8aadc3d6  测试服： wxd57d2db000c7eaef
				window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + 
				appid + '&redirect_uri=https%3A%2F%2Fapi.fudaojt.com%2Fpassport%2Fwxuser%2Fcallback&response_type=code&scope=snsapi_userinfo&state='+state+'#wechat_redirect';
			  	// 正式服: api.fudaojt.com  测试服地址 ：kf.fudaojt.com			
              //})
            }else {
              router.app.$router.push({path: '/login'})
            }
          }
        });
        break;
      case 'E00000033':
        MessageBox({
          title: '温馨提示',
          message: '为了您更好的用户体验<br>请先验证手机号',
          confirmButtonText: '立即验证',
          showCancelButton: true
        }).then(action => {
          if (action === 'confirm') {
            router.app.$router.push({path: '/bindWx'})
          }
        });
        break;
    }
    return response
  },
  error => {
    console.log(error)
  }
);

const _del = (url, query) => {
  return $http.post(url, JSON.stringify(query))
    .then(res => res.data)
    .catch(err => console.log(err))
};
const _get = (url, query) => {
  return $http.get(url, {params: query})
    .then(res => res.data)
    .catch(err => console.log(err))
};
const _getUrl = (url, query) => {
  return $http.get(url + query, '')
    .then(res => res.data)
    .catch(err => console.log(err))
};
const _post = (url, query) => {
  return $http.post(url, JSON.stringify(query), {headers: {'Content-Type': 'application/json'}})
    .then(res => res.data)
    .catch(err => console.log(err))
};
const _postForm = (url, query) => {
  return $http.post(url, qs.stringify(query), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
    .then(res => res.data)
    .catch(err => console.log(err))
};
const _postImg = (url, query) => {
  return $http.post(url, query, {headers: {'Content-Type': 'multipart/form-data'}})
    .then(res => res.data)
    .catch(err => console.log(err))
};

/* API接口列表 */
const sendApi = {
  /* --------------登录-------------- */
  login: '/passport/sms/login',
  // 微信登录
  wxLogin: '/passport/wxuser/login', // /passport/wx/login
  // 微信登录
  bindWxMob: '/user/bing', // /passport/wx/login
  // 发送验证码
  sendCode: '/sms/send',
  // 验证手机号码是否存在
  mobileExist: '/passport/mobile/exist',
  //  验证验证码是否正确
  checkCode: '/passport/mobile/check',
  //  退出登录
  logOut: '/user/logout',
  // 微信分享
  wxShare: '/passport/wx/config',
  // 图片转码
  imageBase64:'/wechat/qrcode/imageBase',

  /* --------------上传文件-------------- */
  fileUpload: '/file/upload',

  /* --------------首页-------------- */
  // 首页轮播
  cmsBroadCast: '/cms/broadcast',
  // 书籍列表
  booksList: '/goods/books',
  // 课程列表
  goodsClass: '/goods/classs',
  // 权威解答
  answer: '/goods/answer',
  // 课程介绍
  goodsDetail: '/goods/detail',
  // 课程学习
  goodsLearn: '/goods/sso/course',
  // 免费的课程学习
  freeLearn: '/goods/course',
  // 课程学习
  updateStudy: '/sso/course/updateStudy',
  // 直播列表
  onlinePlay: '/goods/plays',
  // 课程是否可以学习
  classLearn: '/sso/goodsRecord/learn',
  // 判断课程是否购买
  classBuy: '/sso/course/isBuy',
  // 私人辅导
  privateTutor: '/cms/sso/privatetutor',
  //获取男性课程头部轮播图
  detailWithCourse:'/goods/detailWithCourse',
  
  
  //一级 二级 推广员数量
  studentsCount: 'user/mystudents/studentsCount',
  //按等级和类别查询我的学友列表
  listStudentsByType: '/user/mystudents/listStudentsByType',
  // 导师简介
  tutor: '/cms/tutor',
  // 行业资讯
  industry: '/cms/industry',
  // 女性课程预售
  womenClass: '/goods/womenclasss',


  /* --------------合伙人--------------*/
  // 合伙人列表
  partnerList: '/partner/list',
  // 合伙人列表
  buyPartner: '/partner/sso/detail',

  /* --------------我的-------------- */
  // 获取用户信息 推荐人传id
  userInfoApi: '/user/getUser',
  // 更新用户信息
  userPatch: '/user/patch',
  // 推广二维码
  shareCode: '/user/rqcode',
  // http://kf.fudaojt.com/wechat/qrcode/createTempTicket?userId=18 关注推广二维码
  toShareCode: '/wechat/qrcode/createTempTicket',
  // 个人余额
  getBalance: '/user/getBalance',
  // 我的学友主页面
  myStudents: '/user/mystudents',
  // 佣金排名
  commissionRanking: '/user/ranking',
  // 我的学友列表
  myStudentList: '/user/mystudents/list',
  //已邀请学友
  getShareInfo: '/user/getShareInfo',
  // 关注的学员
  followStudent: '/user/mybing',
  // 搜索关注的学员
  searchFollowClass: '/user/searchwxuser',
  // 我的学友详情
  myStudentDetail: '/user/mystudents',
  // 佣金列表
  capitalList: '/sso/capital/capital',
  // 佣金提现列表
  capitalCashList: '/sso/capital/cash',
  // 佣金总额
  capitalAllTol: '/sso/capital/capitalAllTol',
  // 推广首页
  capitalHome: '/sso/capital/home',
  // 推广佣金
  capitalTol: '/sso/capital/capitaltol',
  // 佣金详情
  capitalDetail: '/sso/capital/detail',
  // 我的课程列表
  myClassList: '/sso/course/query',
  // 股池列表
  stockPool: '/sso/capital/stockpool',
  // 股池总额
  getProfit: '/user/getProfit',
  // 设置支付密码
  setPayPsw: '/user/paymentpassword/set',
  // 验证支付密码
  yzPayPsw: '/user/paymentpassword/check',
  // 锁定支付密码
  lockingPaw: '/user/paymentpassword/locking',
  // 邀请码主页
  couponNum: '/sso/coupon/num',
  // 最近邀请码
  couponList: '/sso/coupon/list',
  // 优惠券
  myCoupon: '/sso/gift/mygift?couponState=1',


  /* --------------收货地址管理-------------- */
  // 地址列表
  addressList: '/address/queryList',
  // 添加收货地址
  addressAdd: '/address/add',
  // 更新收货地址
  addressUpdate: '/address/update',
  // 删除收货地址
  addressDelete: '/address/delete',
  // 选择默认收货地址
  addressDefault: '/address/default',

  /* 订单 */
  // 创建订单
  orderCreate: '/sso/order/create',
  // 查询订单
  orderList: '/sso/order/queryList',
  // 查询订单详情
  orderDetail: '/sso/order/query',
  // 取消订单
  cancelOrder: '/sso/order/cancelOrder',
  // 取消订单
  deleteOrder: '/sso/order/deleteOrder',
  // 订单评价
  commentOrder: '/sso/order/commentOrder',
  // 支付宝支付
  alipayCreate: '/sso/payment/alipayCreate',
  //获取支付宝花呗分期费率
  alipayHbfee:'/server/alipayHbfee',
  // 余额支付
  balancePay: '/payment/sso/balanceCreate',
  // 查看物流
  logistics: '/logistics/query',
  // 提现
  putForward: '/payment/sso/putForward',
  // 微信支付
  wxPay: '/payment/sso/weixinH5Nei' ,
  
  /* 群聊*/
 //获取群组
  getGroupList:'/user/getGroupList',
  /*-- 养生课堂 ---*/
 //养生列表
 healthtips : '/goods/healthtips',
 //养生课程详情
 healthtipsDetail :'/goods/healthtips/detail' ,
 //养生课堂 评论列表
 HealthCommentList : '/sso/health/queryHealthCommentList',
 //养生模块--保存课程评论
 saveHealthComment : '/sso/health/saveHealthComment',
 //播放养生课程增加播放次数
 healthtipsView : '/goods/healthtips/detail/view' ,
};

/* 登录 */
export const login = query => {
  return _postForm(sendApi.login, query)
};
export const wxLogin = query => {
  return _get(sendApi.wxLogin, query)
};
export const bindWxMob = query => {
  return _postForm(sendApi.bindWxMob, query)
};
export const sendCode = query => {
  return _postForm(sendApi.sendCode, query)
};
export const mobileExist = query => {
  return _get(sendApi.mobileExist, query)
};
export const checkCode = query => {
  return _get(sendApi.checkCode, query)
};
export const logOut = query => {
  return _post(sendApi.logOut, query)
};
export const wxShare = query => {
  return _get(sendApi.wxShare, query)
};
export const imageBase64 = query => {
  return _get(sendApi.imageBase64, query)
};

/* 上传文件 */
export const fileUpload = query => {
  return _postImg(sendApi.fileUpload, query)
};

/* 首页 */
export const cmsBroadCast = query => {
  return _get(sendApi.cmsBroadCast, query)
};
export const booksList = query => {
  return _get(sendApi.booksList, query)
};
export const goodsClass = query => {
  return _get(sendApi.goodsClass, query)
};
export const answer = query => {
  return _get(sendApi.answer, query)
};
export const goodsDetail = query => {
  return _get(sendApi.goodsDetail, query)
};
export const capitalHome = query => {
  return _get(sendApi.capitalHome, query)
};
export const goodsLearn = query => {
  return _get(sendApi.goodsLearn, query)
};
export const freeLearn = query => {
  return _get(sendApi.freeLearn, query)
};
export const updateStudy = query => {
  return _get(sendApi.updateStudy, query)
};
export const onlinePlay = query => {
  return _get(sendApi.onlinePlay, query)
};
export const classLearn = query => {
  return _postForm(sendApi.classLearn, query)
};
export const classBuy = query => {
  return _postForm(sendApi.classBuy, query)
};
export const privateTutor = query => {
  return _get(sendApi.privateTutor, query)
};
export const detailWithCourse = query => {
  return _get(sendApi.detailWithCourse, query)
};
export const studentsCount = query => {
  return _post(sendApi.studentsCount, query)
};
export const listStudentsByType = query => {
  return _postForm(sendApi.listStudentsByType, query)
};

export const tutor = query => {
  return _get(sendApi.tutor, query)
};
export const industry = query => {
  return _get(sendApi.industry, query)
};
export const womenClass = query => {
  return _get(sendApi.womenClass, query)
};

/* 合伙人 */
export const partnerList = query => {
  return _get(sendApi.partnerList, query)
};
export const buyPartner = query => {
  return _get(sendApi.buyPartner, query)
};

/* 我的 */
export const userInfoApi = query => {
  return _get(sendApi.userInfoApi, query)
};
export const larderUserInfoApi = query => {
  return _getUrl(sendApi.userInfoApi, query)
};
export const userPatch = query => {
  return _postForm(sendApi.userPatch, query)
};
export const shareCode = query => {
  return _get(sendApi.shareCode, query)
};
export const toShareCode = query => {
  return _get(sendApi.toShareCode, query)
};
export const getBalance = query => {
  return _get(sendApi.getBalance, query)
};
export const myStudents = query => {
  return _get(sendApi.myStudents, query)
};
export const followStudentApi = query => {
  return _get(sendApi.followStudent, query)
};
export const searchFollowClassFun = query => {
  return _get(sendApi.searchFollowClass, query)
};
export const myStudentDetail = query => {
  return _getUrl(sendApi.myStudentDetail, query)
};
export const commissionRanking = query => {
  return _get(sendApi.commissionRanking, query)
};
export const myStudentList = query => {
  return _get(sendApi.myStudentList, query)
};
export const getShareInfo = query => {
  return _get(sendApi.getShareInfo, query)
};


export const capitalList = query => {
  return _get(sendApi.capitalList, query)
};
export const capitalCashList = query => {
  return _get(sendApi.capitalCashList, query)
};
export const capitalTol = query => {
  return _get(sendApi.capitalTol, query)
};
export const capitalDetail = query => {
  return _get(sendApi.capitalDetail, query)
};
export const capitalAllTol = query => {
  return _get(sendApi.capitalAllTol, query)
};
export const myClassList = query => {
  return _postForm(sendApi.myClassList, query)
};
export const stockPool = query => {
  return _get(sendApi.stockPool, query)
};
export const getProfit = query => {
  return _get(sendApi.getProfit, query)
};
export const setPayPsw = query => {
  return _postForm(sendApi.setPayPsw, query)
};
export const yzPayPsw = query => {
  return _get(sendApi.yzPayPsw, query)
};
export const lockingPaw = query => {
  return _post(sendApi.lockingPaw, query)
};
export const couponNum = query => {
  return _post(sendApi.couponNum, query)
};
export const couponList = query => {
  return _get(sendApi.couponList, query)
};
export const alipayHbfee = query => {
  return _get(sendApi.alipayHbfee, query)
};
export const myCoupon = query => {
  return _post(sendApi.myCoupon, query)
};

/* 收货地址管理 */
export const addressList = query => {
  return _get(sendApi.addressList, query)
};
export const addressAdd = query => {
  return _postForm(sendApi.addressAdd, query)
};
export const addressUpdate = query => {
  return _postForm(sendApi.addressUpdate, query)
};
export const addressDelete = query => {
  return _postForm(sendApi.addressDelete, query)
};
export const addressDefault = query => {
  return _get(sendApi.addressDefault, query)
};

/* 订单 */
export const orderCreate = query => {
  return _postForm(sendApi.orderCreate, query)
};
export const orderList = query => {
  return _get(sendApi.orderList, query)
};
export const commentOrder = query => {
  return _postForm(sendApi.commentOrder, query)
};
export const cancelOrder = query => {
  return _postForm(sendApi.cancelOrder, query)
};
export const deleteOrder = query => {
  return _postForm(sendApi.deleteOrder, query)
};
export const alipayCreate = query => {
  return _postForm(sendApi.alipayCreate, query)
};
export const orderDetail = query => {
  return _postForm(sendApi.orderDetail, query)
};
export const balancePay = query => {
  return _postForm(sendApi.balancePay, query)
};
export const logistics = query => {
  return _get(sendApi.logistics, query)
};
export const putForward = query => {
  return _postForm(sendApi.putForward, query)
};
export const wxPay = query => {
  return _postForm(sendApi.wxPay, query)
};
/* 群聊 */
export const getGroupList = query => {
  return _postForm(sendApi.getGroupList, query)
};

/*--- 养生课堂 ---*/

export const healthtips = query => {
  return _get(sendApi.healthtips, query)
};

export const healthtipsDetail = query => {
  return _get(sendApi.healthtipsDetail, query)
};

export const HealthCommentList = query => {
  return _postForm(sendApi.HealthCommentList, query)
};

export const saveHealthComment = query => {
  return _postForm(sendApi.saveHealthComment, query)
};

export const healthtipsView = query => {
  return _get(sendApi.healthtipsView, query)
};

