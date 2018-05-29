//状态

import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import actions from './action'

Vue.use(Vuex)

const state = {
  mute: false, //是否静音
  computershow: true, //是否电脑登录
  infor: {}, //联系人信息
  searchResult: {}, //联系人信息
  groupInfo: {}, //联系人信息
  contactList: [], //对话列表
  userInfo: {}, //用户信息
  imagestatus: false,
  firendwarn: false, //朋友圈提示红色按钮
  unread: [], //未读消息
  unreadG: [], //未读消息(群)
  consumerthing: { //信息提示弹窗显隐
    visible: false,
    msg: '',
    animation: true
  },
  allgroup: [], //所有群聊的人

}

export default new Vuex.Store({
  state,
  actions,
  mutations,
})
