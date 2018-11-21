import Vue from 'vue'
import Router from 'vue-router'

// 登录
const login = r => require.ensure([], () => r(require('@/views/login/login')), 'login')
// 绑定微信
const bindWx = r => require.ensure([], () => r(require('@/views/login/bindWx')), 'bindWx')
// 服务条款
const privacyClause = r => require.ensure([], () => r(require('@/views/login/privacyClause')), 'privacyClause')
// 微信状态
const bindWxState = r => require.ensure([], () => r(require('@/views/login/bindWxState')), 'bindWxState')
// 主页
const home = r => require.ensure([], () => r(require('@/views/home')), 'home')
// 查看图片
const lookImg = r => require.ensure([], () => r(require('@/views/index/lookImg')), 'lookImg')

/* ---------首页栏--------- */
// 首页
const index = r => require.ensure([], () => r(require('@/views/index/index')), 'index')
// 课程详情
const classDetail = r => require.ensure([], () => r(require('@/views/index/class/classDetail')), 'classDetail')
// 课程列表详情
const classList = r => require.ensure([], () => r(require('@/views/index/classList/classList')), 'classList')
// 课程学习
const learnClass = r => require.ensure([], () => r(require('@/views/index/classList/learnClass')), 'learnClass')
// 女性课程列表详情
const womanList = r => require.ensure([], () => r(require('@/views/index/classList/womanList')), 'womanList')

//女性课程列表
const womanClassList = r => require.ensure([], () => r(require('@/views/index/classList/womanClassList')), 'womanClassList')
//男性课程列表 
const menClassList = r => require.ensure([], () => r(require('@/views/index/classList/menClassList')), 'menClassList')


// 课程学习
const womanClass = r => require.ensure([], () => r(require('@/views/index/classList/womanClass')), 'womanClass')
// 导师简介
const teacherIntroduction = r => require.ensure([], () => r(require('@/views/index/teacherIntroduction/teacherIntroduction')), 'teacherIntroduction')
// 权威解答
const answer = r => require.ensure([], () => r(require('@/views/index/answer/answer')), 'answer')
// 权威解答详情
const answerDetail = r => require.ensure([], () => r(require('@/views/index/answer/answerDetail')), 'answerDetail')
// 视频直播
const broadcast = r => require.ensure([], () => r(require('@/views/index/broadcast/broadcast')), 'broadcast')
// 导师简介 男性私人辅导
const privateTutor = r => require.ensure([], () => r(require('@/views/index/privateTutor/privateTutor')), 'privateTutor')
//女性私人辅导
const womenPrivateTutor = r => require.ensure([], () => r(require('@/views/index/privateTutor/womenPrivateTutor')), 'womenPrivateTutor')


// 行业资讯
const industry = r => require.ensure([], () => r(require('@/views/index/industry/industry')), 'industry')

/* ---------在线课程栏--------- */
// 在线课程
const onlineClass = r => require.ensure([], () => r(require('@/views/onlineClass/onlineClass')), 'onlineClass')

/* ---------合伙人栏--------- */
// 合伙人
const partner = r => require.ensure([], () => r(require('@/views/partner/partner')), 'partner')
// 购买合伙人
const buyPartner = r => require.ensure([], () => r(require('@/views/partner/buyPartner')), 'buyPartner')
// 我的合伙人 
const partnerList = r => require.ensure([], () => r(require('@/views/partner/partnerList')), 'partnerList')
//我的合伙人 数据列表

const partnerDataList = r => require.ensure([], () => r(require('@/views/partner/partnerDataList')), 'partnerDataList')

//合伙人数据列表
const partnerDataDetail = r => require.ensure([], () => r(require('@/views/partner/partnerDataDetail')), 'partnerDataDetail')

//高级合伙人
const seniorPartner = r => require.ensure([], () => r(require('@/views/partner/seniorPartner')), 'seniorPartner')
//白银合伙人
const silverPartner = r => require.ensure([], () => r(require('@/views/partner/silverPartner')), 'silverPartner')
//黄金合伙人
const goldPartner = r => require.ensure([], () => r(require('@/views/partner/goldPartner')), 'goldPartner')
//钻石合伙人
const diamondPartner = r => require.ensure([], () => r(require('@/views/partner/diamondPartner')), 'diamondPartner')


/* ---------推广中心栏现属于我的--------- */
// 推广中心
const extend = r => require.ensure([], () => r(require('@/views/extension/extension')), 'extend')
// 推广佣金
const promotionCommission = r => require.ensure([], () => r(require('@/views/extension/promotionCommission')), 'promotionCommission')
// 佣金排名
const promotionRanking = r => require.ensure([], () => r(require('@/views/extension/promotionRanking')), 'promotionRanking')
// 我的学友
const myClassmate = r => require.ensure([], () => r(require('@/views/extension/myClassmate')), 'myClassmate')
//普通学员
const ordinaryClass = r => require.ensure([], () => r(require('@/views/extension/ordinaryClass')), 'ordinaryClass')
//初级学员
const primaryClass = r => require.ensure([], () => r(require('@/views/extension/primaryClass')), 'primaryClass')
//终生学员
const lifetime = r => require.ensure([], () => r(require('@/views/extension/lifetime')), 'lifetime')
//联系客服 
const callService = r => require.ensure([], () => r(require('@/views/extension/callService')), 'callService')

//已邀请学员
const invitedClass = r => require.ensure([], () => r(require('@/views/extension/invitedClass')), 'invitedClass')

// 关注微信的学友
const followStudent = r => require.ensure([], () => r(require('@/views/extension/followStudent')), 'followStudent')
// 搜索关注的微信学友
const searchFollowClass = r => require.ensure([], () => r(require('@/views/extension/searchFollowClass')), 'searchFollowClass')
// 我的学友列表
const myClassmateList = r => require.ensure([], () => r(require('@/views/extension/myClassmateList')), 'myClassmateList')
// 我的学友详情
const myClassmateDetail = r => require.ensure([], () => r(require('@/views/extension/myClassmateDetail')), 'myClassmateDetail')
// 学友搜索
const searchClassmate = r => require.ensure([], () => r(require('@/views/extension/searchClassmate')), 'searchClassmate')
// 佣金明细列表
const withdrawDetail = r => require.ensure([], () => r(require('@/views/extension/withdrawDetail')), 'withdrawDetail')
// 佣金明细详情
const withdrawDetails = r => require.ensure([], () => r(require('@/views/extension/withdrawDetails')), 'withdrawDetails')
// 提现明细
const bringOutDetails = r => require.ensure([], () => r(require('@/views/extension/bringOutDetails')), 'bringOutDetails')
// 邀请码
const inviteCode = r => require.ensure([], () => r(require('@/views/mine/inviteCode/inviteCode')), 'inviteCode')
// 最近邀请码
const inviteCodeHistory = r => require.ensure([], () => r(require('@/views/mine/inviteCode/inviteCodeHistory')), 'inviteCodeHistory')


/* ---------我的栏--------- */
// 我
const mine = r => require.ensure([], () => r(require('@/views/mine/mine')), 'mine')
// 推广二维码
const extendEWM = r => require.ensure([], () => r(require('@/views/mine/extendEWM')), 'extendEWM')
// 股池
const stockPoolIndex = r => require.ensure([], () => r(require('@/views/mine/stockPool/stockPoolIndex')), 'stockPoolIndex')
// 用户信息
const infoList = r => require.ensure([], () => r(require('@/views/mine/userInfo/infoList')), 'infoList')
// 修改昵称
const nickName = r => require.ensure([], () => r(require('@/views/mine/userInfo/nickName')), 'nickName')
// 修改支付密码
const payPassword = r => require.ensure([], () => r(require('@/views/mine/setting/payPassword')), 'payPassword')
// 我的二维码
const myEwm = r => require.ensure([], () => r(require('@/views/mine/userInfo/myEwm')), 'myEwm')
// 我的课程
const myClass = r => require.ensure([], () => r(require('@/views/mine/myClass/myClass')), 'myClass')
// 设置
const setting = r => require.ensure([], () => r(require('@/views/mine/setting/setting')), 'setting')
// 绑定设置手机号码
const phoneSetting = r => require.ensure([], () => r(require('@/views/mine/setting/phoneSetting')), 'phoneSetting')
// 忘记密码
const forgetPsw = r => require.ensure([], () => r(require('@/views/mine/setting/forgetPsw')), 'forgetPsw')
// 关于我们
const aboutUs = r => require.ensure([], () => r(require('@/views/mine/setting/aboutUs')), 'aboutUs')
// 推荐人
const referee = r => require.ensure([], () => r(require('@/views/mine/referee')), 'referee')
// 我的订单
const myOrder = r => require.ensure([], () => r(require('@/views/mine/myOrder/myOrder')), 'myOrder')
// 我的订单详情
const orderDetail = r => require.ensure([], () => r(require('@/views/mine/myOrder/orderDetail')), 'orderDetail')
// 物流信息查询
const logisticInfo = r => require.ensure([], () => r(require('@/views/mine/myOrder/logisticInfo')), 'logisticInfo')
// 物流信息查询
const evaluateS = r => require.ensure([], () => r(require('@/views/mine/myOrder/evaluate')), 'evaluateS')
// 咨询中心
const consultationCenter = r => require.ensure([], () => r(require('@/views/mine/consultation/consultationCenter')), 'consultationCenter')
// 优惠券
const couPon = r => require.ensure([], () => r(require('@/views/mine/couPon/couPon')), 'couPon')


/* ---------订单栏--------- */
// 确认订单
const confirmOrder = r => require.ensure([], () => r(require('@/views/order/confirmOrder')), 'confirmOrder')
// 收银台
const orderPay = r => require.ensure([], () => r(require('@/views/order/orderPay')), 'orderPay')
// 付款成功页面
const paySuccess = r => require.ensure([], () => r(require('@/views/order/paySuccess')), 'paySuccess')
// 收货地址管理
const addressManage = r => require.ensure([], () => r(require('@/views/order/addressManage')), 'addressManage')
// 新增收货地址
const newAds = r => require.ensure([], () => r(require('@/views/order/newAds')), 'newAds')
// 添加银行卡
const addBack = r => require.ensure([], () => r(require('@/views/order/addBack')), 'addBack')
const addBack2 = r => require.ensure([], () => r(require('@/views/order/addBack2')), 'addBack2')
// 提现
const withdraw = r => require.ensure([], () => r(require('@/views/order/withdraw')), 'withdraw')
// 提现状态
const withdrawState = r => require.ensure([], () => r(require('@/views/order/withdrawState')), 'withdrawState')
// 用户协议
const userAgreement = r => require.ensure([], () => r(require('@/views/order/userAgreement')), 'userAgreement')



/* ---- 腾讯im 集成 -------- */
const imList = r => require.ensure([], () => r(require('@/views/webIm/imList')), 'imList')

/* -----   养生课堂    ------*/
//列表
const recuperationList = r => require.ensure([], () => r(require('@/views/index/recuperation/recuperationList')), 'recuperationList')
//详情
const recuperationDetails = r => require.ensure([], () => r(require('@/views/index/recuperation/recuperationDetails')), 'recuperationDetails')


// 404 页面
const NotFoundComponent = r => require.ensure([], () => r(require('@/views/notFound')), 'NotFoundComponent')



Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/bindWx',
      name: 'bindWx',
      component: bindWx
    },
    {
      path: '/bindWxState',
      name: 'bindWxState',
      component: bindWxState
    },
    {
      path: '/privacyClause',
      name: 'privacyClause',
      component: privacyClause,
      meta: {
        backState: true,
      }
    },
    {
      alias: '/',
      path: '/home',
      name: 'home',
      component: home,
      children: [
        {
          alias: '/',
          path: '/home/index',
          name: 'index',
          component: index,
        },
        {
          path: '/home/onlineClass',
          name: 'onlineClass',
          component: onlineClass,
        },
        {
          path: '/home/partner',
          name: 'partner',
          component: partner
        },
        {
		    	path:'/imList',
		      name:'imList',
		      component: imList,
		    },
        {
          path: '/home/mine',
          name: 'mine',
          component: mine,
          /* meta: {
           requireAuth: true, // 添加该字段，表示进入这个路由是需要微信验证
          },*/
        },
      ]
    },
    // 查看图片
    {
      path: '/lookImg/:url',
      name: 'lookImg',
      component: lookImg,
      meta: {
        backState: true,
      }
    },
    // 首页课程详情
    {
      path: '/classDetail',
      name: 'classDetail',
      component: classDetail,
      meta: {
        backState: true,
      }
    },
    {
      path: '/teacherIntroduction',
      name: 'teacherIntroduction',
      component: teacherIntroduction,
      meta: {
        backState: true,
      }
    },
    {
      path: '/classList/:id',
      name: 'classList',
      component: classList,
    },
    {
      path: '/learnClass/:id/:goodsNo',
      name: 'learnClass',
      component: learnClass,
      meta: {
        backState: true,
      }
    },
    {
      path: '/womanList/:id',
      name: 'womanList',
      component: womanList,
//    meta: {
//      backState: true,
//    }
    },
    {
      path: '/womanClassList',
      name: 'womanClassList',
      component: womanClassList,
      meta: {
        backState: true,
      }
    },
    {
      path: '/menClassList',
      name: 'menClassList',
      component: menClassList,
      meta: {
        backState: true,
      }
    },
    {
      path: '/womanClass/:id/:goodsNo',
      name: 'womanClass',
      component: womanClass,
      meta: {
        backState: true,
      }
    },
    {
      path: '/answer',
      name: 'answer',
      component: answer,
      meta: {
        backState: true,
      }
    },
    {
      path: '/answerDetail',
      name: 'answerDetail',
      component: answerDetail,
      meta: {
        backState: true,
      }
    },
    {
      path: '/broadcast',
      name: 'broadcast',
      component: broadcast,
      meta: {
        backState: true,
      }
    },
    {
      path: '/privateTutor',
      name: 'privateTutor',
      component: privateTutor,
      meta: {
        //backState: true,
      }
    },
    {
      path: '/womenPrivateTutor',
      name: 'womenPrivateTutor',
      component: womenPrivateTutor,
      meta: {
        //backState: true,
      }
    },
    {
      path: '/industry',
      name: 'industry',
      component: industry,
      meta: {
        backState: true,
      }
    },
    // 订单页面
    {
      path: '/confirmOrder',
      name: 'confirmOrder',
      component: confirmOrder,
      meta: {
        backState: true,
      }
    },
    {
      path: '/orderPay',
      name: 'orderPay',
      component: orderPay,
      meta: {
        backState: true,
      }
    },
    {
      path: '/addressManage/:id',
      name: 'addressManage',
      component: addressManage,
      meta: {
        backState: true,
      }
    },
    {
      path: '/newAds/:id',
      name: 'newAds',
      component: newAds,
      meta: {
        backState: true,
      }
    },
    {
      path: '/addBack',
      name: 'addBack',
      component: addBack,
      meta: {
        backState: true,
      }
    },
    {
      path: '/addBack2/:items',
      name: 'addBack2',
      component: addBack2,
      meta: {
        backState: true,
      }
    },
    {
      path: '/userAgreement',
      name: 'userAgreement',
      component: userAgreement,
      meta: {
        backState: true,
      }
    },
    {
      path: '/withdraw/:money/:type',
      name: 'withdraw',
      component: withdraw,
      meta: {
        backState: true,
      }
    },
    {
      path: '/withdrawState/:money/:dates/:payType',
      name: 'withdrawState',
      component: withdrawState,
      meta: {
        backState: true,
      }
    },
    {
      path: '/paySuccess',
      name: 'paySuccess',
      component: paySuccess,
      meta: {
        backState: true,
      }
    },
    // 推广中心
    {
      path: '/extend',
      name: 'extend',
      component: extend,
      meta: {
        // requireAuth: true,
        //backState: true
      }
    },
    {
      path: '/promotionCommission',
      name: 'promotionCommission',
      component: promotionCommission,
      meta: {
        // requireAuth: true,
        backState: true
      }
    },
    {
      path: '/promotionRanking',
      name: 'promotionRanking',
      component: promotionRanking,
      meta: {
        // requireAuth: true,
        backState: true
      }
    },
    {
      path: '/myClassmate',
      name: 'myClassmate',
      component: myClassmate,
      meta: {
        // requireAuth: true,
        //backState: true
      }
    },
    {
      path: '/ordinaryClass/:studentsType',
      name: 'ordinaryClass',
      component: ordinaryClass,
      meta: {
        // requireAuth: true,
        //backState: true
      }
    },
    {
      path: '/primaryClass/:studentsType',
      name: 'primaryClass',
      component: primaryClass,
      meta: {
        // requireAuth: true,
        //backState: true
      }
    },
    {
      path: '/lifetime/:studentsType',
      name: 'lifetime',
      component: lifetime,
      meta: {
        // requireAuth: true,
        //backState: true
      }
    },
    {
      path: '/invitedClass',
      name: 'invitedClass',
      component: invitedClass,
      meta: {
        // requireAuth: true,
        backState: true
      }
    },
    {
      path: '/followStudent',
      name: 'followStudent',
      component: followStudent,
      meta: {
        // requireAuth: true,
        backState: true
      }
    },
    {
      path: '/searchFollowClass',
      name: 'searchFollowClass',
      component: searchFollowClass,
      meta: {
        // requireAuth: true,
        backState: true
      }
    },
    {
      path: '/myClassmateList/:id/:name/:total/:goodId',
      name: 'myClassmateList',
      component: myClassmateList,
      meta: {
        // requireAuth: true,
        backState: true
      }
    },
    {
      path: '/myClassmateDetail/:id/:class',
      name: 'myClassmateDetail',
      component: myClassmateDetail,
      meta: {
        // requireAuth: true,
        backState: true
      }
    },
    {
      path: '/searchClassmate/:id',
      name: 'searchClassmate',
      component: searchClassmate,
      meta: {
        // requireAuth: true,
        backState: true
      }
    },
    {
      path: '/withdrawDetail',
      name: 'withdrawDetail',
      component: withdrawDetail,
      meta: {
        // requireAuth: true,
        backState: true
      }
    },
    {
      path: '/withdrawDetails/:id',
      name: 'withdrawDetails',
      component: withdrawDetails,
      meta: {
        // requireAuth: true,
        backState: true
      }
    },
    {
      path: '/bringOutDetails',
      name: 'bringOutDetails',
      component: bringOutDetails,
      meta: {
        // requireAuth: true,
        backState: true
      }
    },
    // 我的
    {
      path: '/extendEWM',
      name: 'extendEWM',
      component: extendEWM,
      meta: {
        backState: true,
      }
    },
    {
      path: '/stockPoolIndex',
      name: 'stockPoolIndex',
      component: stockPoolIndex,
      meta: {
        // requireAuth: true,
        backState: true
      }
    },
    {
      path: '/infoList',
      name: 'infoList',
      component: infoList,
      meta: {
        backState: true,
      }
    },
    {
      path: '/payPassword',
      name: 'payPassword',
      component: payPassword,
      meta: {
        backState: true,
      }
    },
    {
      path: '/myEwm',
      name: 'myEwm',
      component: myEwm,
      meta: {
        backState: true,
      }
    },
    {
      path: '/nickName/:name/:state',
      name: 'nickName',
      component: nickName,
      meta: {
        backState: true,
      }
    },
    {
      path: '/myClass',
      name: 'myClass',
      component: myClass,
      meta: {
        backState: true,
      }
    },
    {
      path: '/inviteCode',
      name: 'inviteCode',
      component: inviteCode,
      meta: {
        // requireAuth: true,
        backState: true
      }
    },
    {
      path: '/inviteCodeHistory',
      name: 'inviteCodeHistory',
      component: inviteCodeHistory,
      meta: {
        // requireAuth: true,
        backState: true
      }
    },
    {
      path: '/setting',
      name: 'setting',
      component: setting,
      meta: {
        backState: true,
      }
    },
    {
      path: '/phoneSetting',
      name: 'phoneSetting',
      component: phoneSetting,
      meta: {
        backState: true,
      }
    },
    {
      path: '/forgetPsw',
      name: 'forgetPsw',
      component: forgetPsw,
      meta: {
        backState: true,
      }
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      component: aboutUs,
      meta: {
        backState: true,
      }
    },
    {
      path: '/referee',
      name: 'referee',
      component: referee,
      meta: {
        // requireAuth: true,
        backState: true
      }
    },
    {
      path: '/myOrder',
      name: 'myOrder',
      component: myOrder,
      meta: {
        backState: true,
      }
    },
    {
      path: '/orderDetail/:id',
      name: 'orderDetail',
      component: orderDetail,
      meta: {
        backState: true,
      }
    },
    {
      path: '/logisticInfo',
      name: 'logisticInfo',
      component: logisticInfo,
      meta: {
        backState: true,
      }
    },
    {
      path: '/evaluateS/:orderNum/:imgUrl',
      name: 'evaluateS',
      component: evaluateS,
      meta: {
        backState: true,
      }
    },
    {
      path: '/couPon',
      name: 'couPon',
      component: couPon,
      meta: {
        backState: true
      }
    },
    // 合伙人详情
    {
      path: '/buyPartner/:id/:payType', // payType 1:购买课程，2：购买合伙人
      name:'buyPartner',
      component:buyPartner,
      meta: {
        backState: true,
      }
    },
    {
      path:'/consultationCenter',
      name:'consultationCenter',
      component: consultationCenter,
      meta: {
        backState: true,
      }
    },
    {
      path:'/partnerList',
      name:'partnerList',
      component: partnerList,
      meta: {
        //backState: true,
      }
    },
    {
      path:'/partnerDataList/:studentsType',  //studentsType 1: 1级推广  2: 2级推广
      name:'partnerDataList',
      component: partnerDataList,
      meta: {
        //backState: true,
      }
    },
   {
      path:'/partnerDataDetail/:studentsType/:userLevels',  //studentsType 1: 1级推广  2: 2级推广 userLevels : 合伙人身份
      name:'partnerDataDetail',
      component: partnerDataDetail,
      meta: {
        //backState: true,
      }
    },
    {
      path:'/seniorPartner',
      name:'seniorPartner',
      component: seniorPartner,
      meta: {
        //backState: true,
      }
    },
    {
      path:'/silverPartner',
      name:'silverPartner',
      component: silverPartner,
      meta: {
        //backState: true,
      }
    },
    {
      path:'/goldPartner',
      name:'goldPartner',
      component: goldPartner,
      meta: {
        //backState: true,
      }
    },
    {
      path:'/diamondPartner',
      name:'diamondPartner',
      component: diamondPartner,
      meta: {
        //backState: true,
      }
    },
		{
      path:'/callService',
      name:'callService',
      component: callService,
      meta: {
        //backState: true,
      }
    },
    { 	
    	path:'/recuperationList',
      name:'recuperationList',
      component: recuperationList,
      meta: {
        backState: true,
      }
    },
    { 	
    	path:'/recuperationDetails/:goodsId',		//养生课程的id
      name:'recuperationDetails',
      component: recuperationDetails,
      meta: {
        backState: true,
      }
    },
    //腾讯im 集成 
    
    {     	
      path: '*',
      component: NotFoundComponent
    }
  ]
})


//设置header 值
export const header =  { title : "" , opt : 0 }
