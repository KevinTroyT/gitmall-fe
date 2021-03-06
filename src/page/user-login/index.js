/*
* @Author: KevinTroyT
* @Date:   2018-10-31 19:26:34
 * @Last modified by:   troykevin
 * @Last modified time: 2018-11-13T00:05:11+08:00
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
    init : function(){
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        $('#submit').click(function(event) {
            /* Act on the event */
            _this.submit();
        });
        //Enter For Submit
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
        var formData = {
            username : $.trim($('#username').val()),
            password : $.trim($('#password').val())
        },
        //表单验证结果
        validateResult = this.formValidate(formData);
        if(validateResult.status){
            //提交
            _user.login(formData,function(res){
                window.location.href = _gm.getUrlParam('redirect') || './index.html';
            },function(errMsg){
                formError.show(errMsg)
            });
        }else{
            //错误提示
            formError.show(validateResult.msg)
        }

    },
    formValidate : function(formData){
        var result = {
            status  : false,
            msg     : ''
        }
        if(!_gm.validate(formData.username,'require')){
            result.msg = '用户名不能为空'
            return result
        }
        if(!_gm.validate(formData.password,'require')){
            result.msg = '密码不能为空'
            return result
        }
        //通过验证
        result.status = true;
        result.msg    = '验证通过'
        return result;
    }
};
$(function(){
    page.init();
})
