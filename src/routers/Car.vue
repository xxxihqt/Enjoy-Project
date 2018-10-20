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
    props:[''],
    data () {
      return {
        name:'car'
      };
    },

    components: {
      carmain,
      carrecommend
    },

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style lang='scss' scoped>
  #car{
    height: 1235px;
    overflow-y: scroll;

  }
</style>