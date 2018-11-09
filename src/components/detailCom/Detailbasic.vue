<template>
    <div class="detailBasic">
      <div class="Header swiper-container">
          <!-- <div class="topMenu" :class="isFixed== true?'isFixed':''" ref="topMenu">
              <span class="back" @click="back"><</span>
              <span class="like">❤</span>
              <span class="share">分享</span>
              <span v-show="isFixed" class="product">商品详情</span>
          </div> -->
          <ul class="ImgBox swiper-wrapper" >
              <li v-for="(item,idx) in product_images" :key="idx" class="swiper-slide">
                  <img :src="item.img_url" alt="">
              </li>
          </ul>
          <div></div>
          <h4 :class="isFixedTittle== true?'isFixedTittle':''">
              <span class="name" v-text="basic.name+'-'" v-if="basic.product_type===1?true:false"></span>
              <span class="spec" v-text="basic.spec"></span>
              <p class="desc" v-if="basic.product_type===1?true:false" v-text="basic.description"></p>
          </h4>
          <p class="priceBox">
              <span class="price">{{basic.price | capitalize}}</span>
              <span v-text="'/'+basic.show_entity_name" class="show_entity_name"></span>
              <span class="origin_price" v-if="basic.origin_price?true:false"><del>{{ basic.origin_price | originPrice}}</del></span>
              <span> | 可退款</span>
          </p>
      </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "../../assets/css/swiper-4.4.1/dist/css/swiper.css";
export default {
  name: "",
  props: ["basicdata"],
  data() {
    return {
      data: "",
      basic: "",
      product_images: "",
      isFixed: false,
      isFixedTittle: false,
      pathName: this.$route.query.product_id
    };
  },
  filters: {
    capitalize: function(price) {
      price = price.toString();
      var a = price.slice(-2);
      var b = price.slice(0, -2);
      return b + "." + a +'元';
    },
    originPrice(price){
      price = price.toString();
      var a = price.slice(-2);
      var b = price.slice(0, -2);
      return '￥'+ b + "." + a;
    }
  },
  created() {
    this.render();
  },
  beforeMount() {},

  mounted() {
    var swiper = new Swiper(".swiper-container", {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      observer: true, // 修改swiper自己或子元素时,自动初始化swiper
      observeParents: true // 修改swiper的父元素时,自动初始化swiper
    });
    //Vue.use(swiper);
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    render() {
      this.data = JSON.parse(sessionStorage.getItem("detailproduct"));
      this.basic = this.data.basic;
      this.product_images = this.data.basic.product_images;
    },
    handleScroll() {
      this.$nextTick(() => {
        let scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop > 500) {
          this.$store.dispatch("setDetailHeader", true);
          //this.isFixed = true;
          if(this.basic.product_type===1){
            this.isFixedTittle=false;
          }else{
            this.isFixedTittle = true;
          }
        }
        else {
          //this.isFixed = false;
          this.$store.dispatch("setDetailHeader", false);
          this.isFixedTittle = false;
        }
      });
    }
  },
  watch: {
    $route(_new, _old) {
      if (_new) {
        this.render();
      }
    }
  }
};
</script>
<style lang='scss' scoped>

.detailBasic {
  z-index: 100000;
  .Header {
    // .topMenu {
    //   position: fixed;
    //   left: 0;
    //   top: 0;
    //   z-index: 90000;
    //   width: 750px;
    //   padding: 10px 10px;
    //   background:rgba(255,255,255,0);
    //   color:#000;
    //   box-sizing: border-box;
    //   span {
    //     color: #000;
    //     font-size: 38px;
    //     padding: 10px;
    //   }
    //   .back {
    //     float: left;
    //   }
    //   .like {
    //     float: right;
    //   }
    //   .share {
    //     float: right;
    //     font-size: 30px;
    //   }
    //   .product {
    //     display: inline-block;
    //     font-size: 30px;
    //     position: absolute;
    //     left: 33%;
    //     right: 40%;
    //     width: 200px;
    //     text-align: center;
    //     top: 16px;
    //     bottom: 0;
    //   }
    // }
    .ImgBox {
      z-index: 7;
      li {
        img {
          width: 100%;
        }
      }
    }
    h4 {
      font-size: 30px;
      line-height: 90px;
      background: #fff;
      padding: 0px 20px;
      width: 100%;
      border-bottom: 5px solid #000;
      box-sizing: border-box;
      height: 90px;
      .desc {
        font-weight: 100;
        font-size: 24px;
        color: #aaa;
        line-height: 60px;
      }
    }
    .priceBox {
      padding-left: 20px;
      height: 120px;
      line-height: 120px;
      margin-top:30px;
      span {
        font-size: 28px;
        color: #aaa;
      }
      .price {
        font-size: 40px;
        color: red;
      }
      .show_entity_name {
        color: red;
        margin-right:20px;
      }
    }
  }
}
.swiper-container {
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
}
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
}
.isFixedTittle {
  position: fixed !important;
  top: 91px !important;
  z-index: 10003 !important;
}
</style>