import VueRouter from "vue-router";
// import store from "../store/store";
// 创建路由对象
let router = new VueRouter({
    // mode: "history",
    routes:[
        {path: "/", redirect: "home"},
        {path: "/home",name: "home",
         component: () => import(/* webpackChunkName: "homeContainer" */ '../components/homeContainer'),
         meta: {keepAlive: true}},
        {path: "/class",name: "class",
         component: () => import(/* webpackChunkName: "class" */ '../components/class'),
         meta: {keepAlive: false}},
        {path: "/friendsLink",name: "friendsLink",
         component: () => import(/* webpackChunkName: "friendsLink" */ '../components/friendsLink'),
         meta: {keepAlive: false}},
        {path: "/timeLine",name: "timeLine",
         component: () => import(/* webpackChunkName: "timeLine" */ '../components/timeLine'),
         meta: {keepAlive: false}},
        {path: "/detail/:id",name: "detail",
         component: () => import(/* webpackChunkName: "detailContainer" */ '../components/detailContainer'),
         meta: {keepAlive: false}}
    ],
    linkActiveClass: "router-link-active" // 默认的类 router-link-active
});

router.beforeEach((to, from, next) => {
    // if (store.state.userInfo.token === null) {
    //     if (to.path === '/login') next();
    //     else next('/login');
    // } else {
    //     next();
    // }
    next();
});
// 把路由对象暴露出去
export default router;
