<template>
  <nav-bar>
    <div slot='left' class='left' @click="ImgClick">      <!-- 返回图片 -->
      <img src='~assets/img/common/back.svg' />
    </div>

    <div slot='center' class="nav-bar">                            <!-- 导航文字 -->
      <div v-for="(title,index) in titles"
       class="nav-bar-item"
       :class="{active:index===currentIndex}"
       @click="itemClick(index)" >{{title}}</div>
    </div>
  </nav-bar>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  export default{
    name:'DetailNavBar',
    components:{
      NavBar
    },
    data(){
      return{
        titles:['商品','参数','评论','推荐'],
        currentIndex:0
      }
    },
    methods:{
      ImgClick(){
        this.$router.back();        //返回图片被点击,返回上一个路由
      },
      itemClick(index){
        this.currentIndex=index;
      }
    }
  }
</script>
<style>
  .nav-bar{
    display: flex;
  }
  .nav-bar-item{
    flex: 1;
    font-size: 13px;
  }
  .left img{
    margin-top: 12px;
  }
  .active{
    color:var(--color-high-text);
  }


</style>
