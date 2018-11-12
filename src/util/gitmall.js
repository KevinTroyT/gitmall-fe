/*
* @Author: KevinTroyT
* @Date:   2018-11-01 14:03:32
 * @Last modified by:   troykevin
 * @Last modified time: 2018-11-13T00:14:51+08:00
*/
'use strict';
let Hogan = require('hogan.js')
let conf = {
    serverHost : ''
}
let _gm = {
    //网络请求
    request : function(param){
        let _this = this;
        $.ajax({
            url             : param.url     || '',
            type            : param.method  || 'get',
            dataType        : param.type    || 'json',
            data            : param.data    || '',
            success         : function(res){
                //请求成功
                if(0 === res.status){
                    typeof param.success === 'function' && param.success(res.data,res.msg)
                }
                //没有登陆状态，需要登录
                else if(10 === res.status){
                    _this.doLogin();
                }
                //请求数据错误
                else if(1 === res.status){
                     typeof param.error === 'function' && param.error(res.msg)
                }
            },
            error           : function(error){
                typeof param.error === 'function' && param.error(error.status)
            }
        });
    },
    getServerUrl : function(path){
        return conf.serverHost + path;
    },
    //获取url参数
    getUrlParam : function(name){
        let reg = new RegExp('(^|&)'+ name + '=([^&]*(&|$))');
        let result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    // 渲染html
    renderHtml : function(htmlTemplate, data){
        let template    = Hogan.compile(htmlTemplate),
            result      = template.render(data);
        return result;
    },
    //成功提示
    successTips :function(msg){
        alert(msg || '操作成功')
    },
    //错误提示
    errorTips :function(msg){
        alert(msg || '哪里不对了～')
    },
    //字段验证，支持非空，手机，邮箱判断
    validate : function(value, type){
        console.log(value);
        value = $.trim(value);
        // 非空验证
        if('require' === type){
            return !!value;
        }
        // 手机号验证
        if('phone' === type){
            return /^1\d{10}$/.test(value);
        }
        // 邮箱验证
        if('mail' === type){
              return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value);
        }
    },
    //统一登录处理
    doLogin : function(){
        window.location.href= './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    goHome : function(){
        window.location.href= './index.html';
    }
};

module.exports = _gm;
