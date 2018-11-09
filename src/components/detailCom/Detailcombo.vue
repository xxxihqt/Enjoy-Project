<template>
  <div class="combo">
    <h4 v-text="product_type===1?topic.product_typeOne:topic.product_typeZero"></h4>
    <ul>
        <li v-for="(item,idx) in recommends" :key="idx">
            <div class="imgBox"> 
                <a @click="Todetial(item.product_id,item.id)">
                    <img :src="item.product_image_url" alt="">
                </a>
            </div>
            <div class="textBox">
                <p class="title" v-text="item.product_name" @click="Todetial(item.product_id,item.id)"></p>
                <p class="priceBox">
                    <span class="price" >{{item.price | capitalize}}</span>
                    <span class="show_entity_name" v-text="item.show_entity_name"></span>
                    <span class="origin_price" v-if="item.origin_price"><del>{{item.origin_price | originPrice }}</del></span>
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
    mounted() {},
    methods: {
        render(){
            this.data=JSON.parse(sessionStorage.getItem("detailproduct"));  
            console.log(this.data);
            this.product_type=this.data.basic.product_type;
            this.data=this.data.modules;
            for(let i=0;i<this.data.length;i++){
                if(this.data[i].data.recommend){
                    this.recommends=this.data[i].data.recommend;
                }
            }
        },
        Todetial(product_id,id){
            var self=this;
            $.ajax({
                type:'get',
                url:'http://10.3.135.51:9999/detail',
                data:{
                    product_id:product_id,
                    sub_product_id:id
                },
                async:true,
                success:function(data){
                    console.log('data',data);
                    data.qty=0;
                    sessionStorage.setItem("detailproduct",JSON.stringify(data));
                    if(id){
                        self.$router.push({ name: 'detail', params: { product_id: product_id,sub_product_id:id }});
                    }else{
                        self.$router.push({ name: 'detail', query: { product_id: product_id}});
                    }
                    
                }
            })
        }
    },

    watch: {}

  }

</script>
<style lang='scss' scoped>
    .combo{
        padding:30px 20px;
        margin-bottom:100px;
        z-index:1;
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
                            font-size:22px;
                            color:red;
                        }
                        .origin_price{
                            margin-left:20px;
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