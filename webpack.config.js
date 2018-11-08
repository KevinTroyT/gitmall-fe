/*
* @Author: KevinTroyT
* @Date:   2018-10-31 19:17:41
 * @Last modified by:   KevinTroyT
 * @Last modified time: 2018-11-08T09:26:09+08:00
*/
const HtmlWebpackPlugin           =       require('html-webpack-plugin')
const webpack                     =       require('webpack');
const extractTextWebpackPlugin    =       require('extract-text-webpack-plugin');
//环境变量配置，dev / online
const WEBPACK_ENV                 =       process.env.WEBPACK_ENV || 'dev';

//获取html-webpack-plugin参数的方法
let getHtmlConfig = function(name,title){
    return {
        template    : './src/view/'+name+'.html',
        filename    : 'view/'+name+'.html',
        title       : title,
        inject      : true,
        hash        : true,
        chunks      : ['common',name]
    };
};
//webpack config
let config = {
    entry: {
        'common'            : ['./src/page/common/index.js','webpack-dev-server/client?http://localhost:8088/'],
        'index'             : ['./src/page/index/index.js'],
        'user-login'        : ['./src/page/user-login/index.js'],
        'user-register'     : ['./src/page/user-register/index.js'],
        'user-pass-reset'     : ['./src/page/user-pass-reset/index.js'],
        'user-pass-update'     : ['./src/page/user-pass-update/index.js'],
        'user-center'     : ['./src/page/user-center/index.js'],
        'user-center-update'     : ['./src/page/user-center-update/index.js'],
        'result'            : ['./src/page/result/index.js'],
    },
    output: {
        path        : './dist',
        publicPath  : '/dist',
        filename    : 'js/[name].js'
    },
    externals : {
        'jquery' : 'window.jQuery'
    },
    module : {
        loaders: [
            {   test: /\.css$/,
                loader: extractTextWebpackPlugin.extract('style-loader', 'css-loader')
            }, // 单独打包出CSS，这里配置注意下
            {   test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
                loader:'url-loader?limit=100&name=resource/[name].[ext]'
            },
            {   test: /\.string$/,
                loader: 'html-loader'
            },
        ]
    },
    resolve : {
        alias: {
            node            :    __dirname + '/node_modules',
            util            :    __dirname + '/src/util',
            page            :    __dirname + '/src/page',
            service         :    __dirname + '/src/service',
            image           :    __dirname + '/src/image'
        }
    },
    plugins:[
    //独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
    //单独打包css文件
        new extractTextWebpackPlugin("css/[name].css"),
    //html模版处理
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','修改密码 ')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update','修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
    ]
};
if ('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
module.exports = config;
