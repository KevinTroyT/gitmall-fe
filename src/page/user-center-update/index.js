/**
 * @Author: KevinTroyT
 * @Date:   2018-11-07T21:38:17+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   KevinTroyT
 * @Last modified time: 2018-11-07T23:51:50+08:00
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
         this.bindEvent();
     },
     onLoad : function(){
         // 初始化左侧菜单
         navSide.init({
             name: 'user-center'
         })
         // 加载用户信息
         this.loadUserInfo();
     },
     bindEvent : function(){
         let _this = this;
         //点击提交按钮后
         $(document).on("click", '.btn-submit', function(){
             let userInfo = {
                 phone      : $.trim($('#phone').val()),
                 email      : $.trim($('#email').val()),
                 question   : $.trim($('#question').val()),
                 answer     : $.trim($('#answer').val()),
             }
             let validateResult = _this.validateForm(userInfo);
             if (validateResult.status){
                 _user.updateUserInfo(userInfo, function(res, msg){
                     _gm.successTips(msg);
                     window.location.href = './user-center.html' ;
                 }, function(errMsg){
                     _gm.errorTips(validateResult.msg)
                 });
             }else{
                 _gm.errorTips(validateResult.msg)
             }
         })
     },
     loadUserInfo : function(){
         _user.getUserInfo(function(res){
             let userHtml = '';
             userHtml = _gm.renderHtml(templateIndex,res);
             $('.panel-body').html(userHtml);
         },function(errMsg){
             _gm.errorTips(errMsg);
         })
     },
     validateForm : function(formData){
         let result = {
             status  : false,
             msg     : ''
         }
         // 验证手机号
         if(!_gm.validate(formData.phone,'phone')){
             result.msg = '请输入正确手机号'
             return result
         }
         // 验证手机号
         if(!_gm.validate(formData.email,'mail')){
             result.msg = '请输入正确邮箱'
             return result
         }
         // 验证密码提示问题
         if(!_gm.validate(formData.question,'require')){
             result.msg = '密码问题不能为空'
             return result
         }
         // 验证密码提示问题答案
         if(!_gm.validate(formData.answer,'require')){
             result.msg = '密码答案不能为空'
             return result
         }
         //通过验证
         result.status = true;
         result.msg    = '验证通过';
         return result;
     },
 };
 $(function(){
     page.init();
 })
