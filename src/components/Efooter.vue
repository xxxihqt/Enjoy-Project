<template>
    <div id="bottom-bar" v-if="changeShow">
      <span v-for="(item,idx) in bar" :key="idx" :class="[item.iclass,{active:changePath==item.title}]" class="iconfont" @click="changeActive(idx)">
        <span v-text="item.name"></span>
      </span>
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
        return  this.$route.path.slice(1);
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
        //console.log(this.isactive);
        switch (idx) {
          case 0:
            this.$router.push({name: "home"});
            break;
          case 1:
            this.$router.push({name: "discovery"});
            break;
          case 2:
            this.$router.push({name: "magazine"});
            break;
          case 3:
            this.$router.push({name: "car"});
            break;
          case 4:
            if (sessionStorage.getItem("name") && sessionStorage.getItem("_id")) {
              this.$router.push({ name: "me" });
            } else {
              this.$router.push({ name: "login" });
            }
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
    border-top: 1px solid #aaa;
    z-index:10000;
    background: #fff;
    span{
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