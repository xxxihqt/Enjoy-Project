<template>
  <div class="littleCar">
    <ul>
        <li class="showCar icon-iconset0308 iconfont" @click="render"></li>
        <li class="addTocar" @click="addTocar">加入购物车</li>
        <li class="buyNow" >即刻购买</li>
    </ul>
    <div class="redBox" ref="redBox" v-if="showRed">
        <span class="red" ></span>
    </div>
    <div class="addOneBox" v-show="isAdd" ref="addOneBox">
        <span class="addOne" >+1</span>
    </div>
    <div class="tipsBox" v-show="showTips" ref="tipsBox">
        <span class="tips" >已加入购物车</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: [""],
  data() {
    return {
      isAdd: false,
      current: "",
      username: "",
      productId: "",
      qty: 0,
      showTips:false,
      showRed:false
    };
  },

  components: {},

  computed: {},

  beforeMount() {
    this.init();
  },

  mounted() {},

  methods: {
      init(){
          if(sessionStorage.getItem('user_product')){
              this.showRed=true;
          }
      },
    render() {
      if (sessionStorage.getItem("name") && sessionStorage.getItem("_id")) {
        this.$router.push({ name: "car" });
      } else {
        this.$router.push({ name: "login" });
      }
    },
    addTocar() {
      if (sessionStorage.getItem("name") && sessionStorage.getItem("_id")) {
            this.username = sessionStorage.getItem("name");
            this.current = JSON.parse(sessionStorage.getItem("detailproduct"));
            this.productId = this.current.unique_id;
            this.current.qty=1;
            //已在购物车中
            if(sessionStorage.getItem("user_product")){
              let all_userproduct = JSON.parse(sessionStorage.getItem("user_product"));
                  console.log('all_userproduct',all_userproduct)

              for(let i=0; i<all_userproduct.length;i++){
                if(all_userproduct[i].unique_id==this.productId){
                  console.log('same')
                  this.current.qty+=all_userproduct[i].qty;
                }
              }
              console.log("current:", this.current.qty);

            }
            sessionStorage.setItem("detailproduct", JSON.stringify(this.current));
            let newArr = JSON.parse(sessionStorage.getItem("detailproduct"));
            $.ajax({
            type: "get",
            url: "http://10.3.135.51:9999/shoppingcar",
            async: true,
            data: {
                username: this.username,
                productId: this.productId,
                qty: this.current.qty
            },
            success: function(data) {
                console.log("addCar", data);
                if(data instanceof Array){
                  sessionStorage.setItem("user_product", JSON.stringify(data[0].user_product));
                }else{
                  sessionStorage.setItem("user_product", JSON.stringify(data.user_product));
                }
            }
            });
            this.showRed=true;
            this.isAdd = true;
            this.showTips=true;
            $('.addOneBox').animate({bottom:'60px'},500,()=>{
                this.isAdd=false;
                $('.addOneBox').css({bottom:'130px'})
                $('.showCar').animate({fontSize:'60px'},200,()=>{
                     $('.showCar').css({fontSize:'50px'})
                }) 
            });
            setTimeout(()=>{ 
                this.showTips=false;
            }, 2000);
      } else {
        this.$router.push({ name: "login" });
      }
    }
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
.littleCar {
  z-index: 10000;
  width: 100%;
  height: 100px;
  position: fixed;
  bottom: 0;
  left: 0;
  border-top: 1px solid #ccc;

  ul {
    display: flex;
    li {
      text-align: center;
      font-size: 36px;
      height: 100px;
      line-height: 100px;
    }
    .showCar {
      width: 20%;
      background: #fff;
      color: black;
      border-right: 1px solid #ccc;
      font-size: 50px;
      font-weight: 900;
    }
    .addTocar {
      width: 40%;
      background: #fff;
      color: black;
    }
    .buyNow {
      background: red;
      color: white;
      width: 40%;
    }
  }
  .redBox {
    position: fixed;
    left: 12%;
    bottom: 3%;
    .red {
      display: inline-block;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background: red;
    }
  }
  .addOneBox {
    position: fixed;
    left: 8%;
    bottom: 130px;
    .addOne {
      display: block;
      color: red;
        font-weight: 600;
      font-size: 28px;
    }
  }
  .tipsBox {
    position: fixed;
    width: 250px;
    margin: 0 auto;
    left: 10%;
    right: 10%;
    top: 70%;
    .tips {
      display: block;
      background: rgb(44, 44, 44);
      color: #fff;
      border-radius: 20px;
      padding: 10px;
      font-size: 30px;
      text-align: center;
    }
  }
}
</style>