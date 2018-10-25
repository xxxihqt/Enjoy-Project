<template>
  <div class="combo">
    <h4 v-text="product_type===1?topic.product_typeOne:topic.product_typeZero"></h4>
    <ul>
        <li v-for="(item,idx) in recommends" :key="idx">
            <div class="imgBox"> 
                <img :src="item.product_image_url" alt="">
            </div>
            <div class="textBox">
                <p class="title" v-text="item.product_name"></p>
                <p class="priceBox">
                    <span class="price" v-text="item.price+'元/'"></span>
                    <span class="show_entity_name" v-text="item.show_entity_name"></span>
                    <span class="origin_price" v-if="item.origin_price"><del v-text="'  ￥'+item.origin_price"></del></span>
                </p>
            </div>
        </li>
    </ul>
    <div class="logo">
        <img :src="logoUrl" alt="" >
    </div>
  </div>
</template>

<script>

  export default {
    name:'',
    props:[''],
    data () {
      return {
          data:'',
          product_type:0,
          recommends:'',
          logoUrl:require('../..//imgs/logo3.png'),
          topic:{
              product_typeOne:'猜你喜欢',
              product_typeZero:'精选套餐'
          }
      };
    },

    components: {},

    computed: {},

    created() {
        this.render();
    },
    mounted() {},
    methods: {
        render(){
            this.data=JSON.parse(sessionStorage.getItem("detailproduct"));  
            this.product_type=this.data.basic.product_type;
            this.data=this.data.modules;
            for(let i=0;i<this.data.length;i++){
                if(this.data[i].data.recommend){
                    this.recommends=this.data[i].data.recommend;
                }
            }
        }
    },

    watch: {}

  }

</script>
<style lang='scss' scoped>
    .combo{
        padding:30px 20px;
        margin-bottom:100px;
        h4{
            font-size:24px;
        }
        ul{
            padding:30px 0px;
            li{
                display: flex;
                justify-content: space-between;
                .imgBox{
                    width: 32%;
                    img{
                        width:100%;
                    }
                }
                .textBox{
                    width:65%;
                    .title{
                        font-size:26px;
                        font-weight:800;
                    }
                    .priceBox{
                        line-height: 0px;
                        span{
                            font-size:20px;
                            color:red;
                        }
                        .origin_price{
                            color:#aaa;
                        }
                    }
                }
            }
        }
        .logo{
            text-align:center;
            line-height: 0px;
            img{
                width:100px;
            }       
        }
    }
</style>