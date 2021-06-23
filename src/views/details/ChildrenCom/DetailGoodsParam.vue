<template>
  <div class="detail-goods-param">
    <div class="param-info">
      <table v-for="(item,index) in goodsParams.size" :key="index"
      class="info-size">
        <tr v-for="(tr,indey) in item" :key="indey">
          <td v-for="(td,indez) in tr" :key="indez">{{td}}</td>
        </tr>
      </table>
      <table class="info-param">
        <tr v-for="(item,index) in goodsParams.infos" :key="index">
          <td class="info-param-key">{{item.key}}</td>
          <td class="param-value">{{item.value}}</td>
        </tr>
      </table>
      <div class="info-img" v-if="goodsParams.image">
      <img :src="goodsParams.image" alt="">
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"DetailGoodsParam",
  props:{
    goodsParams:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>
.info-size{
  color: var(--color-text);
  font-size:15px ;
}
  .param-info {
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
  }

  .param-info table {
    width: 100%;
    border-collapse: collapse;
  }

  .param-info table tr {
    height: 42px;
  }

  .param-info table tr td {
    border-bottom: 1px solid rgba(100,100,100,.1);
  }
   .info-param-key {
    /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
    width: 95px;
  }

  .info-param {
    border-top: 1px solid rgba(0,0,0,.1);
  }

  .param-value {
    color: #eb4868
  }

  .info-img img {
    width: 100%;
  }
</style>
