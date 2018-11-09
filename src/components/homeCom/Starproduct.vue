/*明星单品 */

<template>
  <div>
    <div class="starProduct"> 
        <div class="caption"> 
            <p class="title" v-text="title"></p> 
            <p class="sub-title" v-text="desc"></p> 
        </div> 
        <div class="content">
            <a href="" enjoytracemeta="=" v-for="(item,idx) in tabs" :key="idx" :class="{'mainTabs':idx===maintab}"> 
                <img :src="item.url"> 
                <p class="title" v-text="item.title"></p>
                <p class="sub-title" v-text="item.desc"></p>
            </a>
        </div>
    </div>    
  </div>
</template>

<script>
export default {
  props: ["typeOfstarproduct"],
  data() {
    return {
      starproduct: "",
      title: "",
      desc: "",
      tabs: "",
      maintab: 0
    };
  },

  components: {},

  computed: {},
  mounted() {
    this.renderNewProduct();
  },
  methods: {
    renderNewProduct() {
      if (
        Object.prototype.toString.call(this.typeOfstarproduct) ===
        "[object String]"
      ) {
        this.starproduct = eval(this.typeOfstarproduct)[12].data;
        this.title = this.starproduct.group_section.title;
        this.desc = this.starproduct.group_section.desc;
        this.tabs = this.starproduct.tabs;
      } else {
        this.typeOfstarproduct.then(typeOfstarproduct => {
          this.starproduct = JSON.parse(typeOfstarproduct)[12].data;
          this.title = this.starproduct.group_section.title;
          this.desc = this.starproduct.group_section.desc;
          this.tabs = this.starproduct.tabs;
        });
      }
    }
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
.starProduct {
  padding: 40px;
  .caption {
    position: relative;
    .title {
      font-size: 0.56rem;
      font-weight: 600;
      color: #191919;
    }
    .sub-title {
      font-size: 0.293333rem;
      color: #92969c;
    }
  }
  .content {
    a {
      border-bottom: 1px solid #ccc;
      display: block;
      padding: 30px 0px;
      color: black;
      position: relative;
      img {
        width: 175px;
      }
      .title {
        font-size: 26px;
        font-weight: 800;
        position: absolute;
        left: 200px;
        top: 30px;
      }
      .sub-title {
        font-size: 20px;
        color: #9b9b9b;
        position: absolute;
        left: 200px;
        top: 80px;
      }
    }
    .mainTabs {
      position: relative;
      height: 490px;
      img {
        width: 8.933333rem;
        height: 5.04rem;
        margin-bottom: 0.426667rem;
        vertical-align: top;
      }
      .title {
        font-size: 0.426667rem;
        font-weight: 600;
        color: #000;
        margin-bottom: 0.106667rem;
        position: absolute;
        left: 0;
        top: 430px;
      }
      .sub-title {
        font-size: 0.293333rem;
        color: #9b9b9b;
        position: absolute;
        left: 0;
        top: 490px;
      }
    }
  }
}
</style>