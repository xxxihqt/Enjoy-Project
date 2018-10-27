<template>
  <div>
    <div class="newStore">
        <p class="title">
            <a v-text="enjoy_url_text"></a>
            {{title}}
        </p> 
        <p class="sub-title" v-text="desc"></p> 
        <div class="imgBox">
            <div v-for="(item,idx) in tabs" :key="idx"> 
                <img :src="item.url" alt="">
                <div class="cover"></div>
                <p v-text="item.title"></p>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

  export default {
    props:['typeOfnewstore'],
    data () {
      return{
          storeList:'',
          title:'',
          desc:'',
          enjoy_url_text:'',
          tabs:''
      }
    },

    components: {},

    computed: {},

    mounted() {
      this.renderNewStore();
    },
    methods: {
         renderNewStore(){
            this.storeList=this.typeOfnewstore.data;
            this.title=this.storeList.group_section.title;
            this.desc=this.storeList.group_section.desc;
            this.enjoy_url_text=this.storeList.group_section.enjoy_url_text;
            this.tabs=this.storeList.tabs;
        }
    },

    watch: {}

  }

</script>
<style lang='scss' scoped>
    .newStore{
        padding: 20px 40px;
        .title {
            font-size: 0.56rem;
            font-weight: 600;
            color: #191919;
            margin-bottom: 8px;
            position:relative;
            a{
                display: inline-block;
                position: absolute;
                right:0;
                bottom: 0;
                color:red;
                font-size:25px;
                font-weight: 200;
            }
        }
        .sub-title {
            font-size: 22px;
            color: #9b9b9b;
        }
        .imgBox{
            margin-top:20px;
            position: relative;
            height:259px;
            border-bottom:1px solid #ccc;
            div{
                position: relative;
                position: absolute;
                left:0;
                top:0;
                img{
                    width: 100%;
                    height: 219px;
                }
                .cover{
                    width: 100%;
                    height: 219px;
                    background-color: rgba(26,26,26,0.8);
                    position: absolute;
                    left:0;
                    top:0;
                }
                P{
                    font-size:35px;
                    font-weight:900;
                    position: absolute;
                    left:0;
                    top:0;
                    height: 219px;
                    line-height: 219px;
                    color:white;
                    text-align: center;
                    width: 100%;
                }
            }
            
        }
    }
</style>