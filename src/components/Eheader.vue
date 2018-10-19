<template>
    <div id="header">
        <div id="header-top">
            <div id="left" class="header-item"> <a href="/" class="v-link-active">首页</a>  </div>
            <div id="middle" class="header-item">
                 <img id="logo" alt="ENJOY" :src="logo"> 
                 <span id="city">北京</span> </div>  
            <div id="right" class="header-item">
                 <a class="item-search" href="/account/login">登录</a>  
                 <a class="iconfont icon-seach" @click="showSeachPanel"></a> 
            </div>
            <div class="logined-panel" style="display: none;">
                 <a>我的订单</a>
                 <a>我的礼券</a>  
                 <a>登出</a> 
            </div> 
            <div class="search-panel" v-show="isShowSeachPanel"> 
                <input type="text" placeholder="搜索本地精选 / 快递到家"> <button>搜索</button> 
            </div> 
        </div>
    </div>
</template>

<script>
    import '../assets/icon/iconfont.css';
  export default {
    name:'',
    props:[''],
    data () {
      return {
          logo:require('../imgs/logo1.png'),
          isShowSeachPanel:false
      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
        showSeachPanel(){
            this.isShowSeachPanel=!this.isShowSeachPanel;
        }
    },

    watch: {}

  }

</script>
<style lang='scss' scoped>
    #logo{
        width:136px;
    }
    #header{
        position:fixed;
        top:0;
        left:0;
    }
    #header #header-top #middle {
        padding-top: 0px;
    }
    #header #header-top #right a{
        overflow:hidden;
    }
</style>