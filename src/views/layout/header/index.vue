<script setup>
import Breadcrumbs from './breadcrumbs.vue'
import Hamburger from './hamburger.vue'
import UserInfo from './userInfo.vue'

</script>

<template>
  <el-header class="main-header">
    <div class="navigation">
      <Hamburger/>
      <Breadcrumbs/>
    </div>

    <user-info/>
  </el-header>
</template>

<style scoped lang="scss">
.navigation {
  display: flex;
  justify-content: flex-start;
  background: #ffffff;
  align-items: center;
}
</style>