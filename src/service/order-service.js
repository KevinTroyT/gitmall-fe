/*
* @Author: KevinTroyT
* @Date:   2018-11-05 17:09:31
 * @Last modified by:   troykevin
 * @Last modified time: 2018-11-15T23:00:58+08:00
*/
'use strict';
const _gm = require('util/gitmall.js');

let _order = {
    //获取商品详细信息
    getProductList : function(resolve, reject){
        _gm.request({
            url         : _gm.getServerUrl('/order/get_order_cart_product.do'),
            success     : resolve,
            error       : reject
        });
    },
    // 提交订单
    createOrder : function(orderInfo, resolve, reject){
        _gm.request({
            url         : _gm.getServerUrl('/order/create.do'),
            data        : orderInfo,
            success     : resolve,
            error       : reject
        });
    },
    // 获取订单列表
    getOrderList : function(listParam, resolve, reject){
        _gm.request({
            url         : _gm.getServerUrl('/order/list.do'),
            data        : listParam,
            success     : resolve,
            error       : reject
        });
    },
    // 获取订单详情
    getOrderDetail : function(orderNumber, resolve, reject){
        _gm.request({
            url         : _gm.getServerUrl('/order/detail.do'),
            data        : {
                orderNo     : orderNumber
            },
            success     : resolve,
            error       : reject
        });
    },
    // 取消订单
    cancelOrder : function(orderNumber, resolve, reject){
        _gm.request({
            url         : _gm.getServerUrl('/order/cancel.do'),
            data        : {
                orderNo     : orderNumber
            },
            success     : resolve,
            error       : reject
        });
    },
}
module.exports = _order;
