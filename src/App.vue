<template>
  <div>
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <!-- 信息提示弹窗 -->
    <section class="consumer" :class="{consumeradd : consumerthing.animation}" v-if="consumerthing.visible">
      {{consumerthing.msg}}
    </section>
    <!-- 提示音 -->
    <audio class="hide" ref="SpeechOn" src='/static/audio/SpeechOn.wav'></audio>
    <audio class="hide" ref="SpeechOff" src='/static/audio/SpeechOff.wav'></audio>
    <audio class="hide" ref="msg" src='/static/audio/msg.wav'></audio>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "App",
  data() {
    return {
      stateS: false
    };
  },
  computed: {
    ...mapState(["mute", "consumerthing", "info", "unread", "unreadG"])
  },
  mounted() {
    this.getUserInfo();
    // 消息提示(登录)
    socket.on("unreadMsg", data => {
      try {
        if (Array.isArray(data)) {
          this.CHANGE_UNREAD([...data]);
        } else if (data) {
          this.CHANGE_UNREAD([...this.unread, data]);
        }
      } catch (error) {
        console.error(error);
      }
    });
    // 消息提示（群）
    socket.on("groupchat", data => {
      console.log(data);
      if (!data) {
        return;
      }
      this.CHANGE_UNREADG([...this.unreadG, data]);
    });
    // 消息提示
    socket.on("allchat", data => {
      try {
        if (Array.isArray(data)) {
          this.CHANGE_UNREAD([...data]);
        } else if (data) {
          this.CHANGE_UNREAD([...this.unread, data]);
        }
        this.voiceStart();
      } catch (error) {
        console.error(error);
      }
    });
    // 朋友圈新消息提示
    socket.on("fcricle", (data, type) => {
      if (type) {
        type == "zan"
          ? console.log(data + "赞了你")
          : console.log(data + "评论了你");
      } else {
        console.log(data + "发表了朋友圈");
      }
      this.CHANGE_F_RED(true);
    });
    // 错误提示
    socket.on("error", msg => {
      this.DIALOG_COVER(msg);
    });
  },
  methods: {
    ...mapMutations([
      "DIALOG_COVER",
      "CHANGE_UNREAD",
      "CHANGE_UNREADG",
      "CHANGE_F_RED"
    ]),
    ...mapActions(["getUserInfo"]),
    voiceStart() {
      console.log("进入");
      if (this.mute) {
        if (!window.plus) return;
        plus.device.vibrate(700);
      } else {
        console.log("播放声音");
        this.$nextTick(() => {
          this.$refs.msg.play();
        });
      }
    }
  }
};
</script>

<style lang="scss">
@import "src/style/public";
.router-fade-enter-active,
.router-fade-leave-active {
  transition: opacity 0.2s;
}
.router-fade-enter,
.router-fade-leave-active {
  opacity: 0;
}
.consumer {
  position: fixed;
  padding: 0.2em 0.3em;
  bottom: 10vh;
  left: 50%;
  transform: translateX(-50%);
  z-index: 300;
  font-size: 0.5em;
  border-radius: 1.5vw;
  color: #fff;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
}
.consumeradd {
  animation: fadeOut 0.2s linear both;
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>