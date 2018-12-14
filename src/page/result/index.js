/*
* @Author: KevinTroyT
* @Date:   2018-11-05 21:46:17
 * @Last modified by:   troykevin
 * @Last modified time: 2018-11-16T00:43:23+08:00
*/
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js')
var _gm = require('util/gitmall.js')
$(function(){
    var type = _gm.getUrlParam('type') || 'default',
        $element = $('.'+ type + '-success');
    if(type === 'payment'){
        var $orderNumber = $element.find('.order-number'),
            orderNumber  = _gm.getUrlParam('orderNumber');
        $orderNumber.attr('href', $orderNumber.attr('href') + orderNumber);
    }
    //显示对应的提示元素
    $element.show();
})
