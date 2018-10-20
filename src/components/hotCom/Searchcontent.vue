<template>
  <div class="searchBox">
    <div class="inputBox"> 
        <input type="text" :class="[change?'searchNow':'']" placeholder="请输入商品名、商家、商圈、分类" @click="ToSearch" >
        <i></i>
        <span class="cancel" v-show="change" @click="ToSearch">取消</span>
    </div>
    <div class="hotSearchBox" v-show="change">
      <h6>热门搜索</h6>
      <ul>
        <li v-for="item in hotSearchList " v-text="item.name" :key="item.name" :class="{'isRed':item.isRed}"></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
          change:false,
          searchText:'',
          hotSearchList:[{
            name:'附近美食',
            isRed:true
          },{
            name:'极尚迷鲤',
            isRed:false
          },{
            name:'小林除臭喷雾',
            isRed:true
          },{
            name:'自助',
            isRed:false
          },{
            name:'COSME',
            isRed:true
          },{
            name:'日料',
            isRed:false
          },{
            name:'发膜',
            isRed:true
          },{
            name:'粤点',
            isRed:false
          },{
            name:'放题',
            isRed:false
          },{
            name:'火锅',
            isRed:false
          },{
            name:'日本',
            isRed:false
          },{
            name:'西餐',
            isRed:false
          }
          ]
      }
    },

    components: {},

    computed: {},
    mounted() {},

    methods: {
      ToSearch(){
        this.change=!this.change;
      }
    },

    watch: {}

  }

</script>
<style lang='scss' scoped>
  .searchBox{
    position:fixed;
    top:0;
    left:0;
    z-index: 999;
    background:white;
    .inputBox{
      padding:0px 30px 15px 30px;
      position:relative;
      border-bottom: 1px solid #ccc;
        input{
          background:none; 
          outline: none;
          border:none;
          width: 689px;
          background-color:#F0F0F0;
          height: 52px;
          font-size:25px;
          padding-left:50px;
          border-radius:3px;
          box-sizing: border-box;
        }
        .searchNow{
          width: 600px;
        }
        span{
          display: inline-block;
          font-size:30px;
          position: absolute;
          right:30px;
          top:50px;
          padding:0px 20px;
        }
    }
    .hotSearchBox{
      padding:30px;
      height: 1059px;
      h6{
        font-size:30px;
        font-weight:800;
        margin-bottom: 20px;
      }
      ul{
        display: flex;
        flex-wrap:wrap;
        justify-content: space-between;
        li{
          text-align: center;
          width: 197px;
          height: 60px;
          font-size:25px;
          background-color: #F6F6F6;
          line-height: 60px;
          margin-bottom:30px;
        }
        .isRed{
          color:red;
          background-color: #FFF0F0;
        }
      }
    }
  }
</style>