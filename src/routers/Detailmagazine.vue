<template>
  <div class="detailBox" ref="detailBox">
    <div class="Mheader">
        <img src="../imgs/magazine.png" alt="">
        <span class="back" @click="back"><</span>
        <span class="share">分享</span>
    </div>
    <div id="wrap">
        <div id="breathing-logo-wrapper" style="padding-top: 400px; position: fixed; top: 0px; right: 0px; bottom: 0px; left: 0px; background: rgb(255, 255, 255); display: none;">
            <div id="breathing-logo" style="text-align: center;">
                <img src="https://s1.ricebook.com/feck/topic/event/magazine/9e062276bbbe2bea463ab63b1ac354fd.png" style="width: 100px; height: 100px;">
            </div>
        </div>
        <div id="detail">
            <div class="article-content">
                <div class="category">
                    <i class="icon-brand article iconfont"></i>
                    <span v-text="sendURL.columns.name"></span>
                </div>
                <h4 class="title" v-text="sendURL.basic.title"></h4>
                <p class="update">{{sendURL.basic.update_at | capitalize}}</p>
                <div class="line"></div>
                <div class="info">
                    <div class="info-l">
                        <img :src="sendURL.author.url" lazy="loaded">
                    </div>
                    <div class="info-r">
                        <h6 v-text="sendURL.author.name"></h6>
                        <p v-text="sendURL.author.desc"></p>
                    </div>
                </div>
                <div class="text-info">
                    <div class="md-panel" v-html="sendURL.basic.content">
                    </div>
                </div>
            </div>
            <div class="restaurant-panel">
                <div class="restaurant">
                    <h4 class="title" v-text="sendURL.modules[0].data.group_section.title"></h4> 
                    <div class="shop clx" v-for="(item,idx) in sendURL.modules[0].data.tabs" :key="idx"> 
                        <div class="fl shop-l">
                            <img :src="item.url" lazy="loaded">
                        </div> 
                        <div class="fl shop-r">
                            <p class="name" v-text="item.title"></p> 
                            <div class="location">
                                <span v-text="item.desc"></span>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
            <div class="logo">
                <img :src="logoUrl" alt="" >
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
  name:'detailmagazine',
  data() {
    return {
      url: "",
      logoUrl: require("../imgs/logo3.png"),
      sendURL:''
    };
  },

  components: {},

  computed: {
    changeShow() {
      return this.$store.getters.getShowFixed;
    }
  },
  filters: {
    capitalize: function(value) {
        value = new Date(value);
        var month = value.getMonth() + 1;
        var day = value.getDate();
        value = month + " 月 " + day + " 日" + "更新";
            return value;
    }
  },
  created() {
    this.renderDetail();
  },
  mounted() {
  },
  methods: {
    renderDetail() {
      this.sendURL=sessionStorage.getItem('detailmagazine');
      this.sendURL=JSON.parse(this.sendURL);
    },
    back() {
      this.$store.dispatch("setShowFixed", true);
      this.$router.go(-1);
    }
  }
};
</script>
<style lang='scss'>
@import "../assets/font_0is7zwo07ycm/iconfont.css";
.detailBox {
  height: 1311px;
  font-size: 20px;
  overflow-y: auto;
  .Mheader {
    text-align: center;
    height: 100px;
    border-bottom: 1px solid #ccc;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9;
    background: #fff;
    width: 750px;
    padding: 0px 10px;
    box-sizing: border-box;
    img {
      margin-top: 40px;
    }
    .share {
      display: inline-block;
      float: right;
      font-size: 30px;
      line-height: 100px;
    }
    .back {
      display: inline-block;
      float: left;
      font-size: 50px;
      font-weight: 900;
      line-height: 100px;
    }
  }
  #wrap {
    margin-top: 100px;
    #detail {
      padding: 25px;
      .article-content {
        .category {
          span {
            font-size: 26px;
            color: red;
            vertical-align: middle;
            line-height: 50px;
            display: inline-block;
          }
          .iconfont {
            color: red;
            font-size: 30px;
            font-weight: 900;
            vertical-align: middle;
            line-height: 50px;
            display: inline-block;
            margin-right: 20px;
          }
        }
        .title {
          font-size: 26px;
          margin: 10px 0px;
          line-height: 50px;
        }
        .update {
          color: #aaa;
          font-size: 16px;
          margin: 30px 0px;
        }
        .line {
          width: 200px;
          height: 1px;
          background: #ccc;
          margin-bottom: 40px;
        }
        .info {
          display: flex;
          .info-l {
            width: 20%;
            margin-right: 40px;
            img {
              width: 100px;
              border-radius: 50%;
            }
          }
          .info-r {
            width: 80%;
            h6 {
              font-size: 26px;
            }
            p {
              color: #aaa;
              font-size: 26px;
            }
          }
        }
        .text-info {
          padding-top: 50px;
          font-size: 20px;
          line-height: 50px;
          padding-bottom: 30px;
          border-bottom: 1px solid #ccc;
          img {
            width: 100%;
            margin: 25px 0px;
          }
        }
      }
      .restaurant-panel {
        padding: 30px 0px;
        .restaurant {
          padding: 30px 20px;
          .title {
            font-size: 36px;
            margin-bottom: 30px;
          }
          .shop {
            border: 1px solid #ccc;
            height: 150px;
            padding: 20px;
            .shop-l {
              float: left;
              margin-right: 30px;
              img {
                width: 150px;
                height: 150px;
              }
            }
            .shop-r {
              float: left;
              .name {
                font-size: 26px;
                font-weight: 700;
                margin-bottom: 80px;
              }
              .location {
                color: #aaa;
              }
            }
          }
        }
      }
      .logo {
        text-align: center;
        img {
          width: 100px;
        }
      }
    }
  }
}
</style>