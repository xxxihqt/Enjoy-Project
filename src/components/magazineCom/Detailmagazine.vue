<template>
  <div class="detailBox" v-show="!changeShow" ref="detailBox">
      <div class="Mheader">
        <img src="../../imgs/magazine.png" alt="">
    </div>
    <div id="wrap">
    <iframe :src="renderURL" frameborder="0" scrolling="auto" height="100%" width="100%" marginwidth="0" marginheight="0"></iframe>
    </div>
  </div>
</template>

<script>

  export default {
    props:['sendURL'],
    data () {
      return {
          url:''
      };
    },

    components: {},

    computed: {
        renderURL(){
            //console.log(666);
            return this.sendURL;
        },
        changeShow(){
        return this.$store.getters.getShowFixed;
      }
    },
    mounted() {
        console.log('子:',this.renderURL);   
    },
    methods: {
    },

    watch: {}

  }

</script>
<style lang='scss' scoped>
    .detailBox{
        height: 1149px;
        position:fixed;
        left:0;
        top:0;
        width:100%;
        .iframe{
             body{
                width:100%;
             }
        }
    }
    html,body,iframe{width: 100%;height: 100%;padding: 0;margin: 0}
    #wrap{width: 100%;height: 100%;
    }
        iframe{border: none;
        font-size:10px;}
</style>