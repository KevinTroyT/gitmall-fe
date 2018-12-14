/**
 * @Author: KevinTroyT
 * @Date:   2018-11-07T16:07:40+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   KevinTroyT
 * @Last modified time: 2018-11-07T17:30:09+08:00
 */


 'use strict';
 require('./index.css');
 require('page/common/nav-simple/index.js')
 var _gm       = require('util/gitmall.js')
 var _user     = require('service/user-service.js')
 //表单里的错误提示
 var formError = {
     show : function(errMsg){
         $('.error-item').show().find('.err-msg').text(errMsg);
     },
     hide : function(){
         $('.error-item').hide().find('.err-msg').text('');
     }
 }
 //page的逻辑
 var page = {
     data : {
         username   : '',
         question   : '',
         answer     : '',
         token      : '',
     },
     init : function(){
         this.onLoad();
         this.bindEvent();
     },
     onLoad : function(){
        this.loadStepUsername();
     },
     bindEvent : function(){
         var _this = this;
         //输入用户名后的按钮点击
         $('#submit-username').click(function(event) {
             /* Act on the event */
            var username = $.trim($('#username').val());
            if(username){
                _user.getQuestion(username,function(res){
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuesion();
                },function(errMsg){
                    formError.show(errMsg);
                })
            }else{
                formError.show('请输入用户名')
            }
         });
         //输入密码提示问题答案的按钮点击
         $('#submit-answer').click(function(event) {
             /* Act on the event */
            var answer = $.trim($('#answer').val());
            if(answer){
                //检查密码提示问题答案
                _user.checkAnswer({
                    username : _this.data.username,
                    question : _this.data.question,
                    answer   : answer,
                },function(res){
                    _this.data.answer   = answer;
                    _this.data.token    = res;
                    _this.loadStepPassword();
                },function(errMsg){
                    formError.show(errMsg);
                })
            }else{
                formError.show('请输入安全问题答案')
            }
         });
         //输入新密码后的按钮点击
         $('#submit-password').click(function(event) {
             /* Act on the event */
            var password = $.trim($('#password').val());
            if(password && password.length >=8){
                //检查密码提示问题答案
                _user.resetPassword({
                    username        : _this.data.username,
                    passwordNew     : password,
                    forgetToken     : _this.data.token,
                },function(res){
                    window.location.href= './result.html?type=pass-reset'
                },function(errMsg){
                    formError.show(errMsg);
                })
            }else{
                formError.show('请输入新密码')
            }
         });

     },
     // 加载输入用户名
     loadStepUsername : function(){
         $('.step-username').show();
     },
     // 加载输入密码提示问题答案
     loadStepQuesion  : function(){
         //清除错误提示
         formError.hide();
         //做容器的切换
         $('.step-username').hide()
            .siblings('.step-question').show()
            .find('.question').text(this.data.question);
     },
     // 加载输入password
     loadStepPassword : function(){
         //清除错误提示
         formError.hide();
         //做容器的切换
         $('.step-question').hide().siblings('.step-password').show()
     },
 };
 $(function(){
     page.init();
 })
