<template>
  <header>
    <section class="logoPart" v-if="logoPart">
      {{logoPart=='true'?"聊天室": logoPart}}
    </section>
    <section class="logoPart" v-if="crossover">
      <section class="goback" @click="goBackThing">
        <svg fill="#fff">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#back"></use>
        </svg>
      </section>
      <section class="wall">|</section>
      <slot name='searchpart'></slot>
      <!-- <slot name='clickrefresh' ></slot> -->
      <section class="covers_name" v-if="($route.path.indexOf('search') == -1)&&($route.path.indexOf('searchFriend') == -1)" @click="refreshPage">
        <span class="ellipsis">
          {{crossover}}
        </span>
      </section>
    </section>
    <section class="searchPart" v-if="searchPart">
      <router-link to='/search' class="searchlink">
        <svg class="icon-search" fill="#fff">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#search"></use>
        </svg>
      </router-link>
    </section>
    <section class="addPart" v-if="add" @click="controlShow">
      <svg class="icon-search">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#add"></use>
      </svg>
    </section>
    <section class="addPart" v-if="addf" @click="editFc">
      <svg xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
        <g>
          <path d="M87.4,938.4h825.3V990H87.4V938.4L87.4,938.4z M402.4,834c1.3-1.1,3.5-3.2,6.6-6.6c0-0.1,0-0.1,0-0.2l374.8-374.8l-34.9-34.9L400,766.5l-4.6,3.9c-37.2-115.1-128-205.9-243.1-243.1l3.9-4.7L600,78.8l243.8,243.8l-0.2,0.2l34.9,34.9l34.1-34.1L599.1,10L94.6,514.5c0,0,0,0,0,0l-0.4,0.5l-6.8,6.8c0,0,0.2,0.1,0.5,0.2l-0.5,0.5v312.8h313.8L402.4,834L402.4,834z M138.9,783.7V577.2c97.3,32.4,174.2,109.2,206.6,206.5H138.9L138.9,783.7z" style="fill:#FFFFFF">
          </path>
        </g>
      </svg>
    </section>
    <!-- 下拉框 -->
    <section class="selectpart" v-show="addthing">
      <div class="cover" @click="controlhide"></div>
      <div class="selectlist">
        <ul>
          <router-link to='/addgroup' tag="li" class="selectpart_li">
            <section class="selectsvg">
              <svg fill="#fff">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#wxspeak"></use>
              </svg>
            </section>
            <section class="selectext">
              发起群聊
            </section>
          </router-link>
          <router-link to='/searchFriend' tag="li" class="selectpart_li">
            <section class="selectsvg">
              <svg fill="#fff">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#addfriend"></use>
              </svg>
            </section>
            <section class="selectext">
              添加朋友
            </section>
          </router-link>
          <router-link to='/find/scanqr' tag="li" class="selectpart_li">
            <section class="selectsvg">
              <svg fill="#fff">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#onesweep"></use>
              </svg>
            </section>
            <section class="selectext">
              扫一扫
            </section>
          </router-link>
          <router-link to='/find/friendcircle' tag="li" class="selectpart_li">
            <section class="selectsvg">
              <svg fill="#fff">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#fcircle"></use>
              </svg>
            </section>
            <section class="selectext">
              朋友圈
            </section>
          </router-link>
          <router-link to='' tag="li" class="selectpart_li">
            <section class="selectsvg">
              <svg fill="#fff">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#help"></use>
              </svg>
            </section>
            <section class="selectext">
              帮助与反馈
            </section>
          </router-link>
        </ul>
      </div>
    </section>
    <slot name='person'></slot>
  </header>
</template>

<script>
export default {
  data() {
    return {
      addthing: false
    };
  },
  props: [
    "logoPart",
    "crossover",
    "searchPart",
    "add",
    "addf",
    "person",
    "search",
    "clickrefresh"
  ],
  watch: {
    $route() {
      this.controlhide();
    }
  },
  created() {},
  mounted() {},
  components: {},
  computed: {},
  methods: {
    editFc() {
      this.$emit("editFc");
    },
    controlShow() {
      this.addthing = true;
    },
    controlhide() {
      this.addthing = false;
    },
    goBackThing() {
      this.$route.path == "/singlechat"
        ? this.$router.push("/dialogue")
        : window.history.go(-1);
    },
    refreshPage() {
      //点击头部刷新页面
      this.$emit("refreshPage");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../style/public";
header {
  @include widthHeight(100%, 2.06933rem);
  background: $black;
  z-index: 200;
  color: #fff;
  position: fixed;
  .logoPart {
    @include topcenter;
    @include sizeColor(0.704rem, #fff);
    left: 0.5973333333rem;
    @include justify(flex-start);
    align-items: center;
    .goback {
      @include widthHeight(1rem, 1rem);
      svg {
        @include widthHeight(100%, 100%);
      }
    }
    .wall {
      margin: 0 0.5333333333rem;
      @include sizeColor(1.0666666667rem, #2e3235);
    }

    .covers_name {
      span {
        @include sizeColor(0.704rem, #fff);
        display: block;
        width: 9.5rem;
      }
    }
  }
  .searchPart {
    @include topcenter;
    right: 3.52rem;
    @include widthHeight(0.8106666667rem, 0.8106666667rem);
    .searchlink {
      display: block;
      @include widthHeight(0.8106666667rem, 0.8106666667rem);
      svg {
        @include widthHeight(100%, 100%);
      }
    }
  }
  .addPart {
    @include topcenter;
    right: 1.0453333333rem;
    @include widthHeight(0.8106666667rem, 0.8106666667rem);
    svg {
      @include widthHeight(100%, 100%);
    }
  }
  .selectpart {
    position: fixed;
    z-index: 2;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    .cover {
      position: fixed;
      width: 100%;
      height: 100%;
      background: #000;
      opacity: 0;
    }
    .selectlist {
      position: absolute;
      z-index: 100;
      top: 2.06933rem;
      // right:0.4693333333rem;
      right: 0;
      width: 8.5333333333rem;
      background: #373b3e;
      ul {
        width: 8.5333333333rem;
        .selectpart_li {
          @include widthHeight(100%, 1.9626666667rem);
          border-bottom: 1px solid #2f3336;
          @include justify(flex-start);
          align-items: center;
          .selectsvg {
            @include widthHeight(0.96rem, 0.9386666667rem);
            margin: 0 0.7466666667rem;
            svg {
              @include widthHeight(100%, 100%);
            }
          }
          .selectext {
            @include sizeColor(0.64rem, #fff);
          }
        }
      }
    }
  }
}
</style>