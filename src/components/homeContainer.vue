<template>
  <transition-group name="list" appear tag="main" class="home-container">
      <article v-for="(item,i) in list" :key="item.id+i">
          <router-link tag="img" class="card-bg" :to="'/detail/'+item.name+'?bg='+item.image"
                       v-lazy-img="item.image"/>
          <p class="title">{{ item.name }}</p>
          <time>{{ item.time }}</time>
          <hr>
          <aside>{{ item.cons }}</aside>
          <router-link tag="div" :to="'/detail/'+item.name+'?bg='+item.image"
                       class="btnReading">Continue Reading →</router-link>
      </article>
  </transition-group>
</template>
<script>
export default {
    name: "homeContainer",
      data() {
        return {
          list: [
            {
              id: 1,
              name: "Java学习笔记",
              time: "Published on Oct 15, 2018 in",
              cons: "阁下要来一杯提升醒脑的java吗？",
              image: "https://i.loli.net/2019/06/13/5d0234ce0f49d94264.jpg"
            },
            {
              id: 2,
              name: "JDBC学习笔记",
              time: "Published on Oct 15, 2018 in",
              cons: "JDBC学习笔记",
              image: "https://i.loli.net/2018/09/26/5bab2f0cdff5f.jpg"
            },
            {
              id: 3,
              name: "MYSQL学习笔记",
              time: "Published on Oct 15, 2018 in",
              cons: "MYSQL学习笔记",
              image: "https://i.loli.net/2019/06/13/5d02473b9253252029.jpg"
            },
            {
              id: 4,
              name: "HttpServletRequest和HttpServletResponse",
              time: "Published on Oct 15, 2018 in",
              cons: "HttpServletRequest和HttpServletResponse",
              image: "https://i.loli.net/2019/06/13/5d0242cae595684066.png"
            },
            {
              id: 5,
              name: "事务&数据库连接池&DBUtils",
              time: "Published on Oct 15, 2018 in",
              cons: "事务&数据库连接池&DBUtils",
              image: "https://i.loli.net/2019/06/13/5d02468d7cbaf92589.jpg"
            },
            {
              id: 6,
              name: "XML&Tomcat学习笔记",
              time: "Published on Oct 15, 2018 in",
              cons: "XML&Tomcat学习笔记",
              image: "https://i.loli.net/2019/06/13/5d02421f5d8a878438.jpg"
            },
            {
              id: 7,
              name: "Listener&Filter",
              time: "Published on Oct 15, 2018 in",
              cons: "Listener&Filter",
              image: "https://i.loli.net/2019/06/13/5d0247c149c6c98148.jpg"
            }
          ]
        };
      },
    mounted() {

    },
    methods: {

    }
};
</script>

<style lang="scss">
.home-container {
  article {
    padding: 70px 20px 25px;
    cursor: pointer;
    text-align: center;
    user-select: none;
    transition: padding 0.3s;
    .card-bg {
      width: 100%;
      max-width: 640px;
      height: 260px;
      object-fit: cover;
      border-radius: 8px;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
      transition: all 0.3s;
      margin: auto;
    }
    .card-bg:hover {
      box-shadow: 0 26px 40px -20px rgba(204, 171, 218, 0.5);
    }
    .title {
      font-size: 21px;
      color: rgb(49, 49, 49);
      margin-top: 30px;
      font-weight: 300;
    }
    hr {
      width: 60px;
      height: 2px;
      border: none;
      background-color: rgba(0, 0, 0, 0.5);
      margin: 20px auto 0;
    }
    time {
      font-size: 12px;
      color: rgb(95, 95, 95);
      font-weight: 300;
      margin-top: 3px;
    }
    aside {
      margin: 20px;
      font-weight: 300;
    }
    .btnReading {
      width: auto;
      color: rgb(95, 95, 95);
      border: 1px solid rgb(95, 95, 95);
      border-radius: 20px;
      font-size: 12px;
      padding: 5px 20px;
      display: inline-block;
    }
    .btnReading:hover {
      color: rgb(235, 80, 85);
      border-color: rgb(235, 80, 85);
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
      aside, .btnReading {
        display: none;
      }
    }
  }
}
</style>
