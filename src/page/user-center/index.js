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
 let navSide            = require('page/common/nav-side/index.js')
 const _gm              = require('util/gitmall.js')
 const templateIndex    = require('./index.string');
 const _user            = require('service/user-service.js');

 //page的逻辑
 let page = {
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
             let userHtml = '';
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
