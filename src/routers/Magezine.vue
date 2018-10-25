<template>
  <div id="magazine" >
    <magazinemain v-on:detialurl="getURL"  ></magazinemain>
    <detailmagazine :sendURL='enjoy_url'></detailmagazine>
  </div>
</template>

<script>
  import magazinemain from '../components/magazineCom/Magazinemain'
  import detailmagazine from '../components/magazineCom/Detailmagazine'

  export default {
    props:[''],
    data () {
      return {
        enjoy_url:'',
        page:1,
        qty:20
      };
    },
    components: {
      magazinemain,
      detailmagazine
    },
    computed: {
    },
    created(){
      //this.getMagezineData();
    },
    mounted() {},
    methods: {
      getURL(url){
        console.log('父',url);
        this.enjoy_url=url;
      }
      /*,
       getMagezineData(){
         var self=this;
          $.ajax({
            type:'get',
            url:'http://localhost:9999/getmagazinemsg',
            async:true,
            data:{
              page:self.page,
              qty:self.qty
            },
            success:function(data){
              //console.log('data:',data);
              self.MagazineArr=data;
              self.$store.dispatch("setMagazineData",self.MagazineArr)
              localStorage.setItem("magazinedata",JSON.stringify(self.MagazineArr));
            }
          })
        }*/
    },
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