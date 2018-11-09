<template>
  <div>
    <detailheader></detailheader>
    <div class="main-content">
        <detailbasic></detailbasic>
        <detailmodulesone></detailmodulesone>
        <detailmenu></detailmenu>
        <usercomment></usercomment>
        <productdesc></productdesc>
        <heightlight></heightlight>
        <detailtips></detailtips>
        <detailcombo></detailcombo>
    </div>
      <littlecar></littlecar>
  </div>
</template>

<script>
    import detailheader from '../components/detailCom/Detailheader'
    import detailmodulesone from '../components/detailCom/Detailmodules'
    import detailbasic from '../components/detailCom/Detailbasic'
    import detailmenu from '../components/detailCom/Detailmenu'
    import detailtips from '../components/detailCom/Detailtips'
    import detailcombo from '../components/detailCom/Detailcombo'
    import littlecar from '../components/detailCom/Littlecar'
    import usercomment from '../components/detailCom/Usercomment'
    import productdesc from '../components/detailCom/Productdesc'
    import heightlight from '../components/detailCom/Heightlight'

  export default {
    inject:['reload'],
    name:'detail',
    data () {
      return {
      };
    },

    components: {
      detailheader,
        detailbasic,
        detailmodulesone,
        detailmenu,
        usercomment,
        productdesc,
        heightlight,
        detailtips,
        detailcombo,
        littlecar
    },

    computed: {
    },
    created(){
              this.$store.dispatch('setShowFixed',false);          
    },
    beforeMount(){
       $(window).scrollTop(0);
    },
    mounted() {

    },
    methods: {
    },

    watch: {
       $route(_new,_old){
           if(_new){
             console.log(_new);
              this.reload();
           }
       }
    }
  }

</script>
<style lang='scss' scoped>
    
</style>