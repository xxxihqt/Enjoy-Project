<template>
  <div>
    <eheader></eheader>
    <div  id="home">
        <selectedrecommend :typeOfselectedrecommend='allHomeProduct[0]'></selectedrecommend>
        <newvip :typeOfnewvip='allHomeProduct'></newvip>
        <newstore :typeOfnewstore='allHomeProduct[5]'></newstore>
        <keep-alive include="newproduct">
          <newproduct :typeOfnewproduct='allHomeProduct[6]'></newproduct>
        </keep-alive>
        <hotsale :typeOfhotsale='allHomeProduct[7]'></hotsale>
        <mealhere :typeOfmealhere='allHomeProduct[8]'></mealhere>
        <happytoplay :typeOfhappytoplay='allHomeProduct[9]'></happytoplay>
        <expresstohome :typeOfexpresstohome='allHomeProduct'></expresstohome>
        <starproduct :typeOfstarproduct='allHomeProduct[12]'></starproduct>
        <hotproduct :typeOfhotproduct='allHomeProduct[13]'></hotproduct>
        <selectedsnacks :typeOfselectedsnacks='allHomeProduct[14]'></selectedsnacks>
        <dreamstore :typeOfdreamstore='allHomeProduct[15]'></dreamstore>
        <lasthome :typeOflasthome='allHomeProduct'></lasthome>
    </div>
  </div>
</template>

<script>

import $ from 'jquery'
import eheader from '../components/Eheader'
import selectedrecommend from '../components/homeCom/Selected-recommend'
import newvip from '../components/homeCom/Newvip'
import newstore from '../components/homeCom/NewStore'
import newproduct from '../components/homeCom/Newproduct'
import hotsale from '../components/homeCom/HotSale'
import mealhere from '../components/homeCom/Mealhere'
import happytoplay from '../components/homeCom/Happytoplay'
import expresstohome from '../components/homeCom/Expresstohome'
import starproduct from '../components/homeCom/Starproduct'
import hotproduct from '../components/homeCom/Hotproduct'
import selectedsnacks from '../components/homeCom/Selectedsnacks'
import dreamstore from '../components/homeCom/Dreamstore'
import lasthome from '../components/homeCom/LastHome'


  export default {
    data () {
      return {
          allHomeProduct:''
      };
    },
    components: {
      eheader,
      selectedrecommend,
      newvip,
      newstore,
      newproduct,
      hotsale,
      mealhere,
      happytoplay,
      expresstohome,
      starproduct,
      hotproduct,
      selectedsnacks,
      dreamstore,
      lasthome
    },
    computed: {
      
    },
    created:function(){
      this.AllContent();
    },
    methods: {
      AllContent(){
        this.allHomeProduct=JSON.parse(localStorage.getItem("homedata"));
        this.allHomeProduct=JSON.parse(this.allHomeProduct);
      }
    },
    watch:{}
  }
</script>
<style lang='scss' scoped>
  #home{
    padding:0px 0px 100px 0px;
    z-index:1;
  }
</style>