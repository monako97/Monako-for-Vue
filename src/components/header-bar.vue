<template>
    <header>
        <h1>
            <router-link to="/home">Monako</router-link>
        </h1>
        <svg ref="ham" class="ham" viewBox="0 0 100 100" width="50" @click="openNav">
            <path class="line top"
                  d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"/>
            <path class="line middle" d="m 30,50 h 40"/>
            <path class="line bottom"
                  d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"/>
        </svg>
        <nav ref="nav">
            <a v-for="nav in navList" :key='nav.name' @click="navTap(nav)">{{ nav.name }}</a>
        </nav>
    </header>
</template>

<script>
    export default {
        name: "header-bar",
        data() {
            return {
                navList: [
                    { name: '首页', to: 'home' },
                    { name: '分类', to: 'class' },
                    { name: '时间轴', to: 'timeLine' },
                    { name: '友链', to: 'friendsLink' },
                    { name: '登录', to: false, component: 'login' }
                ]
            };
        },
        mounted() {

        },
        methods:{
            navTap(nav){
                if (!nav.to) return this.$parent.showDaiLog(nav.component);
                this.$router.push({
                    name: nav.to
                }).catch(c=>{});
            },
            openNav(){ // 打开nav菜单
                this.$refs.ham.classList.toggle('active');
            },
        }
    }
</script>

<style lang="scss">
    $height-color: rgba(233, 136, 124, 1);
    header {
        height: 70px;
        line-height: 70px;
        width: 100%;
        min-width: 325px;
        position: fixed;
        z-index: 99;
        justify-content: space-between;
        box-shadow: 0 1px 5px rgba(0,0,0,0.1);
        transition: top 0.5s ease;
        h1 {
            max-width: 50%;
            padding: 0 20px;
            a {
                font-size: 22px;
                font-weight: 300;
                color: $height-color;
                cursor: pointer;
            }
        }
        nav {
            cursor: pointer;
            opacity: 1;
            margin-right: 10px;
            a {
                display: inline;
                font-size: 14px;
                padding: 5px 15px;
                border: 1px solid transparent;
            }
            a:hover{
                border-color: $height-color;
                border-radius: 30px;
                transition: all 0.3s;
            }
        }
        svg {
            display: none;
            position: absolute;
            right: 0;
            opacity: 0;
            transition: opacity 0.3s;
            top: 10px;
        }
        /* 汉堡菜单 */
        .ham {
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
            transition: transform 250ms;
            user-select: none;
            .line {
                fill:none;
                transition: stroke-dasharray 250ms, stroke-dashoffset 250ms;
                stroke: rgba(233, 136, 124, 1);
                stroke-width:5.5;
                stroke-linecap:round;
            }
            .top {
                stroke-dasharray: 40, 160;
            }
            .middle {
                stroke-dasharray: 40, 142;
                transform-origin: 50%;
                transition: transform 250ms;
            }
            .bottom {
                stroke-dasharray: 40, 85;
                transform-origin: 50%;
                transition: transform 250ms, stroke-dashoffset 250ms;
            }
        }
        .ham.active {
            transform: rotate(45deg);
            .top{
                stroke-dashoffset: -64px;
            }
            .middle {
                transform: rotate(90deg);
            }
            .bottom {
                stroke-dashoffset: -64px;
            }
        }
    }
    header:after{
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        content: "";
        background: rgba(255,255,255,0.8);
        backdrop-filter: blur(15px);
        z-index: -1;
    }
    @media (max-width: 580px){
        header {
            svg {
                display: inline;
                opacity: 1;
                z-index: 999;
                transition: opacity 0.3s;
            }
            nav {
                position: absolute;
                top: -100%;
                right: 0;
                z-index: -1;
                opacity: 0;
                text-align: center;
                border-radius: 0 0 8px 8px;
                backdrop-filter: blur(15px);
                transition: all 0.3s;
                padding: 10px;
                background: transparent;
                a{
                    display: block;
                    line-height: 20px;
                    transition: all 0.3s;
                }
            }
            nav::after{
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                margin: auto;
                content: "";
                background: rgba(255,255,255,0.6);
                backdrop-filter: blur(15px);
                z-index: -1;
                border-radius: 0 0 8px 8px;
            }
            .ham.active+nav{
                opacity: 1;
                top: 70px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
        }
    }
</style>
