<script setup>

</script>

<template>
  <div class="content">
    <router-view v-slot="{ Component, route }">
      <!-- 使用任何自定义过渡和回退到 `fade` -->
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped lang="scss">
.content{
  padding-left: 20px;
  padding-right: 20px;
  height: 100%;
}
</style>