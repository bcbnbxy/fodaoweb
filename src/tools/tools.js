import {wxShare} from '@/api/index'
import wx from 'weixin-js-sdk'
// 判断是否在微信内
export const is_WX = () => {
  let ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  } else {
    return false;
  }
};
// 拨打电话
export const playTel = tel => {
  window.location.href = `tel:${tel}`
};
// 计算位置密码输入弹框位置
export const calPosition = (box1, box2) => {
  let windowWidth = window.innerHeight;
  let passwordBox = document.querySelector(box1);
  let keyBox = document.querySelector(box2);
  let topVal = (windowWidth - passwordBox.offsetHeight - keyBox.offsetHeight) / 2;
  passwordBox.style.top = topVal + 'px';
};

// 微信分享
export const wxShareFun = (store) => {
  if(!is_WX()){return false} // 在微信内并且没有绑定手机号或者不在微信内，都不发起分享功能
  // 微信分享
  wxShare({url: window.location.href.split('?')[0]}).then((res) => {
    let shareTitle = document.title;
    let link = window.location.href.split('?')[0] + (store.id? ('?userId=' + store.id) : '');
    let conDesc = '是以华夏五千年正确性文化为指导，纠正错误性观念、性认知的一种大道易简，易学易练的课程。';
    let shareImg = 'http://m.fudaojt.com/static/img/logo.37b30b1.png';
    let obj = JSON.parse(res.data);
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: obj.appId, // 必填，公众号的唯一标识
      timestamp: obj.timestamp, // 必填，生成签名的时间戳
      nonceStr: obj.nonceStr, // 必填，生成签名的随机串
      signature: obj.signature,// 必填，签名，见附录1
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ','chooseImage','previewImage','uploadImage','downloadImage','getLocalImgData','startRecord','stopRecord','onVoiceRecordEnd','playVoice','pauseVoice','stopVoice','onVoicePlayEnd','uploadVoice','downloadVoice'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.ready(function () {
      // 分享朋友圈
      wx.onMenuShareTimeline({
        title: '福道文化 - ' + shareTitle, // 分享标题
        link: link, // 分享链接
        imgUrl: shareImg, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      });
      // 分享朋友
      wx.onMenuShareAppMessage({
        title: '福道文化 - ' + shareTitle, // 分享标题
        desc: conDesc, // 分享描述
        link: link, // 分享链接
        imgUrl: shareImg, // 分享图标 this.shareInfoData.shareImageAddress
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      });
      // 分享QQ
      wx.onMenuShareQQ({
        title: '福道文化 - ' + shareTitle, // 分享标题
        desc: conDesc, // 分享描述
        link: link, // 分享链接
        imgUrl: shareImg, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      });
    });
    wx.error(function(res){
      // alert(JSON.stringify(res))
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    })
  });
}
