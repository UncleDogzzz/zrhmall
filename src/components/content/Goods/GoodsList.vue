<template>
  <div class='goods-list'>
  <goods-list-item  v-for="item in goods"  :goods-list-item='item' />
  </div>
</template>
<script>
  import GoodsListItem from './GoodsListItem.vue'
  export default{
    name:'GoodsList',
    props:{
      goods:{
        type:Array,
        default(){
          return []
        }
      }
    },
    components:{
      GoodsListItem

    }
  }

</script>

<style>
  .goods-list{
    display: flex;                         /* 设置flex布局 */
    flex-wrap: wrap;                       /* 设置根据宽度自适应换行 */
    justify-content: space-around;         /* 内容之间等距离空隙 */
    padding: 2px;
  }
</style>
