/*
* @Author: KevinTroyT
* @Date:   2018-11-05 19:57:23
 * @Last modified by:   KevinTroyT
 * @Last modified time: 2018-11-08T15:02:57+08:00
*/
'use strict';
require('./index.css');
var _gm = require('util/gitmall.js')
//通用的header
var header = {
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        var keyword = _gm.getUrlParam('keyword');
        // keyword回填输入框
        if(keyword){
            $('#search-input').val(keyword);
        }
    },
    bindEvent : function(){
        var _this = this;
        //点击搜索提交
        $('#search-btn').click(function(event) {
            /* Act on the event */
            _this.searchSubmit();
        });
        //输入Enter 做提交
        $('#search-input').keyup(function(e){
            //13 === Enter keycode
            if(e.keyCode === 13){
                _this.searchSubmit();
            }
        })
    },
    //搜索提交
    searchSubmit : function() {
        var keyword = $.trim($('#search-input').val());
        //提交有值 跳转this
        if(keyword){
            window.location.href = './list.html?keyword=' + keyword;
        }//为空则返回
        else{
            _gm.goHome();
        }
    }
};
header.init();
