<template>
  <div class="login">
    <div class="login-container">
        <p class="logo">
            <a href="https://enjoy.ricebook.com">
                <img :src="logo">
            </a>
        </p>
        <p class="username">
            <input type="text" placeholder="用户名" class="">
        </p>
        <p class="password">
            <input type="password" placeholder="用户名" class="">
        </p>
        <p class="totp">
            <input type="tel" placeholder="验证码" class="off"> 
            <span style="display: none;">X</span> 
            <a class="off" v-text="mycode" @click="randomCode"></a>
        </p> <!----> 
        <div id="captcha">
        </div> 
        <a class="goLogin" v-if="!isShow">登录</a> 
        <a class="goReg" v-if="isShow">注册</a> 
        <div class="tips" @click="changeShow">
            <p v-text="isShow?tips.login:tips.reg">立即注册</p>
        </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:'',
    props:[''],
    data () {
      return {
          logo:require('../imgs/login.png'),
          tips:{
              login:'立即登录',
              reg:'立即注册'
          },
          isShow:false,
          mycode:''
      }
    },
    components: {},

    computed: {},
    created(){
        this.$store.dispatch('setShowFixed',false);
    },
    beforeMount() {},

    mounted() {
        this.randomCode(4);
    },

    methods: {
        changeShow(){
          this.isShow=!this.isShow;
        },
        randomCode(n){
            for(var i=0;i<n;i++){
                this.mycode += parseInt(Math.random()*10);
            }
        }
    },

    watch: {}

  }

</script>
<style lang='scss' scoped>
    .login{
        .login-container{
            padding: 100px 60px 0;
            background-color: #fff;
            .logo{
                text-align: center;
                margin-bottom: 100px;
                img{
                    height: 90px;
                }
            }
            p{
                input{
                    width: 586px;
                    font-size: 32px;
                    color: #2c3038;
                    border-radius: 8px;
                    border: 2px solid #bdc0c5;
                    padding: 23px 20px;
                    background-color: #fff;
                }
            }
            .totp {
                position: relative;
                input {
                    width: 296px;
                    font-size: 32px;
                    color: #2c3038;
                    border-radius: 8px;
                    border: 2px solid #bdc0c5;
                    padding: 23px 50px 23px 20px;
                }
                a {
                    margin-left: 30px;
                    display: inline-block;
                    width: 156px;
                    border: 2px solid #1a1a1a;
                    text-align: center;
                    padding: 22px 30px;
                    vertical-align: 2px;
                    color: #2c3038;
                    border: 2px solid #e0e0e0;
                    font-size: 26px;
                }
            }
           .goLogin,.goReg{
                display: block;
                width: 100%;
                padding: 23px 0;
                background-color: #1a1a1a;
                font-family: PingFangSC-Medium;
                font-size: 32px;
                color: #e5e5e5;
                text-align: center;
                margin-top: 50px;
                margin-bottom: 10px;
           }
           .tips{
                width: 100%;
                font-size: 28px;
                text-align: right;
                color: #92969c;
                margin-bottom: 55px;
                p {
                    margin-top: 16px;
                    text-decoration: underline;
                }
           }
        }
    }
</style>