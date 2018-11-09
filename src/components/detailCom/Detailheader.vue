<template>
    <div class="detailHeader">
        <div class="topMenu" :class="isFixed== true?'isFixed':''" ref="topMenu">
            <span class="back" @click="back"><</span>
            <span class="like">❤</span>
            <span class="share">分享</span>
            <span v-show="isFixed" class="product">商品详情</span>
        </div>
    </div>
</template>

<script>

  export default {
    name:'',
    props:[''],
    data () {
      return {
          isFixed:false
      };
    },

    components: {},

    computed: {
        getIsFixed(){
            return this.$store.getters.getDetailHeader
        }
    },

    beforeMount() {},

    mounted() {},

    methods: {
        back() {
            this.$store.dispatch("setShowFixed", true);
            this.$router.go(-1);
        },
    },

    watch: {
        getIsFixed(){
            this.isFixed=this.getIsFixed;
        }
    }

  }

</script>
<style lang='scss' scoped>
.detailHeader {
    .topMenu {
      position: fixed;
      left: 0;
      top: 0;
      z-index: 90000;
      width: 750px;
      padding: 10px 10px;
      background:rgba(255,255,255,0);
      box-sizing: border-box;
      z-index: 10004;
      span {
        color: black;
        font-size: 38px;
        padding: 10px;
      }
      .back {
        float: left;
      }
      .like {
        float: right;
      }
      .share {
        float: right;
        font-size: 30px;
      }
      .product {
        display: inline-block;
        font-size: 30px;
        position: absolute;
        left: 33%;
        right: 40%;
        width: 200px;
        text-align: center;
        top: 16px;
        bottom: 0;
      }
    }
}
.isFixed {
  border-bottom: 1px solid #ccc !important;
  background:#fff!important;
  span {
    color: black!important;
  }
}

</style>