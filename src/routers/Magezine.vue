<template>
  <div id="magazine">
    <magazinemain></magazinemain>
  </div>
</template>

<script>
  import magazinemain from '../components/Magazinemain'
  export default {
    props:[''],
    data () {
      return {
        name:'magazine'
      };
    },
    components: {
      magazinemain
    },
    computed: {},
    mounted() {},
    methods: {},
    watch: {}
  }

</script>
<style lang='scss' scoped>
  #magazine{
    height: 1235px;
    overflow: hidden;
    z-index:2;
  }
</style>