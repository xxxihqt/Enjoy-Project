/* 24小时热卖 */
<template>
  <div>
    <div class="newproduct">
        <p class="title">
            <a v-text="enjoy_url_text"></a>
            {{title}}
        </p> 
        <p class="sub-title" v-text="desc"></p> 
        <ul class="productlist">
            <li v-for="(item,idx) in tabs" :key="idx">
                <img :src="item.url" alt="">
                <p v-text="item.title" class="title"></p>
                <p class="priceBox">
                    <span v-text="item.price+'/'+item.entity_name" class="price"></span>
                    <span class="original_price"><del v-text="item.original_price" ></del></span>

                </p>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>

  export default {
    name:'',
    props:[''],
    data () {
      return {
          storeList:'',
          title:'',
          desc:'',
          enjoy_url_text:'',
          tabs:''
      };
    },

    components: {},

    computed: {},

    mounted() {
        this.renderNewProduct();
    },

    methods: {
         renderNewProduct(){
            this.storeList=JSON.parse(localStorage.getItem("homedata"))[7].data;
            this.title=this.storeList.group_section.title;
            this.desc=this.storeList.group_section.desc;
            this.enjoy_url_text=this.storeList.group_section.enjoy_url_text;
            this.tabs=this.storeList.tabs;
            /*console.log(this.storeList);*/
        }
    },

    watch: {}

  }

</script>
<style lang='scss' scoped>
    .newproduct{
        padding: 20px 40px;
        .title {
            font-size: 0.56rem;
            font-weight: 600;
            color: #191919;
            margin-bottom: 8px;
            position:relative;
            a{
                display: inline-block;
                position: absolute;
                right:0;
                bottom: 0;
                color:red;
                font-size:25px;
                font-weight: 200;
            }
        }
        .sub-title {
            font-size: 22px;
            color: #9b9b9b;
        }
        .productlist{
            display: flex;
            margin-top:30px;
            overflow: hidden;
            border-bottom:1px solid #ccc;
            li{
                flex:1;
                margin-right:20px;
                position: relative;;
                height: 380px;
                img{
                    width: 325px;
                }
                .title{
                    font-size:26px;
                    text-overflow: -o-ellipsis-lastline;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
                .priceBox{
                    height: 50px;
                    line-height: 0px;
                    overflow: hidden;
                    padding-bottom:20px;
                    position:absolute;
                    left:0;
                    bottom:0;
                    .price{
                        font-size:20px;
                        color:red;
                        display: inline-block;
                        margin-right:20px;
                    }
                    .original_price{
                        font-size:20px;
                        display: inline-block;
                        color:#ccc;
                    }
                }
                
            }
        }
    }
</style>