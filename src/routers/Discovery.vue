<template>
  <div id="discovery">
    <searchcontent></searchcontent>
    <hotmian></hotmian>
  </div>
</template>

<script>
  import searchcontent from '../components/hotCom/Searchcontent'
  import hotmian from '../components/hotCom/Hotmain'

  export default {
    data () {
      return {
        name:'classify'
      };
    },

    components: {
      searchcontent,
      hotmian
    },

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style lang='scss' scoped>
  #discovery{
    height: 1235px;
    overflow: hidden;
  }
</style>