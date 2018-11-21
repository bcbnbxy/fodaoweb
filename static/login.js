var href = window.location.href;


var is_WX = function()  {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  } else {
    return false;
  }
};


var wxFrom = href.indexOf('&from='); // 去除微信自带的参数

var authorization = href.indexOf('authorization='); // 是否带有token
var wxUser = href.indexOf('wxuser=');  // 没有绑定手机号返回的参数对象保存
var userId = href.indexOf('userId=');
var openId = href.indexOf('openId=');

// 分享码存在
if (userId >= 0) {
  var shareCode = href.substring(userId, href.length);
  var userIdVal = shareCode.replace('userId=', '');
  localStorage.setItem('userId', userIdVal);
}

// 分享后的地址
var length = 0;
if (href.indexOf('?') >= 0) {
  length = href.indexOf('?');
} else {
  length = href.length;
}
var newUrl = href.substring(find(href, '/', 2), length);
var realmName = href.substring(0,find(href, '/', 2));
sessionStorage.setItem('realmName', realmName);
if(newUrl !== '/'){
  localStorage.setItem('location', newUrl);
}

function find(str, cha, num) {
  var x = str.indexOf(cha);
  for (var i = 0; i < num; i++) {
    x = str.indexOf(cha, x + 1);
  }
  return x;
}

// 微信登录获取token
if (authorization >= 0) {
  var hrefVal = href.substring(href.indexOf('authorization='), href.length);
  var token = hrefVal.replace('authorization=', '');
  sessionStorage.setItem('token', token);
}

// 未绑定手机号，绑定手机号应该传的参数
if(openId >= 0){
  var wxInfo = href.split('?')[1];
  var wX = wxInfo.split('&');
  var ne = {};
  for (var i = 0; i < wX.length; i++){
    var u = wX[i].split('=');
    ne[u[0]] = u[1];
  }
  sessionStorage.setItem('wxInfo',JSON.stringify(ne))
}

// 没有绑定手机号返回的参数对象保存
if(wxUser >= 0){

  var userInfo = JSON.parse(unescape(decodeURI(href.split('?wxuser=')[1])));
  userInfo.wechatImg = userInfo.headimgurl;
  userInfo.wechatName = userInfo.nickname;
  sessionStorage.setItem('token', 'userId');
  sessionStorage.setItem('wxUserInfo', JSON.stringify(userInfo));
}

// 去除微信自带的参数
if(wxFrom >=0 ){
  var newHref = href.substring(0, wxFrom);
  window.location.href = newHref;
}
