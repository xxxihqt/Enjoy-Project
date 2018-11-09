<template>
    <div class="CarBox">
        <div class="car-header">
            <h4 >购物车 <span class="edit"  v-if="!isgoods" v-text="edit?'编辑':'完成'" @click="changeEdit"></span></h4>
        </div>
        <div class="goodsBox">
            <div class="car-group">
                <ul class="car-list">
                    <li class="clearfix" v-for="(item,idx) in userProduct" :key="idx"> 
                        <mt-cell-swipe class="moveBox" @click="deleteProduct(item)" :right="[
                                {
                                    content: '移出购物车',
                                    style: { background: '#ff3939', color: '#fff',fontSize:'30px',height:'204px',lineHeight:'200px'},
                                    handler: () => deleteSingleProduct(item)
                                }]">

                            <div class="basicBox">
                                <div class="sel-wrapper clearfix">
                                    <span class="sel  iconfont" :class="{'icon-gouxuan':item.ischecked}" @click="selectSingle(item)"></span>
                                </div> 
                                <div class="desc clearfix">
                                    <div class="image">
                                        <a @click="Todetial(item.basic.product_id,item.basic.sub_product_id?item.basic.sub_product_id:item.basic.id)">
                                            <img :src="item.basic.product_images[0].img_url">
                                        </a>
                                    </div> 
                                    <div class="info">
                                        <p class="title" v-text="item.basic.name" @click="Todetial(item.basic.product_id,item.basic.sub_product_id?item.basic.sub_product_id:item.basic.id)"></p>
                                        <p class="cate" v-text="'类型：'+item.basic.spec"></p> 
                                        <p class="price">{{item.basic.price | capitalize}}</p> 
                                        <div class="opt">
                                            <div class="operate">
                                                <a class="subtract" :class="{'disable':!edit}" @click="edit?editQty(item,false):''">-</a> 
                                                <span class="num" v-text="item.qty"></span> 
                                                <a class="plus" :class="{'disable':!edit}" @click="edit?editQty(item,true):''">+</a>
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </mt-cell-swipe>
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
                    <span class="sel iconfont" :class="{'icon-gouxuan':isSelectAll}" @click="selectAll"></span> 
                    <span class="text" >全选</span>
                </a> 
                <a class="pay-go" v-text="edit?'去结算':'删除'" @click="edit?goToPay():deleteSelectProduct()"></a> 
                <div class="pay-content" v-if="edit">合计：<span>{{totalPrice | capitalizeTotal}}</span> 元
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name:'',
    props:['data'],
    data () {
      return {
          isgoods:false,
          edit:true,
          userProduct:[],
          delProduct:[],
          isSelectAll:false,
          totalPrice:0,
          isNull:true
      };
    },
    filters: {
        capitalize: function(price) {
            price = price.toString();
            var a = price.slice(-2);
            var b = price.slice(0, -2);
            return '单价：'+b + "." + a +'元';
        },
        capitalizeTotal(total){
            if(total==0){
                return 0
            }else{
                total = total.toString();
                var a = total.slice(-2);
                var b = total.slice(0, -2);
                return b+'.'+a;
            }
        }
    },
    created(){
        //this.$store.dispatch('setShowFixed',false);
        this.init();
    },
    mounted() {   
    },
    methods: { 
        init() {
            let username = sessionStorage.getItem("name");
            if (username) {
                console.log('init')
                this.render();
            } else {
                console.log('get')
                this.isgoods=true;
                this.$store.dispatch('setShowFixed',true); 
            }
        },
        render(){
            this.username=sessionStorage.getItem('name');
            var self=this;
            $.ajax({
                type:'get',
                url:'http://10.3.135.51:9999/shoppingcar',
                data:{
                    username:self.username
                },
                async:true,
                success:function(data){
                   if(data.user_product.length>0){
                    console.log('have');
                        self.isgoods=false;
                        self.isNull=false;
                        self.userProduct=data.user_product;
                        console.log('render',data);
                        sessionStorage.setItem('user_product',JSON.stringify(data.user_product));
                        self.$store.dispatch('setUserData',data.user_product);
                   }else{
                        self.isNull=false;
                        self.isgoods=true;
                       console.log('removeItem');
                       sessionStorage.removeItem('user_product');
                   }
                   
                }
            })
        },
        changeEdit(){
            this.edit=!this.edit;
        },
        //增减商品
        editQty(item,flag){
            if(flag===true){
                item.qty++;
            }else{
                item.qty--;
                if(item.qty<=1){
                    item.qty=1;
                }
            }
            this.$set(item,'ischecked',true);
            this.countTotal();
            var self=this;
            //发送请求
            $.ajax({
                type:'get',
                url:'http://10.3.135.51:9999/shoppingcar',
                data:{
                    username:sessionStorage.getItem('name'),
                    productId:item.unique_id,
                    qty:item.qty
                },
                async:true,
                success:function(data){
                    console.log('edit-qty',data[0]);
                    sessionStorage.setItem('user_product',JSON.stringify(data[0].user_product));
                    self.$store.dispatch('setUserData',data[0].user_product);
                }
            })
        },
        //全选
        selectAll(){
            this.isSelectAll=!this.isSelectAll;
            this.userProduct.forEach((element,idx) => {
                 this.$set(element,'ischecked',this.isSelectAll);
            });
            this.countTotal();
        },
        //单个商品选择
        selectSingle(item){
            
            if(item.ischecked===undefined){
                this.$set(item,'ischecked',true);
            }else{
                item.ischecked=!item.ischecked;
            }
            this.selectAllSingle();
        },
        //判断是否选中所有商品
        selectAllSingle(){
            let flag=true;
            this.userProduct.forEach((element,idx) => {
                 if(!element.ischecked){
                     flag=element.ischecked;
                 }
            });
            this.isSelectAll=flag;
            this.countTotal();
        },
        //计算商品总价
        countTotal(){
            var total=0;
            this.userProduct.forEach(element => {
                if(element.ischecked){
                    total+=element.basic.price*element.qty;
                }
            });
            this.totalPrice=total;
        },
        //删除商品
        deleteSingleProduct(item){
            let index = this.userProduct.indexOf(item);
            this.userProduct.splice(index, 1);   
            this.countTotal();
            var self=this;
            $.ajax({
                type:'get',
                url:'http://10.3.135.51:9999/shoppingcar',
                data:{
                    username:sessionStorage.getItem('name'),
                    productId:item.unique_id,
                    type:'del'
                },
                async:true,
                success:function(data){
                    console.log(self.userProduct);
                   // self.$store.dispatch('setShowFixed',true);  
                   if(self.userProduct.length>0){
                       // self.userProduct=data.user_product;
                        //sessionStorage.setItem('user_product',JSON.stringify(data.user_product));
                       // self.$store.dispatch('setUserData',data.user_product);
                        self.render();
                   }else{
                       sessionStorage.removeItem('user_product');
                   }
                   
                }
            })
        },
        //删除选中商品
        deleteSelectProduct(){
            this.delProduct = this.userProduct.filter(item=>{ return item.ischecked });
            this.userProduct = this.userProduct.filter(item=>{ return !item.ischecked });
            console.log('this.delProduct',this.delProduct);

            let unique_id_Arr=this.delProduct.map(item=>{
                return item.unique_id
            })
            console.log('unique_id_Arr',unique_id_Arr);
            this.$http.get("http://10.3.135.51:9999/shoppingcar", {
            params: {
                username:sessionStorage.getItem('name'),
                productId:unique_id_Arr,
                type:'delMore'
            }
            })
          .then(response => {
              console.log(response);
          })
          .catch(error => {});

            if(this.isSelectAll){
                this.userProduct=[];
            }
            this.countTotal();
        },
        //去结算
        goToPay(){
            console.log('去结算');
        },
        Todetial(product_id,id){
            var self=this;
            $.ajax({
                type:'get',
                url:'http://10.3.135.51:9999/detail',
                data:{
                    product_id:product_id,
                    sub_product_id:id
                },
                async:true,
                success:function(data){
                    sessionStorage.setItem("detailproduct",JSON.stringify(data));
                    self.$router.push({ name: 'detail', query: { product_id: product_id,sub_product_id:id }});                  
                }
            })
        }
    },
    watch: {
        userProduct:{
            handler(curVal,oldVal){
                if(curVal.length===0){
                    this.isgoods=true;
                }else{
                    this.isgoods=false;
                }
            }
        }
    }
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
                        position: relative;
                        width: 750px;
                        overflow: hidden;
                        .moveBox{                         
                            .basicBox{
                                float:left;
                                width: 750px;
                                .sel-wrapper {
                                    float: left;
                                    .sel {
                                        border-radius: 100%;
                                        width: 30px;
                                        height: 30px;
                                        border:1px solid #aaa;
                                        float: left;
                                        margin: 92px 36px;
                                        background-color: #FFF;
                                        overflow: hidden;
                                    }
                                    .icon-gouxuan {
                                        font-family: iconfont!important;
                                        font-size: 30px;
                                        color:red;
                                        font-style: normal;
                                        -webkit-font-smoothing: antialiased;
                                        -moz-osx-font-smoothing: grayscale;
                                        border:none;
                                    }
                                }
                                .desc {
                                    margin: 0 40px 0 106px;
                                    padding: 30px 0;
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
                                                    font-weight: 550;
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
                                                    font-weight: 550;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        .panel-gap{
                            position: absolute;
                            bottom:0px;
                            height: 12px;
                            background: #eee;
                            border-top:1px solid #ccc;
                            border-bottom:1px solid #ccc;
                            width: 100%;
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
                    padding-bottom:50px;
                }
                .gapBox{
                    height: 15px;
                    background: #F6F6F6;
                    border-top: 1px solid #ccc;
                }
            }
        }
        .cartfooter{
            border-top:1px solid #aaa;
            background: #fff;
            position: fixed;
            left: 0;
            bottom: 98px;
            width: 100%;
            z-index:6666;
            .cart-pay {
                position: relative;
                height: 100px;
                background-color: #FFF;
                -webkit-backdrop-filter: blur(10px);
                backdrop-filter: blur(10px);
                box-shadow: 0 -1px 0 0 #bebec2;
               .sel-all{
                   .sel{
                        border-radius: 0;
                        width: 30px;
                        height: 30px;
                        position: absolute;
                        top: 35px;
                        left: 40px;
                        border-radius: 100%;
                        border: solid 1px #ccc;
                        background-color: #FFF;
                        overflow: hidden;
                    }
                    .icon-gouxuan {
                        font-family: iconfont!important;
                        font-size: 30px;
                        color: #ff3939;
                        border:none;
                        font-style: normal;
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                    }
                    .text {
                        position: absolute;
                        top: 32px;
                        left: 106px;
                        font-size:30px;
                    }
               } 
               .pay-go {
                    position: absolute;
                    right:30px;
                    width: 180px;
                    height: 70px;
                    background-color: #ff3939;
                    font-size: 36px;
                    color: #FFF;
                    text-align: center;
                    border-radius: 20px;
                    line-height: 70px;
                    font-size:30px;
                    top:16px;
                }
                .pay-content {
                    position: absolute;
                    right:230px;
                    height: 100px;
                    top:0px;
                    font-size: 24px;
                    color: #ff3939;
                    line-height: 100px;
                    span {
                        font-size: 32px;
                        font-weight: 900;
                    }
                }
            }
        }
    }
</style>