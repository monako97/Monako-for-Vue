<template>
        <div id="form_login">
            <transition appear>
                <svg viewBox="0 0 320 300">
                    <defs>
                        <linearGradient
                                id="linearGradient"
                                x1="13"
                                y1="193.49992"
                                x2="307"
                                y2="193.49992"
                                gradientUnits="userSpaceOnUse">
                            <stop style="stop-color:#81a6e0;" offset="0" id="stop876" />
                            <stop style="stop-color:#cc7bc5;" offset="1" id="stop878" />
                        </linearGradient>
                    </defs>
                    <path id="ling" d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143" />
                </svg>
            </transition>
            <transition appear>
                <div class="form">
                    <label for="username"
                           :class="rules.username.message.length?(userValidity?'':'err'):''"
                           :data-before="rules.username.message">用户名
                        <input type="text" id="username"
                               v-model.trim="user.username"
                               :disabled="disabled"
                               @focus="lineANIME(0,'240 1386')">
                    </label>
                    <label for="password"
                           :class="rules.password.message.length?(pswValidity?'':'err'):''"
                           :data-before="rules.password.message">密码
                        <input type="password" id="password"
                               v-model.trim="user.password"
                               :disabled="disabled"
                               @focus="lineANIME(-336,'240 1386')">
                    </label>
                    <button ref="loginBtn" type="button"
                            :class="'submitBtn '+ btnClass + focusClass"
                            :disabled="disabled"
                            @focus="lineANIME(-730,'530 1386')"
                            @click.stop="submit">
                        <p>{{ btnText }}</p>
                        <div class="loading ">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <!-- 使用svg绘制 -->
                        <svg class='checkmark' width='30px' height='30px' stroke='white' fill='none'>
                            <polyline points='2,10 12,18 28,2'/>
                        </svg>
                    </button>
                </div>
            </transition>

        </div>

</template>

<script>
    import anime from 'animejs'
    export default {
        name: "form_login",
        data(){
            return{
                current: null,
                disabled: false,
                btnClass: "",
                rules: {
                    // 用户名正则，4到16位（字母，数字，下划线，减号）
                    username: {
                        reg: /^[a-zA-Z0-9_-]{4,16}$/,
                        message: ""
                    },
                    //密码强度正则，最少6位，包括至少1个小写字母
                    password: {
                        reg: /^.*(?=.{6,})(?=.*[a-z]).*$/,
                        message: ""
                    }
                },
                user: {
                    username: "",
                    password: ""
                },
                focus: '',
                btnText: '登录'
            }
        },
        computed:{
            userValidity(){
                if (this.user.username.length < 4) this.rules.username.message = "用户名至少4个字符";
                return this.rules.username.reg.test(this.user.username);
            },
            pswValidity(){
                let val = this.rules.password.reg.test(this.user.password);
                if (this.user.password.length < 6) this.rules.password.message = "密码至少6个字符";
                else if (!val) this.rules.password.message = "密码至少1个小写字母";
                return val;
            },
            focusClass(){
                return this.focus === -730 ? ' changLogin' : '';
            }
        },
        methods:{
            // 线条动画
            lineANIME(strokeDashoffsetValue,strokeDasharrayValue){
                this.focus = strokeDashoffsetValue;
                if (this.current) this.current.pause();
                this.current = anime({
                    targets: '#ling',
                    strokeDashoffset: {
                        value: strokeDashoffsetValue,
                        duration: 700,
                        easing: 'easeOutQuart'
                    },
                    strokeDasharray: {
                        value: strokeDasharrayValue,
                        duration: 700,
                        easing: 'easeOutQuart'
                    }
                });
            },
            // 登录
            submit(){
                if (this.userValidity&&this.pswValidity){
                    this.disabled = true;
                    this.btnClass = 'active';
                    this.$parent.InTransaction();
                    this.lineANIME(-700,'0 1386');
                    this.$axios('login',this.user).then(res=>{
                        if (res!==null){
                            // 登录成功
                            this.btnClass = 'active verity';
                        }else{
                            // 登录失败
                            this.disabled = false;
                            this.$parent.OutTransaction();
                            this.btnText = "网络链接失败";
                            this.btnClass = 'error';
                        }
                        console.log(res);
                    }).finally(()=>{
                        console.log("请求结束");
                    });
                }
            }
        }
    }
</script>

<style lang="scss">
#form_login{

}
</style>
