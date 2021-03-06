/**
 * @Author: KevinTroyT
 * @Date:   2018-11-08T14:58:05+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-12-15T00:17:15+08:00
 */
 'use strict';
 require('./index.css')
 require('page/common/nav/index.js')
 require('page/common/header/index.js')
 var _gm              = require('util/gitmall.js')
 var templateIndex    = require('./index.string');
 var Pagination       = require('util/pagination/index.js');
 var _product         = require('service/product-service.js');
 var page = {
     data : {
         listParam : {
             keyword     : _gm.getUrlParam('keyword')       || '',
             categoryId  : _gm.getUrlParam('categoryId')    || '',
             orderBy     : _gm.getUrlParam('orderBy')       || 'default',
             pageNum     : _gm.getUrlParam('pageNum')       || 1,
             pageSize    : _gm.getUrlParam('pageSize')      || 20
         }
     },
     init : function(){
         this.onLoad();
         this.bindEvent();
     },
     onLoad : function(){
         this.loadList();
     },
     bindEvent : function(){
         var _this = this
         $('.sort-item').click(function(event) {
             /* Act on the event */
             // 排序的点击事件
             var $this = $(this)
             _this.data.listParam.pageNum = 1;
             // 点击默认排序
             if($this.data('type') === 'default'){
                 // 已经active样式
                 if ($this.hasClass('active')){
                     return;
                 }else{
                     // 没有active样式
                    $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default'

                }
            // 点击价格排序
            }else if($this.data('type') === 'price'){
                    $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                        //升序
                    if(!$this.hasClass('asc')){
                        $this.addClass('asc').removeClass('desc');
                        _this.data.listParam.orderBy = 'price_asc'
                    }else{
                        //降序
                        $this.addClass('desc').removeClass('asc');
                        _this.data.listParam.orderBy = 'price_desc'
                    }
                }
              // 重新加载
              _this.loadList();
         });
     },
     // 加载List数据
     loadList : function(){
         var listParam   = this.data.listParam;
         var   listHtml  = '';
         var _this       = this;
         var $pListCon   = $('.p-list-con')
         $pListCon.html('<div class="loading"></div>');
         // 删除参数中不用的字段
         listParam.categoryId ? delete listParam.keyword : delete listParam.categoryId;
         //请求接口
         _product.getProductList(listParam, function(res){
             console.log(res.list);
             listHtml = _gm.renderHtml(templateIndex, {
                 list :   res.list
             });
             $('.p-list-con').html(listHtml);
             _this.loadPagination({
                 hasPreviousPage    : res.hasPreviousPage,
                 prePage            : res.prePage,
                 hasNextPage        : res.hasNextPage,
                 nextPage           : res.nextPage,
                 pageNum            : res.pageNum,
                 pages              : res.pages,
             });
         },function(errMsg){
             _gm.errorTips(errMsg);
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
                 _this.loadList();
             }
         }));
     }

 }
$(function(){
    page.init();
})
