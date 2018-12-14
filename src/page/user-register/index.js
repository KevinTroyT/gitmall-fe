/**
 * @Author: KevinTroyT
 * @Date:   2018-11-06T10:55:13+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   KevinTroyT
 * @Last modified time: 2018-11-07T23:32:26+08:00
 */

 'use strict';
 require('./index.css');
 require('page/common/nav-simple/index.js')
 const _gm       = require('util/gitmall.js')
 const _user     = require('service/user-service.js')
 //表单里的错误提示
 const formError = {
     show : function(errMsg){
         $('.error-item').show().find('.err-msg').text(errMsg);
     },
     hide : function(){
         $('.error-item').hide().find('.err-msg').text('');
     }
 }
 //page的逻辑
 let page = {
     init : function(){
         this.bindEvent();
     },
     bindEvent : function(){
         let _this = this;
         //验证username
         $('#username').blur(function(){
           let username = $.trim($(this).val());
           //用户名为空就不验证
           if(!username){
             return;
           }
           //异步验证用户名
           _user.checkUsername(username,function(res){
             formError.hide();
           },function(errMsg){
             formError.show(errMsg);
           })
         });
         $('#submit').click(function(event) {
             /* Act on the event */
             _this.submit();
         });
         //Enter For Register
         $('.user-content').keyup(function(event) {
             /* Act on the event */
             // 13 === Enter.keycode
             if (event.keycode === 13){
                 _this.submit();
             }
         });
     },
     // 提交伪表单
     submit : function(){
         let formData = {
             username         : $.trim($('#username').val()),
             password         : $.trim($('#password').val()),
             passwordConfirm  : $.trim($('#password-confirm').val()),
             phone            : $.trim($('#phone').val()),
             email            : $.trim($('#email').val()),
             question         : $.trim($('#question').val()),
             answer           : $.trim($('#answer').val())
         },
         //表单验证结果
         validateResult = this.formValidate(formData);
         if(validateResult.status){
             //提交
             _user.register(formData,function(res){
                 window.location.href = './result.html?type=register';
             },function(errMsg){
                 formError.show(errMsg)
             });
         }else{
             //错误提示
             formError.show(validateResult.msg)
         }

     },
     formValidate : function(formData){
         let result = {
             status  : false,
             msg     : ''
         }
         // 用户名验非空
         if(!_gm.validate(formData.username,'require')){
             result.msg = '用户名不能为空'
             return result
         }
         // 密码验非空
         if(!_gm.validate(formData.password,'require')){
             result.msg = '密码不能为空'
             return result
         }
         // 密码长度
         if(formData.password.length < 8){
             result.msg = '密码长度不能小于8位'
             return result
         }
         // 验证两次输入密码是否一致
         if(formData.password !== formData.passwordConfirm){
             result.msg = '密码两次输入不一致'
             return result
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
             result.msg = '请输入正确密码问题'
             return result
         }
         // 验证密码提示问题答案
         if(!_gm.validate(formData.answer,'require')){
             result.msg = '请输入正确密码答案'
             return result
         }
         //通过验证
         result.status = true;
         result.msg    = '验证通过';
         return result;
     }
 };
 $(function(){
     page.init();
 })
