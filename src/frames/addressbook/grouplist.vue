<template>
  <section>
    <head-top crossover="进入群聊"></head-top>
    <!-- 联系人列表 -->
    <section class="contacts" ref="contactList">
      <div class="contacts_bottom" ref="addlistfather">
        <ul class="contacts_bottom_ul" ref="addlist">
          <router-link to="/groupchat" tag="li" v-for="(item, index) in contactList" :key="index" @click.native='detailMessage(item)'>
            <div class="personlist_img">
              <img :src="imgurl + item.avatar" alt="链接失效">
            </div>
            <div class="personlist_name ellipsis">
              {{item.remarks ? item.remarks : item.name}}
            </div>
          </router-link>
        </ul>
        <section class="peoplenum">
          <span v-if="contactList.length">{{contactList.length}} 组群聊</span>
          <span v-else>还没有群聊噢</span>
        </section>
      </div>

    </section>

  </section>
</template>

<script>
import headTop from "src/components/header/head";
import { imgurl } from "src/config/env";
import { allgroup } from "src/service/getData";
import { animate } from "src/config/mUtils.js";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      imgurl,
      user_id: localStorage.getItem("user_id"),
      contactList: {}, //所有群聊列表
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
    sortlist() {
      let sortnumlist = [];
      for (let i = 65; i <= 90; i++) {
        sortnumlist.push(String.fromCharCode(i));
      }
      return sortnumlist;
    }
  },
  methods: {
    ...mapMutations(["SAVE_GROUP", "DIALOG_COVER"]),
    getList() {
      allgroup().then(res => {
        if (res.status == 200) {
          this.contactList = res.data;
        } else {
          console.error(res.message);
        }
      });
    },
    detailMessage(item) {
      this.SAVE_GROUP(item);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../style/public";

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
            opacity: 1;
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
.peoplenum {
  position: relative;
  margin-bottom: 2.28267rem;
  min-height: 1.8rem;
  text-align: center;
  margin-top: 0.5rem;
  @include sizeColor(0.6rem, #666);
  span {
    @include leftcenter;
    bottom: 1rem;
  }
}
</style>