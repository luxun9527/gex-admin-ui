<script setup>
</script>

<template>
  <!-- 路由中设置的组件会替换router-view标签 -->
  <div id="app">
    <router-view />
  </div>


</template>

<style lang="scss">
// 引入初始化样式
//@import '@/style/main.scss';
//@import '@/style/base.scss';
#app {
  height: 100vh;
  overflow: hidden;
  font-weight: 400 !important;
}
body,html{
  margin: 0;
}
</style>
