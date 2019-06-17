const path = require('path');
const Webpack = require('webpack');
const glob = require('glob-all');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const PurifycssWebpack = require('purifycss-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    entry:{
        monako: ['./src/js/monako.js']
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'js/[name].min.js'
    },
    devServer:{
        contentBase: path.resolve(__dirname, 'dist'),
        openPage: 'html/monako.html', //指定第一次打开的路径
        host:'localhost',
        port:8090,
        inline: true,//设置为true，当源文件改变时会自动刷新页面
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "style/[name].min.css"
        }),
        new PurifycssWebpack({
            paths: glob.sync([
                path.join(__dirname, 'src/components/*.vue'),
                path.join(__dirname, 'src/html/monako.html')
            ])
        }),
        new CopyWebpackPlugin([{
            from:path.resolve(__dirname,'src/public'),
            to:'public'
        }]),
        new HtmlWebpackPlugin({
            title: 'Monako',
            minify: { collapseWhitespace: true, removeAttributeQuotes: true },
            template: path.resolve(__dirname,'src/html/monako.html'),
            filename: 'html/monako.html',
            hash: true,
            chunksSortMode: 'none'
        }),
        new Webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        alias: { // 修改vue包配置文件中被导入时的路径
            "vue$": "vue/dist/vue.js"
        }
    },
    module:{
        rules:[
            { // 处理.vue文件的loader
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.md$/,
                use: [{ loader: 'text-loader' }]
            },
            {
                test:/\.(sa|sc|c)ss$/,
                use: [
                  process.env.NODE_ENV === 'development' ? 'style-loader': MiniCssExtractPlugin.loader,
                  'css-loader',
                  'sass-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(gif|jpg|png)$/,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:5000,
                        name: '[hash:8]-[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(woff|woff2|svg|eot|ttf)$/,
                loader: 'url-loader'
            }
        ]
    }
};