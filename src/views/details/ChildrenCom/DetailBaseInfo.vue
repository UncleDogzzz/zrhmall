<template>
  <div class="detail-base-info">
    <div class="title">
      <p>{{goods.title}}</p>
    </div>
    <div class="Price">
      <span class="realPrice">￥{{goods.realPrice}}</span>
      <span v-if="goods.oldPrice" class="oldPrice">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="columns">
      <div class="columns-item" v-for="(item,index) in goods.columns" :key="index">{{item}}</div>
    </div>
    <div class="services">
      <div v-for="index in goods.services !== undefined &&goods.services.length-1"  :key="index" class="services-item">
        <img :src="goods.services[index].icon" alt="">
        <span>{{goods.services[index].name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"DetailBaseInfo",
  props:{
    data(){
      return{}
    },
    goods:{
      type:Object,
      default(){
        return {}
      }
    }
  },
}
</script>

<style scoped>
.detail-base-info{
  border-bottom:5px solid #f6f6f6;
}
.title{
  padding:8px 0;
  font-size: 16px;
  color: #222;
}
.realPrice{
  color: var(--color-tint);
  font-size: 22px;
  font-weight: 800;
}
.oldPrice{
  font-size:12px;
  padding:0 3px;
  color: var(--color-text);
  text-decoration:line-through;
}
.discount{
  color: #fff;
  width: 50px;
  height: 15px;
  line-height: 15px;
  padding: 3px 0;
  text-align: center;
  display: inline-block;
  font-size:12px;
  background-color:var(--color-tint);
  border-radius: 10px;
  position: relative;
  top: -10px;
}
.Price{
  padding: 8px 0;
}
.detail-base-info{
  padding: 0 3px;
}
.columns{
  display: flex;
  justify-content: space-between;
  color: var(--color-text);
  font-size: 15px;
  padding: 10px 0;
}
.services{
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  color: #222;

}
.services{
  flex: 1;
  padding: 8px 0;
  padding-bottom: 30px;
}
.services img{
  width: 15px;
  height: 15px;
}


</style>
