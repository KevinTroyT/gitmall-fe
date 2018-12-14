/*
* @Author: KevinTroyT
* @Date:   2018-10-31 19:17:41
 * @Last modified by:   troykevin
 * @Last modified time: 2018-11-15T23:19:13+08:00
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
    //devServer 接口测试
    devServer: {
        port: 8088,
        historyApiFallback: {
            index: '/dist/views/index.html'
        },
        proxy: {
            '/': {
                target          : 'http://test.happymmall.com',
                changeOrigin    : true
            }
        }
    },
    entry: {
        'common'                    : ['./src/page/common/index.js','webpack-dev-server/client?http://localhost:8088/'],
        'index'                     : ['./src/page/index/index.js'],
        'list'                      : ['./src/page/list/index.js'],
        'detail'                    : ['./src/page/detail/index.js'],
        'cart'                      : ['./src/page/cart/index.js'],
        'order-confirm'             : ['./src/page/order-confirm/index.js'],
        'order-list'                : ['./src/page/order-list/index.js'],
        'order-detail'              : ['./src/page/order-detail/index.js'],
        'payment'                   : ['./src/page/payment/index.js'],
        'user-login'                : ['./src/page/user-login/index.js'],
        'user-register'             : ['./src/page/user-register/index.js'],
        'user-pass-reset'           : ['./src/page/user-pass-reset/index.js'],
        'user-pass-update'          : ['./src/page/user-pass-update/index.js'],
        'user-center'               : ['./src/page/user-center/index.js'],
        'user-center-update'        : ['./src/page/user-center-update/index.js'],
        'result'                    : ['./src/page/result/index.js'],
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
        new HtmlWebpackPlugin(getHtmlConfig('list','商品列表')),
        new HtmlWebpackPlugin(getHtmlConfig('detail','商品详情')),
        new HtmlWebpackPlugin(getHtmlConfig('cart','购物车')),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm','订单确认')),
        new HtmlWebpackPlugin(getHtmlConfig('order-list','订单列表')),
        new HtmlWebpackPlugin(getHtmlConfig('order-detail','订单详情')),
        new HtmlWebpackPlugin(getHtmlConfig('payment','支付页面')),
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
