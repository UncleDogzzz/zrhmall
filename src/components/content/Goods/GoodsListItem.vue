<template>
  <div class="goods-item"  @click="itemClick">
   <img :src='GoodsListItem.show.img'  @load='imgFinish' />   <!-- 监听图片加载完成，解决BScroll中图片加载的BUG -->
    <div class='goods-info'>
     <p> {{GoodsListItem.title}}</p>
     <span class='price'>{{GoodsListItem.price}} </span>
     <span class='collect'>{{GoodsListItem.cfav}}</span>
   </div>
  </div>
</template>
<script>
  export default{
    name:'GoodsListItem',
    props:{
      GoodsListItem:{
        type:Object,
        default(){
          return{}
        }
      }
    },
    methods:{
      imgFinish(){                                 //商品图片加载完成，利用事件总线bus发送事件
        this.$bus.$emit('imgFinish')
      },
      itemClick(){                     //点击商品，跳转至详情页。
         this.$router.push('/detail/'+this.GoodsListItem.iid)
      }
    }
  }
</script>
<style>

  .goods-item{
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods-item img{
    width: 100%;
    border-radius: 5px;
    height: 267px;
  }
 .goods-info{
   font-size: 12px;
   position: absolute;
   bottom: 5px;
   left: 0;
   right: 0;
   overflow: hidden;
   text-align: center;
 }

 .goods-info p{
   overflow:hidden ;
   text-overflow: ellipsis;
   white-space: nowrap;
   margin-bottom: 3px;
 }

 .goods-info .price{
   color:var(--color-high-text);
   margin-left: 1%;
 }

.goods-info .collect{
   position: relative;
   left: 15px;
 }

.goods-info .collect::before{
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px ;
  }






</style>
