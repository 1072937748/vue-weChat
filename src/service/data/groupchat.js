//群聊数据
/*
*petname:群名
*group:群聊人信息
*wxid:帐号
*headurl:头像图片地址
*petname:昵称	
*remarks:备注
*Messageblob:说话内容
*
*
*/
import {imgurl} from 'src/config/env';
export const groupchat={
	"petname":"交流群~",
	"grouphead":[
		{
			"username":"chenchangsheng",
			"avatar":imgurl+'default1.jpg?raw=true',
			"petname":"陈长生",
			"remarks":"",
			"content":"今天下雨",
			"sendobject":1,
		},
		{
			"username":"812571880",
			"avatar":imgurl+'default1.jpg?raw=true',
			"petname":"百里辰",
			"content":"今天下雨",
			"sendobject":1,
		},
		{
			"username":"achuqiao",
			"avatar":imgurl+'default1.jpg?raw=true',
			"petname":"a楚乔",
			"remarks":"楚乔",
			"sendobject":1,
			"content":"嗯",
		},
		{
			"username":"caiawei",
			"avatar":imgurl+'default1.jpg?raw=true',
			"petname":"采薇",
			"remarks":"",
			"phone":"13000000000",
			"sendobject":1,
			"content":"一发型师在给一个女客人做头发的时候把她脸给烫伤了，后来经过协商。。。。他把她给娶了。。。",
		}
	]
}
