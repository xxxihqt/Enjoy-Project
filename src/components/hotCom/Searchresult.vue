<template>
  <div class="searchResult" v-if="showSearchResult">
    <ul>
        <li v-for="(item,idx) in searchResult" :key="idx">
          <p v-text="item.basic.short_name" @click="Todetial(item.basic.product_id,item.basic.id)"></p>
        </li>
    </ul>
  </div>
</template>

<script>

  export default {
    name:'',
    props:[''],
    data () {
      return {
        searchResult:[],
        showSearchResult:false
      };
    },

    components: {},

    computed: {
      getSearchData(){
        return this.$store.getters.getSearchData;
      }
    },
    created(){
      
    },
    beforeMount() {},

    mounted() {
    },

    methods: {
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
            console.log(data);
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

    watch: {
      getSearchData(){
        if(this.$store.getters.getSearchData.length>0){
          this.searchResult=this.$store.getters.getSearchData;
          this.showSearchResult=true;
        }else{
          this.searchResult=[];
        }
        console.log('this.showSearchResult',this.showSearchResult);
      }
    }

  }

</script>
<style lang='scss' scoped>
.searchResult {
  padding: 120px 30px 0px 30px;
  background: #fff;
  ul {
    li {
      border-bottom: 1px solid #ccc;
      p {
        font-size: 26px;
        height: 40px;
        line-height: 40px;
        padding: 10px 0px;
      }
    }
  }
}
</style>