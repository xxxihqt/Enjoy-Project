<template>
  <div>
    <searchcontent :home="home"></searchcontent>
    <searchresult></searchresult>
  </div>
</template>

<script>
    import searchcontent from '../components/hotCom/Searchcontent.vue'
    import searchresult from '../components/hotCom/Searchresult.vue'
  export default {
    name:'search',
    props:[''],
    data () {
      return {
          home:true
      };
    },

    components: {
        searchcontent,
        searchresult
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