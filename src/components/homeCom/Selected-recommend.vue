<template>
  <div>
    <div> 
        <div class="selected-recommend"> 
            <div class="caption"> 
                <p class="title" v-text="title"></p> 
                <p class="sub-title" v-text="desc"></p> 
                <div class="queueOne">
                  
                </div>
            </div> 
            <div class="swiper-container-one">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,idx) in tabs" :key="idx" id="idx">
                   <a href="" enjoytracemeta="="> 
                        <img :src="item.url"> 
                        <p class="tips" v-text="item.tag"></p> 
                        <p class="title" v-text="item.title"></p>
                        <p class="sub-title" v-text="item.desc"></p>
                    </a>
                </div>
              </div>
            </div>
        </div>    
        </div>
  </div>
</template>

<script>
import Vue from "vue";
import Swiper from "swiper";
import "../../assets/css/swiper-4.4.1/dist/css/swiper.css";

export default {
  props: ["typeOfselectedrecommend"],
  data() {
    return {
      selected_recommend: "",
      title: "",
      desc: "",
      tabs: "",
      lenght: 0,
      currentIdx: 0
    };
  },

  components: {},

  computed: {
    computedLength() {
      return this.tabs.length;
    },
    computedLength() {
      return this.tabs.length;
    }
  },
  mounted() {
    this.renderSelected_recommend();
    var swiper1 = new Swiper(".swiper-container-one", {
      observer: true, // 修改swiper自己或子元素时,自动初始化swiper
      observeParents: true, // 修改swiper的父元素时,自动初始化swiper
      pagination: {
        el: '.queueOne',
        type: 'fraction',
      },
    });
  },
  methods: {
    renderSelected_recommend() {
      if (
        Object.prototype.toString.call(this.typeOfselectedrecommend) ===
        "[object String]"
      ) {
        this.selected_recommend = eval(this.typeOfselectedrecommend)[0].data;
        this.title = this.selected_recommend.group_section.title;
        this.desc = this.selected_recommend.group_section.desc;
        this.tabs = this.selected_recommend.tabs;
      } else {
        this.typeOfselectedrecommend.then(selected_recommend => {
          selected_recommend = JSON.parse(selected_recommend)[0];
          this.selected_recommend = selected_recommend.data;
          this.title = this.selected_recommend.group_section.title;
          this.desc = this.selected_recommend.group_section.desc;
          this.tabs = this.selected_recommend.tabs;
        });
      }
    }
  },
  watch: {
    typeOfselectedrecommend: function(newData, oldData) {
      this.selected_recommend = newData;
    }
  }
};
</script>
<style lang='scss' scoped>
.selected-recommend .caption {
  position: relative;
  padding: 140px 40px 40px;
  .title {
    font-size: 0.56rem;
    font-weight: 600;
    color: #191919;
  }
  .sub-title {
    font-size: 20px;
    color: #92969c;
  }
  .queueOne {
    position: absolute;
    top:150px;
    left:640px;
    font-size: 27px;
    line-height: 1.6;
    color: #9b9b9b;
    .swiper-pagination-current{
      color: black;
      font-size:34px;
    }
  }
}
.swiper-container-one {
  width: 100%;
  height: 100%;
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    a img {
      width: 670px;
      height: 378px;
      margin-bottom: 32px;
      vertical-align: top;
    }
    a {
      text-align: left;
      padding-bottom: 20px;
      border-bottom: 1px solid #ccc;
    }
    .tips {
      font-size: 20px;
      color: #ff4141;
      height: 20px;
      margin-bottom: 10px;
    }
    .title {
      font-size: 32px;
      font-weight: 600;
      color: #000;
      margin-bottom: 8px;
    }
    .sub-title {
      font-size: 22px;
      color: #9b9b9b;
    }
  }
}
</style>
<style scoped>
  .queueOne  >>> .swiper-pagination-current{
      color: black;
      font-size:36px;
    }
</style>
