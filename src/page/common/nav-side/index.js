/*
* @Author: KevinTroyT
* @Date:   2018-11-05 21:12:03
* @Last Modified by:   KevinTroyT
* @Last Modified time: 2018-11-05 21:37:35
*/

require('./index.css');
const _gm               = require('util/gitmall.js')
const templateIndex     = require('./index.string');
//侧边导航
let navSide = {
    option : {
        name : '',
        navList : [
            {name: 'user-center', desc: '个人中心', href:'./user-center.html'},
            {name: 'order-list', desc: '我的订单', href:'./order-list.html'},
            {name: 'pass-update', desc: '修改密码', href:'./pass-update.html'},
            {name: 'about', desc: '关于GitMall', href:'./about.html'}
        ]
    },
    init : function(option){
        //合并选项
        $.extend(this.option, option);
        this.renderNav();
    },
    //渲染导航菜单
    renderNav : function(){
        //计算active数据
        for(let i = 0, iLength = this.option.navList.length;i <iLength;i++){
            if(this.option.navList[i].name === this.option.name){
                this.option.navList[i].isActive = true;
            }
        };
        let navHtml = _gm.renderHtml(templateIndex,{
            navList : this.option.navList
        });
        //把html丢到容器里
        $('.nav-side').html(navHtml)
    }
};
module.exports = navSide;