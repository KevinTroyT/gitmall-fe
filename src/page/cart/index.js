/**
 * @Author: troykevin
 * @Date:   2018-11-13T08:44:13+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-11-13T20:53:57+08:00
 */
'use strict';
require('./index.css');
require('page/common/header/index.js')
const nav              = require('page/common/nav/index.js')
const _gm              = require('util/gitmall.js')
const templateIndex    = require('./index.string');
const _cart            = require('service/cart-service.js');
let page = {
    data : {

    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadCart();
    },
    bindEvent : function(){
        let _this = this;
        // 商品选择/取消选择
        $(document).on('click', '.cart-select', function(){
            let $this = $(this);
            let productId = $this.parents('.cart-table').data('product-id');
            // 切换选中状态
            if($this.is(':checked')){
                // 选中
                _cart.selectProduct(productId, function(res){
                    _this.renderCart(res)
                },function(errMsg){
                    showCartError(errMsg);
                });
            }else{
                // 取消选择
                _cart.unselectProduct(productId, function(res){
                    _this.renderCart(res)
                },function(errMsg){
                    showCartError(errMsg);
                });
            }
        });
        //全选 取消全选
        $(document).on('click', '.cart-select-all', function(){
            let $this = $(this);
            // 切换选中状态
            if($this.is(':checked')){
                //  全选
                _cart.selectAllProduct(function(res){
                    _this.renderCart(res)
                },function(errMsg){
                    showCartError(errMsg);
                });
            }else{
                // 取消全选
                _cart.unselectAllProduct(function(res){
                    _this.renderCart(res)
                },function(errMsg){
                    showCartError(errMsg);
                });
            }
        });
        // 商品数量
        $(document).on('click', '.count-btn', function(){
            let $this       = $(this);
            let $pCount     = $this.siblings('.count-input');
            let type        = $this.hasClass('plus')  ? 'plus' : 'minus';
            let productId   = $this.parents('.cart-table').data('product-id');
            let currCount   = parseInt($pCount.val());
            let minCount    = 1;
            let maxCount    = parseInt($pCount.data('max'));
            let newCount    = 0;
            if(type === 'plus'){
                if(currCount >= maxCount){
                    _gm.errorTips('商品数量上限');
                    return;
                }
                newCount = currCount + 1
            }else{
                if(currCount <= minCount){
                    return;
                }
                newCount = currCount - 1
            }
            _cart.updateProduct({
                productId : productId,
                count : newCount
            },function(res){
                _this.renderCart(res);
            },function(errTips){
                showCartError(errMsg);
            })
        });
        // 删除单个商品
        $(document).on('click', '.cart-delete', function(){
            if(window.confirm('确认删除该商品吗？')){
                let productId   = $(this).parents('.cart-table').data('product-id');
                _this.deleteCartProduct(productId)
            }
        });
        // 删除选中商品
        $(document).on('click', '.delete-selected', function(){
            if(window.confirm('确认删除选中的商品吗？')){
                let arrProductIds = [];
                let $selectedItem = $(".cart-select:checked");
                // 遍历查找选中的
                for(let i = 0,iLength = $selectedItem.length;i<iLength;i++){
                    arrProductIds.push($($selectedItem[i]).parents('.cart-table').data('product-id'));
                }
                if(arrProductIds.length){
                    _this.deleteCartProduct(arrProductIds.join(','));
                }else{
                    _gm.errorTips('请先选中');
                }
            }
        });
        // 提交购物车
        $(document).on('click', '.btn-submit', function(){
            // 总价>0提交
            if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
                window.location.href = './confirm.html';
            }else{
                _gm.errorTips('请选择商品后再提交');
            }
        });
    },
    // 加载购物车
    loadCart : function(){
        let _this       = this;
        _cart.getCartList(function(res){
            _this.renderCart(res);
        },function(errMsg){
            showCartError(errMsg);
        })

    },
    filter : function(data){
        data.notEmpty = !!data.cartProductVoList.length;
    },
    // 删除指定商品
    deleteCartProduct : function(productIds){
        let _this = this;
        _cart.deleteProduct(productIds, function(res){
            _this.renderCart(res);
        },function(errMsg){
            showCartError(errMsg);
        })
    },
    // 渲染购物车
    renderCart : function(data){
        this.filter(data);
        // 缓存购物车
        this.data.cartInfo = data;
        // 生成html
        let cartHtml = _gm.renderHtml(templateIndex, data);
        $('.page-wrap').html(cartHtml)
        // 更新导航内的购物车
        nav.loadCartCount();
    },
    showCartError : function(errMsg){
        console.log(errMsg);
        $('.page-wrap').html('<p class="err-tip">哪里不对了,刷行看看</p>')
    }
}
$(function(){
   page.init();
})
