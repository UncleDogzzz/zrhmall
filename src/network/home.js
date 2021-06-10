import {request} from 'network/request.js'

export function getHomeMultidata(){                //获取首页相关信息，如轮播图，推荐热卖
   return request({
    url:'/home/multidata'
   })
}



export function getHomeGoods(type,page){        //获取商品信息
 return request({
  url:'/home/data',
  params:{
    type,
    page
  }
 })
}
