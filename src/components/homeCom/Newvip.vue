<template>
  <div>
      <div class="newvip">
        <p class="title" v-text="title"></p> 
        <div class="imgContainer">
            <img :src="item.url" alt="" v-for="(item,idx) in imgArr" :key="idx">
        </div>
        <p v-text="littleTittle" class="littleTittle"></p>
        <ul class="classifyArr">
          <li v-for="(item,idx) in classifyArr" :key="idx" >
            <img :src="item.url" alt="">
            <span v-text="item.title"></span>
          </li>
        </ul>
        <div class="news" >
          <img :src="newsImg" alt="">
            <ul>
              <li v-for="(item,idx) in newslists.tabs" :key="idx" v-show="idx===showlist">
                <p >
                  <span v-text="item.tag"></span>
                  {{item.title}}
                </p>
              </li>
            </ul>
        </div>
        <div class="product">
            <ul>
              <li v-for="(item,idx) in productMsg" :key="idx">
                <h6 v-text="item.title"></h6>
                <p v-text="item.desc"></p>
                <img :src="item.url" alt="">
              </li>
            </ul>
        </div>
      </div>
  </div>
</template>

<script>

  export default {
    props:['typeOfnewvip'],
    data () {
      return {
        newvipContent:[],
        title:'',
        imgArr:[],
        littleContent:'',
        littleTittle:'',
        classifyArr:[],
        newslists:'',
        newsImg:'',
        productMsg:'',
        showlist:0
      };
    },
    components: {
    },

    computed: {
      
    },
    mounted() {
      this.renderNewVipContent();
    },
    methods: {
      renderNewVipContent(){
        this.newvipContent=this.typeOfnewvip[1];
        this.title=this.newvipContent.data.group_section.title;
        this.imgArr=this.newvipContent.data.tabs;

        this.littleContent=this.typeOfnewvip[2];
        this.littleTittle=this.littleContent.data.group_section.title;
        this.classifyArr=this.littleContent.data.tabs;

        this.newslists=this.typeOfnewvip[3].data;
        this.newsImg=this.newslists.group_section.url;

        this.productMsg=this.typeOfnewvip[4].data.tabs;
      }
    }

  }

</script>
<style lang='scss' scoped>
  .newvip{
    padding: 40px;
    .title {
      font-size: 0.56rem;
      font-weight: 600;
      color: #191919;
    } 
    .imgContainer{
      margin-top:30px;
      img{
        width: 325px;
      }
      img:last-child{
        float:right;
      }
    }
    .littleTittle{
      font-size:26px;
      text-align: center;
      color:#B1B1B1;
      margin-top:30px;
      margin-bottom:20px;
    }
    .classifyArr{
      display: flex;
      border-bottom: 1px solid #ccc;
      padding-bottom:30px;
      li{
        flex:1;
        list-style: none;
        font-size:24px;
        text-align: center;
        img{
          width:100px;
        }
        span{
          display: block;
        }
      }
    }
    .news{
      height:95px;
      border-bottom: 1px solid #ccc;
      position: relative;
      img{
        width: 60px;
      }
      ul{
        position: absolute;
        left:100px;
        top:0px;
        width: 480px;
        li{
          font-size:24px;
          list-style: none;
          p{
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            height: 60px;
            line-height: 60px;
            span{
              color:red;
              border:1px solid red;
              padding:3px;
              border-radius:5px;
              margin-right:10px;
              display: inline-block;
              line-height: 40px;
            }
          }
        }
      }
    }
    .product{
      ul{
        display: flex;
        border-bottom:1px solid #ccc;
        li{
          flex:1;
          padding-top:20px;
          h6{
            font-size:25px;
            font-weight:700;
          }
          p{
            font-size:20px;
            color:#AFB2B6;
            margin:10px 0px;
          }
          img{
            width:200px;
          }
        }
        li:last-child{
          img{
            width: 150px;
          }
        }
      }
    }
}
</style>