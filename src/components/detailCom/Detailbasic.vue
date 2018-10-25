<template>
    <div class="detailBox">
      <div class="detailHeader swiper-container">
          <div class="topMenu" :class="isFixed== true?'isFixed':''">
              <span class="back" @click="back"><</span>
              <span class="like">❤</span>
              <span class="share">分享</span>
              <span v-show="isFixed" class="product">商品详情</span>
          </div>
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
              <span v-text="basic.price+'元'" class="price"></span>
              <span v-text="'/'+basic.show_entity_name" class="show_entity_name"></span>
              <span class="origin_price" v-if="basic.origin_price?true:false" v-text="'  ￥'+basic.origin_price"></span>
              <span> | 可退款</span>
          </p>
      </div>
  </div>
</template>

<script>
    import Vue from 'vue'
    import Swiper from 'swiper'
    import "../../assets/css/swiper-4.4.1/dist/css/swiper.css"
  export default {
    name:'',
    props:['basicdata'],
    data () {
      return {
          data:'',
          basic:'',
          product_images:'',
          isFixed:false,
          isFixedTittle:false
        
      };
    },

    components: {},

    computed: {
    },
    created(){
        this.render();
    },
    beforeMount() {},

    mounted() {
        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            observer: true, // 修改swiper自己或子元素时,自动初始化swiper
            observeParents: true,// 修改swiper的父元素时,自动初始化swiper
        })
        Vue.use(swiper);
        window.addEventListener('scroll', this.handleScroll);

    },
    destroyed(){
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        render(){
            this.data=JSON.parse(sessionStorage.getItem("detailproduct"));
            this.basic=this.data.basic;
            this.product_images=this.data.basic.product_images;
        },
        back(){
            this.$store.dispatch('setShowFixed',true);
            location.href="#/";
        },
         handleScroll () {  
            this.$nextTick(() => {
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;  
                //let headerTop = document.getElementById("header");  
                //console.log(scrollTop+'------------')  
                if (scrollTop > 500) {  
                    this.isFixed = true;  
                    this.isFixedTittle = true;  
                } else {  
                    this.isFixed = false;  
                    this.isFixedTittle = false;  
                }  
            })	
        }
    },
    watch: {}

  }

</script>
<style lang='scss' scoped>
.isFixed{
    position: fixed;
    top: 0px;
    z-index: 10004;
    border-bottom:1px solid #ccc;
    span{
        color:black;
    }
}
.isFixedTittle{
    position: fixed;
    top: 91px;
    z-index: 10003;
}
.detailBox{
        .detailHeader{
            .topMenu{
                position:fixed;
                left:0;
                top:0;
                z-index:9;
                width: 750px;
                padding:10px 10px;
                background: #fff;
                box-sizing: border-box;
                span{
                    color:black;
                    font-size:38px;
                    padding:10px;
                }
                .back{
                    float:left;
                }
                .like{
                    float:right;
                }
                .share{
                    float:right;
                    font-size: 30px;
                }
                .product{
                    display: inline-block;
                    font-size: 30px;
                    position:absolute;
                    left:33%;
                    right:40%;
                    width: 200px;
                    text-align: center;
                    top:16px;
                    bottom:0;
                }
            }
            .ImgBox{
                z-index:7;
                li{
                    img{
                        width:100%;
                    }
                }
            }
            h4{
                font-size:30px;
                line-height: 50px;
                background: #fff;
                padding:0px 20px;
                width: 100%;
                border-bottom:5px solid #000;
                .desc{
                    font-weight:100;
                    font-size: 24px;
                    color:#aaa;
                }
            }
            .priceBox{
                padding-left:20px;
                height: 120px;
                line-height: 120px;
                span{
                    font-size:28px;
                    color:#aaa;
                }
                .price{
                    font-size:40px;
                    color:red;
                }
                .show_entity_name{
                    color:red;
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
</style>