/**
 * @Author: troykevin
 * @Date:   2018-11-16T00:09:54+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-11-16T00:19:10+08:00
 */
 'use strict';
 const _gm = require('util/gitmall.js');

 let _payment = {
     // 获取支付信息
     getPaymentInfo : function(orderNumber,resolve, reject){
         _gm.request({
             url         : _gm.getServerUrl('/order/pay.do'),
             data        : {
                orderNo     : orderNumber
             },
             success     : resolve,
             error       : reject
         });
     },
     // 获取订单状态
     getPaymentStatus : function(orderNumber,resolve, reject){
         _gm.request({
             url         : _gm.getServerUrl('/order/query_order_pay_status.do'),
             data        : {
                orderNo     : orderNumber
             },
             success     : resolve,
             error       : reject
         });
     },
 }
 module.exports = _payment;
