import * as searchField from './data/search'
import * as contact from './data/contacts'
import * as dialoglist from './data/dialoglist'
import * as usersay from './data/userword'
import * as fcricle from './data/friendcircle'
import * as collectData from './data/collect'
import * as bursetData from './data/burse'
import * as albumData from './data/album'
import * as groupData from './data/groupchat'
import * as chatmoreData from './data/chatmore'
import fetch from '../config/fetch.js'
import {  uploadImg } from "src/config/env";

const setpromise = data => {
	return new Promise((resolve, reject) => {
		resolve(data)
	})
}

export const upImage = data => fetch(uploadImg, data, 'POST');		//上传图片
export const changeWall = data => fetch('/user/wall', data);		//上传图片
export const searchList = () => setpromise(searchField.search);		//搜索页6个字段列表
export const searchFriend = phone => fetch('/user/search', {phone});		//搜索好友
export const addfriend = data => fetch('/user/addfriend', data);		//添加好友
// export const contactList = () => setpromise(contact.contacts);		//通讯录列表（假数据）
// export const dialog = () => setpromise(dialoglist.dialog);			//对话列表页数据
export const dialog = user_id => fetch('/dialog/dialog', {user_id}, 'GET');			//对话列表页数据
export const addDialog = data => fetch('/dialog/add', data, 'POST');			//对话列表页数据
export const groupChat = () => setpromise(groupData.groupchat);			//群聊数据

export const userInfo = user_id => fetch('/user/info', { user_id });			//获取用户信息
export const saveInfo = data => fetch('/user/update', data, 'POST');			//更新用户信息
export const userWord = data => fetch('/singlechat/history', data, 'POST');			//获取聊天记录

// export const circle = () => setpromise(fcricle.circle);				//获取朋友圈信息(假)
export const circle = data => fetch('/fcricle/select', data);				//获取朋友圈信息
export const addfc = data => fetch('/fcricle/add', data);				//发布朋友圈
export const updatefc = data => fetch('/fcricle/update', data, 'POST');				//更新朋友圈信息
export const collect = () => setpromise(collectData.collect);		//获取收藏数据
export const burse = () => setpromise(bursetData.burse);				//获取我的钱包数据
export const album = data => fetch('/fcricle/selectSelf', data);				//获取我的钱包数据
export const chatData = () => setpromise(chatmoreData.chatmore);		//获取聊天页面底部功能区数据
export const login = data => fetch('/user/login', data);				//登陆
export const register = data => fetch('/user/register', data);				//注册
export const logOut = data => fetch('/user/logOut', data, "POST");			//注册
export const getHistory = data => fetch('/chat/history', data);			//聊天记录(群)
export const allUser = data => fetch('/user/all', data);			//通讯录列表
export const joingroup = data => fetch('/group/join', data);			//加入群聊
export const creategroup = data => fetch('/group/create', data, "POST");			//创建群聊
export const leavegroup = data => fetch('/group/leave', data);			//退出群聊
export const allgroup = data => fetch('/group/all', data);			//群组列表
export const memberhead = data => fetch('/group/head', { data });			//群组头像列表
