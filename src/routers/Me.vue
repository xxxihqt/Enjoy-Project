<template>
  <div id="container">
    <div id="my">
      <div class="avatar">
          <img class="avatar-img" data-src="https://image.ricebook.com/avatar/1?imageView2/1/w/140/h/140" src="https://image.ricebook.com/avatar/1?imageView2/1/w/140/h/140" lazy="loaded" style="width: 140px; height: 140px;">
          <h4 v-text="username"></h4>
          <p class="mem-level"> </p>
      </div> 
      <div class="nav-panel">
        <div class="hy">
          <h3>会员权益</h3> 
          <a href="https://topic.ricebook.com/kolsell/index.html#/user/open" class="hy-go">去开通</a> 
          <p class="hy-intro">开通会员每月平均可以帮你多赚 2046 元</p> 
          <a href="https://topic.ricebook.com/kolsell/index.html#/user/open">
            <ul class="hy-icon">
              <li>
                <img src="https://image.ricebook.com/business/23322963723620"> 
                  <span>会员大礼包</span>
              </li>
              <li>
                <img src="https://image.ricebook.com/business/23322963723559"> 
                <span>会员专享价</span>
              </li>
              <li>
                <img src="https://image.ricebook.com/business/23322963723618"> 
                <span>会员日特权</span>
              </li>
              <li>
                <img src="https://image.ricebook.com/business/23322963723629"> 
                <span>专属客服</span>
              </li>
            </ul>
          </a>
        </div>
      </div> 
      <div class="nav-panel">
        <div class="nav-item">
          <a href="https://order.ricebook.com/list">
            <span>我的订单</span>
            <span class="go">></span>
          </a>
        </div>
      </div> 
      <div class="nav-panel">
        <div class="nav-item">
          <a href="https://order.ricebook.com/coupon/kol">
            <span>我的优惠券</span>
            <span class="go">></span>
          </a>
        </div>
      </div>
      <div class="nav-panel">
        <div class="nav-item">
          <a href="/my/address" class="">
            <span>地址管理</span>
            <span class="go">></span>
          </a>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
export default {
  name: "me",
  data() {
    return {
      username:''
    };
  },

  components: {},

  computed: {},

  created() {
    this.init();
  },

  mounted() {
  },

  methods: {
    init(){
      if(sessionStorage.getItem('name')&& sessionStorage.getItem('_id')){
        this.username=sessionStorage.getItem('name');
      }
    }
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
#container{
      height: 100%;
  #my{
    background-color: #f6f6f6;
    padding-bottom: 200px;
    .avatar{
      width: 750px;
      height: 398px;
      background: black;
      text-align: center;
      color: #fff;
      font-size: 32px;
      position: relative;
      .avatar-img{
        border-radius: 50%;
        margin-top: 108px;
        margin-bottom: 20px;
        width: 140px;
        height: 140px;
      }
      h4{
        line-height: 1;
      }
      .mem-level{
        font-size: 24px;
        margin-top: 20px;
      }
    }
    .nav-panel{
      font-size: 0;
      margin-top: 18px;
      background-color: #fff;
      border-top: 1px solid #e0e0e0;
      border-bottom: 1px solid #e0e0e0;
      .hy{
        font-size: 24px;
        padding: 40px;
        position: relative;
        line-height: 1;
        h3{
          font-size: 35px;
          font-weight: 400;
          color: #2c3038;
        }
        .hy-go{
          color: #fba700;
          position: absolute;
          right: 40px;
          top: 52px;
        }
        .hy-intro{
          color: #92969c;
          margin-top: 12px;
        }
        .hy-icon{
          margin-top: 40px;
          overflow: hidden;
          zoom: 1;
          li{
            width: 25%;
            float: left;
            box-sizing: border-box;
            color: #2c3038;
            text-align: center;
            img{
              width: 96px;
              height: 96px;
              display: block;
              margin: 0 auto;
            }
            span{
              margin-top: 12px;
              font-size: 24px;
              display: inline-block;
            }
          }
        }
      }
      .nav-item:first-child {
          border-top: none;
      }
      .nav-item{
        margin: 0 40px;
        padding-right: 40px;
        margin-right: 0;
        font-size: 30px;
        border-top: 1px solid #e0e0e0;
        background-size: 40px;
        color: #2c3038;
        a{
          padding: 30px 0;
          color: #2c3038;
          display: block;
        }
        .go{
          float:right;
          color:gray;
        }
      }
    }
  }
}
</style>