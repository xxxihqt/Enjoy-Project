<template>
  <div class="magazineBox">
    <div class="Mheader">
      <img src="../imgs/magazine.png" alt="">
    </div>
    <div class="Mmain">
      <h5 v-text="magazineData.group_section?magazineData.group_section.desc:''"></h5>
      <ul class="magazineContentBox">
          <li class="contents" v-for="(item,idx) in tabs" :key="idx"> 
              <div>
                <img :src="item.url" alt="">
                <p v-text="item.tag" class="tag"></p>
              </div>
              <p v-text="item?item.desc:''" class="desc"></p>
              <p v-text="item.title" class="title"></p>
              <p v-text="item.begin_at" class="time"></p>
          </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        magazineData:'',
        tabs:''
      };
    },

    components: {},

    computed: {
      getUTCTime(){
        var newArr=[];
        this.tabs.map(function(item,idx){
          item.begin_at=new Date(item.begin_at);
          var month=item.begin_at.getMonth()+1;
          var day=item.begin_at.getDate();
          item.begin_at=month+' 月 '+day+' 日'+'更新';
          newArr.push(item);
        })
        return newArr;
      }
    },

    mounted() {
      this.getMagazineData();
      this.tabs=this.getUTCTime;
    },

    methods: {
      getMagazineData(){
        this.magazineData=JSON.parse(localStorage.getItem('magazinedata'));
        this.tabs=this.magazineData.tabs;
      }
    },
    watch: {}

  }

</script>
<style lang='scss' scoped>
  .magazineBox{
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
      overflow-y: auto;
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
              top:300px;
              border-radius:10px;
            }
          }
          .desc{
            font-size:12px;
            text-align:left;
            color:#9B9B9B;
          }
          .title{
            font-size:30px;
            font-weight:700;
            text-align:left;
            margin:15px 0px;
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