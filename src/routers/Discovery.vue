<template>
  <div>
    <hotindex></hotindex>
  </div>
</template>

<script>
  import hotindex from '../components/hotCom/Hotindex'
  export default {
    
    props:[''],
    data () {
      return {
        name:'classify'
      };
    },

    components: {
      hotindex
    },

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style lang='' scoped>

</style>