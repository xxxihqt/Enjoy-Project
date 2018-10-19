<template>
  <div id="app">
    <router-view></router-view>
    <efooter></efooter>
  </div>
</template>

<script>

import efooter from './components/Efooter'

export default {
  name: 'app',
  data(){
    return{
      HomeArr:''
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
              self.HomeArr=JSON.parse(data);
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
              self.HomeArr=JSON.parse(data);
              self.$store.dispatch("setHomeData",self.HomeArr)
              localStorage.setItem("hotdata",JSON.stringify(self.HomeArr));
            }
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
</style>
