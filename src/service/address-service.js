/**
 * @Author: troykevin
 * @Date:   2018-11-13T22:01:52+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-12-15T00:10:52+08:00
 */
 'use strict';
 var _gm = require('util/gitmall.js');

 var _address = {
     //获取地址列表
     getAddressList : function(resolve, reject){
         _gm.request({
             url         : _gm.getServerUrl('/shipping/list.do'),
             data        : {
                 pageSize : 50
             },
             success     : resolve,
             error       : reject
         });
     },
     // 新建收件人
     save : function(addressInfo, resolve, reject){
         _gm.request({
             url         : _gm.getServerUrl('/shipping/add.do'),
             data        : addressInfo,
             success     : resolve,
             error       : reject
         });
     },
     // 更新收件人
     update : function(addressInfo, resolve, reject){
         _gm.request({
             url         : _gm.getServerUrl('/shipping/update.do'),
             data        : addressInfo,
             success     : resolve,
             error       : reject
         });
     },
     // 删除收件人
     deleteAddress : function(shippingId, resolve, reject){
         _gm.request({
             url         : _gm.getServerUrl('/shipping/del.do'),
             data        : {
                 shippingId : shippingId
             },
             success     : resolve,
             error       : reject
         });
     },
     // 获取单条收件人信息
     getAddress : function(shippingId, resolve, reject){
         _gm.request({
             url         : _gm.getServerUrl('/shipping/select.do'),
             data        : {
                 shippingId : shippingId
             },
             success     : resolve,
             error       : reject
         });
     },
 }
 module.exports = _address;
