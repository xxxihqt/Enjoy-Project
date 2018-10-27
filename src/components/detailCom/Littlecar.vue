<template>
  <div class="littleCar">
    <ul>
        <li class="showCar" @click="render">车</li>
        <li class="addTocar" @click="addTocar">加入购物车</li>
        <li class="buyNow" >即刻购买</li>
    </ul>
  </div>
</template>

<script>

  export default {
    name:'',
    props:[''],
    data () {
      return {
          current:'',
          username:'',
          productId:'',
          qty:0
      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
        render(){
            if(sessionStorage.getItem('name') && sessionStorage.getItem('_id')){
                this.$router.push({ name: 'car'});                  

            }else{
                this.$router.push({ name: 'login'});                  

            }
        },
        addTocar(){
            this.username=sessionStorage.getItem('name');
            this.current=JSON.parse(sessionStorage.getItem('detailproduct'));
            this.productId=this.current.unique_id;
            this.current.qty++;
            sessionStorage.setItem("detailproduct",JSON.stringify(this.current));
            this.qty=this.current.qty;
            console.log('current:',this.current.qty);
            console.log('this',this.qty);
            $.ajax({
                type:'get',
                url:'http://localhost:9999/shoppingcar',
                async:true,
                data:{
                    username:this.username,
                    productId:this.productId,
                    qty:this.qty
                },
                success:function(data){
                    console.log('addCar',data);
                    sessionStorage.setItem("user_product",JSON.stringify(data));
                }   
            })
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