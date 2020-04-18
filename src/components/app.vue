<template>
  <div class="monako-container" ref="view">
    <!-- header -->
    <header-bar/>
    <transition appear name="fade">
      <div v-if="daiLog.show" :class="'dai-log '+(daiLog.show?'show':'hide')"
           @click.self="closeDaiLog">
          <component :is="daiLog.component"/>
      </div>
    </transition>
    <!-- main -->
    <transition appear>
      <router-view/>
    </transition>
    <!-- live2d -->
    <canvas id="live2d" width="280" height="250"/>
<!--    <canvas id="live2d" width="200" height="370"></canvas>-->
    <!-- footer -->
    <footer ref="footer">
      <p>monako</p>
      <article>monako</article>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      daiLog: {
        show: false,
        component: ''
      },
    };
  },
  components:{
    login: () => import(/* webpackChunkName: "login" */ './login__register__forget_password/login'),
    headerBar: () => import(/* webpackChunkName: "header-bar" */ './header-bar'),
  },
  mounted() {
    loadlive2d("live2d", "../assets/live2d/Pio/index.json");
  },
  methods: {
    showDaiLog(name){
      this.daiLog.show = true;
      this.daiLog.component = name;
    },
    closeDaiLog(){
      this.daiLog.show = false;
      this.daiLog.component = '';
    }
  }
};
</script>

<style lang="scss">
.monako-container {
  height: 100%;
  overflow-y: auto;
  .list-enter,
  .list-leave-to{
    opacity: 0;
    transform: translateX(50px);
  }
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s;
  }
  .v-enter,
  .v-leave-to {
    opacity: 0;
    position: absolute;
    left: 0;
    right: 0;
    transform: translateY(20px);
  }
  .v-enter-active,
  .v-leave-active {
    transition: all 0.3s;
  }
  footer {
    flex-direction: column;
    background: rgba(255, 255, 255, 0.5);
    p {
      height: 70px;
      line-height: 70px;
      font-size: 13px;
      color: #5f5f5f;
      width: 100%;
      border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
    }
    article {
      padding: 50px 20px;
    }
  }

}
</style>
