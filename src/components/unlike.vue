<template>
  <article class="like-box">
    <div :class="isLike?'heart':'heart heartAnimation'"
         :rel="isLike?'unlike':'like'"
         :style="isLike?'background-position:left;':''"
         @click="unlike"></div>
    <div>{{ counts }}</div>
  </article>
</template>

<script>
export default {
  data: function() {
    return {
        isLike: this.like,
        counts: this.count,
    };
  },
  methods: {
    unlike() {
      this.isLike ? this.counts++ : this.counts--;
      this.isLike = !this.isLike;
    }
  },
  props: ["id","count","like"]
};
</script>

<style lang="scss">
.like-box{
    .heart {
        background-image: url("../assets/images/web_heart_animation.png");
        background-position: left;
        background-repeat: no-repeat;
        height: 80px;
        width: 80px;
        cursor: pointer;
        position: absolute;
        left: -14px;
        background-size: 2900%;
    }
    .heart:hover,
    .heart:focus {
        background-position: right;
    }

    @-webkit-keyframes heartBlast {
        0% {
            background-position: left;
        }

        100% {
            background-position: right;
        }
    }

    @keyframes heartBlast {
        0% {
            background-position: left;
        }

        100% {
            background-position: right;
        }
    }

    .heartAnimation {
        display: inline-block;
        -webkit-animation-name: heartBlast;
        animation-name: heartBlast;
        -webkit-animation-duration: .8s;
        animation-duration: .8s;
        -webkit-animation-iteration-count: 1;
        animation-iteration-count: 1;
        -webkit-animation-timing-function: steps(28);
        animation-timing-function: steps(28);
        background-position: right;
    }
}
</style>
