/* 精选零食店*/ 
<template>
  <div>
    <div class="selectedSnacks">
        <p class="title">
            <a v-text="enjoy_url_text"></a>
            {{title}}
        </p> 
        <p class="sub-title" v-text="desc"></p> 
        <ul class="productlist">
            <li v-for="(item,idx) in tabs" :key="item.product_id">
                <a @click="Todetial(item.product_id,item.id)">
                    <img :src="item.url" alt="">
                </a>
                <p v-text="item.desc" class="title" @click="Todetial(item.product_id,item.id)"></p>
                <p v-text="item.title" class="desc"></p>
                <p class="priceBox">
                    <span v-text="item.price+'/'+item.entity_name" class="price"></span>
                    <span class="original_price"><del v-text="item.original_price" ></del></span>

                </p>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["typeOfselectedsnacks"],
  data() {
    return {
      storeList: "",
      title: "",
      desc: "",
      enjoy_url_text: "",
      tabs: ""
    };
  },

  components: {},

  computed: {},

  mounted() {
    this.renderNewProduct();
  },

  methods: {
    renderNewProduct() {
      if (
        Object.prototype.toString.call(this.typeOfselectedsnacks) ===
        "[object String]"
      ) {
        this.storeList = eval(this.typeOfselectedsnacks)[14].data;
        this.title = this.storeList.group_section.title;
        this.desc = this.storeList.group_section.desc;
        this.enjoy_url_text = this.storeList.group_section.enjoy_url_text;
        this.tabs = this.storeList.tabs;
      } else {
        this.typeOfselectedsnacks.then(typeOfselectedsnacks => {
          this.storeList = JSON.parse(typeOfselectedsnacks)[14].data;
          this.title = this.storeList.group_section.title;
          this.desc = this.storeList.group_section.desc;
          this.enjoy_url_text = this.storeList.group_section.enjoy_url_text;
          this.tabs = this.storeList.tabs;
        });
      }
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
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
.selectedSnacks {
  padding: 20px 40px;
  .title {
    font-size: 0.56rem;
    font-weight: 600;
    color: #191919;
    margin-bottom: 8px;
    position: relative;
    a {
      display: inline-block;
      position: absolute;
      right: 0;
      bottom: 0;
      color: red;
      font-size: 25px;
      font-weight: 200;
    }
  }
  .sub-title {
    font-size: 22px;
    color: #9b9b9b;
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
      .desc {
        font-size: 20px;
        color: #bbb;
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
}
</style>