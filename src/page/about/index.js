/**
 * @Author: troykevin
 * @Date:   2018-11-16T01:17:43+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-11-16T01:20:32+08:00
 */
 'use strict';
 require('./index.css')
 require('page/common/nav/index.js')
 require('page/common/header/index.js')
 let navSide            = require('page/common/nav-side/index.js')
 const _gm              = require('util/gitmall.js')

 //page的逻辑
 let page = {
     init : function(){
         this.onLoad();
     },
     onLoad : function(){
         // 初始化左侧菜单
         navSide.init({
             name: 'about'
         })
     }
 };
 $(function(){
     page.init();
 })
