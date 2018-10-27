<template>
  <div>
    <detailbasic></detailbasic>
    <detailmodulesone></detailmodulesone>
    <detailmenu></detailmenu>
    <usercomment></usercomment>
    <productdesc></productdesc>
    <heightlight></heightlight>
    <detailtips></detailtips>
    <detailcombo></detailcombo>
    <littlecar></littlecar>
  </div>
</template>

<script>
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
    data () {
      return {
      };
    },

    components: {
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
            
        $(window).scrollTop(0);

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
              this.reload();
           }
       }
    }
  }

</script>
<style lang='scss' scoped>
    
</style>