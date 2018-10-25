<template>
  <div class="heightLight" v-if="product_type===1?true:false">
      <div class="littleHeightLight">
         <h4>亮点</h4>
         <ul class="containers">
             <li v-for="(item,idx) in lights" :key="idx" v-if="idx===0">
                 <p v-text="item.content"></p>
                 <img :src="item.img_url" alt="">
             </li>
         </ul>
         <div class="readMore">查看更多》</div>
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
          lights:''
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
            var newArr=JSON.parse(sessionStorage.getItem("detailproduct")); 
            this.product_type=newArr.basic.product_type; 
            newArr=newArr.modules;
            for(let i=0;i<newArr.length;i++){
                if(newArr[i].data.lights){
                    this.lights=newArr[i].data.lights;
                    for(let j=0;j<this.lights.length;j++){
                        if(this.lights[j].height){
                            this.lights=this.lights;
                            break;
                        }
                    }
                    break;
                }
            }
        }
    },

    watch: {}

  }

</script>
<style lang='scss' scoped>
    .heightLight{
        .littleHeightLight{
            padding: 30px;;
            h4{
                font-size:30px;
                text-align:center;
                margin-bottom:30px;
            }
            .containers{
                li{
                    p{
                        font-size:24px;
                        line-height: 50px;
                    }
                    img{
                        width: 100%;
                        padding-top:20px;
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