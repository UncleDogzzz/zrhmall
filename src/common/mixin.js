import {debounce} from './utils.js'
import backTop from 'components/content/BackTop/backTop.vue'

export  const itemListenerMixin={
 data(){
   return {
     ItemImgFinish:null,
     refresh:null
   }
 },
 mounted(){
    this.refresh=debounce(this.$refs.scroll.refresh,500)   //防抖函数返回一个函数
    this.ItemImgFinish=()=>{                   //图片加载完成函数
      this.refresh()
      }
    this.$bus.$on('imgFinish',this.ItemImgFinish)   // 利用防抖函数 实现bus事件总线监听图片加载完成，每一个商品item图片加载完成就刷新bscroll的高度
 }
}


export  const BackTop={
   data(){
     return {
       backtopIsshow:false,
       }
   },
   components:{
      backTop
   },
   methods:{
     backClick(){
       this.$refs.scroll.scrollTo(0,0,1000)        //通过this.$refs.scroll访问scroll组件的scrollTo方法 来实现回到顶部（回到顶部）
     },
     showbacktop(position){
       this.backtopIsshow= -position.y>1000
     }
   }

}
