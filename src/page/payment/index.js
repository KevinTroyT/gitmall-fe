/**
 * @Author: troykevin
 * @Date:   2018-11-15T23:19:45+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-11-16T00:21:55+08:00
 */
 'use strict';
 require('./index.css')
 require('page/common/nav/index.js')
 require('page/common/header/index.js')
 const _gm              = require('util/gitmall.js')
 const templateIndex    = require('./index.string');
 const _payment         = require('service/payment-service.js');

 //page的逻辑
 let page = {
     data : {
        orderNumber : _gm.getUrlParam('orderNumber')
     },
     init : function(){
         this.onLoad();
     },
     onLoad : function(){
         this.loadPaymentInfo();
     },
     // 加载详情
     loadPaymentInfo : function(){
         let _this = this;
         let paymentHtml = '';
         let $pageWrap = $('.page-wrap');
         $pageWrap.html('<div class="loading"></div>')
         _payment.getPaymentInfo(this.data.orderNumber, function(res){
             // 渲染html
             paymentHtml = _gm.renderHtml(templateIndex, res);
             $pageWrap.html(paymentHtml);
             _this.listenOrderStatus();
         },function(errMsg){
             $pageWrap.html('<p class="err-tip">'+errMsg+'</p>');
         })
     },
     // 监听订单状态
     listenOrderStatus : function(){
         let _this = this;
         this.paymentTimer = window.setInterval(function(){
             _payment.getPaymentStatus(_this.data.orderNumber,function(res){
                 if(res == true){
                     window.location.href = './result.html?type=payment&orderNumber='+ _this.data.orderNumber
                 }
             },function(errMsg){

             });
         },5e3)
     }
 };
 $(function(){
     page.init();
 })
