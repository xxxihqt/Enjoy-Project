<template>
    <div class="CarBox">
        <div class="car-header">
            <h4 >购物车 <span class="edit" v-text="edit?'编辑':'完成'" @click="changeEdit"></span></h4>
        </div>
        <div class="goodsBox">
            <div class="car-group">
                <ul class="car-list">
                    <li class="clearfix" v-for="(item,idx) in userProduct" :key="idx"> 
                        <div class="sel-wrapper clearfix">
                            <span class="sel iconfont on icon-gouxuan"></span>
                        </div> 
                        <div class="desc clearfix">
                            <div class="image">
                                <img :src="item.basic.product_images[0].img_url">
                            </div> 
                            <div class="info">
                                <p class="title" v-text="item.basic.name"></p>
                                <p class="cate" v-text="'类型：'+item.basic.spec"></p> 
                                <p class="price"  v-text="'单价：'+item.basic.price +'元'"></p> 
                                <div class="opt">
                                    <div class="operate">
                                        <a class="subtract disable">-</a> 
                                        <span class="num" v-text="item.qty"></span> 
                                        <a class="plus">+</a>
                                    </div>
                                </div> 
                            </div>
                        </div>
                        <div class="panel-gap"></div>
                    </li>
                </ul>
            </div>
            <div class="carNone" v-if="isgoods">  
                <img src="../../imgs/carnone.png" alt="">
                <p>购物车是空的哦~</p>
                <div class="gapBox"></div>
            </div>
        </div>
        <div class="cartfooter" v-if="!isgoods">
            <div class="cart-pay">
                <a class="sel-all">
                    <span class="sel iconfont on"></span> 
                    <span class="text">全选</span>
                </a> 
                <a class="pay-go">去结算</a> 
                <div class="pay-content">合计：<span>88</span> 元
                </div>
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
          isgoods:true,
          edit:true,
          userProduct:''
      };
    },

    components: {},

    computed: {},
    created(){
        this.$store.dispatch('setShowFixed',false);
        this.render();
    },
    mounted() {

    },
    methods: { 
        changeEdit(){
            this.edit=!this.edit;
        },
        render(){
            var dataMsg=JSON.parse(sessionStorage.getItem("user_product"));
            if(dataMsg){
                this.isgoods=false;
                this.userProduct=dataMsg.user_product;
                console.log(this.userProduct)
            }
        }
    },

    watch: {}

  }

</script>
<style lang='scss' scoped>
    @import '../../assets/font_ex4wr4ozfae/iconfont.css';
    .CarBox{
        .car-header{
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
                position: relative;
                .edit{
                    position:absolute;
                    right:30px;
                    top:0px;
                }
            }
        }
        .goodsBox{
            padding-top:100px;
            padding-bottom: 50px;
            overflow-y: auto;
            z-index: -10;
            background: #fff;;
            border-bottom: 1px solid #ccc;
            .car-group{
                .car-list{
                    .clearfix{
                        overflow: auto;
                    }
                    li{
                       .sel-wrapper {
                            float: left;
                            .sel.on {
                                border-radius: 100%;
                                width: 30px;
                                height: 30px;
                                border: none;
                                border:1px solid #aaa;
                            }
                            .sel {
                                float: left;
                                width: 34px;
                                height: 34px;
                                border-radius: 18px;
                                margin: 92px 36px;
                                border: solid 1px #92969c;
                                background-color: #FFF;
                                overflow: hidden;
                            }
                            .iconfont {
                                font-family: iconfont!important;
                                font-size: 16px;
                                color: #000;
                                font-style: normal;
                                -webkit-font-smoothing: antialiased;
                                -moz-osx-font-smoothing: grayscale;
                            }
                       }
                       .desc {
                            margin: 0 40px 0 106px;
                            padding: 30px 0;
                            /* border-bottom: 1px solid #bdc0c5; */
                            .image {
                                float: left;
                                position: relative;
                                width: 240px;
                                height: 160px;
                                img {
                                    width: 240px;
                                    height: 160px;
                                    vertical-align: top;
                                }
                            }
                            .info {
                                position: relative;
                                margin-left: 270px;
                                height: 160px;
                                p{
                                    height: 40px;
                                    line-height: 40px;
                                }
                                .title {
                                    font-family: PingFangSC-Medium;
                                    font-size: 28px;
                                    font-weight: 500;
                                    color: #2c3038;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    display: -webkit-box;
                                    -webkit-line-clamp: 1;
                                    -webkit-box-orient: vertical;
                                }
                                .cate {
                                    font-size: 24px;
                                    color: #92969c;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    display: -webkit-box;
                                    -webkit-line-clamp: 1;
                                    -webkit-box-orient: vertical;
                                }
                                .price {
                                    font-size: 24px;
                                    color: #ff3939;
                                }
                                .opt {
                                    position: absolute;
                                    height: 50px;
                                    bottom: -3;
                                    .operate{
                                        height: 50px;
                                        line-height: 0px;
                                        overflow: hidden;
                                        a {
                                            width: 40px;
                                            vertical-align: middle;
                                            border:1px solid #aaa;
                                            display: inline-block;
                                            height: 40px;
                                            text-align: center;
                                            font-size:38px;
                                            line-height: 34px;
                                            vertical-align: middle;
                                        }
                                        a.disable {
                                            color: #bdc0c5;
                                        }
                                        span {
                                            width: 60px;
                                            font-size: 28px;
                                            display: inline-block;
                                            height: 46px;
                                            vertical-align: middle;
                                            line-height: 46px;
                                            text-align: center;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .carNone{
                text-align: center;
                margin-top:100px;
                p{
                    font-size:25px;
                    color:#B0B3B8;
                }
                .gapBox{
                    height: 30px;
                    background: #F6F6F6;
                    border-bottom: 1px solid #ccc;
                }
            }
        }
        .cartfooter{
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            .cart-pay {
                position: relative;
                height: 120px;
                background-color: #FFF;
                -webkit-backdrop-filter: blur(10px);
                backdrop-filter: blur(10px);
                box-shadow: 0 -1px 0 0 #bebec2;
               .sel-all{
                   .sel.on {
                        border-radius: 0;
                        width: 36px;
                        height: 36px;
                        border: none;
                    }
                    .sel {
                        position: absolute;
                        top: 42px;
                        left: 40px;
                        width: 34px;
                        height: 34px;
                        border-radius: 18px;
                        border: solid 1px #92969c;
                        background-color: #FFF;
                        overflow: hidden;
                    }
                    .iconfont {
                        font-family: iconfont!important;
                        font-size: 16px;
                        color: #000;
                        font-style: normal;
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                    }
                    .text {
                        position: absolute;
                        top: 42px;
                        left: 106px;
                    }
               } 
               .pay-go {
                    float: right;
                    width: 300px;
                    height: 120px;
                    background-color: #ff3939;
                    font-size: 36px;
                    color: #FFF;
                    text-align: center;
                    line-height: 120px;
                }
                .pay-content {
                    float: right;
                    height: 120px;
                    margin-right: 20px;
                    font-size: 24px;
                    color: #ff3939;
                    line-height: 120px;
                    span {
                        font-size: 32px;
                    }
                }
            }
        }
    }
</style>