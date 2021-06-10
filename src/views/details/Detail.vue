<template>
  <div>
   <detail-navbar/>         <!-- 详情页的导航栏 -->
   <detail-swiper :TopImage="TopImage" />   <!-- 轮播图，把图片数据传递给轮播图组件 -->
   <detail-base-info  :goods='goodsInfo' />          <!-- 商品基本信息展示组件 把商品基本信息传递给组件 -->
   <detail-shop-info  :shop='shopinfo'/>  <!-- 店铺信息组件，把店铺信息传递给组件 -->
  </div>
</template>
<script>
  import DetailNavbar from'./ChildrenCom/DetailNavbar.vue'         //详情页的导航栏
  import{getDetailData,Goods,Shop} from 'network/detail.js'                   //请求轮播图的网络封装  请求一个保存商品信息的类
  import DetailSwiper from './ChildrenCom/DetailSwiper.vue'        //获取轮播图组件
  import DetailBaseInfo from'./ChildrenCom/DetailBaseInfo.vue'    //获取商品基本信息组件
  import DetailShopInfo from './ChildrenCom/DetailShopInfo.vue'   //获取店铺信息组件
  export default{
    name:'Detail',
    data(){
      return{
        id:null,
        TopImage:null,        //轮播图数据
        goodsInfo:{} ,        // 商品基本信息（价格，运费，标题），
        shopinfo:{}           //店铺信息
      }
    },
    components:{
      DetailNavbar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo
    },
    created() {
      this.id=this.$route.params.id;       //保存详情页的商品id
      getDetailData(this.id).then(res=>{          //网络请求
        this.TopImage=res.result.itemInfo.topImages;  //根据商品ID获取轮播图的图片数据
        console.log(res)
        this.goodsInfo=new Goods(res.result.itemInfo,res.result.columns,res.result.shopInfo.services)
        //获取商品基本信息保存在类Goods的变量goodsInfo中
        this.shopinfo=new Shop(res.result.shopInfo)  //获取店铺信息保存在类Shop的变量shopinfo中


      })
    }
  }
</script>
<style>
</style>
