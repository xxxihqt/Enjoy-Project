<template>
  <div>
    <eheader></eheader>
    <div  id="home">
        <selectedrecommend :typeOfselectedrecommend='allHomeProduct'></selectedrecommend>
        <newvip :typeOfnewvip='allHomeProduct'></newvip>
        <newstore :typeOfnewstore='allHomeProduct'></newstore>
        <keep-alive include="newproduct">
          <newproduct :typeOfnewproduct='allHomeProduct'></newproduct>
        </keep-alive>
        <hotsale :typeOfhotsale='allHomeProduct'></hotsale>
        <happytoplay :typeOfhappytoplay='allHomeProduct'></happytoplay>
        <expresstohome :typeOfexpresstohome='allHomeProduct'></expresstohome>
        <starproduct :typeOfstarproduct='allHomeProduct'></starproduct>
        <hotproduct :typeOfhotproduct='allHomeProduct'></hotproduct>
        <selectedsnacks :typeOfselectedsnacks='allHomeProduct'></selectedsnacks>
        <dreamstore :typeOfdreamstore='allHomeProduct'></dreamstore>
        <lasthome :typeOflasthome='allHomeProduct'></lasthome>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import eheader from "../components/Eheader";
import selectedrecommend from "../components/homeCom/Selected-recommend";
import newvip from "../components/homeCom/Newvip";
import newstore from "../components/homeCom/NewStore";
import newproduct from "../components/homeCom/Newproduct";
import hotsale from "../components/homeCom/HotSale";
import happytoplay from "../components/homeCom/Happytoplay";
import expresstohome from "../components/homeCom/Expresstohome";
import starproduct from "../components/homeCom/Starproduct";
import hotproduct from "../components/homeCom/Hotproduct";
import selectedsnacks from "../components/homeCom/Selectedsnacks";
import dreamstore from "../components/homeCom/Dreamstore";
import lasthome from "../components/homeCom/LastHome";

export default {
  name:'home',
  data() {
    return {
      allHomeProduct: ""
    };
  },
  components: {
    eheader,
    selectedrecommend,
    newvip,
    newstore,
    newproduct,
    hotsale,
    happytoplay,
    expresstohome,
    starproduct,
    hotproduct,
    selectedsnacks,
    dreamstore,
    lasthome
  },
  computed: {},
  created() {
    this.$store.dispatch("setShowFixed", true);
    this.init();
  },
  mounted() {},
  beforeRouteLeave(to, from, next) {
         // 设置下一个路由的 meta
        to.meta.keepAlive = true;  // 让 A 缓存，即不刷新
        next();
    },
  methods: {
    
    init() {
      let inithome = JSON.parse(sessionStorage.getItem("homedata"));
      if (inithome) {
        console.log('init')
        this.allHomeProduct = inithome;
      } else {
        console.log('get')
        this.getHomeData();
      }
    },
    getHomeData: function() {
      this.allHomeProduct = new Promise(resolve => {
        var self = this;
        $.ajax({
          type: "get",
          url: "http://10.3.135.51:9999/gethomemsg",
          async: true,
          success: function(data) {
            self.$store.dispatch("setHomeData", data);
            sessionStorage.setItem("homedata", JSON.stringify(data));
            resolve(data);
          }
        });
      });
    }
  },
  watch: {}
};
</script>
<style lang='scss' scoped>
#home {
  padding: 0px 0px 100px 0px;
  z-index: 1;
}
</style>