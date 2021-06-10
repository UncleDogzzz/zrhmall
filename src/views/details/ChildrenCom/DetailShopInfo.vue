<template>
  <div class="detail-shop-info">
    <div class="logo">
      <img :src="shop.logo" alt="">
      <span>{{shop.name}}</span>
    </div>
    <div class="bottom-goods">
      <div class="left-goods">
        <div>
          <div class="sells">{{shop.sells}}</div>
          <div>总销量</div>
        </div>
         <div>
          <div class="fans">{{shop.fans}}</div>
          <div>全部宝贝</div>
        </div>
      </div>
      <div class="right-goods">
        <div v-for="(item,index) in shop.score" :key="index">
          <span>{{item.name}}</span>
          <span :class="{isActive:item.better,isNoActive:!item.better}">{{item.score.toFixed(2)}}</span>
          <span v-if="item.isBetter" :class="{isbActive:item.isBetter}">高</span>
          <span v-else :class="{isbNoActive:!item.isBetter}">低</span>
        </div>
      </div>
    </div>
    <div class="enter">进店逛逛</div>
  </div>
</template>

<script>
export default {
  name:"DetailShopInfo",
  props:{
    shop:{
      type:Object,
      default(){
        return {}
      }
    }
  },
}
</script>

<style scoped>
.detail-shop-info{
  border-bottom:8px solid #f6f6f6 ;
  padding-bottom:25px ;
}
.logo{
  height: 40px;
  margin-top:20px ;
  margin-left:10px ;
}
.logo img{
  width: 40px;
  height: 40px;
  vertical-align: middle;
}
.logo span{
  margin-left: 5px;
  color: rgb(126, 120, 120);
}
.bottom-goods{
  display: flex;
  justify-content:space-around;
  margin-top:20px ;
}
.sells{
  font-size: 17px;
}
.fans{
  font-size: 17px;
}
.left-goods{
  width: 50%;
  display: flex;
  justify-content:space-between;
  font-size:12px ;
  text-align: center;
  color: rgb(68, 52, 52);
}
.left-goods::after{
  content:"";
  position: relative;
  top: 20px;
  width: 1px;
  height: 50%;
  background-color:rgb(207, 198, 198) ;
}
.right-goods div{
  padding: 5px 0;
}
.right-goods div span{
  padding: 0 8px;
  font-size:14px;
  text-align: center;
  color: rgb(68, 52, 52);
}
.right-goods div span:nth-child(3){
  color: #fff;
  padding:0;
  display:inline-block ;
  text-align: center;
  width: 20px;
}
.left-goods div{
  padding: 5px 5px;
}
.isbActive{
  background-color: rgb(228, 63, 74);
}
.isbNoActive{
  background-color: rgb(107, 123, 86);
}
.isActive{
  color:rgb(228, 63, 74) !important;
}
.isNoActive{
  color: rgb(107, 123, 86) !important;
}
.enter{
  margin-top:30px ;
  width:150px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  color:rgb(168, 168, 168);
  font-weight: bold;
  position: relative;
  top: 50%;
  left: 50%;
  margin-left:-75px;
  background-color:#f6f6f6 ;
}
</style>
