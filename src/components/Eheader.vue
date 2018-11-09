<template>
    <div id="header">
        <div id="header-top">
            <div id="middle" class="header-item">
                 <img id="logo" alt="ENJOY" :src="logo"> 
                 <span id="city">广州</span> </div>  
            <div id="right" class="header-item">
                 <a class="item-search" href="/account/login" @click="toLogin" v-if="showLogin">登录</a>  
                 <a class="iconfont icon-seach" @click="showSeachPanel"></a> 
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
          logo:require('../imgs/login.png'),
          showLogin:false
      };
    },

    components: {},

    computed: {},

    beforeMount() {
        if(sessionStorage.getItem('name') && sessionStorage.getItem('_id')){
            this.showLogin=false;
        }
    },

    mounted() {},

    methods: {
        showSeachPanel(){
            console.log(666);
            this.$router.push({ name: 'search'});                                          
        },
        toLogin(){
            this.$router.push({ path: '/login'});                              
        }
    },
    watch: {}

  }

</script>
<style lang='scss' scoped>
#header {
  position: fixed;
  top: 0;
  left: 0;
  height: 100px;
   background: #fff;
   width: 750px;
   border-bottom:1px solid #ccc;
   padding:0px 30px;
   z-index:11;
    #header-top{
        position: relative;
        text-align: center;
        #middle {
           
            #logo{
                width: 136px;
            }
            #city{
                margin-left:10px;
                font-size:22px; 
            }
        }
        #right{
            position: absolute;
            right:60px;
            top:0px;
            a {
                overflow: hidden;
                display: inline-block;
                color:black;
                font-size:36px;
                line-height: 100px;
            }
        }
    }
}

</style>