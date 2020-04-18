// 入口
import Vue from "vue";
import 'es6-promise/auto';
import 'intersection-observer';
import store from "../store/store";
import axios from 'axios';
Vue.prototype.$axios = axios;
// 导入 router 并安装
import VueRouter from "vue-router";
Vue.use(VueRouter);
// 导入自己的 router.js 模块
import router from "../router/router";
// live2d
import "./live2d";
// 导入 common.css
import "../style/common.scss";
// 导入 app 组件
import app from "../components/app.vue";


/**
 * @param option { method, path, data || params }
 * 使用方法
 * axios(option)
 * .then(response => response)
 * .catch(error => error);
 **/
let num = 0;
axios.defaults.baseURL = ROOT_API;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
axios.defaults.retry = 3;
axios.defaults.retryDelay = 1000;
axios.defaults.timeout = 10000;
// 请求前
axios.interceptors.request.use(
    config => {
        let token = store.state.userInfo.token;
        if (token) config.headers.token = `${token}`;
        num++;
        Vue.nextTick(() => {
            console.log("请求中...");
        });
        return config;
    },
    err => Promise.reject(err)
);
// 接收后
axios.interceptors.response.use(
    response => {
        resultUntil();
        if (response.status === 200) {
            console.log("请求成功");
        }
        return response;
    },
    error => {
        resultUntil();
        if (error.response===undefined){
            console.log("连接错误："+error);
            return null;
        }
        if (error.response.status !== 404) {
            let originalRequest = error.config;
            originalRequest._retry = true;
            return axios.request(originalRequest);
        }
    }
);
let resultUntil = () => {
    num--;
    if (num <= 0) {
        Vue.nextTick(() => {
            console.log("全部请求结束");
        });
    }
};

//在页面加载时读取sessionStorage里的状态信息
if (sessionStorage.getItem("store")) store.replaceState(
    Object.assign(
        {},
        store.state,
        JSON.parse(sessionStorage.getItem("store"))
    )
);
//在页面刷新时将vuex里的信息保存到sessionStorage里
window.addEventListener("beforeunload", () => sessionStorage.setItem("store", JSON.stringify(store.state)));
Vue.mixin({
    beforeRouteLeave: function (to, from, next) {
        if (to.meta.keepAlive || to.meta.keepAlive === from.meta.keepAlive) {
            if (this.$vnode && this.$vnode.data.keepAlive) {
                if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache) {
                    if (this.$vnode.componentOptions) {
                        let key = this.$vnode.key == null
                            ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
                            : this.$vnode.key;
                        let cache = this.$vnode.parent.componentInstance.cache;
                        let keys = this.$vnode.parent.componentInstance.keys;
                        if (cache[key]) {
                            if (keys.length) {
                                let index = keys.indexOf(key);
                                if (index > -1) {
                                    keys.splice(index, 1);
                                }
                            }
                            delete cache[key];
                        }
                    }
                }
            }
            this.$destroy();
        }
        next();
    }
});
// 自定义图片懒加载指令
Vue.directive('lazy-img', {
    //钩子函数
    inserted(el,binding,vNode) {
        // el：指令所绑定的元素，可以用来直接操作 DOM 。
        function loadImg(el,binding){
            if(!el.src) {
                el.src = '../assets/images/loading.jpg';
                let img = new Image();
                img.src = binding.value;
                img.onload = () => {
                    el.src = binding.value;
                    img.remove();
                };
                img.onerror = () => {
                    el.src = '../assets/images/error.jpg';
                    img.remove();
                };
            }
        }
        const io = new IntersectionObserver(ioeS=>{
            ioeS.forEach(ioe=>{
                // target 被观察的目标元素，是一个 DOM 节点对象
                const el=ioe.target;
                // intersectionRatio 目标元素的可见比例，
                // 即intersectionRect占boundingClientRect的比例，
                // 完全可见时为1，完全不可见时小于等于0
                if(ioe.intersectionRatio > 0 && ioe.intersectionRatio <= 1) loadImg(el,binding);
                // 当图片加载成功或是失败时就停止观察
                el.onerror = el.onload = () => {
                    io.unobserve(el);
                    io.disconnect();
                };
            })
        });
        io.observe(el);
    },
});
// 自定义dom懒加载指令
// Vue.directive('lazy-dom', {
//     bind(el,binding,vnode){
//         el.classList.add("list-enter-to");
//         el.classList.add("list-enter-active");
//     },
//     //钩子函数
//     inserted(el,binding,vNode) {
//         const io = new IntersectionObserver(ioeS=>{
//             ioeS.forEach(ioe=>{
//                 const el=ioe.target;
//                 // 完全可见时为1，完全不可见时小于等于0
//                 if(ioe.intersectionRatio >= 0.3){
//                     el.classList.remove("list-enter-active");
//                     el.classList.remove("list-enter-to");
//
//                     console.log(el)
//                     io.unobserve(el);
//                     io.disconnect();
//                 }
//             })
//         },{
//             threshold: [0, 0.3, 1]
//         });
//         io.observe(el);
//     },
// });
new Vue({
    el: "#monako",
    render: c => c(app),
    router,
    store
});
