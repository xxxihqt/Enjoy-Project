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
      HomeArr:'',
      HotArr:'',
      MagazineArr:'',
      CarRecommendArr:''
    }
  },
  components: {
    efooter
  },
  mounted(){
    this.getHomeData();
    this.getHotData();
    this.getMagezineData();
    this.getCarRecommendData();
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
       getMagezineData:function(){
         var self=this;
          $.ajax({
            type:'get',
            url:'http://localhost:9999/getmagazinemsg',
            async:true,
            success:function(data){
              console.log('data:',data);
              self.MagazineArr=data;
              self.$store.dispatch("setMagazineData",self.MagazineArr)
              localStorage.setItem("magazinedata",JSON.stringify(self.MagazineArr));
            }
          })
        },
      getCarRecommendData:function(){
         var self=this;
          $.ajax({
            type:'get',
            url:'http://localhost:9999/getcarrecommendmsg',
            async:true,
            success:function(data){
              self.CarRecommendArr=data;
              self.$store.dispatch("setCarRecommendData",self.CarRecommendArr)
              localStorage.setItem("carrecommenddata",JSON.stringify(self.CarRecommendArr));
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
