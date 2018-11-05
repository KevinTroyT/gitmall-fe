/*
* @Author: KevinTroyT
* @Date:   2018-11-05 17:09:31
* @Last Modified by:   KevinTroyT
* @Last Modified time: 2018-11-05 19:28:41
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
    }
}
module.exports = _cart;