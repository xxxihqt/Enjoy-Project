<template>
  <div class="magazineBox" ref="datalist">
    <div class="Mheader">
      <img src="../imgs/magazine.png" alt="">
    </div>
    <div class="Mmain">
      <h5 v-text="magazineData.group_section?magazineData.group_section.desc:''"></h5>
       <mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoadeds" ref="loadmore">
        <ul class="magazineContentBox" ref="getmore">
            <li class="contents" v-for="(item,idx) in tabs" :key="idx"> 
                <div>
                  <a @click="Todetail(item.enjoy_url)"><img :src="item.url" alt=""></a>
                  <p v-text="item.tag" class="tag"></p>
                </div>
                <p v-text="item?item.desc:''" class="desc"></p>
                <a :href="item.enjoy_url"><p v-text="item.title" class="title"></p></a>
                <p class="time">{{item.begin_at | capitalize}}</p>
            </li>
        </ul>
      </mt-loadmore>
    </div>
  </div>
</template>
<script>
export default {
  name:'magazinemain',
  data() {
    return {
      magazineData: [],
      totalPage: 0,
      tabs: [],
      allLoadeds: false,
      page: 1,
      qty: 20
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
    this.getMagezineData();
  },
  mounted() {
    this.$refs.datalist.addEventListener("scroll", this.handleScroll, true);//监听滚动事件
  },
  methods: {
    getMagezineData() {
      var self = this;
      this.$loading.open();
      $.ajax({
        type: "get",
        url: "http://10.3.135.51:9999/getmagazinemsg",
        async: true,
        data: {
          page: this.page,
          qty: this.qty
        },
        success: function(data) {
          self.magazineData = data;
          self.tabs.push(...data.tabs);
          self.$store.dispatch("setMagazineData", self.magazineData);
          sessionStorage.setItem(
            "magazinedata",
            JSON.stringify(self.magazineData)
          );
          self.$loading.close();
        }
      });
    },
    loadBottom() {
      this.page++;
      if (this.page > this.totalPage) {
        this.allLoaded = true;
        return;
      }
      this.getMagezineData();
    },
    Todetail(url) {
      // 把url传给父组件
      url = url.match(/\d+/g)[0];
      var self = this;
      self.$store.dispatch("setShowFixed", false);
      $.ajax({
        type: "get",
        url: "http://10.3.135.51:9999/getmagazinemsg",
        async: true,
        data: {
          url: url
        },
        success: function(data) {
          sessionStorage.setItem("detailmagazine", data);
          self.$router.push({ name: "detailmagazine", query: { id: url } });
        }
      });
    },
    handleScroll() {
      this.$nextTick(() => {
        let wrap_height = this.$refs.datalist.offsetHeight; //容器的高度
        let scroll_top = this.$refs.datalist.scrollTop; //滚动条的scrolltop
        let scroll_height = this.$refs.getmore.offsetHeight; //内容的高度
        let is_height = scroll_height - wrap_height - scroll_top + 150; //判断是否到了底部
        if (is_height == -6) {
          if (this.page * this.qty > this.magazineData.total) {
          } else {
            this.getMagezineData();
            this.page = this.page + 1;
          }
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.magazineBox {
  height: 1200px;
  overflow-y: auto;
  .Mheader {
    text-align: center;
    border-bottom: 1px solid #ccc;
    position: fixed;
    left: 0;
    top: 0;
    background: #fff;
    z-index: 999;
    width: 100%;
  }
  .Mmain {
    padding-top: 100px;
    height: 1116px;
    z-index: -10;
    h5 {
      font-size: 24px;
      color: #92969c;
      text-align: center;
      font-weight: 100;
      padding-top: 40px;
    }
    .magazineContentBox {
      padding: 0px 30px;
      .contents {
        text-align: center;
        padding: 30px 0px;
        border-bottom: 1px solid #ccc;
        div {
          position: relative;
          img {
            width: 670px;
          }
          .tag {
            font-size: 20px;
            padding: 10px 15px;
            background-color: white;
            font-weight: 600;
            position: absolute;
            left: 30px;
            top: 78%;
            border-radius: 10px;
          }
        }
        .desc {
          font-size: 24px;
          text-align: left;
          color: #9b9b9b;
        }
        .title {
          font-size: 25px;
          font-weight: 700;
          text-align: left;
          margin: 15px 0px;
          color: black;
        }
        .time {
          font-size: 24px;
          text-align: left;
          color: #9b9b9b;
        }
      }
    }
  }
}
</style>