<template>
  <div>
    <div> 
        <div class="selected-recommend"> 
            <div class="caption"> 
                <p class="title" v-text="title"></p> 
                <p class="sub-title" v-text="desc"></p> 
                <div class="queue">
                  <span>1</span>/6
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
        </div>    
        </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import "../../assets/css/swiper-4.4.1/dist/css/swiper.css"

  export default {
    name:'',
    props:[''],
    data () {
      return {
          name:666,
          selected_recommend:'',
          title:'',
          desc:'',
          tabs:''
      };
    },

    components: {},

    computed: {},
    mounted() {
     this.renderSelected_recommend();
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
      renderSelected_recommend(){
        this.selected_recommend=JSON.parse(localStorage.getItem("homedata"))[0].data;
        console.log(this.selected_recommend);
          this.title=this.selected_recommend.group_section.title;
          this.desc=this.selected_recommend.group_section.desc;
          this.tabs=this.selected_recommend.tabs;
      }

    },

    watch: {}

  }

</script>
<style lang='scss' scoped>
  .selected-recommend .caption {
    position: relative;
    padding: 140px 40px 40px;
}
.selected-recommend .caption .queue {
    position: absolute;
    top: 137px;
    right: 40px;
    font-size: 22px;
    line-height: 1.6;
    color: #9b9b9b;
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