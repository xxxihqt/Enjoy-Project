<template>
  <div>
    <div class="expressToHome"> 
        <div class="caption"> 
                <p class="title" v-text="title"></p> 
                <p class="sub-title" v-text="desc"></p> 
                <div class="queue">
                  <span>1</span>/4
                </div>
        </div> 
        <div class="swiper-container">
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
        <ul class="littleIcon">
            <li v-for="(item,idx) in littleIconTabs" :key="idx">
              <img :src="item.url" alt="">
              <p v-text="item.title"></p>
            </li>
        </ul>
      </div>    
  </div>
</template>

<script>
import Swiper from 'swiper'
import "../../assets/css/swiper-4.4.1/dist/css/swiper.css"

  export default {
    props:['typeOfexpresstohome'],
    data () {
      return {
          selected_recommend:'',
          title:'',
          desc:'',
          tabs:'',
          littleIconTabs:''
      };
    },

    components: {},

    computed: {},
    mounted() {
        this.renderNewProduct();
      var swiper = new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    },
    methods: {
       renderNewProduct(){
            this.storeList=this.typeOfexpresstohome[10].data;
            this.title=this.storeList.group_section.title;
            this.desc=this.storeList.group_section.desc;
            this.enjoy_url_text=this.storeList.group_section.enjoy_url_text;
            this.tabs=this.storeList.tabs;
            this.littleIconTabs=this.typeOfexpresstohome[11].data.tabs;
        }
    },

    watch: {}

  }

</script>
<style lang='scss' scoped>
  .expressToHome {
    .caption {
      position: relative;
      padding: 40px;
      .title {
        font-size: 0.56rem;
        font-weight: 600;
        color: #191919;
      }
      .sub-title {
        font-size: 0.293333rem;
        color: #92969c;
      }
      .queue {
        position: absolute;
        top: 40px;
        right: 40px;
        font-size: 22px;
        line-height: 1.6;
        color: #9b9b9b;
        span {
          font-size: 0.56rem;
          color: #1a1a1a;
        }
      }
    }
    .littleIcon{
      display:flex;
      padding:30px 0px;
      border-bottom:1px solid #ccc;
      li{
        flex:1;
        text-align: center;
        img{
          width:100px;
        }
        p{
          font-size:23px;
        }
      }
    }
}
.swiper-container {
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
      a{
        text-align: left;
        padding-bottom:20px;
        border-bottom: 1px solid #ccc;
      }
      .tips{
        font-size:20px;
        color:#FF4141;
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