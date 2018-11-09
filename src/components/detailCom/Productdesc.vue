<template>
  <div  class="productDesc" v-if="product_type===1?true:false">
    <div class="gap"></div>
      <div class="littleProductDesc">
          <h4>
            商品详情
            </h4>
            <ul class="attributes">
                <li v-for="(item,idx) in attributes" :key="idx">
                    <span v-text="item.key" class="key"></span>
                    <span v-text="item.value" class="value"></span>
                </li>
            </ul>
            <p class="readMore">查看详细介绍》</p>
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
          product_type:0,
          data:'',
          attributes:'',
          menu_attributes:''
      };
    },

    components: {},

    computed: {},

    created() {
        this.render();
    },

    mounted() {

    },
    methods: {
        render(){
            var newArr=JSON.parse(sessionStorage.getItem("detailproduct")); 
            this.product_type=newArr.basic.product_type; 
            newArr=newArr.modules;
            for(let i=0;i<newArr.length;i++){
                if(newArr[i].data.attributes){
                    this.data=newArr[i];
                    this.menu_attributes=newArr[i].data.menu_attributes;
                    this.attributes=newArr[i].data.attributes;
                    break;
                }
            }
        }
    },

    watch: {}

  }

</script>
<style lang='scss' scoped>
    .productDesc{
        z-index:1;
        .littleProductDesc{
            padding:30px 30px 0px 30px;
            h4{
                font-size:30px;
                text-align:center;
                margin-bottom:30px;
            }
            .attributes{
                li{
                    background: #eee;
                    height: 70px;
                    line-height: 70px;
                    overflow: hidden;
                    padding:0px 10px;
                    span{
                        font-size:26px;
                        padding:0px 10px;
                        display: inline-block;
                    }
                    .key{
                        float:left;
                    }
                    .value{
                        float:right;
                    }
                }
            }
            .readMore{
                font-size:26px;
                text-align: center;
                line-height: 100px;
                height: 100px;
            }
        }
        .gap{
            height: 15px;
            background: #eee;
            border-top:1px solid #ccc;
            border-bottom:1px solid #ccc;
        }
    }
</style>