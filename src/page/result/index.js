/*
* @Author: KevinTroyT
* @Date:   2018-11-05 21:46:17
* @Last Modified by:   KevinTroyT
* @Last Modified time: 2018-11-05 22:08:09
*/
'use strict'; 
require('./index.css');
require('page/common/nav-simple/index.js')
const _gm = require('util/gitmall.js') 
$(function(){
    let type = _gm.getUrlParam('type') || 'default',
        $element = $('.'+ type + '-success');
        //显示对应的提示元素
        $element.show();
})




