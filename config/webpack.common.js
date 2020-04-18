const path = require('path');
const Webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob-all');
const PurifyCSSPlugin = require("purifycss-webpack");
const BASE_API = process.env.NODE_ENV === 'development' ? 'http://localhost/monako/' :
    'http://localhost/monako/';
module.exports = {
    entry: [
        "core-js/modules/es6.promise",
        "core-js/modules/es6.array.iterator",
        path.resolve(__dirname, "../src/js/monako.js"),
    ],
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'Monako',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeAttributeQuotes: true,
                useShortDoctype: true
            },
            template: path.resolve(__dirname, '../src/html/monako.html'),
            filename: 'monako.html',
            hash: true,
            chunksSortMode: 'none'
        }),
        new MiniCssExtractPlugin({
            filename: "style/[name].min.css"
        }),
        new PurifyCSSPlugin({
            paths: glob.sync([
                path.join(__dirname, '../src/components/*.vue'),
                path.join(__dirname, '../src/components/**/*.vue'),
                path.join(__dirname, '../src/html/monako.html')
            ]),
            purifyOptions: {
                whitelist: ['*purify*']
            }
        }),
        new CopyWebpackPlugin([{from: path.resolve(__dirname, '../src/assets'), to: 'assets'}]),
        new Webpack.NamedModulesPlugin(),
        new ProgressBarPlugin(),//打包进度条
        new Webpack.DefinePlugin({
            'ROOT_API': JSON.stringify(BASE_API)
        })
    ],
    resolve: {
        extensions: ['.js', '.vue', '.scss', '.css'], //后缀名自动补全
        alias: { // 修改vue包配置文件中被导入时的路径
            "vue$": "vue/dist/vue.js",
            '@': path.resolve(__dirname, '../src')
        }
    },
    module: {
        rules: [
            { // 处理.vue文件的loader
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.md$/,
                use: [{ loader: 'text-loader' }]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    process.env.NODE_ENV === 'development' ? 'style-loader' : {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                            modules: true,
                            getLocalIdent: (context, localIdentName, localName, options) => {
                                return localName
                            },
                            publicPath: '../'
                        },
                    },
                    'css-loader',
                    'sass-loader',
                    'postcss-loader'
                ],
            },
            {
                test: /\.(gif|jpg|png|ico)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 100,
                        name: 'assets/images/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(eot|ttf|woff|woff2|svg|mp4)$/,
                loader: 'url-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: './js/[name].min.js',
        chunkFilename: './js/[name].chunk.js',
    }
};
