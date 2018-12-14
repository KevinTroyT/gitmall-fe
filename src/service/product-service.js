/**
 * @Author: KevinTroyT
 * @Date:   2018-11-08T14:59:47+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-12-15T00:10:57+08:00
 */
 'use strict';

 var _gm = require('util/gitmall.js');

 var _product = {
     // 获取商品列表
     getProductList : function(listParam, resolve, reject){
         _gm.request({
             url         : _gm.getServerUrl('/product/list.do'),
             data        : listParam,
             success     : resolve,
             error       : reject
         });
     },
     // 获取商品详细信息
     getProductDetail : function(productId, resolve, reject){
         _gm.request({
             url         : _gm.getServerUrl('/product/detail.do'),
             data        : {
                 productId : productId
             },
             success     : resolve,
             error       : reject
         });
     }
 }
 module.exports = _product;
