/*
* @Author: KevinTroyT
* @Date:   2018-11-05 16:53:17
 * @Last modified by:   KevinTroyT
 * @Last modified time: 2018-11-07T15:01:11+08:00
*/
'use strict';

const _gm = require('util/gitmall.js');

let _user = {
    //用户登录
    login : function(userInfo, resolve, reject){
        _gm.request({
            url         : _gm.getServerUrl('/user/login.do'),
            data        : userInfo,
            method      : 'POST',
            success     : resolve,
            error       : reject
        });
    },
    //登出
    logout : function(resolve, reject){
        _gm.request({
            url         : _gm.getServerUrl('/user/logout.do'),
            method      : 'POST',
            success     : resolve,
            error       : reject
        });
    },
    //检查登录状态
    checkLogin : function(resolve, reject){
        _gm.request({
            url         : _gm.getServerUrl('/user/get_user_info.do'),
            method      : 'POST',
            success     : resolve,
            error       : reject
        });
    },
    //检查用户名
    checkUsername : function(username, resolve, reject){
        _gm.request({
            url         : _gm.getServerUrl('/user/check_valid.do'),
            data        : {
              type          : 'username',
              str           : username
            },
            method      : 'POST',
            success     : resolve,
            error       : reject
        });
    },
    //用户注册
    register : function(userInfo, resolve, reject){
        _gm.request({
            url         : _gm.getServerUrl('/user/register.do'),
            data        : userInfo,
            method      : 'POST',
            success     : resolve,
            error       : reject
        });
    }
}
module.exports = _user;
