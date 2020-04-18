<template>
    <div id="login">
        <div class="container" ref="loginForm">
            <div class="left">
                <div v-for="(item,i) in leftBtnList"
                             :key="i"
                             :class="active===item.path?'select-text':'eula'"
                             @click.stop="toggleForm(item,i)">
                    {{ item.name }}
                </div>
            </div>
            <component :is="active" class="right"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        components:{
            form_login: () => import(/* webpackChunkName: "form_login" */ './form_login'),
            form_register: () => import(/* webpackChunkName: "form_register" */ './form_register'),
            form_forget_password: () => import(/* webpackChunkName: "form_forget_password" */ './form_forget_password'),
        },
        data(){
            return{
                leftBtnList: [
                    {name: "登录", path: "form_login"},
                    {name: "注册", path: "form_register"},
                    {name: "忘记密码", path: "form_forget_password"},
                ],
                active: 'form_login'
            }
        },
        mounted() {
            let a = setTimeout(()=>{
                this.OutTransaction();
                clearTimeout(a);
                a = null;
            },100);
        },
        methods:{
            // 切换登录 -- 注册 -- 忘记密码
            toggleForm(data,index){
                this.active = data.path;
                // 解构数组
                [this.leftBtnList[index],this.leftBtnList[0]] = [this.leftBtnList[0],this.leftBtnList[index]];
            },
            // 事务开始动画
            InTransaction(){
                if (document.body.offsetWidth > 767) this.$refs.loginForm.style.width = '350px';
                else this.$refs.loginForm.style.height = '350px';
            },
            // 事务结束动画
            OutTransaction(){
                if (document.body.offsetWidth > 767) this.$refs.loginForm.style.width = '610px';
                else this.$refs.loginForm.style.height = '560px';
            },
        },
        beforeDestroy() {
            this.InTransaction();
        }
    }
</script>

<style lang="scss">
#login{
    .container {
        transition: width .3s, height 0.3s;
        height: 320px;
        margin: 0 auto;
        width: 350px;
        position: relative;
        .left {
            background: white;
            height: calc(100% - 40px);
            top: 20px;
            position: absolute;
            width: 320px;
            border-radius: 8px 0 0 8px;
            .select-text {
                font-size: 50px;
                font-weight: 900;
                margin: 50px 40px 40px;
            }
            .eula {
                color: #999;
                font-size: 14px;
                line-height: 1.5;
                margin: 40px;
                display: inline-block;
            }
            .eula:hover{
                color: #e9887c;
            }
        }
        .right {
            background: #474A59;
            box-shadow: 0 0 40px 16px rgba(0,0,0,0.22);
            color: #F1F1F2;
            position: absolute;
            top: 0;
            right: 0;
            width: 320px;
            height: inherit;
            border-radius: 8px;
            transition: left 0.3s;
            svg {
                position: absolute;
                width: 320px;
            }
            path {
                fill: none;
                stroke: url(#linearGradient);;
                stroke-width: 4;
                stroke-dasharray: 240, 1386;
            }
            .form {
                margin: 40px;
                position: absolute;
                width: calc(100% - 80px);
                label {
                    color:  #c2c2c5;
                    display: block;
                    font-size: 14px;
                    margin-top: 21px;
                    input {
                        background: transparent;
                        border: 0;
                        color: #f2f2f2;
                        font-size: 20px;
                        height: 30px;
                        line-height: 30px;
                        outline: none !important;
                        width: calc(100% - 10px);
                        padding: 1px 5px;
                    }
                    input::-moz-focus-inner {
                        border: 0;
                    }
                }
                >label:before{
                    transition: all 0.3s;
                    width: 0;
                    height: 22px;
                    opacity: 0;
                    padding: 0;
                    font-size: 12px;
                    border: 1px rgba(235, 80, 85, 0.8) solid;
                    overflow: hidden;
                    position: absolute;
                    right: 0;
                    border-radius: 15px;
                    color: rgba(235, 80, 85, 0.8);
                }
                >label[for=username]:before{
                    margin-top: 28px;
                    content: attr(data-before);
                }
                >label[for=password]{
                    margin-top: 13px;
                }
                >label[for=password]:before{
                    margin-top: 28px;
                    content: attr(data-before);
                }
                >label.err:before{
                    width: auto;
                    padding: 0 5px;
                    opacity: 1;
                    background-color: rgba(239, 234, 234, 0.8);
                }
                >.submitBtn{
                    width: 96%;
                    margin: 29px auto;
                    position: absolute;
                    right: 0;
                    left: 0;
                    border: none;
                    border-radius: 25px;
                    background-color: #000;
                    font-weight: bold;
                    box-shadow: 0 8px 28px black;
                    cursor: pointer;
                    transition: all .3s;
                    font-size: 20px;
                    height: 50px;
                    line-height: 50px;
                    outline: none !important;
                    color: #707075;
                    overflow: hidden;
                    .loading{
                        opacity: 0;
                        transition: .5s;
                    }
                }
                .submitBtn.changLogin{
                    color: #f2f2f2;
                    box-shadow: none;
                    background-image: linear-gradient(92deg, #81a6e0 0%,#cc7bc5 100%);
                }
                .submitBtn:active {
                    color: #d0d0d2;
                }
                >.active.submitBtn{
                    color:transparent;
                    width: 50px!important;
                    .loading{
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%,-50%);
                        width: 70%;
                        height: 40%;
                        display: flex;
                        justify-content: space-around;
                        align-items: flex-end;
                        opacity: 1;
                        div{
                            width: .3rem;
                            height: .3rem;
                            border-radius: 50%;
                            background-color: #fff;
                            animation: .9s loading ease-in-out infinite alternate;
                        }
                        div:nth-child(2){
                            animation-delay: .2s;
                        }
                        div:nth-child(3){
                            animation-delay: .4s;
                        }
                    }
                    .checkmark{
                        position: absolute;
                        left: 50%;
                        right: 50%;
                        top: 56%;
                        margin: auto;
                        transform: translate(-50%,-50%);
                        stroke-width: 2px;
                        /* 利用stroke的虚线和偏移值达到加载的动画效果 */
                        stroke-dasharray: 36px;
                        stroke-dashoffset: 36px;
                    }
                }
                >.active.submitBtn.verity{
                    background-color: #67C23A;
                    box-shadow: 0 8px 28px #67C23A;
                    .loading{
                        opacity: 0;
                        display: none;
                    }
                    .checkmark{
                        width: auto;
                        animation: .6s show forwards;
                        animation-delay: .4s;
                    }
                }
                .submitBtn.error{
                    background-color: #F56C6C;
                    box-shadow: 0 8px 28px #F56C6C;
                    color: white;
                }
            }
        }
    }
    @keyframes show{
        to{
            stroke-dashoffset: 0;
        }
    }
    @keyframes loading{
        to{
            transform: translate(0, -1rem);
        }
    }
    @media (min-width: 768px) {
        .container{
            height: 320px!important;
        }
    }
    @media (max-width: 767px) {
        .container {
            height: 350px;
            width: 320px!important;
            .left {
                height: 100%;
                left: 20px;
                width: calc(100% - 40px);
                max-height: 270px;
                border-radius: 8px;
            }
            .right {
                width: 100%;
                max-height: 320px;
                top: initial;
                bottom: 0;
            }
        }

    }


}
</style>
