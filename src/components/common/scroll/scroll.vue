<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
   </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name:'scroll',
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return{
        scroll:null
      }
    },
    mounted() {
    this.scroll=new BScroll(this.$refs.wrapper,{
      click:true,
      probeType:this.probeType,                         //由用户传入值决定是否监听事件
      pullUpLoad:this.pullUpLoad                        //由用户传入值决定是否上拉加载更多

    });
    this.scroll.on('scroll',(position)=>{           //scroll组件监听滚动事件，并把位置信息传递给home组件
      this.$emit('scroll',position)
    })

    this.scroll.on('pullingUp',()=>{                //scroll组件监听上拉最底部事件 把事件传递给home组件
      this.$emit('pullingUp');
    })

    },
    methods:{
      scrollTo(x,y,time=600){                         //滚动函数
        this.scroll.scrollTo(x,y,time);             //回到顶部
      },
      refresh(){                                   //刷新高度
        this.scroll && this.scroll.refresh();
      }

    }
  }


</script>

<style>


</style>
