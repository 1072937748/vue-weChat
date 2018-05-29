<template>
  <section class="child_page">
    <head-top crossover="扫一扫"></head-top>
    <section class="miniapp">
      <div id="bcid">
        <div style="height:40%"></div>
        <p class="tip">...扫描载入中...</p>
      </div>
    </section>
  </section>
</template>

<script>
import headTop from "src/components/header/head";
import { searchFriend } from "src/service/getData.js";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      scan: null,
      searchResult: null
    };
  },
  created() {},
  mounted() {
    this.startRecognize();
  },
  components: {
    headTop
  },
  beforeDestroy() {
    this.closeScan();
  },
  computed: {},
  methods: {
    ...mapMutations(["DIALOG_COVER", "SAVE_RESULT"]),
    //创建扫描控件并开启
    startRecognize() {
      if (!window.plus) return;
      this.scan = new plus.barcode.Barcode("bcid");
      // 开始扫描
      this.scan.start();
      // 监听扫描结果
      this.scan.onmarked = (type, result, file) => {
        switch (type) {
          case plus.barcode.QR:
            type = "QR";
            break;
          case plus.barcode.EAN13:
            type = "EAN13";
            break;
          case plus.barcode.EAN8:
            type = "EAN8";
            break;
          default:
            type = "其它" + type;
            break;
        }
        result = result.replace(/\n/g, "");
        // 成功的回调
        this.scan.cancel();
        searchFriend(result)
          .then(res => {
            if (res.status == 200) {
              this.SAVE_RESULT(res.data);
              this.$router.replace({
                path: "/addfriends"
              });
              this.closeScan();
            } else {
              this.DIALOG_COVER(res.message);
              // 开始扫描
              this.scan.start();
            }
          })
          .catch(err => {
            console.error(err);
          });
      };
    },
    //关闭条码识别控件
    closeScan() {
      if (!window.plus) return;
      this.scan.close();
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
.miniapp {
  padding-top: 2.06933rem;
  #bcid {
    height: calc(100vh - 2.06933rem);
    text-align: center;
  }
}
</style>