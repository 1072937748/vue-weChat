<template>
  <section class="child_page">
    <head-top crossover="个人信息"></head-top>
    <div class="head-btn">
      <span class="save" @click="save()" v-if="changeText">完成</span>
    </div>
    <section class="privacy">
      <section class="privacy_top">
        <div class="privacy_child">
          <span>头像</span>
          <img :src="userHeader" alt="">
          <input type="file" class="coverfile" @change="changeHead" />
        </div>
        <div class="privacy_child">
          <span>昵称</span>
          <input type="text" v-model="userInfo.remarks" @input="changeCon">
        </div>
        <div class="privacy_child">
          <span>账号</span>
          <span>{{userInfo.name}}</span>
        </div>
        <div class="privacy_child" @click="enlargeImg">
          <span>二维码名片</span>
          <svg fill="#949494">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#QRcode"></use>
          </svg>
        </div>
      </section>
      <section class="privacy_top">
        <div class="privacy_child">
          <span>性别</span>
          <span>{{userInfo.sex == 1 ? '女' : '男' }}</span>
        </div>
        <div class="privacy_child">
          <span>地区</span>
          <input type="text" v-model="userInfo.district" @input="changeCon">
        </div>
        <div class="privacy_child">
          <span>个性签名</span>
          <input type="text" v-model="userInfo.sdasd" @input="changeCon">
        </div>
      </section>
    </section>
    <section class="enlarge" v-if="enlarge" @click="enlargeHide" :class="{'movein-animate' : enlargeShow, 'moveout-animate-leave' : enlargehides}">
      <div class="img" v-qrcode="qrcode"></div>
    </section>
  </section>
</template>

<script>
import headTop from "src/components/header/head";
import { imgurl } from "src/config/env";
import { mapState, mapActions, mapMutations } from "vuex";
import { saveInfo, upImage } from "src/service/getData.js";
import { qrcodeDirective } from "ic-vue-qrcode";

export default {
  directives: {
    qrcode: {
      bind: qrcodeDirective.bind
    }
  },
  data() {
    return {
      changeText: false,
      userHeader: "", //用户头像
      enlargehides: false,
      enlargeShow: false,
      enlarge: false
    };
  },
  created() {
    console.log("person");
    this.getUserInfo();
  },
  mounted() {
    this.userHeader = this.userInfo.avatar;
  },
  components: {
    headTop
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    ...mapActions(["getUserInfo"]),
    ...mapMutations(["GET_USERINFO", "DIALOG_COVER"]),
    enlargeImg() {
      this.enlarge = true;
      this.enlargeShow = true;
      this.enlargehides = false;
    },
    enlargeHide() {
      clearTimeout(this.timer);
      this.enlargehides = true;
      this.enlargeShow = false;
      this.timer = setTimeout(() => {
        this.enlarge = false;
      }, 400);
    },
    changeCon() {
      this.changeText = true;
    },
    save() {
      let parmas = this.userInfo;
      saveInfo(parmas).then(r => {
        if (r.status == 200) {
          console.log(r);
        } else {
          this.DIALOG_COVER(r.message);
        }
      });
    },
    changeHead(event) {
      let img1 = event.target.files[0];
      let uri = "";
      let form = new FormData();
      form.append("file", img1);
      form.append("name", "file");
      upImage(form)
        .then(response => {
          try {
            saveInfo({ id: this.userInfo.id, avatar: response.data.url })
              .then(r => {
                if (r.status == 200) {
                  this.userHeader = response.data.url;
                  this.GET_USERINFO(r.user_info);
                } else {
                  this.DIALOG_COVER(r.message);
                }
              })
              .catch(err => {
                console.log(err);
              });
          } catch (error) {
            console.log(error);
          }
        })
        .catch(error => {
          alert("上传图片出错！");
        });
    },
    qrcode() {
      return {
        text: this.userInfo.phone,
        width: "200",
        height: "200"
      };
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/style/public";
input {
  text-align: right;
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
.enlarge {
  position: fixed;
  @include widthHeight(100%, 100%);
  background: rgba($color: #000000, $alpha: 0.7);
  top: 0;
  z-index: 100;

  .img {
    display: block;
    position: absolute;
    margin-top: -7.5093333333rem;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
  }
}
.enlarge_part {
  display: none;
}
body .movein-animate {
  transition: all 1s;
  animation: fadeIn 0.6s;
}
body .moveout-animate-leave {
  transition: all 1s;
  animation: zoomOut 0.6s;
}
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@-webkit-keyframes zoomOut {
  from {
    opacity: 1;
  }

  50% {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }

  100% {
    opacity: 0;
  }
}

@keyframes zoomOut {
  from {
    opacity: 1;
  }

  50% {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }

  100% {
    opacity: 0;
  }
}
.privacy {
  padding-top: 3.06933rem;
  .privacy_top {
    background: #fff;
    margin-bottom: 0.8533333333rem;
    padding: 0 0.5973333333rem;
    .privacy_child {
      @include justify(space-between);
      border-bottom: 1px solid #e2e2e2;
      align-items: center;
      position: relative;
      .coverfile {
        position: absolute;
        right: 0;
        opacity: 0;
      }
      span {
        display: block;
        @include sizeColor(0.64rem, #333);
        @include align;
        line-height: 2.0266666667rem;
      }
      span + span {
        @include sizeColor(0.5546666667rem, #999);
      }
      img {
        display: block;
        @include widthHeight(2.7306666667rem, 2.7306666667rem);
        margin: 0.3413333333rem 0;
      }
      svg {
        display: block;
        @include widthHeight(0.768rem, 0.768rem);
      }
    }
    .privacy_child:last-child {
      border: 0;
    }
  }
}
</style>