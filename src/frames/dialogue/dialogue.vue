<template>
  <section class="dialogue" @click="hide()">
    <!-- 头部 -->
    <head-top logo-part="true" search-part="true" add="true"></head-top>
    <div class="dialogue_con">
      <!-- 电脑登录 -->
      <section class="computer" v-if="computershow">
        <router-link to='/computer' class="computer_link">
          <section class="computer_icon">
            <svg>
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#computer"></use>
            </svg>
          </section>
          <section class="computer_text">Windows 已登录
            <span v-if="mute">， 手机通知已关闭</span>
          </section>
        </router-link>
      </section>
      <!-- 机器人 -->
      <section class="conversation">
        <ul>
          <div @contextmenu.prevent="show($event, robot)">
            <router-link to="/robotchat" tag="li">
              <div class="imgwipe">
                <div class="imgstyle">
                  <img src="http://www.tuling123.com/resources/web/v4/img/personalCen/icon40.png" alt="链接失效">
                </div>
              </div>
              <div class="infordetail">
                <div class="infordetail_top clear">
                  <span class="left ellipsis">{{robot.remarks ? robot.remarks : robot.petname}}</span>
                  <span class="right"></span>
                </div>
                <div class="infordetail_bot ellipsis">
                  {{robot.newmeassage}}
                </div>
              </div>
            </router-link>
          </div>
        </ul>
      </section>
      <!-- 未读群聊 -->
      <h6 v-if="grouplist.length">&nbsp;群聊</h6>
      <section class="conversation">
        <ul>
          <div v-for="(item, i) in grouplist" :key="i" @contextmenu.prevent="show($event, item)">
            <router-link to="/groupchat" tag="li">
              <div class="imgwipe">
                <i class="redicon_num" v-if="item.newinfor">{{item.unread}}</i>
                <img class="imgstyle imgstyletwo" :src="imgurl+ item.groupavatar" alt="链接失效">
              </div>
              <div class="infordetail">
                <div class="infordetail_top clear">
                  <span class="left ellipsis">群聊</span>
                  <span class="right">{{item.time}}</span>
                </div>
                <div class="infordetail_bot ellipsis">
                  {{item.content}}
                </div>
              </div>
            </router-link>
          </div>
        </ul>
      </section>
      <!-- 对话列表 -->
      <h6 v-if="dialogueList.length">&nbsp;私聊</h6>
      <section class="conversation">
        <ul>
          <div v-for="(item, i) in dialogueList" :key="i" @contextmenu.prevent="show($event, item)">
            <router-link to="/singlechat" tag="li" @click.native="refreshInfor(item)">
              <div class="imgwipe">
                <i class="redicon_num" v-if="item.newinfor">{{item.unread}}</i>
                <i class="redicon" v-if="item.newtext">{{item.unread}}</i>
                <div class="imgstyle">
                  <img :src="item.avatar" alt="链接失效">
                </div>
              </div>
              <div class="infordetail">
                <div class="infordetail_top clear">
                  <span class="left ellipsis">{{item.remarks ? item.remarks : item.name}}</span>
                  <span class="right">{{item.dialogtime}}</span>
                </div>
                <div class="infordetail_bot ellipsis">
                  {{item.content}}
                </div>
              </div>
            </router-link>
          </div>
        </ul>
      </section>
    </div>
    <a v-if="refrash"></a>
    <!-- 底部导航 -->
    <foot-guide></foot-guide>
    <transition name="router-show">
      <router-view></router-view>
    </transition>
    <div ref="menu" class="dialog-menu">
      <ul>
        <li @click="deleteChat(selectedData)">删除该聊天</li>
      </ul>
    </div>
  </section>
</template>

<script>
import headTop from "src/components/header/head";
import footGuide from "src/components/footer/foot";
import { imgurl } from "src/config/env";
import { mapState, mapActions, mapMutations } from "vuex";
import { groupChat, userInfo, login, dialog } from "src/service/getData";
import fetch from "src/config/fetch";

export default {
  data() {
    return {
      imgurl,
      refrash: false,
      selectedData: {},
      // newinfor: false, //未静音时新消息提醒
      // newtext: false, //静音时消息提醒
      robot: {
        wxid: "fileTransfer",
        headurl: imgurl + "robot.jpg",
        petname: "机器人小白",
        remarks: "机器人小白",
        newmeassage: "一个名叫小白的机器人",
        sendobject: 1
      },
      consumer: false,
      inputaccounts: "", //帐号
      inputcode: "", //密码
      accounts: false, //清除帐号
      code: false, //清除密码
      borderColor: true, //下边框颜色
      borderColortwo: false,
      timer: null,
      groupHead: [],
      dialogueList: [], //对话列表
      grouplist: [] //对话列表(群)
    };
  },
  created() {
    console.log("dialogue");
    this.initData();
  },
  beforeDestroy() {},
  beforeMount() {
    //console.log(this.contactList)
  },
  mounted() {
    groupChat().then(res => {
      this.groupHead = [...res.grouphead];
    });
    dialog(localStorage.getItem("user_id")).then(res => {
      if (res.status == 200) {
        this.dialogueList = [...res.data];
        this.SAVE_DIALOGUE([...res.data]);
        const value = [...this.unread];
        const obj = {};
        value.forEach(item => {
          obj[item.from_id] ? obj[item.from_id]++ : (obj[item.from_id] = 1);
        });
        // 未读消息
        value.forEach((element, index) => {
          try {
            this.dialogueList.forEach((item, i) => {
              if (element.from_id == item.id) {
                item.dialogtime = element.dialogtime;
                item.content = element.content;
                item.newinfor = true;
                item.unread = obj[item.id];
              }
            });
          } catch (error) {
            console.error(error);
          }
        });
        this.$nextTick(() => {
          this.dialogueList = this.dialogueList;
        });
      }
    });
  },
  components: {
    headTop,
    footGuide
  },
  computed: {
    ...mapState([
      "mute",
      "computershow",
      "infor",
      "contactList",
      "unread",
      "unreadG"
    ])
  },
  watch: {
    unread(val) {
      const value = [...val];
      const obj = {};
      value.forEach(element => {
        if (
          !this.dialogueList.some(item => {
            //对话列表中没有该好友
            return item.id == element.from_id;
          })
        ) {
          this.dialogueList.unshift({
            id: element.from_id,
            remarks: element.remarks,
            name: element.name,
            dialogtime: element.dialogtime,
            content: element.content
          });
        }
        //未读消息数
        obj[element.from_id] ? obj[element.from_id]++ : (obj[element.from_id] = 1);
      });
      value.forEach((element, index) => {
        try {
          this.dialogueList.forEach((item, i) => {
            if (element.from_id == item.id) {
              item.dialogtime = element.dialogtime;
              item.content = element.content;
              item.newinfor = true;
              item.unread = obj[item.id];
            }
          });
        } catch (error) {
          console.error(error);
        }
      });
      this.$nextTick(() => {
        this.dialogueList = this.dialogueList;
      });
    },
    unreadG(val) {
      console.log("unreadG");
      const value = [...val];
      const obj = {};
      value.forEach(item => {
        obj[item.room_id] ? obj[item.room_id]++ : (obj[item.room_id] = 1);
      });
      value.forEach((element, index) => {
        try {
          this.grouplist.forEach((item, i) => {
            if (element.room_id == item.id) {
              item.dialogtime = element.dialogtime;
              item.content = element.content;
              item.newinfor = true;
              item.unread = obj[item.id];
            }
          });
        } catch (error) {
          console.error(error);
        }
      });
      this.$nextTick(() => {
        this.dialogueList = this.dialogueList;
      });
    }
  },
  methods: {
    ...mapMutations([
      "SAVE_MESSAGE",
      "GET_USERINFO",
      "DIALOG_COVER",
      "SAVE_DIALOGUE"
    ]),
    show(event, item) {
      this.selectedData = item;
      this.$refs.menu.style.visibility = "visible";
      this.$refs.menu.style.left = event.clientX + 5 + "px";
      this.$refs.menu.style.top = event.clientY + 5 + "px";
    },
    hide() {
      this.$refs.menu.style.visibility = "hidden";
    },
    deleteChat(target) {
      this.dialogueList = this.contactList;
    },
    async initData() {
      try {
        const user_id = localStorage.getItem("user_id");
        const res = await userInfo(user_id);
        if (res.status !== 200) {
          this.$router.push({
            path: "/login"
          });
        } else {
          this.GET_USERINFO(res.user_info);
        }
      } catch (err) {
        console.log("获取用户信息失败", err);
        this.$router.push({
          path: "/login"
        });
      }
    },
    // 私聊情况下 更新保存的联系人信息
    refreshInfor(item) {
      this.SAVE_MESSAGE(item);
    },
    inpuMark() {
      this.inputaccounts ? (this.accounts = true) : (this.accounts = false);
    },
    inpuCode() {
      this.inputcode ? (this.code = true) : (this.code = false);
    },
    accountsMark() {
      this.borderColor = true;
      this.borderColortwo = false;
    },
    accountsCode() {
      this.borderColor = false;
      this.borderColortwo = true;
    },
    clearMark() {
      this.inputaccounts = "";
      this.accounts = false;
    },
    clearCode() {
      this.inputcode = "";
      this.code = false;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/style/public";
.router-show-enter-active,
.router-show-leave-active {
  transition: all 0.4s;
}
.router-show-enter,
.router-show-leave-active {
  transform: translateX(100%);
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.consumer {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 100;
  .consumerbg {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    background: #000;
    opacity: 0.5;
  }
  .consumercon {
    @include center;
    .login {
      background: #fff;
      border-radius: 5px;
      padding: 1rem;
      width: 12.3786666667rem;
      margin: 0 auto;
      .useid {
        width: 100%;
        border-bottom: 1px solid #d4d4d4;
        @include justify(flex-start);
        align-items: center;
        .mark {
          @include sizeColor(0.64rem, #333);
          letter-spacing: 0.5546666667rem;
          line-height: 2.0266666667rem;
          padding-left: 0.4266666667rem;
        }
        .input_mark {
          margin-right: 0.34rem;
          margin-left: 0.5rem;
          @include widthHeight(5.1rem, 2.0266666667rem);
          input {
            display: inline-block;
            width: 5.1rem;
            line-height: 2rem;
            @include sizeColor(0.64rem, #333);
          }
        }
        .svg_close {
          @include widthHeight(0.64rem, 0.64rem);
          svg {
            display: block;
            @include widthHeight(100%, 100%);
          }
        }
      }
      .useid_border {
        border-color: #45c01a;
      }
      .login_botton {
        margin-top: 1.536rem;
        text-align: center;
        background: #1aad19;
        border: 1px solid #179e16;
        border-radius: 5px;
        line-height: 1.6rem;
        @include sizeColor(0.7rem, #fff);
      }
    }
  }
}
.consumeradd {
  animation: fadeOut 0.4s 1 linear both;
}
.dialogue {
  width: 100%;
  background: #fff;
  min-height: 100vh;
  .dialogue_con {
    padding-top: 2.06933rem;
    -webkit-overflow-scrolling: touch;
    .computer {
      @include widthHeight(100%, 1.9626666667rem);
      background: #f5f5f5;
      border-bottom: 1px solid #e0e0e0;
      .computer_link {
        @include justify(flex-start);
        .computer_icon {
          @include widthHeight(1.2933333333rem, 1.9626666667rem);
          margin-left: 1.0666666667rem;
          margin-right: 0.96rem;
          @include align;
          svg {
            @include widthHeight(100%, 1rem);
          }
        }
        .computer_text {
          line-height: 1.9626666667rem;
          @include sizeColor(0.5546666667rem, #474747);
          span {
            display: inline-block;
            @include sizeColor(0.5546666667rem, #474747);
          }
        }
      }
    }
    .conversation {
      width: 100%;
      ul {
        width: 100%;
        li {
          padding: 0.3413333333rem 0.5973333333rem;
          box-sizing: border-box;
          border-bottom: 1px solid #e0e0e0;
          @include justify(flex-start);
          .imgwipe {
            @include widthHeight(2.0906666667rem, 2.0906666667rem);
            position: relative;
            margin-right: 0.512rem;
            .redicon_num {
              position: absolute;
              right: -0.4rem;
              top: -0.3rem;
              @include widthHeight(0.8106666667rem, 0.8106666667rem);
              @include sizeColor(0.512rem, #fff);
              line-height: 0.8806666667rem;
              padding: 0 4px;
              text-align: center;
              @include bg("../../images/warn.png");
            }
            .redicon {
              position: absolute;
              right: -0.21rem;
              top: -0.21rem;
              @include widthHeight(0.4266666667rem, 0.4266666667rem);
              @include bg("../../images/warn.png");
              border-radius: 50%;
            }
            .imgstyle {
              @include widthHeight(2.0906666667rem, 100%);
              display: flex;
              justify-content: center;
              flex-flow: row wrap;
              align-items: flex-start;
              align-content: flex-start;
              overflow: hidden;
              background: #dddbdb;
              img {
                width: 10%;
                height: auto;
                border: 0;
                flex-grow: 2;
              }
            }
            .imgstyletwo {
              img {
                width: 50%;
                height: 50%;
                flex-grow: 0;
              }
            }
          }
          .infordetail {
            width: 11.5626666667rem;
            padding-top: 0.2133333333rem;
            .infordetail_top {
              width: 100%;
              padding-bottom: 0.2133333333rem;
              span:nth-of-type(1) {
                width: 8.7466666667rem;
                @include sizeColor(0.5973333333rem, #38373c);
              }
              span:nth-of-type(2) {
                @include sizeColor(0.4266666667rem, #b2b6b9);
              }
            }
            .infordetail_bot {
              width: 9.5573333333rem;
              @include sizeColor(0.512rem, #9e9e9e);
            }
          }
        }
      }
    }
  }
}
</style>