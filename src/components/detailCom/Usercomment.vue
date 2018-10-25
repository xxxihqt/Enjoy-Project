<template>
  <div class="usercommentBox" v-if="isShow">
        <div class="littleBox">
            <h4>用户评价
                <span>查看全部</span>
            </h4>
            <h6 class="userMsg">
                <img :src="data.avatar" alt="">
                <span v-text="data.nick_name"></span>
            </h6>
            <p class="scores">
                <span v-for="(item,idx) in data.scores" :key="idx" v-text="item.name+'  '+item.score"></span>
            </p>
            <p class="tags" v-if="data.tags[0]?true:false">
                <span v-for="(item,idx) in data.tags" :key="idx" v-text="item.name"></span>
            </p>
            <p class="text" v-text="data.text"></p>
            <ul class="imgs" v-if="data.images[0]?true:false">
                <li v-for="(item,idx) in data.images" :key="idx">
                    <img :src="item" alt="">
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
          data:'',
          isShow:false
      };
    },

    components: {},

    computed: {},

    created() {
      this.render();
    },

    mounted() {},

    methods: {
        render(){
            var newArr=JSON.parse(sessionStorage.getItem("detailproduct"));    
            newArr=newArr.modules;
            for(let i=0;i<newArr.length;i++){
                if(newArr[i].data.scores){
                    this.data=newArr[i].data;
                    this.isShow=true;
                    break;
                }
            }
        }
    },
    watch: {}

  }

</script>
<style lang='scss' scoped>
    .usercommentBox{
        padding:20px 30px;
        .littleBox{
            padding-bottom:50px;
            border-bottom: 1px solid #ccc;
            h4{
                border-top:1px solid #ccc;
                font-size:30px;
                height: 100px;
                line-height: 100px;
                span{
                    color:red;
                    float:right;
                    font-weight: 200;
                }
            }
            .userMsg{
                img{
                    width: 70px;
                    border-radius: 50%;
                    vertical-align: middle;
                }
                span{
                    font-size:24px;
                    display: inline-block;
                    line-height: 70px;
                    vertical-align: middle;
                    margin-left:30px;
                }
            }
            .scores{
                line-height: 44px;
                span{
                    font-size:14px;
                    color:#aaa;
                    padding:0px 8px;
                }
                span:nth-child(2){
                    border-left:1px solid #aaa;
                    border-right:1px solid #aaa;
                }
            }
            .tags{
               line-height: 44px;
               height: 80px;
                span{
                    font-size:24px;
                    color:#aaa;
                    background: #eee;
                    padding:10px;
                    margin-right:20px;
                }
            }
            .text{
                font-size:26px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: box;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                line-height: 36px;
                margin-top:20px;
            }
            .imgs{
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                height: 220px;
                overflow: hidden;
                margin-top:30px;
                li{
                    width: 220px;
                    img{
                        width: 220px;
                        height: 220px;
                    }
                }
            }
        }
    }
</style>