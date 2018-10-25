<template>
  <div class="littleCar">
    <ul>
        <li class="showCar">车</li>
        <li class="addTocar">加入购物车</li>
        <li class="buyNow" @click="render">即刻购买</li>
    </ul>
  </div>
</template>

<script>

  export default {
    name:'',
    props:[''],
    data () {
      return {

      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
        render(){
            console.log(666);
        }
    },

    watch: {}

  }

</script>
<style lang='scss' scoped>
    .littleCar{
        z-index:10000;
        width: 100%;
        height: 100px;
        position:fixed;
        bottom:0;
        left:0;
        ul{
            display: flex;
            li{
                text-align: center;
                font-size:36px;
                height: 100px;
                line-height: 100px;
            }
            .showCar{
                width:20%;
                background: #fff;
                color:black;
                border-right:1px solid #ccc;
            }
            .addTocar{
                width:40%;
                background: #fff;
                color:black;
            }
            .buyNow{
                background:red;
                color:white;
                width:40%;
            }
        }
    }
</style>