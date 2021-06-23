<template>
  <Swiper class='detail-swiper'>
    <swiper-item v-for='(item,index) in topImage' :key='index'>
      <img :src='item' />
    </swiper-item>
  </Swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper/index.js'
  export default{
    name:'DetailSwiper',
    components:{
      Swiper,
      SwiperItem
    },
    props:{
      topImage:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>
<style>
  .detail-swiper{
    height: 300px;
    overflow: hidden;
  }
</style>
