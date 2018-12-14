/**
 * @Author: KevinTroyT
 * @Date:   2018-11-09T13:54:36+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-11-12T14:28:22+08:00
 */
'use strict';
require('./index.css');
var _gm               = require('util/gitmall.js')
var templatePaination = require('./index.string');
var Pagination = function (){
    var _this = this;
    this.defaultOption = {
        container       : null,
        pageNum         : 1,
        pageRange       : 3,
        onSelectPage    : null,
    };
    //绑定事件
    $(document).on('click', '.pg-item', function(){
        var $this = $(this);
        if($this.hasClass('active') || $this.hasClass('disabled')){
            return;
        }
        typeof _this.option.onSelectPage === 'function'
            ?  _this.option.onSelectPage($this.data('value')) : null;

    })
}
// 渲染分页组件
Pagination.prototype.render = function(userOption){
    this.option = $.extend({},this.defaultOption, userOption)
    // 判断容器是否为合法的jQuery对象
    if (!(this.option.container instanceof jQuery)){
        return;
    }
    // 判断是否只有一页
    // console.log(this.option.pages);
    if (this.option.pages <= 1){
        return;
    }
    // 渲染分页内容
    this.option.container.html(this.getPaginationHtml());
}
// 获取分页内容
Pagination.prototype.getPaginationHtml = function(){
    var html        = '';
    var pageArray   = [];
    var option      = this.option;
    var start       = this.option.pageNum - option.pageRange > 0 ? option.pageNum - option.pageRange : 1;
    var end         = option.pageNum + option.pageRange < option.pages ? option.pageNum + option.pageRange : option.pages;
    // 上一页按钮的数据
    pageArray.push({
        name : '上一页',
        value : this.option.prePage,
        disabled : !(this.option.hasPreviousPage)
    });
    // 数字按钮的处理
    for (var i = start;i <= end;i++){
        pageArray.push({
            name : i,
            value : i,
            active : (i === option.pageNum)
        })
    }
    // 下一页按钮的数据
    pageArray.push({
        name : '下一页',
        value : this.option.nextPage,
        disabled : !this.option.hasNextPage
    });

    html = _gm.renderHtml(templatePaination,{
        pageArray   : pageArray,
        pageNum     : option.pageNum,
        pages       : option.pages
    })
    return html
};

module.exports = Pagination;
