/**
 * @Author: troykevin
 * @Date:   2018-11-15T22:02:45+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-11-15T23:00:30+08:00
 */
 'use strict';
 require('./index.css')
 require('page/common/nav/index.js')
 require('page/common/header/index.js')
 let navSide            = require('page/common/nav-side/index.js')
 const _gm              = require('util/gitmall.js')
 const templateIndex    = require('./index.string');
 const _order           = require('service/order-service.js');

 //page的逻辑
 let page = {
     data : {
        orderNumber : _gm.getUrlParam('orderNumber')
     },
     init : function(){
         this.onLoad();
         this.bindEvent();
     },
     onLoad : function(){
         // 初始化左侧菜单
         navSide.init({
             name: 'order-list'
         })
         this.loadDetail();
     },
     bindEvent : function(){
         let _this = this;
         $(document).on('click','.order-cancel', function(){
             _order.cancelOrder(_this.data.orderNumber, function(res){
                 _gm.successTips('该订单取消成功');
                 _this.loadDetail();
             },function(errMsg){
                 _gm.errorTips(errMsg);
             });
         })
     },
     // 加载详情
     loadDetail : function(){
         let _this = this;
         let orderDetailHtml = '';
         let $content = $('.content');
         $content.html('<div class="loading"></div>')
         _order.getOrderDetail(this.data.orderNumber, function(res){
             _this.dataFilter(res);
             // 渲染html
             orderDetailHtml = _gm.renderHtml(templateIndex, res);
             $content.html(orderDetailHtml);
         },function(errMsg){
             $content.html('<p class="err-tip">'+errMsg+'</p>');
         })
     },
     // 数据适配
     dataFilter : function(data){
         data.needPay       = data.status == 10;
         data.isCancelable  = data.status == 10;
     }
 };
 $(function(){
     page.init();
 })
