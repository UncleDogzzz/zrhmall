<template>
  <swiper><swiper-item v-for='item in banners'>
   <a :href="item.link"> <img :src='item.image'  @load="imgLoad"> </a>   <!-- 监听轮播图图片加载完成 -->
  </swiper-item>
  </swiper>
</template>

<script>
   import{Swiper, SwiperItem} from 'components/common/swiper/index.js'
  export default{
    name:'HomeSwiper',
    props:{
      banners:{
        type:Array,
        default(){
         return []
        }
      }
    },
    data(){
      return{
        imgFinish:false
      }

    },
    components:{
      Swiper,
      SwiperItem
    },
    methods:{
      imgLoad(){
        if(!this.imgFinish){
        this.$emit('imgLoad');
        this.imgFinish=!this.imgFinish;
        }
      }
    }
  }



</script>

<style>
</style>
