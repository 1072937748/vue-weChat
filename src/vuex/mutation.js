//写方法 更新state

import {
  RECORD_MUTE,
  COMPUTER_SHOW,
  SAVE_MESSAGE,
  SAVE_RESULT,
  SAVE_GROUP,
  SAVE_BEGINDIALOGUE,
  SAVE_DIALOGUE,
  GET_USERINFO,
  ENLARGE_HEAD,
  SAVE_THEMIMG,
  CHANGE_F_RED,
  CHANGE_UNREAD,
  CHANGE_UNREADG,
  DIALOG_COVER,
  GET_ALLGROUP,
} from './mutation-types.js'

export default {
  //记录是否电脑静音
  [RECORD_MUTE](state, mutestatus) {
    state.mute = mutestatus;
  },
  //是否电脑登录
  [COMPUTER_SHOW](state, computerstatus) {
    state.computershow = computerstatus;
  },
  //保存联系人信息
  [SAVE_MESSAGE](state, infor) {
    state.infor = infor;
  },
  //保存搜索结果
  [SAVE_RESULT](state, infor) {
    state.searchResult = infor;
  },
  //保存房间信息
  [SAVE_GROUP](state, infor) {
    state.groupInfo = infor;
  },
  //获取的数据先保存
  [SAVE_BEGINDIALOGUE](state, arrayData) {
    state.contactList = arrayData;
  },
  //更新对话人列表
  [SAVE_DIALOGUE](state, arr) {
    state.contactList = arr;
  },
  //获取用户信息
  [GET_USERINFO](state, userInfo) {
    socket.emit('setInfo', userInfo.id)
    state.userInfo = userInfo
  },
  //上传主题图片
  [SAVE_THEMIMG](state, {
    newImg,
    imagestatus
  }) {
    state.userInfo.wall = newImg;
    state.imagestatus = imagestatus
  },
  //改变未读消息
  [CHANGE_UNREAD](state, data) {
    state.unread = data;
  },
  //改变未读消息(群)
  [CHANGE_UNREADG](state, data) {
    state.unreadG = data;
  },
  //改变朋友圈红色提醒显隐
  [CHANGE_F_RED](state, firendwarn) {
    state.firendwarn = firendwarn;
  },
  //信息弹窗显隐
  [DIALOG_COVER](state, consumerthing) {
    state.consumerthing = {
      visible: true,
      msg: consumerthing,
      animation: false
    };
    setTimeout(() => {
      state.consumerthing.animation = true;
      setTimeout(() => {
        state.consumerthing.visible = false;
        state.consumerthing.msg = '';
      }, 300)
    }, 1500);
  },
  //获取所有群聊人信息
  [GET_ALLGROUP](state, allgroup) {
    state.allgroup = allgroup
  }
}
