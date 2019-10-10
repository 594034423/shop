<template>
  <div class="menu-cell">
    <router-link :to="url">
      <div class="img-wrap">
        <img :src="imgUrl" :alt="menuName">
      </div>
        <div class="title-wrap">
          {{menuName}}
        </div>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: "menucell",
    props: ["menuName", "imgUrl", "url"],
    data() {
      //选项  / 数据
      return {}
    },
    methods: {
      //事件处理
    },
    components: {
      //定义组件
    }
  }
</script>

<style lang="scss" scoped>
@import '../../src/assets/style/main.scss';
  .menu-cell {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: $text-size;
    text-align: center;
    color: #000;
    .img-wrap {
      width: px2rem(62);
      height: px2rem(62);
      display: inline-block;
      margin-bottom: px2rem(30);
    }

  }
</style>
