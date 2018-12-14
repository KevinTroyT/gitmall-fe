/*
* @Author: KevinTroyT
* @Date:   2018-11-05 17:09:31
 * @Last modified by:   troykevin
 * @Last modified time: 2018-12-15T00:10:53+08:00
*/
'use strict';
var _gm = require('util/gitmall.js');

var _cart = {
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
    },
    // 选择商品
    selectProduct       : function(productId, resolve, reject){
        _gm.request({
            url         : _gm.getServerUrl('/cart/select.do'),
            data        : {
                productId : productId
            },
            success     : resolve,
            error       : reject
        });
    },
    // 取消选择商品
    unselectProduct       : function(productId, resolve, reject){
        _gm.request({
            url         : _gm.getServerUrl('/cart/un_select.do'),
            data        : {
                productId : productId
            },
            success     : resolve,
            error       : reject
        });
    },
    // 获取购物车列表
    getCartList : function(resolve, reject){
        _gm.request({
            url         : _gm.getServerUrl('/cart/list.do'),
            success     : resolve,
            error       : reject
        });
    },
    // 全选
    selectAllProduct : function(resolve, reject){
        _gm.request({
            url         : _gm.getServerUrl('/cart/select_all.do'),
            success     : resolve,
            error       : reject
        });
    },
    // 取消全选
    unselectAllProduct : function(resolve, reject){
        _gm.request({
            url         : _gm.getServerUrl('/cart/un_select_all.do'),
            success     : resolve,
            error       : reject
        });
    },
    // 更新购物车商品数量
    updateProduct       : function(productInfo, resolve, reject){
        _gm.request({
            url         : _gm.getServerUrl('/cart/update.do'),
            data        : productInfo,
            success     : resolve,
            error       : reject
        });
    },
    // 删除购物车商品
    deleteProduct       : function(productIds, resolve, reject){
        _gm.request({
            url         : _gm.getServerUrl('/cart/delete_product.do'),
            data        : {
                productIds : productIds
            },
            success     : resolve,
            error       : reject
        });
    },
}
module.exports = _cart;
