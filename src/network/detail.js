import { request } from "./request"         //网络封装

export function getDetailData(iid) {             //根据商品id获取数据
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}

export function getRecommend() {               //获取推荐商品数据
    return request({
        url: '/recommend',
    })
}


export class Goods {                              //定义一个类，保存商品的基本信息
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDesc
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice
    }
}

export class Shop {                           //定义一个类，保存店铺的基本信息
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods;
    }
}
export class GoodsParams {                   //定义一个类，保存商品的参数信息
    constructor(info, rule) {
        this.image = info.images ? info.images[0] : "";
        this.infos = info.set;
        this.size = rule.tables;
     }
    }
