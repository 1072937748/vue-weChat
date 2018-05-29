<template>
  <section class="child_page">
    <head-top crossover="个人信息"></head-top>
    <div class="head-btn">
      <span class="save" @click="save()">完成</span>
    </div>
    <section class="privacy">
      <section class="privacy_top">
        <div class="privacy_child">
          <span>备注名</span>
          <input type="text" v-model="infor.remarks" :placeholder="infor.remarks?infor.remarks : infor.name">
        </div>
        <!-- <div class="privacy_child">
          <p>标签</p>
          <span>{{infor.name}}</span>
        </div> -->
      </section>
      <section class="privacy_top">
        <div class="privacy_child">
          <span>性别</span>
          <span>{{infor.sex == 1 ? '女' : '男' }}</span>
        </div>
        <div class="privacy_child">
          <span>地区</span>
          <span>{{infor.district||'外星系'}}</span>
        </div>
        <div class="privacy_child">
          <span>个性签名</span>
          <span>{{infor.sdasd}}</span>
        </div>
        <div class="privacy_child">
          <span>电话号码</span>
          <span>{{infor.phone}}</span>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import headTop from "src/components/header/head";
import { imgurl } from "src/config/env";
import { mapState, mapMutations } from "vuex";
import { saveInfo } from "src/service/getData.js";
export default {
  name: "setinfor",
  data() {
    return {
      userHeader: "" //用户头像
    };
  },
  created() {},
  mounted() {
    this.userHeader = this.infor.avatar;
  },
  components: {
    headTop
  },
  computed: {
    ...mapState(["infor"])
  },
  methods: {
    ...mapMutations(["DIALOG_COVER"]),
    save() {
      // console.log(this.infor);
      // return;
      let parmas = this.infor;
      if (!parmas.remarks) {
        parmas.remarks = parmas.name
      }
      saveInfo(parmas).then(r => {
        if (r.status == 200) {
          console.log(r);
          this.$router.go(-1);
        } else {
          this.DIALOG_COVER(r.message);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/style/public";
.child_page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 203;
  background-color: #ebebeb;
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