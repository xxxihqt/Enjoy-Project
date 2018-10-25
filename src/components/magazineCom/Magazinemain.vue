<template>
  <div class="magazineBox" v-show="changeShow">
    <div class="Mheader">
      <img src="../../imgs/magazine.png" alt="">
    </div>
    <div class="Mmain">
      <h5 v-text="magazineData.group_section?magazineData.group_section.desc:''"></h5>
       <mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoadeds" ref="loadmore">
        <ul class="magazineContentBox">
            <li class="contents" v-for="(item,idx) in tabs" :key="idx"> 
                <div>
                  <a @click="Todetail(item.enjoy_url)"><img :src="item.url" alt=""></a>
                  <p v-text="item.tag" class="tag"></p>
                </div>
                <p v-text="item?item.desc:''" class="desc"></p>
                <a :href="item.enjoy_url"><p v-text="item.title" class="title"></p></a>
                <p v-text="item.begin_at" class="time"></p>
            </li>
        </ul>
      </mt-loadmore>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        magazineData:'',
        totalPage: 0,
        tabs:[],
        allLoadeds: false,
        page:0,
        qty:20
      };
    },
    components: {},

    computed: {
      changeShow(){
        return this.$store.getters.getShowFixed;
      }
    },

    created(){
      this.getMagezineData();
    },

    mounted() {
      console.log('tabs:',this.tabs);
    },
    methods: {
       getMagezineData(){
         var self=this;

        this.$loading.open();
          $.ajax({
            type:'get',
            url:'http://localhost:9999/getmagazinemsg',
            async:true,
            data:{
              page:self.page+1,
              qty:self.qty
            },
            success:function(data){
              console.log('data:',data);
              self.magazineData=data;
              self.$store.dispatch("setMagazineData",self.data);
              localStorage.setItem("magazinedata",JSON.stringify(self.data));

              var newArr=data.tabs.map(function(item,idx){
                item.begin_at=new Date(item.begin_at);
                var month=item.begin_at.getMonth()+1;
                var day=item.begin_at.getDate();
                item.begin_at=month+' 月 '+day+' 日'+'更新';
                return item
              });
              self.tabs.push(...newArr);
              self.$loading.close();
            }
          })
        },
        loadBottom () {
          this.page++
          if (this.page > this.totalPage) {
            this.allLoaded = true
            return
          }
          console.log('loadBottom',this.page);
          this.getMagezineData();
    },
      Todetail(url){
        // 把url传给父组件
        this.$emit('detialurl',url);
        this.$store.dispatch('setShowFixed',false);
        //隐藏列表页和footer
      }
    },
    watch: {}

  }

</script>
<style lang='scss' scoped>
  .magazineBox{
    height: 1328px;
    overflow-y:auto;
    .Mheader{
      text-align: center;
      border-bottom:1px solid #ccc;
      position:fixed;
      left:0;
      top:0;
      background: #fff;
      z-index: 999;
      width: 100%;
    }
    .Mmain{
      padding-top:100px;
      height: 1116px;
      //overflow-y: auto;
      z-index: -10;
      h5{
        font-size:12px;
        color:#92969C;
        text-align: center;
        font-weight: 100;
        padding-top:40px;
      }
      .magazineContentBox{
        padding:0px 30px;
        .contents{
          text-align: center;
          padding:30px 0px;
          border-bottom:1px solid #ccc;
          div{
            position: relative;
            img{
              width: 670px;
            }
            .tag{
              font-size:20px;
              padding:10px 15px;
              background-color:white;
              font-weight:600;
              position: absolute;
              left:30px;
              top:78%;
              border-radius:10px;
            }
          }
          .desc{
            font-size:12px;
            text-align:left;
            color:#9B9B9B;
          }
          .title{
            font-size:25px;
            font-weight:700;
            text-align:left;
            margin:15px 0px;
            color:black;
          }
          .time{
            font-size:12px;
            text-align:left;
            color:#9B9B9B;
          }
        }
      }
    }
  }
</style>