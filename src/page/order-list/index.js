/**
 * @Author: troykevin
 * @Date:   2018-11-15T17:34:38+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-11-15T22:11:58+08:00
 */
 'use strict';
 require('./index.css')
 require('page/common/nav/index.js')
 require('page/common/header/index.js')
 var navSide            = require('page/common/nav-side/index.js')
 var _gm              = require('util/gitmall.js')
 var templateIndex    = require('./index.string');
 var Pagination       = require('util/pagination/index.js');
 var _order           = require('service/order-service.js');

 //page的逻辑
 var page = {
     data : {
        listParam : {
            pageNum     : 1,
            pageSize    : 10
        }
     },
     init : function(){
         console.log(1);
         this.onLoad();

     },
     onLoad : function(){
         this.loadOrderList();
         // 初始化左侧菜单
         navSide.init({
             name: 'order-list'
         })
     },
     // 加载订单列表
     loadOrderList : function(){
         var _this = this;
         var orderListHtml = '';
         var $listCon = $('.order-list-con');
         $listCon.html('<div class="loading"></div>')
         _order.getOrderList(this.data.listParam, function(res){
             // 渲染html
             orderListHtml = _gm.renderHtml(templateIndex, res);
             $listCon.html(orderListHtml);
             _this.loadPagination({
                 hasPreviousPage    : res.hasPreviousPage,
                 prePage            : res.prePage,
                 hasNextPage        : res.hasNextPage,
                 nextPage           : res.nextPage,
                 pageNum            : res.pageNum,
                 pages              : res.pages
             });
         },function(errMsg){
             $listCon.html('<p class="err-tip">加载失败</p>');
         })
     },
     // 加载分页信息
     loadPagination : function(pageInfo){
         var _this = this;
         this.pagination ? '' : this.pagination = new Pagination();
         this.pagination.render($.extend({}, pageInfo, {
             container : $('.pagination'),
             onSelectPage : function(pageNum){
                 _this.data.listParam.pageNum = pageNum;
                 _this.loadOrderList();
             }
         }));
     }
 };
 $(function(){
     page.init();
 })
