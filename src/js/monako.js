// 入口
import Vue from "vue";
// 导入 router 并安装
import VueRouter from "vue-router"
Vue.use(VueRouter);
// 定义全局过滤器
// 导入格式化时间插件
import moment from "moment";
Vue.filter("dateFormat", function(dataStr, pattern = "YYYY-MM-DD HH:mm"){
    // 使用 moment 格式化
    return moment(dataStr).format(pattern);
});
// 导入 vue-resoures 组件
import VueResource from "vue-resource";
Vue.use(VueResource);
// 设置请求的根路径
Vue.http.options.root = "http://127.0.0.1:1338/";
// 全局定义 表单数据提交类型
Vue.http.options.emulateJSON = true;

// 导入自己的 router.js 模块
import router from "../router/router";

// 导入 common.css
import "../style/common.scss";
// 导入 app 组件
import app from "../components/app.vue";
var vm = new Vue({
    el: "#monako",
    render: c => c(app),
    router // 挂载路由对象到实例上
});