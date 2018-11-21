<template>
	<div class='page pageColor'>
		<div class="groupContainer" v-for="item in groupList" :key="item.id">
			<div class="groupListBox" :id="item.groupId">
				<div class="groupListPic" >
					<img :src="item.groupPic"/>
				</div>
				<div class="groupListInfo">
					<h5>{{item.groupName}}</h5>
					<p>{{item.MsgShow || ""}}</p>
				</div>
			</div>
		</div>
   		<follow-public :page-object="pageObject" v-if="pageObject && $store.getters.getToken"></follow-public>
	</div>
</template>

<script>
  import {getGroupList} from '@/api/index'
  import { MessageBox } from 'mint-ui';
  import {webImStart} from '@/im/webImStart'
  import FollowPublic from "../../components/followPublic"
  import {im} from '@/im/webim'

  export default {
  	components: {FollowPublic},
    data() {
      return {
      	pageObject: '' ,
      	groupList : [] , 
      }
    },
    mounted() {
       document.title = "群聊";
       this.pageObject = document.getElementById('page');
       
       let userinfo = sessionStorage.getItem("userInfo");
       //console.log( typeof userinfo)
       if( userinfo){
       	
    		userinfo = JSON.parse(userinfo); 
           
	        if(userinfo.userLevel == 2 ||
		      userinfo.userLevel == 3 || 
		      userinfo.userLevel == 4 ||
		      userinfo.userLevel == 7 
	       	)
	        {
		       	console.log("111")		       	
		       	this.getGroupList();	//获取列表
		       	
		       console.log( webImStart.loginInfo );
	        }else{
	         	console.log("222")
	        }
       
       }
    },
    methods: {	
    	//初始化 腾讯 im
		initGroupList:function()
		{
			let  webim = im();
			
			let selType = webim.SESSION_TYPE.GROUP; //当前聊天类型  GROUP 群聊 c2c 私聊
			let selToID = null; //当前选中聊天id（当聊天类型为私聊时，该值为好友帐号，否则为群号）
			let selSess = null; //当前聊天会话对象
			let recentSessMap = {}; //保存最近会话列表
			let reqRecentSessCount = 50; //每次请求的最近会话条数，业务可以自定义
			
			let isPeerRead = 1; //是否需要支持APP端已读回执的功能,默认为0。是：1，否：0。
			
			//默认好友头像
			//let friendHeadUrl = 'img/friend.jpg'; //仅demo使用，用于没有设置过头像的好友
			//默认群头像
			let groupHeadUrl = 'img/group.jpg'; //仅demo使用，用于没有设置过群头像的情况
			
			
			//存放c2c或者群信息（c2c用户：c2c用户id，昵称，头像；群：群id，群名称，群头像）
			let infoMap = {}; //初始化时，可以先拉取我的好友和我的群组信息
			
			
			let maxNameLen = 12; //我的好友或群组列表中名称显示最大长度，仅demo用得到
			let reqMsgCount = 15; //每次请求的历史消息(c2c获取群)条数，仅demo用得到
			
			let pageSize = 15; //表格的每页条数，bootstrap table 分页时用到
			let totalCount = 200; //每次接口请求的条数，bootstrap table 分页时用到
			
			let emotionFlag = false; //是否打开过表情选择框
			
			let curPlayAudio = null; //当前正在播放的audio对象
			
			let getPrePageC2CHistroyMsgInfoMap = {}; //保留下一次拉取好友历史消息的信息
			let getPrePageGroupHistroyMsgInfoMap = {}; //保留下一次拉取群历史消息的信息			
			
			let loginInfo = webImStart.loginInfo;
			let listeners = webImStart.listeners;
			let options = webImStart.options;
			
			let  that = this ;
				//腾讯 im 登录 
			webim.login(loginInfo, listeners, options , function(resp) {
	            loginInfo.identifierNick = resp.identifierNick; //设置当前用户昵称
	            loginInfo.headurl = resp.headurl; //设置当前用户头像
	            //腾讯 im  获取用户所在的群组列表
			  	webim.getRecentContactList(
		        {'Count': 200 },//要拉取的最近会话条数
		        function (resp) {
		        		console.log(resp);
		        	if (resp.SessionItem && resp.SessionItem.length > 0) { //如果存在最近会话记录		        		
		        			        		
	        			for (var i in resp.SessionItem) {
		                    var item = resp.SessionItem[i];
		                    
		                    item.groupId = item.MsgGroupFrom_Account;
		                    item.groupPic = item.GroupImage;
		                    item.groupName = item.GroupNick;
		                    
		                    var type = item.Type; //接口返回的会话类型
		                    var sessType, typeZh, sessionId, sessionNick = '',
		                        sessionImage = '',
		                        senderId = '',
		                        senderNick = ''; 
			        		typeZh = '群聊';
	                        sessType = webim.SESSION_TYPE.GROUP; //设置会话类型
	                        sessionId = item.ToAccount; //会话id，群聊时为群ID，注意：从ToAccount获取
	                        sessionNick = item.GroupNick; //会话昵称，群聊时，为群名称，接口一定会返回
	
	                        if (item.GroupImage) { //优先考虑接口返回的群头像
	                            sessionImage = item.GroupImage; //会话头像，群聊时，群头像，如果业务设置过群头像（设置群头像请参考wiki文档-设置群资料接口），接口会返回
	                        } else { //接口没有返回或者没有设置过群头像，再从infoMap获取群头像
	                            var key = sessType + "_" + sessionId;
	                            var groupInfo = infoMap[key];
	                            if (groupInfo && groupInfo.image) { //
	                                sessionImage = groupInfo.image
	                            } else { //不存在或者没有设置过，则使用默认头像
	                                sessionImage = groupHeadUrl; //会话头像，如果没有设置过群头像，默认将其设置demo自带的头像
	                            }
	                        }
	                        senderId = item.MsgGroupFrom_Account; //群消息的发送者id
	
	                        if (!senderId) { //发送者id为空
	                            webim.Log.warn('群消息发送者id为空,senderId=' + senderId + ",groupid=" + sessionId);
	                            continue;
	                        }
	                        if (senderId == '@TIM#SYSTEM') { //先过滤群系统消息，因为接口暂时区分不了是进群还是退群等提示消息，
	                            webim.Log.warn('过滤群系统消息,senderId=' + senderId + ",groupid=" + sessionId);
	                            continue;
	                        }
	                        
    		        		that.groupList.unshift( item );		//将Im返回的群组信息 存储到第一个
		        		}
	        			

	                }
					},function(resp){
					    //错误回调
					    console.log(resp);
					}
			    );    
				    
			    },
		        function(err) {
		            alert(err.ErrorInfo);
		        }
		    );    
		},
		
		//获取 自己服务器 的 会话列表
		getGroupList: function(){
			var that =  this;
			let  query = {
				"authorization": sessionStorage.getItem("token") 
			};
			getGroupList(query).then((res)=>{
	          if (res.code === 'Y'){
	            //console.log(res.data);
	            
	            this.groupList = res.groupList;
	            that.initGroupList() ;//获取im列表
	            console.log(res.groupList);
	          }
	        })
		},
		
    }
  }
</script>

<style lang="less" scoped>
  @wu: 100vw/375;
  
  .groupListBox{
  	background-color: #fff;
  	padding: 5*@wu;
  	border-bottom: 1*@wu solid #f5f5f5;
  	.groupListPic{
  		width: 45*@wu;
  		height: 45*@wu;
  		display: inline-block;
  		img{
  			width: 100%;
  			height: 100%;
  		}
  	}
  	.groupListInfo{
  		display: inline-block;
  		vertical-align: top;
  		padding-top: 5*@wu;
  		h5{
  			color: #333;
  			font-size: 14*@wu;
  			margin: 0;
  		}
  		p{
  			color: #999;
  			font-size: 12*@wu;
  			margin:5*@wu 0 0;
  		}
  	}
  }
  
  
</style>