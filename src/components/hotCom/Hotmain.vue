<template>
  <div class="hotMain">
    <ul class="listBox">
        <li v-for="(item,idx) in hotData" :key="idx"  class="listName">
            <h5 v-text="item.name"></h5>
        </li>
    </ul>
    <div class="classifyBox">
        <ul class="categoryBox" v-for="(aItem,aIndex) in hotData" :key="aIndex">  
            <h6 v-text="aItem.category.group_section.title" class="listTitle"></h6>
            <div class="mainImgBox">
                <img :src="aItem.hots?aItem.hots.url:''" alt="">
                <div class="cover"></div>
                <p v-text="aItem.hots?aItem.hots.title:''">
                </p>
            </div>
            <li class="category" v-for="(bItem,bIndex) in aItem.category.tabs" :key="bIndex">
                <img :src="bItem.url" alt="" class="categoryImgs">
                <span v-text="bItem.title"></span>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>

  export default {
    name:'',
    props:[''],
    data () {
      return {
          hotData:''
      };
    },

    components: {},

    computed: {},

    mounted() {
        this.getHotData();
    },

    methods: {
        getHotData(){
            this.hotData=JSON.parse(localStorage.getItem('hotdata'));
            this.hotData=JSON.parse(this.hotData);
            console.log(this.hotData);
        }
    },

    watch: {}

  }

</script>
<style lang='scss' scoped>
    .hotMain{
        padding:116px 30px 0px 0px;
        position: relative;
        .listBox{
            background-color:#F6F6F6;
            height: 1235px;
            width: 197px;
            position:fixed;
            left:0;
            top:116px;
            .listName{
                font-size:40px;
                position: relative;
                width: 197px;
                height: 100px;
                line-height: 100px;
                text-align: center;
            }
        }
        .classifyBox{
            padding-top:140px;
            padding-bottom:300px;
            width: 523px;
            position: absolute;
            right:0;
            top:0;
            height: 1116px;
            overflow-y: auto;
            z-index: 0;
            .categoryBox{
                display: flex;
                flex-wrap: wrap;
                margin-bottom:30px;
                border-bottom:1px solid #ccc; 
                justify-content: flex-start;
                h6{
                    font-size:25px;
                    width: 523px;
                    margin: 30px 0px;
                }
                .mainImgBox{
                    position: relative;
                    img{
                        width: 490px;
                        height: 152px;
                    }
                    .cover{
                        height: 152px;
                        width: 490px;
                        position: absolute;
                        left:0;
                        background-color: rgba(26,26,26,0.8);
                        top:0;
                    }
                    p{
                        font-size:30px;
                        color:white;
                        font-weight:800;
                        position: absolute;
                        left:0;
                        width: 490px;
                        top:0;
                        line-height: 152px;
                        text-align: center;
                    }
                }
                .category{
                    width: 174px;
                    text-align: center;
                    margin-bottom:40px;
                    .categoryImgs{
                        width:140px;
                    }
                    span{
                        display: block;
                        font-size:25px;
                        color:#aaa;
                    }
                }
            }
        }
    }
</style>