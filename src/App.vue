<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
    <efooter></efooter>
  </div>
</template>

<script>

import efooter from './components/Efooter'

export default {
  name: 'app',
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return{
      HomeArr:'',
      HotArr:'',
      isRouterAlive:true
    }
  },
  components: {
    efooter
  },
  mounted(){
    this.getHomeData();
    this.getHotData();
  },
  methods:{
      getHomeData:function(){
          var self=this;
          $.ajax({
            type:'get',
            url:'http://localhost:9999/gethomemsg',
            async:true,
            success:function(data){
              self.HomeArr=data;
              self.$store.dispatch("setHomeData",self.HomeArr)
              localStorage.setItem("homedata",JSON.stringify(self.HomeArr));
            }
          })
      },
      getHotData:function(){
         var self=this;
          $.ajax({
            type:'get',
            url:'http://localhost:9999/gethotmsg',
            async:true,
            success:function(data){
              self.HotArr=data;
              self.$store.dispatch("setHotData",self.HotArr)
              localStorage.setItem("hotdata",JSON.stringify(self.HotArr));
            }
          })
      },
      reload:function(){
        this.isRouterAlive=false;
        this.$nextTick(function(){
          this.isRouterAlive=true;
        })
      }
  }
}
</script>

<style>
  *{
    margin:0;
    padding:0;
  }
  a {
    text-decoration: none;
  }
  ul,li{
    list-style:none;
  }
  #app{
    overflow: hidden;
  }
</style>
