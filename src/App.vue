<template>
  <div id="app">
         <router-view v-if="isRouterAlive">
      </router-view>
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
      isRouterAlive:true
    }
  },
  components: {
    efooter
  },
  beforeMount () {

  },
  mounted(){
  },
  methods:{
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
