/**
 * @Author: troykevin
 * @Date:   2018-11-12T14:32:56+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-11-13T00:39:26+08:00
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js')
require('page/common/header/index.js')
var _gm              = require('util/gitmall.js')
var templateIndex    = require('./index.string');
var _product         = require('service/product-service.js');
var _cart            = require('service/cart-service.js');
var page = {
    data : {
        productId     : _gm.getUrlParam('productId')       || '',
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 没有传productId 跳回首页
        if(!this.data.productId){
            _gm.goHome();
        }
        this.loadDetail();
    },
    bindEvent : function(){
        var _this = this;

        // 图片预览
        $(document).on('mouseenter', '.p-img-item', function(){
            var imageUrl = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src',imageUrl);
        });
        // count操作
        $(document).on('click', '.p-count-btn' ,function(){
            var type        = $(this).hasClass('plus') ? 'plus' : 'minus';
            var $pCount     = $('.p-count');
            var currCount   = parseInt($pCount.val());
            var minCount    = 1;
            var maxCount    = _this.data.detailInfo.stock || 1;
            if(type === 'plus'){
                $pCount.val(currCount < maxCount ? currCount + 1: maxCount)
            }else if(type === 'minus'){
                $pCount.val(currCount > minCount ? currCount - 1: minCount)
            }
        })
        // 加入购物车
        $(document).on('click', '.cart-add' ,function(){
            _cart.addToCart({
                productId   : _this.data.productId,
                count       : $('.p-count').val()
            },function(res){
                window.location.href = './result.html?type=cart-add'
            },function(errMsg){
                _gm.errTips(errMsg)
            })
        })
    },
    // 加载商品详情数据
    loadDetail : function(){
        var _this       = this;
        var html        = '';
        var $pageWrap   = $('.page-wrap');
        //loading
        $pageWrap.html('<div class="loading"></div>')
        _product.getProductDetail(this.data.productId, function(res){
            _this.filter(res);
            // 缓存住detail的数据
            _this.data.detailInfo = res;
            // render
            html = _gm.renderHtml(templateIndex, res)
            $pageWrap.html(html)
        },function(errMsg){
            $pageWrap.html('<p class="err-tip">此商品不知道跑到哪里去了，去看看别的吧！</p><p class="err-tip">')
        })
    },
    filter : function(data){
        data.subImages = data.subImages.split(',');
    }
}
$(function(){
   page.init();
})
