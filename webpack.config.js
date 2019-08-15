const path = require('path');
const Webpack = require('webpack');
const glob = require('glob-all');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PurifycssWebpack = require('purifycss-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
module.exports = {
    entry: {
        monako: ['./src/js/monako.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].min.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        openPage: 'html/monako.html', //指定第一次打开的路径
        compress: true, //启用 gzip 压缩
        host: 'localhost',
        port: 8099,
        inline: true,//设置为true，当源文件改变时会自动刷新页面
        hot: true //启用热替换模块
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    minSize: 30000,
                    minChunks: 1,
                    chunks: 'initial',
                    priority: 1 // 该配置项是设置处理的优先级，数值越大越优先处理
                },
                commons: {
                    test: /[\\/]src[\\/]common[\\/]/,
                    name: 'commons',
                    minSize: 30000,
                    minChunks: 3,
                    chunks: 'initial',
                    priority: -1,
                    reuseExistingChunk: true // 这个配置允许我们使用已经存在的代码块
                }
            }
        },
        runtimeChunk: 'single',
        minimizer: [
            // 自定义js优化配置，将会覆盖默认配置
            new UglifyJsPlugin({
                // exclude: /\monako.min\.js$/, // 过滤掉以".min.js"结尾的文件，我们认为这个后缀本身就是已经压缩好的代码，没必要进行二次压缩
                cache: true,
                parallel: true, // 开启并行压缩，充分利用cpu
                sourceMap: false,
                extractComments: {
                    condition: true,
                    filename(file) {
                        return `${file}.LICENSE`;
                    },
                    banner(commentsFile) {
                        return `自定义的注释头 ${commentsFile}`;
                    },
                }, // 移除注释
                uglifyOptions: {
                    warnings: false,
                    // ecma: 8,
                    compress: {
                        unused: true,
                        drop_debugger: true
                    },
                    output: {
                        comments: false
                    }
                }
            }),
            // 用于优化css文件
            new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessorOptions: {
                    safe: true,
                    autoprefixer: { disable: true }, // 这里是个大坑，稍后会提到
                    mergeLonghand: false,
                    discardComments: {
                        removeAll: true // 移除注释
                    }
                },
                canPrint: true
            })
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'Monako',
            minify: { collapseWhitespace: true, removeAttributeQuotes: true },
            template: path.resolve(__dirname, 'src/html/monako.html'),
            filename: 'html/monako.html',
            hash: true,
            chunksSortMode: 'none' // dependency none
        }),
        new MiniCssExtractPlugin({
            filename: "style/[name].min.css"
        }),
        new PurifycssWebpack({
            paths: glob.sync([
                path.join(__dirname, 'src/components/*.vue'),
                path.join(__dirname, 'src/html/monako.html')
            ]),
            purifyOptions: {
                whitelist: ['*purify*']
            }
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'src/assets'),
            to: 'assets'
        }]),
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.NamedModulesPlugin(),
        new ProgressBarPlugin()//打包进度条
    ],
    resolve: {
        extensions: ['.js', '.vue', '.scss', '.css'], //后缀名自动补全
        alias: { // 修改vue包配置文件中被导入时的路径
            "vue$": "vue/dist/vue.js"
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
                    // {
                    //     loader: MiniCssExtractPlugin.loader,
                    //     options: {
                    //       hmr: process.env.NODE_ENV === 'development',
                    //       publicPath: '../'
                    //     },
                    // },
                    process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                    'postcss-loader'
                ],
                // exclude: /node_modules/
            },
            {
                test: /\.(gif|jpg|png)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 20000,
                        name: '[hash:8]-[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(woff|woff2|svg|eot|ttf)$/,
                loader: 'url-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                // exclude: '/node_modules/',
                // include: path.resolve(__dirname, '../src')
            }
        ]
    }
};