/*
* @Author: KevinTroyT
* @Date:   2018-10-31 19:27:15
 * @Last modified by:   KevinTroyT
 * @Last modified time: 2018-11-08T14:55:44+08:00
*/
'use strict';
require('page/common/nav/index.js')
require('./index.css')
require('page/common/header/index.js')
require('util/slider/index.js')
let templateBanner  = require('./index.string')
const _gm           = require('util/gitmall.js')

$(function(){
    // 渲染banner的html
    let bannerHtml  = _gm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    // 初始化banner
    let $slider     = $('.banner').unslider({
        dots : true
    });
    // 前一张和后一张操作的事件绑定
    $('.banner-con .banner-arrow').click(function(){
        let forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
     });
});
