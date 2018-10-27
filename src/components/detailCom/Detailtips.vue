<template>
  <div class="tipsBox" >
      <div class="littleTipsBox">
    <h4 v-text="product_type===1?topic.product_typeOne:topic.product_typeZero"></h4>
    <ul class="containers">
        <span class="express" v-for="(item,idx) in express" :key="item.text" v-if="product_type===1">
            <img :src="item.icon" alt="">
            <span v-text="item.text"></span>
        </span>
        <li v-for="(item,idx) in contents" :key="idx+1" v-text="item.text"></li>
        <p v-for="item in phone" :key="item" v-text="item" class="phone" v-if="product_type===0"></p>
    </ul>
    </div>
    <div class="gap"></div>
  </div>
</template>

<script>

  export default {
    name:'',
    props:[''],
    data () {
      return {
            contents:'',
            phone:'',
            product_type:0,
            express:'',
            topic:{
              product_typeOne:'配送及售后说明',
              product_typeZero:'使用提示'
          }
      };
    },
    components: {},
    computed: {},
    created(){
      this.render();
    },
    mounted() {},
    methods: {
         render(){
            var newArr=JSON.parse(sessionStorage.getItem("detailproduct"));  
            this.product_type=newArr.basic.product_type; 
            newArr=newArr.modules;
            for(let i=0;i<newArr.length;i++){
                if(newArr[i].data.restaurant_phone_number){
                    this.contents=newArr[i].data.contents;
                    this.phone=newArr[i].data.restaurant_phone_number;
                    break;
                }
                if(newArr[i].data.express){
                    this.contents=newArr[i].data.contents;
                    this.express=newArr[i].data.express;
                    break;
                }
            }
        }
    },
    watch: {}

  }

</script>
<style lang='scss' scoped>
    .tipsBox{
        .littleTipsBox{
            padding-left:30px;
            padding-top:20px;
            h4{
                font-size:30px;
                text-align:center;
                margin-bottom:30px;
            }
            .containers{
                padding-right:50px;
                list-style: auto;
                padding-left:20px;
                border-bottom: 1px solid #ccc;
                .express{
                    display: inline-block;
                    img{
                        width: 50px;
                        vertical-align: middle;
                    }
                    span{
                        display: inline-block;
                        vertical-align: middle;
                        margin-left:20px;
                        font-size:26px;
                    }
                }
                li{
                    font-size:12px;
                    list-style: auto;
                    margin:30px 0px;
                }
                .phone{
                    font-size:12px;
                    text-align: center;
                    padding:30px 0px;
                }
            }
        }
    }
</style>