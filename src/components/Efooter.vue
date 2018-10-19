<template>
    <div id="bottom-bar">
      <a v-for="(item,idx) in bar" :key="idx" :class="[item.iclass,{active:isactive===idx}]" class="iconfont" @click="changeActive(idx)" ></a>
    </div>

</template>

<script>
import '../assets/icon/iconfont.css'
  export default {
    props:[''],
    data () {
      return {
        bar:[{
              name:'home',
              iclass:'icon-icon',
            },{
              name:'classify',
              iclass:'icon-fenlei',
            },{
              name:'magazine',
              iclass:'icon-zazhiqikan'
            },{
              name:'car',
              iclass:'icon-iconset0308'
            }
            ,{
              name:'me',
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
    a{
      flex:1;
      text-align:center;
      font-size:50px;
      font-weight:600;
      line-height:98px;
      color:gray;
    }
    .active{
      color:black;
    }
  }
</style>