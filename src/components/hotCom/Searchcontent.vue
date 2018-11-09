<template>
  <div class="searchBox">
    <div class="inputBox"> 
        <input type="text" :class="[showCancel?'searchNow':'']" placeholder="请输入商品名、商家、商圈、分类" @click="ToSearch" @keyup="searchContent" v-model="searchText" ref="input"> 
        <i class="iconfont icon-seach" ></i>
        <i class="iconfont icon-quxiao showCon" v-show="showCancel" @click="delText"></i>
        <span class="cancel" v-show="showCancel" @click="ToChange">取消</span>
    </div>
    <div class="hotSearchBox" v-if="showSearchBox">
      <h6>热门搜索</h6>
      <ul>
        <li v-for="item in hotSearchList " v-text="item.name" :key="item.name" :class="{'isRed':item.isRed}"></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: ["home"],
  data() {
    return {
      showResult: false,
      showCancel: false,
      showSearchBox:false,
      searchText: "",
      hotSearchList: [
        {
          name: "附近美食",
          isRed: true
        },
        {
          name: "极尚迷鲤",
          isRed: false
        },
        {
          name: "小林除臭喷雾",
          isRed: true
        },
        {
          name: "自助",
          isRed: false
        },
        {
          name: "COSME",
          isRed: true
        },
        {
          name: "日料",
          isRed: false
        },
        {
          name: "发膜",
          isRed: true
        },
        {
          name: "粤点",
          isRed: false
        },
        {
          name: "放题",
          isRed: false
        },
        {
          name: "火锅",
          isRed: false
        },
        {
          name: "日本",
          isRed: false
        },
        {
          name: "西餐",
          isRed: false
        }
      ]
    };
  },

  components: {},

  computed: {},
  mounted() {
    //初始化
    if (this.home) {
      this.showSearchBox = true;
      this.showCancel=true;
      this.$refs.input.focus();
    }
  },

  methods: {
    //取消
    ToChange() {
      if (this.home) {
        console.log("home");
        this.$router.push({ name: "home" });
      } else {
        this.showCancel = false;
        this.showSearchBox=false;
        this.$emit("showHot", this.showSearchBox);
      }
      this.$store.dispatch("setSearchData", []);
      this.searchText='';
    },
    //点击input
    ToSearch() {
        this.showSearchBox = true;
        this.showCancel=true;
        this.$emit("showHot", this.showSearchBox);
    },
    //删除
    delText() {
      this.searchText = "";
      this.$refs.input.focus();
      this.$store.dispatch("setSearchData", []);
    },
    //搜索内容
    searchContent() {
      this.searchText = this.searchText.replace(/(^\s*)|(\s*$)/g, "");
      if (this.searchText != "") {
        //console.log("发请求");
        this.$http
          .get("http://10.3.135.51:9999/search", {
            params: {
              searchText: this.searchText
            }
          })
          .then(response => {
            if (response.data.length > 0) {
              if (this.searchText == "") {
                this.$store.dispatch("setSearchData", []);
              } else {
                //console.log("有", this.searchText, response.data);
                this.$store.dispatch("setSearchData", response.data);
                this.showSearchBox=false;
              }
            } else {
              //console.log("无", this.searchText, response.data);
              this.$store.dispatch("setSearchData", []);
              this.showSearchBox=true;
            }
          })
          .catch(error => {});
      }
      if (this.searchText == "") {
        //console.log("不发请求");
        this.$store.dispatch("setSearchData", []);
      }
    }
  },

  watch: {
    searchText(_new){
      if(_new!=''){
        
      }
    }
  }
};
</script>
<style lang='scss' scoped>
@import "../../assets/font_gc96a4u4899/iconfont.css";
.searchBox {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background: white;
  border-bottom: 1px solid #ccc;
  width: 100%;
  .inputBox {
    padding: 0px 30px 15px 30px;
    position: relative;
    line-height: 60px;
    box-sizing: border-box;
    height: 100px !important;
    input {
      background: none;
      outline: none;
      border: none;
      width: 689px;
      background-color: #f0f0f0;
      height: 52px;
      font-size: 25px;
      padding-left: 50px;
      border-radius: 3px;
      box-sizing: border-box;
      position: relative;
    }
    .searchNow {
      width: 600px;
    }
    span {
      display: inline-block;
      font-size: 30px;
      position: absolute;
      right: 30px;
      top: 20px;
      padding: 0px 20px;
    }
    i {
      font-size: 30px;
      font-weight: 800;
      color: gray;
    }
    .icon-seach {
      position: absolute;
      left: 40px;
      top: 20px;
    }
    .icon-quxiao {
      position: absolute;
      left: 660px;
      top: 20px;
      color: #aaa;
    }
    .showCon {
      left: 580px;
    }
  }
  .hotSearchBox {
    padding: 30px;
    height: 1059px;
    border-top:1px solid #ccc;
    h6 {
      font-size: 30px;
      font-weight: 800;
      margin-bottom: 20px;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        text-align: center;
        width: 197px;
        height: 60px;
        font-size: 25px;
        background-color: #f6f6f6;
        line-height: 60px;
        margin-bottom: 30px;
      }
      .isRed {
        color: red;
        background-color: #fff0f0;
      }
    }
  }
}
</style>