<template>
  <div class="lastHomeContainer">
    <div class="invitImg">
        <a href="">
            <img :src="invitImg" alt="">
        </a>
    </div>
    <div class="specialColumnist">
        <p class="title" v-text="title"></p> 
        <a href="" v-for="(item,idx) in tabs" :key="idx" class="link">
            {{item.title}}
            <span>▶</span>
        </a>
        <div class="logo">
            <img :src="logoUrl" alt="" >
        </div>
    </div>
  </div>
</template>

<script>

  export default {
    data () {
      return {
          invitImg:'',
          storeList:'',
          title:'',
          tabs:'',
          logoUrl:require('../..//imgs/logo3.png')
      };
    },

    components: {},

    computed: {},
    mounted() {
        this.renderNewProduct();
    },

    methods: {
        renderNewProduct(){
            this.invitImg=JSON.parse(localStorage.getItem("homedata"))[16].data.group_section.url;
            this.storeList=JSON.parse(localStorage.getItem("homedata"))[17].data;
            this.title=this.storeList.group_section.title;
            this.tabs=this.storeList.tabs;
            /*console.log(this.storeList);*/
        }
    },

    watch: {}

  }

</script>
<style lang='scss' scoped>
    .lastHomeContainer{
        padding:0px 40px;
        .invitImg{
            img{
                width: 670px;
            }
        }
        .specialColumnist{
            position: relative;
            .title {
                font-size: 0.56rem;
                font-weight: 600;
                color: #191919;
                margin-bottom: 20px;
            }
            .link{
                font-size:26px;
                border-bottom: 1px solid #ccc;
                border-top: 1px solid #ccc;
                display: block;
                color:#525151;
                height: 86px;
                line-height: 86px;
                span{
                    float:right;
                    color:black;
                }
            }
            .logo{
                text-align:center;
                img{
                    width:100px;
                }       
            }
        }
    }
    
</style>