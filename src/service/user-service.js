/*
* @Author: KevinTroyT
* @Date:   2018-11-05 16:53:17
* @Last Modified by:   KevinTroyT
* @Last Modified time: 2018-11-05 19:39:47
*/
'use strict';

const _gm = require('util/gitmall.js');

let _user = {
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
    }
}
module.exports = _user;