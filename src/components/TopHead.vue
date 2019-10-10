<template>
  <div class="tophead">
    <div class="th-l" @click="backAction"><i class="icon iconfont icon-back"></i></div>
    <div class="th-title">{{title}}</div>
    <div class="th-r">
      <!-- 组件使用插槽,使用组件时可以根据不同的 icon 插入插槽改变右侧插槽的内容，如 home 插入的插槽状况 -->
      <slot name="r">右侧插槽</slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tophead",
    props: ["title", "backurl"],
    data() {
      //选项  / 数据
      return {

      }
    },
    methods: {
      //事件处理
      backAction() {
        if(this.backurl) {
          this.$router.push(this.backurl)
        } else {
          this.$router.go(-1)
        }
      }
    },
    components: {
      //定义组件

    }
  }
</script>

<style lang="scss" scoped>
 @import '../../src/assets/style/main.scss';
  .tophead {
    display: flex;
    justify-content: space-between;
    height: $th;
    line-height: $th;
    color: #fff;
    font-size: $text-size-imp;
    background-color: #407cd6;
    .to-title {
      text-align: center;
      flex: 1 1 auto;
    }
    .th-l {
      padding-left: px2rem(25);
    }
    .th-r {
      padding-right: px2rem(25);
    }
    .icon::before {
      font-size: $text-size-imp;
    }
  }
</style>
