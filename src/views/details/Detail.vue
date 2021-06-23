<template>
  <div id='detail'>
   <detail-navbar class='detail-nav'@TitleClick='TitleClick'  ref='detailNav'/>         <!-- 详情页的导航栏 -->
   <scroll class="content" ref='scroll'
   :probeType='3'
    @scroll='contentScroll'>
   <detail-swiper :top-image="TopImage" />   <!-- 轮播图，把图片数据传递给轮播图组件 -->
   <detail-base-info  :goods='goodsInfo' />          <!-- 商品基本信息展示组件 把商品基本信息传递给组件 -->
   <detail-shop-info  :shop='shopinfo'/>  <!-- 店铺信息组件，把店铺信息传递给组件 -->
   <detail-image-info :detail-info='detailInfo' @detailLoadImage='detailLoadImage'/>  <!-- 把商品的详细信息传递给 展示商品详细信息的组件 -->
   <detail-goods-param :goodsParams='ParamsInfo'ref='params' />  <!-- 把商品参数信息传递给 展示商品参数信息的组件 -->
   <detail-comment  :rate='CommentInfo' ref='comment'/>    <!-- 把商品评论信息传递给 展示商品评论的组件 -->
   <detail-recommend :recommendData='Recommend' ref='recommend'/>  <!-- 把推荐商品数据传递给展示推荐商品的组件 -->
   </scroll>
   <detail-bottombar />         <!-- 底部购物车栏 -->
    <back-top  @click.native='backClick()' v-show="backtopIsshow" />           <!-- 监听back-top组件的点击事件（监听组件的原生事件要加.native修饰符），来回到顶部 -->
  </div>
</template>
<script>
  import DetailNavbar from'./ChildrenCom/DetailNavbar.vue'         //详情页的导航栏
  import{getDetailData,Goods,Shop,GoodsParams,getRecommend} from 'network/detail.js'
  //请求商品数据，推荐商品的网络封装 请求一个保存商品基本信息、店铺信息、商品参数的类
  import DetailSwiper from './ChildrenCom/DetailSwiper.vue'        //获取轮播图组件
  import DetailBaseInfo from'./ChildrenCom/DetailBaseInfo.vue'    //获取商品基本信息组件
  import DetailShopInfo from './ChildrenCom/DetailShopInfo.vue'   //获取店铺信息组件
  import scroll from 'components/common/scroll/scroll.vue'      //导入封装好的组件 scroll
  import DetailImageInfo from './ChildrenCom/DetailImageInfo.vue' //导入商品详细信息组件
  import DetailGoodsParam from './ChildrenCom/DetailGoodsParam.vue'  //导入商品参数信息组件
  import DetailComment from './ChildrenCom/DetailComment.vue'  //导入商品评论组件
  import DetailRecommend from './ChildrenCom/DetailRecommend.vue'  //导入推荐商品组件
  import {itemListenerMixin,BackTop} from 'common/mixin.js' //导入混入对象
  import {debounce} from'common/utils.js'  //导入防抖函数
  import DetailBottombar from'./ChildrenCom/DetailBottombar.vue'   //导入底部栏
  export default
  {
    name:'Detail',
    data(){
      return{
        id:null,
        TopImage:null,        //轮播图数据
        goodsInfo:{} ,        // 商品基本信息（价格，运费，标题），
        shopinfo:{},           //店铺信息
        detailInfo:{},        //商品详情数据
        ParamsInfo:{},        //商品的参数信息
        CommentInfo:{},        //商品评论信息
        Recommend:{},          //推荐商品数据
        ThemeTopY:[],         //保存参数组件，评论组件，推荐组件的offsetTop
        getThemeTopY:null,    //利用防抖函数，实现防抖的滚动到指定位置。
        currentIndex:0         //滚动时标题对应的index
      }
    },
    mixins:[itemListenerMixin,BackTop],  //使用混入对象
    mounted() {
    },
    destroyed() {
    this.$bus.$off('imgFinish',this.ItemImgFinish)   //离开时，取消$bus监听当前detail组件的图片加载
    },

    components:{
      DetailNavbar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      scroll,
      DetailImageInfo,
      DetailGoodsParam,
      DetailComment,
      DetailRecommend,
      DetailBottombar
    },
    created() {
      this.id=this.$route.params.id;       //保存详情页的商品id
      getDetailData(this.id).then(res=>{          //网络请求 获取商品相关数据
        this.TopImage=res.result.itemInfo.topImages;  //根据商品ID获取轮播图的图片数据
        // console.log(res)
        this.goodsInfo=new Goods(res.result.itemInfo,res.result.columns,res.result.shopInfo.services)
        //获取商品基本信息保存在类Goods的变量goodsInfo中
        this.shopinfo=new Shop(res.result.shopInfo)  //获取店铺信息保存在类Shop的变量shopinfo中
        this.detailInfo=res.result.detailInfo;      //获取商品的详细信息
        this.ParamsInfo=new GoodsParams(res.result.itemParams.info,res.result.itemParams.rule);  //获取并且保存商品的参数信息
        if(res.result.rate.cRate){
         this.CommentInfo=res.result.rate;     //获取并且保存商品评论信息
        }

      })
      getRecommend().then(res=>{                 //获取推荐商品数据
        this.Recommend=res.data;
        console.log(res)
      })

      this.getThemeTopY=debounce(()=>{                         //利用防抖函数，对ThemeTopY进行更新
         this.ThemeTopY=[];
         this.ThemeTopY.push(0);
         this.ThemeTopY.push(this.$refs.params.$el.offsetTop);
         this.ThemeTopY.push(this.$refs.comment.$el.offsetTop);
         this.ThemeTopY.push(this.$refs.recommend.$el.offsetTop);
         this.ThemeTopY.push(Number.MAX_VALUE);   // 用于优化判断滚动位置的index条件
      },100)


    },
    // updated() {
    //  this.ThemeTopY.push(0);
    //  this.ThemeTopY.push(this.$refs.params.$el.offsetTop);
    //  this.ThemeTopY.push(this.$refs.comment.$el.offsetTop);
    //  this.ThemeTopY.push(this.$refs.recommend.$el.offsetTop);
    //  console.log(this.ThemeTopY);
    // },
    methods:{
      detailLoadImage(){
        this.refresh();  //当商品的详细信息的图片加载完成，刷新bscroll的高度  （当前商品的详细图片的监听）
        this.getThemeTopY();           //使用经过防抖函数处理的函数，获取参数，评论，推荐的ofsetTop高度

      },
      TitleClick(index){                       //根据点击的标题，滚动到相应位置
        this.$refs.scroll.scrollTo(0,-this.ThemeTopY[index],500);
      },
      contentScroll(position){                //监听滚动
        const positionY=-position.y
        let length=this.ThemeTopY.length;
        for(let i=0;i<length-1;i++){
         // if(this.currentIndex!==i&&((i<length-1&&
         // positionY>=this.ThemeTopY[i]&&
         // positionY<this.ThemeTopY[i+1])||(i===length-1&&positionY>=this.ThemeTopY[i]))){
         // this.currentIndex=i;
         //    this.$refs.detailNav.currentIndex=i;   //把滚动位置对应的index赋值给导航栏的currentIndex

           // hack做法

         if(this.currentIndex!==i&&(positionY>=this.ThemeTopY[i]&&positionY<this.ThemeTopY[i+1])){
                this.currentIndex=i;
                this.$refs.detailNav.currentIndex=i;   //把滚动位置对应的index赋值给导航栏的currentIndex
        }
        }

        this.showbacktop(position);

        }
      }
    }

</script>
<style scoped="scoped">
  #detail{                          /* 把底部tabar导航栏给覆盖 */
    position: relative;
    z-index: 9;
    background-color: #FFFFFF;
    height: 100vh;
  }
  .detail-nav{
    position: relative;             /* 顶部导航栏脱离标准流 */
    z-index: 9;
    background-color: #FFFFFF;
  }
  .content{                       /* scroll的外部高度 */
    height: calc(100% - 93px);

  }


</style>
