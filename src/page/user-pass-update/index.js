/**
 * @Author: KevinTroyT
 * @Date:   2018-11-08T09:24:21+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   KevinTroyT
 * @Last modified time: 2018-11-08T09:45:33+08:00
 */

  'use strict';
  require('./index.css')
  require('page/common/nav/index.js')
  require('page/common/header/index.js')
  var navSide            = require('page/common/nav-side/index.js')
  var _gm              = require('util/gitmall.js')
  var _user            = require('service/user-service.js');

  //page的逻辑
  var page = {
      init : function(){
          this.onLoad();
          this.bindEvent();
      },
      onLoad : function(){
          // 初始化左侧菜单
          navSide.init({
              name: 'user-pass-update'
          })
      },
      bindEvent : function(){
          var _this = this;
          //点击提交按钮后
          $(document).on("click", '.btn-submit', function(){
              var userInfo = {
                  password      : $.trim($('#password').val()),
                  passwordNew      : $.trim($('#password-new').val()),
                  passwordConfirm   : $.trim($('#password-confirm').val()),
              }
              var validateResult = _this.validateForm(userInfo);
              if (validateResult.status){
                  _user.updatePassword({
                      passwordOld : userInfo.password,
                      passwordNew : userInfo.passwordNew
                  }, function(res, msg){
                      _gm.successTips(msg);
                  }, function(errMsg){
                      _gm.errorTips(validateResult.msg)
                  });
              }else{
                  _gm.errorTips(validateResult.msg)
              }
          })
      },
      validateForm : function(formData){
          var result = {
              status  : false,
              msg     : ''
          }
          // 验证手机号
          if(!_gm.validate(formData.password,'require')){
              result.msg = '原密码不能为空'
              return result
          }
          // 验证新密码长度
          if(!formData.passwordNew || formData.passwordNew.length < 8){
              result.msg = '新密码不正确，密码长度不得小于8位'
              return result
          }
          // 验证两次密码输入答案是否一致
          if(formData.passwordNew !== formData.passwordConfirm){
              result.msg = '两次密码不一致'
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
