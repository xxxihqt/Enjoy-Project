<template>
  <div>
    <eheader></eheader>
    <div  id="home">
        <selectedrecommend></selectedrecommend>
        <newvip></newvip>
        <newstore></newstore>
        <newproduct></newproduct>
        <hotsale></hotsale>
        <mealhere></mealhere>
        <happytoplay></happytoplay>
        <expresstohome></expresstohome>
        <starproduct></starproduct>
        <hotproduct></hotproduct>
        <selectedsnacks></selectedsnacks>
        <dreamstore></dreamstore>
        <lasthome></lasthome>
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
    props:[''],
    data () {
      return {
          name:'home',
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
    mounted:function(){
    },
    methods: {
      
    },
    watch:{}
  }
</script>
<style lang='scss' scoped>
  #home{
    padding:0px 0px 100px 0px;
    height:100%;
    overflow-y:scroll;
  }
</style>