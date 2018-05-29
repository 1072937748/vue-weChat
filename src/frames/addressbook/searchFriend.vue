<template>
	<section>
		<head-top crossover="true" search="true">
			<section slot="searchpart">
				<section class="searchpart">
					<div class="searchpart_svg">
						<svg fill="#fff">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#search"></use>
						</svg>
					</div>
					<div class="searchpart_input">
						<input type="text" v-model="inputmessage" :placeholder="reminder" @input="whatInput" @keyup.enter="enterThing" />
					</div>
				</section>
			</section>
		</head-top>

		<!-- 联系人列表 -->
		<section class="searchResult" v-if="searchResult">
			<div class="contacts_bottom">
				<ul class="contacts_bottom_ul" v-if="searchResult.phone">
					<router-link to="/addfriends" tag="li" @click.native='detailMessage()'>
						<div class="personlist_img">
							<img :src="searchResult.avatar" alt="链接失效">
						</div>
						<div class="personlist_name ellipsis">
							{{searchResult.remarks ? searchResult.remarks : searchResult.name}}
						</div>
					</router-link>
				</ul>
				<section class="peoplenum" v-else>
					<span>没有搜到该用户噢</span>
				</section>
			</div>

		</section>
	</section>
</template>

<script>
import headTop from "src/components/header/head";
import { searchList, searchFriend } from "src/service/getData.js";
import { mapState, mapMutations } from "vuex";
import { imgurl } from "src/config/env";
export default {
  data() {
    return {
      imgurl,
      reminder: "搜索好友账号", //
      inputmessage: "", //
      searchlist: [], //搜索字段数据
      searchResult: null //搜索字段数据
    };
  },
  created() {},
  mounted() {
    searchList().then(res => {
      this.searchlist = res;
    });
  },
  components: {
    headTop
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    ...mapMutations(["DIALOG_COVER", "SAVE_RESULT"]),
    whatInput() {
      if (this.inputmessage.replace(/\s+/g, "") == "") {
        this.light = false;
      } else {
        this.light = true;
      }
    },
    enterThing() {
      if (this.light) {
        this.clickSend();
      }
    },
    clickSend() {
      console.log(this.inputmessage);
      searchFriend(this.inputmessage)
        .then(res => {
          if (res.status == 200) {
            console.log(res.data);
            this.searchResult = res.data;
          } else {
            this.DIALOG_COVER(res.message);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    detailMessage() {
      this.SAVE_RESULT(this.searchResult);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/style/public";
.searchpart {
  @include widthHeight(12rem, 1.2rem);
  border-bottom: 1px solid #45c01a;
  @include justify(flex-start);
  align-items: center;
  .searchpart_svg {
    @include widthHeight(0.8rem, 0.8rem);
    margin-right: 0.4693333333rem;
    svg {
      @include widthHeight(100%, 100%);
    }
  }
  .searchpart_input {
    input {
      display: block;
      width: 10rem;
      line-height: 1rem;
      background: none;
      @include sizeColor(0.615rem, #fff);
    }
  }
}

.searchResult {
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