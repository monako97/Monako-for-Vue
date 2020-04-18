const merge = require('webpack-merge');
const path = require('path');
const Webpack = require('webpack');
const common = require('./webpack.common.js');
//获取本机ip地址
function getIPAdress() {
    let interfaces = require('os').networkInterfaces();
    for (let devName in interfaces) {
        let iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}
let ip = getIPAdress();
console.log("\n--------IP地址：" + ip+ "------\n");
getIPAdress = null;
module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        openPage: 'monako.html', //指定第一次打开的路径
        compress: true, //启用 gzip 压缩
        host: ip,
        port: 1315,
        inline: true,//设置为true，当源文件改变时会自动刷新页面
        hot: true //启用热替换模块
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin()
    ],
});
