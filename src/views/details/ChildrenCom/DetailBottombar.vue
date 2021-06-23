<template>
  <div class="detail-tab-bar">
    <div class="left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="right">
      <div class="cart" @click="addCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBottombar",
    methods: {
      addCart() {
        this.$emit('addCart');
        this.$toast.show("加入购物车数量+1",1500)
      }
    }
  }
</script>

<style scoped>
  .detail-tab-bar {
    background-color: #fff;
    height: 49px;
    position: fixed;
    bottom: -1px;
    left: 0;
    right: 0;
    display: flex;
    text-align: center;
    z-index: 10;
  }
  .left,.right {
    width: 50%;
  }
  .left,.right {
    display: flex;
  }
  .left .icon {
    display: block;
    width: 24px;
    height: 24px;
    margin: 5px 21px 0;
    background:url('~assets/img/detail/detail_bottom.png') 0 0/100%;
  }
  .left .shop {
    background-position: 0 57px;
  }
  .left .service {
    background-position: 0 107px;
  }
  .text {
    font-size: 14px;
    color: var(--color-text);
  }
  .cart {
    height: 49px;
    width: 94px;
    background-color: #fff737;
    text-align: center;
    color:#666;
    font-size: 16px;
    line-height: 49px;
  }
  .buy {
    height: 49px;
    width: 94px;
    background-color: var(--color-tint);
    text-align: center;
    color:#fff;
    font-size:16px;
    line-height: 49px;
  }
</style>
