//处理数据

import {
  userInfo,
  saveInfo,
  dialog,
  userWord
} from 'src/service/getData'
import {
  GET_USERINFO,
  DIALOG_COVER,
  SAVE_BEGINDIALOGUE,
  SAVE_DIALOGUE,
  SAVE_MESSAGE
} from './mutation-types.js'

export default {
  //获取用户信息
  async getUserInfo({
    commit,
    state
  }) {
    const user_id = localStorage.getItem('user_id')
    let res = await userInfo(user_id)
    if (res.status == 200) {
      commit(GET_USERINFO, res.user_info)
    }else{
      commit(DIALOG_COVER, res.message)
    }
  },
  async getDialog({
    commit,
    state
  }) {
    if (state.contactList.length > 0) return;
    let res = await dialog();
    commit(SAVE_BEGINDIALOGUE, res)
  }
}
