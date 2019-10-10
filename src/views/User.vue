<template>
  <div class="user">
    <tophead title="Test">
      <router-link to="/user" slot="r" class="icon iconfont icon-user"></router-link>
    </tophead>
    <div class="userName">
      这是User的名字
    </div>
  </div>
</template>

<script>
  import TopHead from '../components/TopHead'
  export default {
    name: "user",
    data() {
      //选项  / 数据
      return {}
    },
    methods: {
      //事件处理
    },
    components: {
      //定义组件
      tophead:TopHead
    }
  }
</script>

<style lang="scss" scoped>
  
</style>
