<template>
  <div class="detail-image-info">
    <div class="detail-desc-info">
      <div class="detail-icon"></div>
      <div class="detail-desc">
        {{detailInfo.desc}}
      </div>
      <div class="detail-icon1"></div>
    </div>
    <div class="detail-key" v-if="detailInfo.detailImage">{{detailInfo.detailImage[0].key}}</div>
    <div class="detail-image" v-if="detailInfo.detailImage">
      <img :src="item" alt="" 
      @load="detailLoadImage" 
      v-for="(item,index) in detailInfo.detailImage[0].list" :key="index">
    </div>
  </div>
</template>
<script>
export default {
  name:"DetailImageInfo",
  data(){
    return{
      count:0
    }
  },
  props:{
    detailInfo:{
      type:Object,
      default(){
        return {}
      }
    },
  },
  methods:{
    detailLoadImage(){
      this.$emit("detailLoadImage")    //监听图片加载完成
    }    
  }
}
</script>

<style scoped>
.detail-image-info{
  position: relative;
  margin-top:20px ;
  border-bottom:8px solid #f6f6f6 ;
}
.detail-icon{
  position: relative;
  width: 100px;
  height: 1px;
  background-color: #e0d0d0;
}
.detail-icon1{
  position: relative;
  left:70%;
  bottom: 0;
  width: 100px;
  height: 1px;
  background-color: #e0d0d0;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
}

.detail-icon::before{
  content: "";
  position: absolute;
  top: -5px;
  width: 5px;
  height: 5px;
  background-color: rgb(26, 24, 24);
}
.detail-desc-info{
  position: relative;
  padding: 0 10px;
  color: var(--color-text);
  font-size:15px;
  margin-bottom:20px ;
}
.detail-icon1::after{
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  width: 5px;
  height: 5px;
  background-color: rgb(26, 24, 24);
}
.detail-key{
  margin:10px 10px;
   color: var(--color-text);
}
.detail-desc{
  padding: 20px 0;
}
.detail-image img{
  width: 100%;
}
</style>
