<template>
  <div class="recommendreason" v-if="product_type===1?false:true">
      <h4>推荐理由
        <span>图文详情</span>
      </h4>
      <ul class="reasonBox">
        <li v-for="(item,idx) in text_array" :key="idx" v-text="item"></li>
      </ul>
      <div class="restaurants">
        <div class="text">
          <p class="restaurants_name" v-text="restaurants.restaurant_name"></p>
          <p class="address" v-text="restaurants.restaurant_address"></p>
        </div>
        <div class="call">
          <span v-text="restaurants.restaurant_phone_numbers[0]"></span>
        </div>
      </div>
  </div>
</template>

<script>

  export default {
    name:'',
    props:['modulesone'],
    data () {
      return {
        data:'',
        modules:'',
        text_array:'',
        lights:'',
        restaurants:'',
        product_type:0
      };
    },

    components: {},
    computed: {
    },
    created(){
      console.log( this.data);
      this.render();
    },
    mounted() {
    },

    methods: {
      render(){
        this.data=JSON.parse(sessionStorage.getItem("detailproduct"));    
        this.product_type=this.data.basic.product_type;
        this.data=this.data.modules;
        for(let i=0;i<this.data.length;i++){
                if(this.data[i].data.lights&&this.data[i].data.text_array){
                    this.modules=this.data[i].data;
                    this.lights=this.data[i].data.lights;
                    this.text_array=this.data[i].data.text_array;
                }if(this.data[i].data.restaurants){
                  this.restaurants=this.data[i].data.restaurants[0];
                }
            }
        
      }
    },

    watch: {}

  }

</script>
<style lang='scss' scoped>
  .recommendreason{
    padding:20px 20px;
    h4{
      border-top:1px solid #ccc;
      font-size:30px;
      height: 100px;
      line-height: 100px;
      span{
        color:red;
        float:right;
        font-weight: 200;
      }
    }
    .reasonBox{
        padding:0px 20px;
        list-style:auto;
      li{
        list-style:auto;
        font-size:12px;
        color:#aaa;
        height: 50px;
        line-height: 50px;
      }
    }
    .restaurants{
      padding:20px;
      height: 90px;
      .text{
        border-top:1px solid #ccc;
        padding:20px 0px;
        width:70%;
        float:left;
        .restaurants_name{
          font-size:28px;
          font-weight:700;
          height: 40px;
          line-height: 40px;
          border-right:1px solid #ccc;
        }
        .address{
          font-size:24px;
          overflow: hidden;
          text-overflow:ellipsis;
          border-right:1px solid #ccc;
          white-space: nowrap;
        } 
      }
      .call{
        float:right;
        span{
          font-size:24px;
        }
      }
    }
  }
</style>