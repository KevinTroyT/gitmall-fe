/**
 * @Author: troykevin
 * @Date:   2018-11-13T21:17:49+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-11-15T17:03:57+08:00
 */
 'use strict';
 require('./index.css');
 require('page/common/header/index.js')
 require('page/common/nav/index.js')
 const _gm              = require('util/gitmall.js')
 const templateAddress  = require('./address-list.string');
 const templateProduct  = require('./product-list.string');
 const _order           = require('service/order-service.js');
 const _address         = require('service/address-service.js');
 const addressModal     = require('./address-modal.js');
 let page = {
     data : {
         selectedAddressId : null,
     },
     init : function(){
         this.onLoad();
         this.bindEvent();
     },
     onLoad : function(){
         this.loadAddressList();
         this.loadProductList();
     },
     bindEvent : function(){
         let _this = this;

         // 地址选择
         $(document).on('click', '.address-item', function(){
             $(this).addClass('active')
                .siblings('.address-item').removeClass('active');
            _this.data.selectedAddressId = $(this).data('id');
         });
         // 地址添加
         $(document).on('click', '.address-add', function(){
            addressModal.show({
                isUpdate : false,
                onSuccess : function(){
                    _this.loadAddressList();
                }
            });
         });
         // 地址编辑
         $(document).on('click', '.address-update', function(e){
             e.stopPropagation();
             let shippingId = $(this).parents('.address-item').data('id');
            _address.getAddress(shippingId, function(res){
                addressModal.show({
                    isUpdate    : true,
                    data        : res,
                    onSuccess   : function(){
                        _this.loadAddressList();
                    }
                });
            },function(errMsg){
                _gm.errorTips(errMsg);
            });

         });
         // 地址删除
         $(document).on('click', '.address-delete', function(e){
            e.stopPropagation();
            let id = $(this).parents('.address-item').data('id');
            if(window.confirm('确认删除此地址吗')){
                _address.deleteAddress(id,function(res){
                    _this.loadAddressList();
                },function(errMsg){
                    _gm.errorTips(errMsg);
                })
            }

         });
         // 订单提交
         $(document).on('click', '.order-submit', function(){

             let shippingId = _this.data.selectedAddressId;
             if (shippingId) {
                 _order.createOrder({shippingId:shippingId},function(res){
                     window.location.href = './payment.html?orderNumber='+res.orderNo;
                 },function(errMsg){
                     _gm.errorTips(errMsg);
                 });
             }else{
                 _gm.errorTips('请选择地址后再提交');
             }
         });
     },
     // 加载商品
     loadProductList : function(){
         $('.product-con').html('<div class="loading"></div>');
         let _this       = this;
         _order.getProductList(function(res){
             let productListHtml = _gm.renderHtml(templateProduct, res);
             $('.product-con').html(productListHtml);
         },function(errMsg){
             $('.product-con').html('<p class="err-tip">商品信息加载失败，刷新重试</p>');
         })

     },
     // 加载地址
     loadAddressList : function(){
         $('.address-con').html('<div class="loading"></div>');
         let _this       = this;
         _address.getAddressList(function(res){
             _this.addressFilter(res);
             let addressListHtml = _gm.renderHtml(templateAddress, res);
             $('.address-con').html(addressListHtml);
         },function(errMsg){
             $('.address-con').html('<p class="err-tip">地址加载失败，刷新重试</p>');
         })

     },
     // 处理地址列表中的选中
     addressFilter : function(data){
         if(this.data.selectedAddressId){
             let selectedAddressIdFlag = false;
             for(let i = 0,length = data.list.length;i<length;i++){
                 if(data.list[i].id === this.data.selectedAddressId){
                     data.list[i].isActive = true;
                     selectedAddressIdFlag = true;
                 }
             }
             if(!selectedAddressIdFlag){
                 this.data.selectedAddressId = null;
             }
         }
     }
 }
 $(function(){
    page.init();
 })
