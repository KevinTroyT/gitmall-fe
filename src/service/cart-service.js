/*
* @Author: KevinTroyT
* @Date:   2018-11-05 17:09:31
 * @Last modified by:   troykevin
 * @Last modified time: 2018-11-13T00:39:57+08:00
*/
'use strict';
const _gm = require('util/gitmall.js');

let _cart = {
    //获取购物车数量
    getCartCount : function(resolve, reject){
        _gm.request({
            url         : _gm.getServerUrl('/cart/get_cart_product_count.do'),
            success     : resolve,
            error       : reject
        });
    },
    // 添加到购物车
    addToCart : function(productInfo, resolve, reject){
        _gm.request({
            url         : _gm.getServerUrl('/cart/add.do'),
            data        : productInfo,
            success     : resolve,
            error       : reject
        });
    }
}
module.exports = _cart;
