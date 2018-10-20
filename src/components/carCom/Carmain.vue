<template>
  <div class="CarBox">
    <div class="Cheader">
      <h4 >购物车</h4>
    </div>
    <div v-show="isgoods"><span>编辑</span></div>
    <div class="goodsBox">
        <div class="carNone">  
            <img src="../../imgs/carnone.png" alt="">
            <p>购物车是空的哦~</p>
        </div>
    </div>
    <div class="gapBox"></div>
  </div>
</template>

<script>

  export default {
    name:'',
    props:[''],
    data () {
      return {
          isgoods:false
      };
    },

    components: {},

    computed: {},
    mounted() {

    },
    methods: { 
    },

    watch: {}

  }

</script>
<style lang='scss' scoped>
    .CarBox{
        .Cheader{
            text-align: center;
            border-bottom:1px solid #ccc;
            position:fixed;
            left:0;
            top:0;
            background: #fff;
            z-index: 999;
            width: 100%;
            h4{
                font-size:32px;
                height: 100px;
                line-height: 100px;
                font-weight:400;
            }
        }
        .goodsBox{
            padding-top:100px;
            padding-bottom: 50px;
            overflow-y: auto;
            z-index: -10;
            background: #fff;;
            border-bottom: 1px solid #ccc;
            .carNone{
                text-align: center;
                margin-top:100px;
                p{
                    font-size:25px;
                    color:#B0B3B8;
                }
            }
        }
        .gapBox{
            height: 30px;
            background: #F6F6F6;
            border-bottom: 1px solid #ccc;
        }
    }
</style>