/*
* @Author: KevinTroyT
* @Date:   2018-11-05 16:39:41
* @Last Modified by:   KevinTroyT
* @Last Modified time: 2018-11-05 19:40:41
*/
require('./index.css');
const _gm = require('util/gitmall.js')
const _user = require('service/user-service.js')
const _cart = require('service/cart-service.js')
let nav = {
    init : function(){
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent : function(){
        // 登录点击
        $('.js-login').click(function(event) {
            /* Act on the event */
            _gm.doLogin();
        });
        // 注册点击
        $('.js-register').click(function(event) {
            /* Act on the event */
            window.location.href = "./register.html"
        });
        // 退出点击事件
        $('.js-logout').click(function(event) {
            /* Act on the event */
            _user.logout(function(res){
                window.location.reload();
            },function(errMsg){
                _gm.errorTips(errMsg)
            })
        });
    },
    //加载用户信息
    loadUserInfo : function(){
        _user.checkLogin(function(res){
            $('.user.not-login').hide().siblings('.user.login').show().finde('.username').text('res.username')
        },function(errMsg){
            //Do Nothing
        })
    },
    //加载购物车数量
    loadCartCount : function(){
        _cart.getCartCount(function(res){
            $('.nav .cart-count').text(res || 0)
        },function(errMsg){
            $('.nav .cart-count').text(0)
        })
    }
};
module.exports = nav.init();