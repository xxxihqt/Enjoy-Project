<template>
  <div class="menuBox" v-if="product_type===1?false:true">
    <h4>MENU</h4>
    <ul v-for="(item,idx) in data" :key="idx">
        <h5 v-text="'-'+item.sub_title+'-'"></h5>
        <li v-for="(Aitem,Aidx) in item.text" :key="Aidx" v-text="Aitem"></li>
    </ul>
  </div>
</template>

<script>

  export default {
    name:'',
    props:[''],
    data () {
      return {
          product_type:0,
          data:''
      };
    },

    components: {},

    computed: {
    },
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
                if(newArr[i].data.contents){
                    this.basic=newArr[i].data.basic;
                    newArr=newArr[i].data.contents;
                    console.log('666',newArr);
                    for(let j=0;j<newArr.length;j++){
                        if(newArr[j].sub_title){
                            this.data=newArr;
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
    .menuBox{
        padding-top:50px;
        background: #eee;;
        h4{
            text-align: center;
            font-size:36px;
            margin-bottom:30px;
        }
        ul{
            margin-bottom:40px;
            padding:0px 40px;
            h5{
                text-align: center;
                font-size:25px;
                height: 60px;
                line-height: 60px;
            }
            li{
                text-align: center;
                font-size:12px;
                line-height: 50px;
            }
        }
    }
</style>