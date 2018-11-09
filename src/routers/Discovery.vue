<template>
  <div id="discovery">
    <searchcontent v-on:showHot="showHot"></searchcontent>
    <hotmian :hotArr="HotArr"  v-if="childValue"></hotmian>
    <searchresult></searchresult>
  </div>
</template>

<script>
import searchcontent from "../components/hotCom/Searchcontent";
import hotmian from "../components/hotCom/Hotmain";
import searchresult from '../components/hotCom/Searchresult.vue';

export default {
  name:'discovery',
  data() {
    return {
      name: "classify",
      HotArr: "",
      childValue:true
    };
  },

  components: {
    searchcontent,
    hotmian,
    searchresult
  },

  computed: {
    
  },

  created() {
    this.init();
  },

  mounted() {
  },
  beforeRouteLeave(to, from, next) {
         // 设置下一个路由的 meta
        to.meta.keepAlive = true;  // 让 A 缓存，即不刷新
        next();
    },
  methods: {
    showHot(showHot){
      this.childValue=!showHot;
      console.log(this.childValue);
    },
    init() {
      let inithot = JSON.parse(sessionStorage.getItem("hotdata"));

      if (inithot) {
        console.log("init");
        this.HotArr = inithot;
      } else {
        console.log("get");

        this.getHotData();
      }
    },
    getHotData: function() {
      this.HotArr = new Promise(resolve => {
        var self = this;
        $.ajax({
          type: "get",
          url: "http://10.3.135.51:9999/gethotmsg",
          async: true,
          success: function(data) {
            self.$store.dispatch("setHotData", data);
            sessionStorage.setItem("hotdata", data);  
            resolve(data);
          }
        });
      });
    }
  },

  watch: {
    
  }
};
</script>
<style lang='scss' scoped>
#discovery {
  height: 1235px;
  overflow: hidden;
}
</style>