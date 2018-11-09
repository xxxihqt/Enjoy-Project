/* 更多推荐*/ 
<template>
  <div>
    <div class="recommendProduct">
        <p id="title">
           更多推荐
        </p> 
        <ul class="productlist">
            <li v-for="(item,idx) in tabs" :key="idx">
                <a @click="Todetial(item.product_id,item.sub_product_id)"><img :src="item.product_image" alt=""></a>
                <p v-text="item.short_name" class="title" @click="Todetial(item.product_id,item.sub_product_id)"></p>
                <p class="priceBox">
                    <span class="price">{{item.price | capitalize(item.show_entity_name)}}</span>
                    <!--v-text="item.price+'/'+item.show_entity_name"-->
                </p>
            </li>
        </ul>
        <div class="logo">
            <img :src="logoUrl" alt="" >
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: "",
      logoUrl: require("../..//imgs/logo3.png")
    };
  },
  filters: {
    capitalize: function(price, name) {
      price = price.toString();
      var a = price.slice(-2);
      var b = price.slice(0, -2);
      return b + "." + a + "/" + name;
    }
  },
  mounted() {
    this.getCarRecommendData();
  },
  methods: {
    getCarRecommendData: function() {
      var self = this;
      $.ajax({
        type: "get",
        url: "http://10.3.135.51:9999/getcarrecommendmsg",
        async: true,
        success: function(data) {
          self.tabs = data;
          self.$store.dispatch("setCarRecommendData", self.tabs);
          sessionStorage.setItem("carrecommenddata", JSON.stringify(self.tabs));
        }
      });
    },
    Todetial(product_id, id) {
      var self = this;
      $.ajax({
        type: "get",
        url: "http://10.3.135.51:9999/detail",
        data: {
          product_id: product_id,
          sub_product_id: id
        },
        async: true,
        success: function(data) {
          data.qty = 0;
          sessionStorage.setItem("detailproduct", JSON.stringify(data));
          self.$router.push({
            name: "detail",
            query: { product_id: product_id, sub_product_id: id }
          });
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.recommendProduct {
  padding: 20px 40px;
  #title {
    font-size: 30px;
    font-weight: 600;
    color: #191919;
    margin-bottom: 8px;
    position: relative;
    text-align: center;
  }
  .productlist {
    display: flex;
    margin-top: 30px;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      position: relative;
      height: 380px;
      border-bottom: 1px solid #ccc;
      width: 325px;
      img {
        width: 325px;
      }
      .title {
        width: 325px;
        font-size: 26px;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .priceBox {
        height: 50px;
        line-height: 0px;
        overflow: hidden;
        padding-bottom: 20px;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 325px;
        .price {
          font-size: 20px;
          color: red;
          display: inline-block;
          margin-right: 20px;
        }
        .original_price {
          font-size: 20px;
          display: inline-block;
          color: #ccc;
        }
      }
    }
  }
  .logo {
    text-align: center;
    img {
      width: 100px;
    }
  }
}
</style>