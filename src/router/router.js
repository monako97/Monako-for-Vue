import VueRouter from "vue-router";
// 导入对应的路由组件
import HomeContainer from "../components/homeContainer.vue";
import DetailContainer from "../components/detailContainer.vue";
import ClassIfication from "../components/class.vue";
import FriendsLink from "../components/friendsLink.vue";
import TimeLine from "../components/timeLine.vue";
// 创建路由对象
var router = new VueRouter({
    routes:[
        // 配置路由规则
        { path: "/", redirect: "/home" },
        { path: "/home", component: HomeContainer },
        { path: "/class", component: ClassIfication },
        { path: "/friendsLink", component: FriendsLink },
        { path: "/timeLine", component: TimeLine },
        { path: "/detail", component: DetailContainer }
    ],
    linkActiveClass: "router-link-active" // 默认的类 router-link-active
});
// 把路由对象暴露出去
export default router;