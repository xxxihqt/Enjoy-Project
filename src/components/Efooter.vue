<template>
    <div id="bottom-bar">
      <a v-for="(item,idx) in bar" :key="idx" :class="[item.iclass,{active:isactive===idx}]" class="iconfont" @click="changeActive(idx)" >
        <span v-text="item.name"></span>
      </a>
    </div>

</template>

<script>
import '../assets/icon/iconfont.css'
  export default {
    props:[''],
    data () {
      return {
        bar:[{
              name:'精选',
              iclass:'icon-icon',
            },{
              name:'分类',
              iclass:'icon-fenlei',
            },{
              name:'杂志',
              iclass:'icon-zazhiqikan'
            },{
              name:'购物车',
              iclass:'icon-iconset0308'
            }
            ,{
              name:'我的',
              iclass:'icon-wode'
            }],
        isactive:0
      };
    },

    components: {},

    computed: {},

    mounted() {},

    methods: {
      changeActive(idx){
        this.isactive=idx;
        switch (idx) {
          case 0:
            location.href="#/";
            break;
          case 1:
            location.href="#/discovery"
            break;
          case 2:
            location.href="#/magazine"
            break;
          case 3:
            location.href="#/car"
            break;
          case 4:
            location.href="#/me"
            break;
        }
      }
    },

    watch: {}

  }

</script>
<style lang='scss' scoped>
  #bottom-bar {
    position: fixed;
    bottom:0;
    display: -ms-flexbox;
    display: flex;
    width: 750px;
    height: 98px;
    border-top: 1px solid #e0e0e0;
    z-index:10000;
    a{
      flex:1;
      text-align:center;
      font-size:40px;
      font-weight:600;
      line-height:98px;
      color:gray;
      display: block;
      position: relative;
      span{
        font-size:20px;
        font-weight:200;
        display: block;
        position:absolute;
        left:0;
        right: 0;
        top:35px;
      }
    }
    .active{
      color:black;
    }
  }
</style>