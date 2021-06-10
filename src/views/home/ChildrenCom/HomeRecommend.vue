<template>
  <div class='recommend'>
   <div class='recommend-item' v-for="item in recommends">
   <a :href="item.link">
   <img :src='item.image' >
   <div>{{item.title}} </div>
   </a>
   </div>
  </div>


</template>

<script>
  export default {
   name:'HomeRecommend',
   props:{
   recommends:{
     type:Array,
     default(){
       return []
     }
   }
   }
  }

</script>

<style>
  .recommend{
    display: flex;
    text-align: center;
    padding: 13px 0 26px ;
    border-bottom: 11px solid #eee;
    font-size: 15px;
  }
  .recommend-item{
    flex: 1;

  }
  .recommend-item img{
    width: 70px;
    height: 70px;
    margin-bottom: 10px;


  }

</style>
