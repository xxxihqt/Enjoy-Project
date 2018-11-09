<template>
  <div id="car">
    <carmain></carmain>
    <carrecommend></carrecommend>
  </div>
</template>

<script>
  import carmain from '../components/carCom/Carmain'
  import carrecommend from '../components/carCom/Carrecommend'

  export default {
    name:'car',
    data () {
      return {
        user_product:''
      };
    },

    components: {
      carmain,
      carrecommend
    },

    computed: {},
    beforeRouteEnter(to, from, next) {
      next(vm=>{
        //vm.render(); 
      })
    },
    created(){
        this.$store.dispatch('setShowFixed',true);
    },
    beforeMount() {
    },
    mounted() {
    },
    methods: {
    },
    watch: {}

  }

</script>
<style lang='scss' scoped>
  #car{
    height: 1235px;
    overflow-y: scroll;

  }
</style>