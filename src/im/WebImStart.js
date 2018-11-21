
import {im} from '@/im/webim'

export const  webim = im();
console.log(webim);


let fuserInfo  =  sessionStorage.getItem("userInfo");
let loginInfo = {};

if( fuserInfo )
{
	fuserInfo = JSON.parse(fuserInfo);
	let name =  fuserInfo.name || fuserInfo.wechatName ;
	name  = name || fuserInfo.userMobile ;
	loginInfo = {
		sdkAppID : "1400139975" ,
		accountType : "38367" ,
		identifier : fuserInfo.id,
		identifierNick : name ,
		userSig : fuserInfo.sig 
	};
	
	let  AdminAcount = loginInfo.identifier;	
}else
{
	console.log("没有登录 ，无法获取群聊信息")
}	


//初始化


/*
*   loginInfo      - Object, 登录身份相关参数集合，详见下面
 *   {
 *     sdkAppID     - String, 用户标识接入SDK的应用ID，必填
 *     accountType  - int, 账号类型，必填
 *     identifier   - String, 用户帐号,必须是字符串类型，必填
 *     identifierNick   - String, 用户昵称，选填
 *     userSig      - String, 鉴权Token，必须是字符串类型，必填
 *   }	 
 *
 */

	
let listeners = {
	"onConnNotify": onConnNotify//监听连接状态回调变化事件,必填
    ,"jsonpCallback": jsonpCallback//IE9(含)以下浏览器用到的 jsonp 回调函数，
    ,"onMsgNotify": onMsgNotify//监听新消息(私聊，普通群(非直播聊天室)消息，全员推送消息)事件，必填
    //,"onBigGroupMsgNotify": onBigGroupMsgNotify//监听新消息(直播聊天室)事件，直播场景下必填
    //,"onGroupSystemNotifys": onGroupSystemNotifys//监听（多终端同步）群系统消息事件，如果不需要监听，可不填
    ,"onGroupInfoChangeNotify": onGroupInfoChangeNotify//监听群资料变化事件，选填
    //,"onFriendSystemNotifys": onFriendSystemNotifys//监听好友系统通知事件，选填
    ,"onProfileSystemNotifys": onProfileSystemNotifys//监听资料系统（自己或好友）通知事件，选填
    ,"onKickedEventCall" : onKickedEventCall//被其他登录实例踢下线
    ,"onC2cEventNotifys": onC2cEventNotifys//监听 C2C 系统消息通道
};
//options        - Object, 其它选项, 目前未使用
let isAccessFormalEnv = true; //是否访问正式环境



let isLogOn = false; //是否开启sdk在控制台打印日志

//初始化时，其他对象，选填
let options = {
  'isAccessFormalEnv': isAccessFormalEnv, //是否访问正式环境，默认访问正式，选填
  'isLogOn': isLogOn //是否开启控制台打印日志,默认开启，选填
}
	

	


//监听连接状态回调变化事件
var onConnNotify = function (resp) {
    var info;
    switch (resp.ErrorCode) {
        case webim.CONNECTION_STATUS.ON:
            webim.Log.warn('建立连接成功: ' + resp.ErrorInfo);
            break;
        case webim.CONNECTION_STATUS.OFF:
            info = '连接已断开，无法收到新消息，请检查下您的网络是否正常: ' + resp.ErrorInfo;
            alert(info);
            webim.Log.warn(info);
            break;
        case webim.CONNECTION_STATUS.RECONNECT:
            info = '连接状态恢复正常: ' + resp.ErrorInfo;
            alert(info);
            webim.Log.warn(info);
            break;
        default:
            webim.Log.error('未知连接状态: =' + resp.ErrorInfo);
            break;
    }
};
//位于 js/demo_base.js 中
//IE9(含)以下浏览器用到的 jsonp 回调函数
function jsonpCallback(rspData) {
//设置 jsonp 返回的
    webim.setJsonpLastRspData(rspData);
}
	
//监听新消息事件
//newMsgList 为新消息数组，结构为[Msg]
function onMsgNotify(newMsgList) {
    //console.warn(newMsgList);
    var sess, newMsg;
    //获取所有聊天会话
    var sessMap = webim.MsgStore.sessMap();
    
    for (var j in newMsgList) {//遍历新消息
        newMsg = newMsgList[j];
        if (newMsg.getSession().id() == selToID) {//为当前聊天对象的消息
            selSess = newMsg.getSession();
            //在聊天窗体中新增一条消息
            //console.warn(newMsg);
            addMsg(newMsg);
        }
    }
    //消息已读上报，以及设置会话自动已读标记
    webim.setAutoRead(selSess, true, true);
    for (var i in sessMap) {
        sess = sessMap[i];
        if (selToID != sess.id()) {//更新其他聊天对象的未读消息数
            updateSessDiv(sess.type(), sess.id(), sess.unread());
        }
    }
}	

//监听 群资料变化 群提示消息
function onGroupInfoChangeNotify(groupInfo) {
    webim.Log.warn("执行 群资料变化 回调： " + JSON.stringify(groupInfo));
    var groupId = groupInfo.GroupId;
    var newFaceUrl = groupInfo.GroupFaceUrl;//新群组图标, 为空，则表示没有变化
    var newName = groupInfo.GroupName;//新群名称, 为空，则表示没有变化
    var newOwner = groupInfo.OwnerAccount;//新的群主 ID, 为空，则表示没有变化
    var newNotification = groupInfo.GroupNotification;//新的群公告, 为空，则表示没有变化
    var newIntroduction = groupInfo.GroupIntroduction;//新的群简介, 为空，则表示没有变化
    if (newName) {
        //更新群组列表的群名称
        //To do
        webim.Log.warn("群id=" + groupId + "的新名称为：" + newName);
    }
}

//监听资料系统通知函数对象，方法都定义在 receive_profile_system_msg.js 文件中
var onProfileSystemNotifys = {
    "1": onProfileModifyNotify//资料修改
};
//被其他登录实例踢下线
var onKickedEventCall =  function(){
	
};

//监听 C2C 消息通道的处理，方法在 receive_new_msg.js 文件中
var onC2cEventNotifys = {
    "92": onMsgReadedNotify,//消息已读通知
};
	

//消息已读通知
function onMsgReadedNotify(notify) {
    var sessMap = webim.MsgStore.sessMap()[webim.SESSION_TYPE.C2C + notify.From_Account];
    console.log("c2c消息");
    console.log(sessMap);
    if (sessMap) {
        var msgs = _.clone(sessMap.msgs());
        var rm_msgs = _.remove(msgs, function (m) {
            return m.time <= notify.LastReadTime
        });
        var unread = sessMap.unread() - rm_msgs.length;
        unread = unread > 0 ? unread : 0;
        //更新sess的未读数
        sessMap.unread(unread);
        // console.debug('更新C2C未读数:',notify.From_Account,unread);
        //更新页面的未读数角标

        if (unread > 0) {
            $("#badgeDiv_" + notify.From_Account).text(unread).show();
        } else {
            $("#badgeDiv_" + notify.From_Account).val("").hide();
        }
    }
}	

//资料修改
function onProfileModifyNotify(notify) {
    webim.Log.info("执行 资料修改 回调：" + JSON.stringify(notify));
    var typeCh = "[资料修改]";
    var profile, account, nick, sex, allowType, content;
    account = notify.Profile_Account;
    content = "帐号：" + account + ", ";
    for (var i in notify.ProfileList) {
        profile = notify.ProfileList[i];
        switch (profile.Tag) {
            case 'Tag_Profile_IM_Nick':
                nick = profile.ValueBytes;
                break;
            case 'Tag_Profile_IM_Gender':
                sex = profile.ValueBytes;
                break;
            case 'Tag_Profile_IM_AllowType':
                allowType = profile.ValueBytes;
                break;
            case 'Tag_Profile_IM_Image':
                image = profile.ValueBytes;
                break;
            default:
                webim.log.error('未知资料字段：' + JSON.stringify(profile));
                break;
        }
    }
    content += "最新资料：【昵称】：" + nick + ",【性别】：" + sex + ",【加好友方式】：" + allowType + ",【修改头像】：" + image;
    addProfileSystemMsg(notify.Type, typeCh, content);

    if (account != loginInfo.identifier) { //如果是好友资料更新
        //好友资料发生变化，需要重新加载好友列表或者单独更新account的资料信息
        //getAllFriend(getAllFriendsCallbackOK);
        if (account && nick) {
            updateSessNameDiv(webim.SESSION_TYPE.C2C, account, nick); //更新最近聊天会话中的好友昵称
        }

    }
}














// 腾讯im 初始化 
export const webImStart ={
	"listeners" : listeners ,
	"loginInfo" : loginInfo ,
	"options" : options ,
}