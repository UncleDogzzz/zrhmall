<template>
  <div id='home'>
  <nav-bar class='home-nav'><div slot='center'> 购物街 </div> </nav-bar>       <!--  //导航栏 -->

  <tab-control :titles="['流行','新款','精选']"
   @tabClick='tabClick'
    ref='tabcontrolTop'
     class='tabcontrol'
     v-show="tabcontrolflex" />     <!-- 吸顶效果的tab-control组件 默认不显示 -->    <!-- Home组件流行，新品，热卖底部控制栏 -->

  <scroll class='content1' ref='scroll' @scroll='contentScroll' :probeType='3' :pull-up-load='true' @pullingUp='loadmore'>
  <HomeSwiper :banners='banners' @imgLoad='imgLoad' />                                           <!-- 轮播图 -->
  <home-recommend :recommends="recommends"  />                          <!-- 热卖推荐 -->
  <feature-view />                                                       <!-- 本周流行导航图 -->

  <tab-control :titles="['流行','新款','精选']"
   @tabClick='tabClick'  ref='tabcontrolIndex'  />          <!-- Home组件流行，新品，热卖底部控制栏 -->

 <goods-list :goods="showGoods"></goods-list>              <!-- 商品信息组件 -->
  </scroll>
  <back-top  @click.native='backClick()' v-show="backtopIsshow" />           <!-- 监听back-top组件的点击事件（监听组件的原生事件要加.native修饰符），来回到顶部 -->
  </div>
</template>

<script>
   import NavBar from 'components/common/navbar/NavBar.vue'
   import HomeSwiper from './ChildrenCom/HomeSwiper.vue'
   import HomeRecommend from './ChildrenCom/HomeRecommend.vue'
   import FeatureView from './ChildrenCom/FeatureView.vue'

   import TabControl from 'components/content/TabControl/TabControl.vue'

   import GoodsList from 'components/content/Goods/GoodsList.vue'

   import {getHomeMultidata,getHomeGoods} from 'network/home.js'

   import scroll from 'components/common/scroll/scroll.vue'

   import backTop from 'components/content/BackTop/backTop.vue'

  export default{
    name:'Home',
    components:{
      NavBar,
      HomeSwiper,
      HomeRecommend,
      FeatureView,
      TabControl,
      GoodsList,
      scroll,
      backTop
    },
    data(){
     return {
       banners:[],          //轮播图数据
       recommends:[],       //推荐热卖数据
       goods:{
        'pop':{page: 0,list:[]},    //流行的商品列表
        'new':    {page: 0,list:[]},    //新款的商品列表
        'sell':{page: 0,list:[]},   //热卖的商品列表
       },
       showCurrent:'pop',         //设置 默认展示pop商品信息
       backtopIsshow:false,         //控制back-top组件是否显示
       tabconrolTop:0,              //tabcontrol组件的Top高度
       tabcontrolflex:false,         //tabconrol组件吸顶效果是否显示
       leaveY:0                   //记录离开时的滚动位置
     }
    },
    created(){
     this.getHomeMultidata();   //获取首页相关数据 如轮播图，热卖推荐
     this.getHomeGoods('pop');    //获取商品信息
     this.getHomeGoods('new');
     this.getHomeGoods('sell');
   },
  mounted() {
    const refresh=this.debounce(this.$refs.scroll.refresh,500)   //防抖函数返回一个函数
    this.$bus.$on('imgFinish',()=>{                   // 利用防抖函数 实现bus事件总线监听图片加载完成，每一个商品item图片加载完成就刷新bscroll的高度
       refresh()
    })
   },
  computed:{
    showGoods(){                                 //获取当前商品的信息
     return this.goods[this.showCurrent].list
    }
   },
   activated() {                      //活跃时，滚动到Home组件上次离开时的位置
    this.$refs.scroll.scrollTo(0,this.leaveY,0);    //滚动到Home组件上次离开时的位置
    this.$refs.scroll.refresh();                //刷新高度
   },
   deactivated(){                   //离开时，保存滚动位置。
    this.leaveY=this.$refs.scroll.scroll.y; //离开时，保存滚动位置。
   },
  methods:{
  tabClick(index){                                     //监听pop,new,sell 控制栏点击事件
   switch(index){
     case 0:{                                     //通过tabCotrol传进来的index，showCurrent更改为对应的商品信息
     this.showCurrent='pop';
     break;
     };
     case 1:{
     this.showCurrent='new';
     break;
     };
     case 2:{
     this.showCurrent='sell';
     break;
     }
   }
   this.$refs.tabcontrolIndex.currentIndex=index;      //点击tabcontrol后，把点击的index赋值给两个tabcontrol组件，实现点击对应
   this.$refs.tabcontrolTop.currentIndex=index;
  },
  backClick(){
    this.$refs.scroll.scrollTo(0,0)        //通过this.$refs.scroll访问scroll组件的scrollTo方法 来实现回到顶部（回到顶部）
  },
  contentScroll(position){
    this.backtopIsshow= -position.y>1000  //通过比较scroll组件传递过来的位置信息，来决定是否显示back-top组件
    this.tabcontrolflex=-position.y>this.tabconrolTop    //比较滚动的高度是否大于tabcontrol组件的Top高度，如果是，设置tavcontrolflex为true，显示吸顶效果
  },
  loadmore(){                                      //上拉加载更多商品信息
    this.getHomeGoods(this.showCurrent);          //加载更多当前分类商品信息
    this.$refs.scroll.scroll.finishPullUp();         //手动完成上拉加载，才会执行下一次上拉加载
  },
  debounce(func,delay){                      //防抖函数
    let timer=null
    return function (...args){
      if (timer){clearTimeout(timer)}
      timer=setTimeout(()=>{
        func.apply(this,args)
      },delay)
    }
  },
  imgLoad(){
    this.tabconrolTop=this.$refs.tabcontrolIndex.$el.offsetTop;             //把偏下位置的tabconrol组件的Top高度赋值给变量tabconrolTop
  },
   getHomeMultidata(){
   getHomeMultidata().then(res=>{                        //定义方法调用axios 获取首页相关信息
    this.banners=res.data.banner.list;                 //轮播图数据
    this.recommends=res.data.recommend.list;              //热卖数据
   }).catch(err=>{
     console.log(err)
   })
   },
   getHomeGoods(type){
    const page=this.goods[type].page+1;                     //定义方法调用axios 获取首页商品信息。
    getHomeGoods(type,page).then(res=>{
      this.goods[type].list.push(...res.data.list)
    }).catch(err=>{
      console.log(err);
    })
   }
  },




}

</script>
<style>
  #home{
    padding-top: 44px;          /* 设置轮播图距离顶部的距离，因为此时导航栏位置已经固定 */
    position: relative;
  }


.home-nav{
  background-color: var(--color-tint);
  color: #FFFFFF;
  position: fixed;                   /* 设置导航栏位置为固定 */
  top:0;
  left: 0;
  right: 0;
  z-index: 9;
}



.content1{
position: fixed;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}

.tabcontrol{                /* 吸顶效果样式 */
  position: relative;
  left: 0;
  right: 0;
  top: 0px;
  z-index: 9;
}







</style>
