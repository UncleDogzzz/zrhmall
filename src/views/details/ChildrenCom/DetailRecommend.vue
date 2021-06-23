<template>
  <div class="detail-recommend">
    <goods-list :goods="recommendData.list"></goods-list>
  </div>
</template>

<script>
import GoodsList from "components/content/Goods/GoodsList.vue"

export default {
  name:"DetailRecommend",
  data(){
    return {}
  },
  props:{
    recommendData:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  components:{
    GoodsList
  }
}
</script>

<style scoped>
.detail-recommend{
  margin-top:10px;
}
</style>
