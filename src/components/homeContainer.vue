<template>
  <transition-group appear tag="main" class="home-container">
    <article v-for="item in item" :key="item.id">
      <router-link tag="div" class="bgimg" 
        :to="'/detail/'+item.id+'?bg='+item.image" 
        :style='"background-image: url("+item.image+");"'>
      </router-link>
      <p class="title">{{ item.name }}</p>
      <time>{{ item.time }}</time>
      <hr>
      <aside>{{ item.cons }}</aside>
      <router-link tag="div"
        :to="'/detail/'+item.id+'?bg='+item.image" 
        class="btnReading">Continue Reading →</router-link>
    </article>
  </transition-group>
</template>
<script>
export default {
  data: function() {
    return {
      item: [
        {
          id: 1,
          name: "第一个java程序",
          time: "Published on Oct 15, 2018 in",
          cons: "阁下要来一杯提升醒脑的java吗？",
          image: "https://i.loli.net/2019/06/13/5d0234ce0f49d94264.jpg"
        },
        {
          id: 2,
          name: "[flutter]iCloudMusic音乐播放器",
          time: "Published on Oct 15, 2018 in",
          cons: "来使用flutter的Cupertino组件编写一个网易云音乐吧",
          image: "https://i.loli.net/2018/09/26/5bab2f0cdff5f.jpg"
        },
        {
          id: 3,
          name: "MacOS使用Docker编译OpenWrt固件",
          time: "Published on Oct 15, 2018 in",
          cons:
            "偶然间看到了一个新的 OpenWrt 控制台主题，手痒之下尝试自行编译看看",
          image: "https://i.loli.net/2019/06/13/5d02473b9253252029.jpg"
        },
        {
          id: 4,
          name: "MacOS使用Docker编译OpenWrt固件",
          time: "Published on Oct 15, 2018 in",
          cons: 
            "偶然间看到了一个新的 OpenWrt 控制台主题，手痒之下尝试自行编译看看",
          image: "https://i.loli.net/2019/06/13/5d0242cae595684066.png"
        },
        {
          id: 5,
          name: "MacOS使用Docker编译OpenWrt固件",
          time: "Published on Oct 15, 2018 in",
          cons:
            "偶然间看到了一个新的 OpenWrt 控制台主题，手痒之下尝试自行编译看看",
          image: "https://i.loli.net/2019/06/13/5d02468d7cbaf92589.jpg"
        },
        {
          id: 6,
          name: "MacOS使用Docker编译OpenWrt固件",
          time: "Published on Oct 15, 2018 in",
          cons:
            "偶然间看到了一个新的 OpenWrt 控制台主题，手痒之下尝试自行编译看看",
          image: "https://i.loli.net/2019/06/13/5d0247c149c6c98148.jpg"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.home-container {
  article {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 70px 20px 25px;
    cursor: pointer;
    text-align: center;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    .bgimg {
      width: 100%;
      max-width: 640px;
      min-height: 260px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: top center;
      border-radius: 8px;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
      transition: all 0.3s ease;
      -webkit-transition: all 0.3s ease;
      -moz-transition: all 0.3s ease;
      -o-transition: all 0.3s ease;
    }
    .bgimg:hover {
      box-shadow: 0 26px 40px -20px rgba(204, 171, 218, 0.5);
      -webkit-box-shadow: 0 26px 40px -20px rgba(204, 171, 218, 0.5);
      -moz-box-shadow: 0 26px 40px -20px rgba(204, 171, 218, 0.5);
    }
    .title {
      font-size: 21px;
      color: #313131;
      margin-top: 30px;
      font-weight: 300;
    }
    hr {
      width: 60px;
      height: 2px;
      border: none;
      background-color: RGBA(0, 0, 0, 0.5);
      margin: 20px auto 0;
    }
    time {
      font-size: 12px;
      color: #5f5f5f;
      font-weight: 300;
      margin-top: 3px;
    }
    aside {
      margin: 20px;
      font-weight: 300;
    }
    .btnReading {
      color: #5f5f5f;
      border-radius: 20px;
      border: 1px solid #5f5f5f;
      font-size: 12px;
      padding: 5px 20px;
    }
    .btnReading:hover {
      color: #eb5055;
      border-color: #eb5055;
      transition: color 0.1s;
    }
  }
  article:nth-child(2n-1) {
    background-color: #f7f7f7;
  }
  @media (max-width: 880px) {
    article {
      padding: 50px 20px 25px;
    }
  }
  @media (max-width: 700px) {
    article {
      padding: 20px 20px 25px;
    }
  }
  @media (max-width: 580px) {
    article {
      padding: 20px 20px 25px;
      aside,
      .btnReading {
        display: none;
      }
    }
  }
}
</style>