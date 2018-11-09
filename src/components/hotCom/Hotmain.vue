<template>
  <div class="hotMain">
    <ul class="listBox">
          <li v-for="(item,idx) in hotData" :key="idx"  class="listName" :class="{'active':idx==activeIdx}" @click="choose(idx)">
              <span  v-text="item.name" >
              </span>
          </li>
    </ul>
    <div class="classifyBox" ref="categoryList">
        <ul class="categoryBox" v-for="(aItem,aIndex) in hotData" :key="aIndex" :id="aIndex" :class="{'toTop':aIndex==activeIdx}" :ref="aIndex">  
            <h6 v-text="aItem.category.group_section.title" class="listTitle"></h6>
            <div class="mainImgBox">
                <img :src="aItem.hots?aItem.hots.url:''" alt="">
                <div class="cover"></div>
                <p v-text="aItem.hots?aItem.hots.title:''">
                </p>
            </div>
            <li class="category" v-for="(bItem,bIndex) in aItem.category.tabs" :key="bIndex" >
                <img :src="bItem.url" alt="" class="categoryImgs">
                <span v-text="bItem.title"></span>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["hotArr"],
  data() {
    return {
      hotData: "",
      activeIdx: 0
    };
  },

  components: {},

  computed: {},
  created() {},
  mounted() {
    this.getHotData();
    this.$refs.categoryList.addEventListener("scroll", this.handleScroll, true); //监听滚动事件
  },

  methods: {
    getHotData() {
      if (Object.prototype.toString.call(this.hotArr) === "[object Array]") {
        this.hotData = this.hotArr;
      } else {
        this.hotArr.then(data => {
          this.hotData = JSON.parse(data);
        });
      }
    },
    choose(idx) {
      this.activeIdx = idx;
      this.countHeight(idx);
    },
    handleScroll() {
      this.$nextTick(() => {
        let totalHeight = this.$refs.categoryList.offsetHeight;
        let scroll_top = this.$refs.categoryList.scrollTop;
        let currentHeight = 0;

        for (let i = 0; i < this.$refs.categoryList.children.length; i++) {
          currentHeight += this.$refs.categoryList.children[i].offsetHeight;
          if (scroll_top + 200 > currentHeight) {
            this.activeIdx = i + 1;
          }
          if (scroll_top < 400) {
            this.activeIdx = 0;
          }
        }
      });
    },
    countHeight(num){
      let currentHeight = 0;
        for (let i = 0; i < this.$refs.categoryList.children.length; i++) {
           if(num==i){
            this.$refs.categoryList.scrollTo(0,currentHeight+20*(i+i-1));
          }
          currentHeight += this.$refs.categoryList.children[i].offsetHeight;
        }
    }
  }
};
</script>
<style lang='scss' scoped>
.hotMain {
  padding: 116px 30px 0px 0px;
  position: relative;
  .listBox {
    height: 1235px;
    width: 197px;
    position: fixed;
    left: 0;
    top: 116px;
    background-color: #f6f6f6;
    .listName {
      position: relative;
      color: black;
      width: 197px;
      height: 100px;
      line-height: 70px;
      text-align: center;
      span {
        font-weight: 200;
        font-size: 30px;
        display: inline-block;
      }
    }
    .active {
      background-color: #fff;
      span {
        font-size: 32px;
        font-weight: 800;
        border-left: 5px solid red;
        height: 40px;
        width: 197px;
        line-height: 40px;
      }
    }
  }
  .classifyBox {
    padding-top: 140px;
    padding-bottom: 300px;
    width: 523px;
    position: absolute;
    right: 0;
    top: 0;
    height: 1116px;
    overflow-y: auto;
    z-index: 0;
    .categoryBox {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 30px;
      border-bottom: 1px solid #ccc;
      justify-content: flex-start;
      h6 {
        font-size: 25px;
        width: 523px;
        margin: 30px 0px;
      }
      .mainImgBox {
        position: relative;
        img {
          width: 490px;
          height: 152px;
        }
        .cover {
          height: 152px;
          width: 490px;
          position: absolute;
          left: 0;
          background-color: rgba(26, 26, 26, 0.8);
          top: 0;
        }
        p {
          font-size: 30px;
          color: white;
          font-weight: 800;
          position: absolute;
          left: 0;
          width: 490px;
          top: 0;
          line-height: 152px;
          text-align: center;
        }
      }
      .category {
        width: 174px;
        text-align: center;
        margin-bottom: 40px;
        .categoryImgs {
          width: 140px;
        }
        span {
          display: block;
          font-size: 25px;
          color: #aaa;
        }
      }
    }
  }
}
</style>