<template>
  <div class="comment-info">
    <div class="comment-title">
      <span>用户评价</span>
      <span class="more">更多></span>
    </div>
    <div class="comment-section">
      <div class="person" v-if="rate.list">
        <img :src="rate.list[0].user.avatar" alt="" class="avatar">
        <span>{{rate.list[0].user.uname}}</span>
      </div>
      <div class="text" v-if="rate.list">
        <p>{{rate.list[0].content}}</p>
      </div>
      <div class="einformation" v-if="rate.list">
        <span>{{rate.list[0].created|showDate}}</span>
        <span>{{rate.list[0].style}}</span>
        <div class="einformation-image"  v-if="rate.list[0].images" >
          <img :src="item" alt="" v-for="(item,index) in rate.list[0].images" :key="index">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from 'common/utils';
export default {
  name:"DetailComment",
  data(){
    return{
    }
  },
  props:{
    rate:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  filters: {
      showDate(value) {
        //将时间戳转换成date对象
        const date = new Date(value * 1000);
        //将date进行格式化
        return formatDate(date, 'yyyy-MM-dd');
      }
    }
}
</script>

<style scoped>
.comment-info{
  font-size: 15px;
  color: var(--color-text);
  padding: 10px;
  border-bottom:8px solid #f6f6f6 ;
}
.comment-title{
  border-bottom:1px solid #f6f6f6;
  padding-bottom:5px ;
  position: relative;
}
.more{
  position: relative;
  left:70%;
}
.comment-section{
  margin-top:10px ;
}
.person span{
  margin-left: 10px;
}
.avatar{
  width:50px;
  height: 50px;
  border-radius: 50% 50%;
  vertical-align: middle;
}
.text{
  margin-top: 10px;
  font-size:14px;
}
.einformation{
  margin-top:10px ;
  font-size: 14px;
  color: rgb(181, 181, 181);
}
.einformation span:nth-child(2){
  margin-left: 10px;
}
.einformation-image img{
  width: 60px;
  height: 60px;
  display: block;
  margin-top:3px ;
}
</style>
