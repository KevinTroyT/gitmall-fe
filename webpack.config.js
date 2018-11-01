/*
* @Author: KevinTroyT
* @Date:   2018-10-31 19:17:41
* @Last Modified by:   KevinTroyT
* @Last Modified time: 2018-11-01 11:06:14
*/
var HtmlWebpackPlugin       =   require('html-webpack-plugin')
var webpack                 =   require('webpack');
var Ex                      =   require('extract-text-webpack-plugin');
//环境变量配置，dev / online
var WEBPACK_ENV             =   process.env.WEBPACK_ENV || 'dev';

//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name){
    return {
        template    : './src/view/'+name+'.html',
        filename    : 'view/'+name+'.html',
        inject      : true,
        hash        : true,
        chunks      : ['common',name]
    };
};
//webpack config
var config = {
    entry: {
        'common' : ['./src/page/common/index.js','webpack-dev-server/client?http://localhost:8088/'],
        'index' : ['./src/page/index/index.js'],
        'login' : ['./src/page/login/index.js'],
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
            { test: /\.css$/, loader: Ex.extract('style-loader', 'css-loader') }, // 单独打包出CSS，这里配置注意下
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,loader:'url-loader?limit=100&name=resource/[name].[ext]'}
        ]
    },
    plugins:[
    //独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }), 
    //单独打包css文件
        new Ex("css/[name].css"),
    //html模版处理
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login'))
    ]
};
if ('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
module.exports = config;