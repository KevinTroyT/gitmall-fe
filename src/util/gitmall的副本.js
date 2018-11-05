/*
* @Author: KevinTroyT
* @Date:   2018-11-01 14:03:32
* @Last Modified by:   KevinTroyT
* @Last Modified time: 2018-11-02 10:33:07
*/
'use strict';
var conf = {
    serverHost : ''
}
var _gm = {
    //网络请求
    request : function(param){
        var _this = this;
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
                typeof param.error === 'function' && param.error(err.status)
            }
        });  
    },
    //获取服务器地址
    getServerUrl : function(path){
        return conf.serverHost + path;
    },
    //获取url参数
    getUrlParam : function(){
        var reg = new RegExp('(^|&)'+ name + '=([^&]*(&|$))');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    }
    //统一登录处理
    doLogin : function(){
        window.location.href= './login.html?redirect=' + encodeURIComponent(window.location.href);
    }
};

module.exports = _gm;