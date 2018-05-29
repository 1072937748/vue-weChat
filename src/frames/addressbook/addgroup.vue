<template>
  <section class="child_page">
    <head-top crossover="发起群聊"></head-top>
    <div class="head-btn">
      <span class="save update" @click="submitData" v-if="selectArr.length > 1">确定({{selectArr.length}})</span>
      <span class="save update" v-else>确定({{selectArr.length}})</span>
    </div>
    <!-- 联系人列表 -->
    <section class="contacts" ref="contactList">
      <div class="contacts_top">
        <ul>
          <router-link to="/grouplist" tag="li" class="contacts_li">
            <div class="contacts_img">
              <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#groupchat"></use>
              </svg>
            </div>
            <div class="contacts_text">
              选择一个群
            </div>
          </router-link>
        </ul>
      </div>
      <div class="contacts_bottom" ref="addlistfather">
        <ul class="contacts_bottom_ul" ref="addlist">
          <li v-for="(value, key) in contactList" :key="key" class="addlistLi">
            <h1>{{key}}</h1>
            <ul>
              <router-link to="" tag="li" v-for="(item, index) in value" :key="index" @click.native='detailMessage(item, key, index)'>
                <div class="personlist_img">
                  <img :src="item.avatar" alt="链接失效">
                </div>
                <div class="personlist_name ellipsis">
                  {{item.remarks ? item.remarks : item.name}}
                </div>
                <input :checked="item.checked" type="checkbox">
              </router-link>
            </ul>
          </li>
        </ul>
        <section class="guide_wipe">
          <section class="list_guide">
            <dl>
              <dd v-for="(value, index) in sortlist" :key="index" @touchstart="startThing(value)" @touchend="endThing">{{value}}</dd>
              <dd @touchstart="startThing('#')" @touchend="endThing">#</dd>
            </dl>
          </section>
        </section>
        <section class="big-letter" v-if="letter">
          <div class="letter-bg"></div>
          <div class="letter">
            {{atpresent}}
          </div>
        </section>
      </div>

    </section>
  </section>
</template>

<script>
import headTop from "src/components/header/head";
import { imgurl } from "src/config/env";
import { allUser, creategroup } from "src/service/getData";
import { animate } from "src/config/mUtils.js";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      imgurl,
      selectArr: [],
      user_id: localStorage.getItem("user_id"),
      contactList: {}, //所有通讯录列表
      peoplenum: null, //通讯录人数
      letter: false //字母放大
    };
  },
  created() {},
  beforeMount() {},
  mounted() {
    this.getList();
  },
  components: {
    headTop
  },
  computed: {
    ...mapState(["userInfo"]),
    sortlist() {
      let sortnumlist = [];
      for (let i = 65; i <= 90; i++) {
        sortnumlist.push(String.fromCharCode(i));
      }
      return sortnumlist;
    }
  },
  methods: {
    ...mapMutations(["SAVE_MESSAGE", "DIALOG_COVER","SAVE_GROUP"]),
    getList() {
      allUser().then(res => {
        let addresslist = {};
        this.contactList = res.users;
        for (let i = 65; i <= 91; i++) {
          // ASCII编码
          if (this.contactList[String.fromCharCode(i)]) {
            if (this.contactList[String.fromCharCode(i)].length > 0) {
              addresslist[String.fromCharCode(i)] = this.contactList[
                String.fromCharCode(i)
              ];
              this.peoplenum += Number(
                this.contactList[String.fromCharCode(i)].length
              );
            }
          } else {
            if (this.contactList["#"].length > 0) {
              addresslist["#"] = this.contactList["#"];
              this.peoplenum += Number(this.contactList["#"].length);
            }
          }
        }
        this.contactList = addresslist;
      });
    },
    detailMessage(item, key, index) {
      if (item.checked) {
        this.selectArr.splice(this.selectArr.indexOf(item.id), 1);
        this.$set(this.contactList[key][index], "checked", !item.checked);
      } else {
        this.$set(this.contactList[key][index], "checked", !item.checked);
        this.selectArr.push(item.id);
      }
      return false;
    },
    startThing(value) {
      this.letter = true;
      this.atpresent = value;
      this.$nextTick(() => {
        //滚动到通讯录分组的地方
        const listArray = this.$refs.addlist.getElementsByClassName(
          "addlistLi"
        );
        const getBody = document.getElementsByTagName("body")[0];
        for (let i = 0; i < listArray.length; i++) {
          if (listArray[i].getElementsByTagName("h1")[0].innerText == value) {
            if (
              this.$refs.addlistfather.offsetTop +
                this.$refs.addlistfather.offsetHeight +
                100 >=
              listArray[i].offsetTop + document.body.clientHeight
            ) {
              animate(getBody, { scrollTop: listArray[i].offsetTop - 50 });
            } else {
              var scrollval =
                this.$refs.addlistfather.offsetTop +
                this.$refs.addlistfather.offsetHeight;
              animate(getBody, { scrollTop: scrollval });
            }
          }
        }
      });
    },
    endThing() {
      this.letter = false;
    },
    // 创建群聊
    submitData() {
      const data = [...this.selectArr, this.userInfo.id];
      if (data.length > 2) {
        // 多人聊天
        console.log({ data: data });
        creategroup({ data: data }).then(res => {
          if (res.status == 200) {
            socket.emit("createGroup", { data, room_id: res.data.id });
            this.SAVE_GROUP(res.data);
            this.$router.replace({
              path: "/groupchat"
            });
          } else {
            this.DIALOG_COVER(res.message);
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../style/public";
.router-show-enter-active,
.router-show-leave-active {
  transition: all 0.4s;
}
.router-show-enter,
.router-show-leave {
  transform: translateX(100%);
}
.child_page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 203;
  background-color: #ebebeb;
}
.save.update {
  width: 5em;
}
.contacts {
  width: 100%;
  background: #fff;
  padding-top: 2.06933rem;
  .contacts_top {
    ul {
      width: 14rem;
      margin: 0 auto;
      -webkit-overflow-scrolling: touch;
      .contacts_li {
        width: 100%;
        margin: 0.3413333333rem 0;
        border-bottom: 1px solid #e0e0e0;
        @include justify(flex-start);
        align-items: center;
        .contacts_img {
          @include widthHeight(1.5786666667rem, 1.5786666667rem);
          svg {
            @include widthHeight(100%, 100%);
          }
        }
        .contacts_text {
          @include sizeColor(0.64rem, #2a2a2a);
          margin-left: 0.5333333333rem;
        }
      }
      .contacts_li:last-child {
        border: 0;
      }
    }
  }
  .contacts_bottom {
    .contacts_bottom_ul {
      li {
        width: 100%;
        h1 {
          display: block;
          background: #ebebeb;
          line-height: 0.9813333333rem;
          padding-left: 0.5973333333rem;
          @include sizeColor(0.384rem, #8a8a8a);
        }
        ul {
          width: 14rem;
          margin: 0 auto;
          li {
            padding: 0.3413333333rem 0;
            @include justify(flex-start);
            border-bottom: 1px solid #e0e0e0;
            align-items: center;
            .personlist_img {
              @include widthHeight(1.5786666667rem, 1.5786666667rem);
              img {
                @include widthHeight(100%, 100%);
              }
            }
            .personlist_name {
              @include sizeColor(0.64rem, #2a2a2a);
              margin-left: 0.5333333333rem;
              width: 12.6rem;
            }
          }
          li:last-child {
            border: 0;
          }
        }
      }
    }
    .guide_wipe {
      position: fixed;
      width: 30px;
      height: 100%;
      top: 0;
      right: 0;
      .list_guide {
        position: fixed;
        z-index: 10;
        top: 50%;
        transform: translateY(-50%);
        right: 0.2986666667rem;
        dl {
          dd {
            @include sizeColor(0.58rem, #585858);
            text-align: center;
          }
        }
        p {
          @include sizeColor(0.54rem, #585858);
        }
      }
    }

    .big-letter {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 3.3706666667rem;
      height: 3.3706666667rem;
      .letter-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 3.3706666667rem;
        height: 3.3706666667rem;
        background: #000;
        opacity: 0.6;
        border-radius: 5px;
      }
      .letter {
        position: relative;
        z-index: 10;
        width: 3.3706666667rem;
        line-height: 3.3706666667rem;
        text-align: center;
        font-size: 2rem;
        color: #fff;
        font-family: SimSun !important;
      }
    }
  }
}
</style>