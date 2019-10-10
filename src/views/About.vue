<template>
  <div class="">

  </div>
</template>

<script>

  export default {
    data() {
      //选项  / 数据
      return {

      }
    },
    methods: {
      //事件处理
      goback() {
        this.$router.go(-1)
      }
    },
    components: {
      //定义组件
    }
  }
</script>

<style lang="scss">
@import 'lib/hotcss/px2rem.scss';
  .btn {
    font-size: px2rem(50);
    width: px2rem(300);
    height: px2rem(300);
  }
</style>
