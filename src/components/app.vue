<template>
  <div class="monako-container" ref="view">
    <!-- header -->
    <header ref="headers">
      <h1>
        <router-link to="/home">Monako</router-link>
      </h1>
      <svg ref="ram" class="ham" viewBox="0 0 100 100" width="50" @click="openNav">
        <path
          class="line top"
          d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
        ></path>
        <path class="line middle" d="m 30,50 h 40"></path>
        <path
          class="line bottom"
          d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
        ></path>
      </svg>
      <nav ref="nav">
        <router-link
         v-for="nav in nav" 
         :key='nav.name'
         :to="nav.to">
          {{ nav.name }}
         </router-link>
      </nav>
    </header>
    
    <!-- main -->
    <transition>
      <router-view></router-view>
    </transition>
    <button id="settop">100</button>
    <!-- blur -->
    <svg>
      <filter id="blur-effect">
        <feGaussianBlur stdDeviation="20"></feGaussianBlur>
      </filter>
    </svg>
    <div id="header" ref="header"></div>
    <!-- live2d -->
    <!-- <canvas id="live2d" width="280" height="250"></canvas> -->
    <canvas id="live2d" width="200" height="370"></canvas>
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
      nav: [
        { name: '分类', to: '/class' },
        { name: '时间轴', to: '/timeLine' },
        { name: '友链', to: '/friendsLink' },
      ],
      scrollTop: 0,
      maxScrll: 0,
      duplicate: null
    };
  },
  mounted() {
    loadlive2d("live2d", "../public/live2d/aoba/model.json");
    let _self = this;
    this.initHeight();
    window.addEventListener('scroll',this.scrollWheel,false);
    window.addEventListener('mousewheel',function(event){
      event = event || window.event;
      if(_self.maxScrll - _self.scrollTop < 70){
        if(_self.$refs.header.style.top != '0px'||_self.$refs.headers.style.top != '0px'){
           _self.$refs.header.style.top = '0px';
            _self.$refs.headers.style.top = '0px';
        }
      }else{
        if(event.deltaY>10){
          if(_self.$refs.header.style.top != '-70px'||_self.$refs.headers.style.top != '-70px'){
            _self.$refs.header.style.top = '-70px';
            _self.$refs.headers.style.top = '-70px';
          }
        }else if(event.deltaY<0){
          if(_self.$refs.header.style.top != '0px'||_self.$refs.headers.style.top != '0px'){
            _self.$refs.header.style.top = '0px';
            _self.$refs.headers.style.top = '0px';
          }
        };
      }
    },false);
  },
  methods: {
    openNav(){ // 打开nav菜单
      this.$refs.ram.classList.toggle('active');
      this.$refs.header.classList.toggle('openHeader');
    },
    initHeight() {
      this.$refs.header.style.top = '0px';
            this.$refs.headers.style.top = '0px';
      this.maxScrll = document.body.scrollHeight - document.documentElement.clientHeight;
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.pageYOffset = 0;
      let oldNode = document.getElementsByClassName("content-blur");
      if(oldNode.length){
        for(var i = oldNode.length - 1; i >= 0; i--) {
          oldNode[i].parentNode.removeChild(oldNode[i]); 
        }
      }
      setTimeout(() => {
        let duplicate = this.$refs.view.cloneNode(true);
        let newnode = document.createElement("div");
        newnode.className = "content-blur";
        newnode.appendChild(duplicate);
        this.$refs.header.appendChild(newnode);
      }, 100);
    },
    scrollWheel(){
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
      let translation = "translateY(" + (-this.scrollTop + "px") + ")";
      let oldNode = document.getElementsByClassName("content-blur");
      this.maxScrll = document.body.scrollHeight - document.documentElement.clientHeight;
      if(oldNode.length){
        document.getElementsByClassName(
        "content-blur"
        )[0].style.webkitTransform = translation;
        document.getElementsByClassName(
          "content-blur"
        )[0].style.transform = translation;
      }
      
    }
  },
  watch: {
    $route: {
      handler:function(val, oldVal){
        this.$nextTick(function(){  //页面加载完成后执行
          this.initHeight();
        })
      },
      // 深度观察监听
      deep: true
    }
  }
};
</script>

<style scoped lang="scss">
$height-color: rgba(233, 136, 124, 1);
.monako-container {
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
    transition: all 0.5s;
  }
  svg {
    display: none;
  }
  #settop{
    position: fixed;
    bottom: 5px;
    right: 5px;
    background: transparent;
    color: $height-color;
    border: none;
    border-radius: 50px;
  }
  #header {
    height: 70px;
    width: 100%;
    position: fixed;
    overflow: hidden;
    background: #ffffff;
    top: 0;
    z-index: 9;
    transition: top 0.5s ease;
  }
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
      }
    }
    nav {
      cursor: pointer;
      opacity: 1;
      transition: transform 0.4s,opacity 0.4s;
      a {
        display: inline;
        font-size: 14px;
        padding: 5px 15px;
        border: 1px solid transparent;
      }
      a:hover{
        border-color: $height-color;
        border-radius: 30px;
        transition: all 0.4s;
      }
    }
    svg {
      display: none;
      position: absolute;
      right: 0px;
      opacity: 0;
      transition: opacity 0.4s;
      top: 10px;
    }
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
  @media (max-width: 580px) {
    #settop{
      display: none;
    }
    #live2d{
      width: 150px;
    }
    #header{
      shape-outside: polygon(0 0, 100% 0, 100% 100%, calc(100% - 70px) 100%, calc(100% - 100px) 70px, 0 70px);
      clip-path: polygon(0 0, 100% 0, 100% 100%, calc(100% - 100px) 100%, calc(100% - 100px) 70px, 0 70px);
      -webkit-shape-outside: polygon(0 0, 100% 0, 100% 100%, calc(100% - 70px) 100%, calc(100% - 100px) 70px, 0 70px);
      -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, calc(100% - 100px) 100%, calc(100% - 100px) 70px, 0 70px);
      transition: height 0.3s,top 0.5s;
      box-shadow: 0 0px 5px 0 rgba(0, 0, 0, 0.1);
    }
    header {
      svg {
        display: inline;
        opacity: 1;
        z-index: 999;
        transition: opacity 0.4s;
      }
      nav {
        text-align: center;
        opacity: 0;
        transform: translateY(-15px);
        transition: all 0.4s;
        margin: 10px 10px 0 10px;
        a{
          display: block;
          line-height: 20px;
          transition: all 0.4s;
        }
      }
      .ham.active+nav{
        opacity: 1;
        transform: translateY(85px);
      }
    }
    .openHeader{
      height: 180px!important;
    }
  }
}
</style>