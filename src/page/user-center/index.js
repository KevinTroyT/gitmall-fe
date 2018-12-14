/**
 * @Author: KevinTroyT
 * @Date:   2018-11-07T21:33:31+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   KevinTroyT
 * @Last modified time: 2018-11-07T22:18:14+08:00
 */
 'use strict';
 require('./index.css')
 require('page/common/nav/index.js')
 require('page/common/header/index.js')
 var navSide            = require('page/common/nav-side/index.js')
 var _gm              = require('util/gitmall.js')
 var templateIndex    = require('./index.string');
 var _user            = require('service/user-service.js');

 //page的逻辑
 var page = {
     init : function(){
         this.onLoad();
     },
     onLoad : function(){
         // 初始化左侧菜单
         navSide.init({
             name: 'user-center'
         })
         // 加载用户信息
         this.loadUserInfo();
     },
     loadUserInfo : function(){
         _user.getUserInfo(function(res){
             var userHtml = '';
             userHtml = _gm.renderHtml(templateIndex,res);
             $('.panel-body').html(userHtml);
         },function(errMsg){
             _gm.errorTips(errMsg);
         })
     }
 };
 $(function(){
     page.init();
 })
