//朋友圈数据
/*
 *wxid:帐号
 *headurl：头像
 *sex:性别(男0女1)
 *petname：昵称
 *remarks：备注
 *statements:发标的文字
 *postimage:发表的图片
 *like:点赞
 *comment:评论
 *
 *reviewshow:	评论的弹层显示时的动画
 *reviewhide: 	评论的弹层消失时的动画
 *criticism:		评论的弹层是否显示
 *flag:			点击判断
 *suporthtml:	赞
 *
 *
 *
 *
 *
 *
 */


export const circle = [{
  "avatar": 'http://pic.keepao.com/20180526/6025469e347a68c7747994e5ec90f40e.png', //
  "name": "陈长生",
  "remarks": "啊达娃大青蛙大", //备注
  "statements": "逆天改命", //内容
  "time": "20分钟前", //时间
  "postimage": ['http://pic.keepao.com/20180526/6025469e347a68c7747994e5ec90f40e.png'], //相片
  "like": ['楚乔', "嗯", ], //赞
  "comment": [{
    "name": "嗯",
    "remarks": "嗯",
    "commentext": "看好你呦！"
  }],
  "suporthtml": "赞", // 是否已经赞过
  "reviewshow": false,
  "reviewhide": false,
  "criticism": false,
  "flag": true, // 控制动画出现
}]
