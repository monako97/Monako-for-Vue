<template>
  <transition-group appear tag="main" class="home-container">
    <article v-for="item in item" :key="item.id">
      <div class="bgimg" :style='"background-image: url("+item.image+");"'></div>
      <p class="title">{{ item.name }}</p>
      <time>{{ item.time }}</time>
      <hr>
      <aside>{{ item.cons }}</aside>
      <div class="btnReading">Continue Reading →</div>
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
          name: "MacOS使用Docker编译OpenWrt固件",
          time: "Published on Oct 15, 2018 in",
          cons:
            "偶然间看到了一个新的 OpenWrt 控制台主题，手痒之下尝试自行编译看看",
          image: "https://i.loli.net/2018/09/26/5bab2f0cdff5f.jpg"
        },
        {
          id: 2,
          name: "MacOS使用Docker编译OpenWrt固件",
          time: "Published on Oct 15, 2018 in",
          cons:
            "偶然间看到了一个新的 OpenWrt 控制台主题，手痒之下尝试自行编译看看",
          image: "https://i.loli.net/2018/09/26/5bab2f0cdff5f.jpg"
        },
        {
          id: 3,
          name: "MacOS使用Docker编译OpenWrt固件",
          time: "Published on Oct 15, 2018 in",
          cons:
            "偶然间看到了一个新的 OpenWrt 控制台主题，手痒之下尝试自行编译看看",
          image: "https://i.loli.net/2018/09/26/5bab2f0cdff5f.jpg"
        },
        {
          id: 4,
          name: "MacOS使用Docker编译OpenWrt固件",
          time: "Published on Oct 15, 2018 in",
          cons:
            "偶然间看到了一个新的 OpenWrt 控制台主题，手痒之下尝试自行编译看看",
          image: "https://i.loli.net/2018/09/26/5bab2f0cdff5f.jpg"
        },
        {
          id: 5,
          name: "MacOS使用Docker编译OpenWrt固件",
          time: "Published on Oct 15, 2018 in",
          cons:
            "偶然间看到了一个新的 OpenWrt 控制台主题，手痒之下尝试自行编译看看",
          image: "https://i.loli.net/2018/09/26/5bab2f0cdff5f.jpg"
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
      background-position: center;
      border-radius: 8px;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
    }
    .bgimg:hover {
      box-shadow: 2px 3px 4px RGBA(204, 171, 218, 0.5);
      transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s;
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