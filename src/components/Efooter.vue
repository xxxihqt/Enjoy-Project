<template>
    <div id="bottom-bar" v-if="changeShow">
      <a v-for="(item,idx) in bar" :key="idx" :class="[item.iclass,{active:changePath==item.title}]" class="iconfont" @click="changeActive(idx)">
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
              title:''
            },{
              name:'分类',
              iclass:'icon-fenlei',
              title:'discovery'
            },{
              name:'杂志',
              iclass:'icon-zazhiqikan',
              title:'magazine'
            },{
              name:'购物车',
              iclass:'icon-iconset0308',
              title:'car'
            }
            ,{
              name:'我的',
              iclass:'icon-wode',
              title:'me'
            }],
        isactive:''
      };
    },

    components: {},

    computed: {
      changePath(){
        return  this.isactive=this.$route.path.slice(1);
      },
      changeShow(){
        return this.$store.getters.getShowFixed;
      }
    },

    mounted() {
      this.changeActive();
    },

    methods: {
      changeActive(idx){
        console.log(this.isactive);
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