<script setup>

import {ArrowRight} from "@element-plus/icons-vue";
import { useRouter } from 'vue-router'
const router = useRouter()
const breadcrumbs = ref([])
const route = router.currentRoute // 这里不使用useRoute获取当前路由，否则下面watch监听路由的时候会有警告

const getBreadcrumbs = route => {

  const home = [{ path: '/', meta: { title: '首页' } }]
  if (route.name === 'home') {
    return home
  } else {

    const matched = route.matched.filter(
        item => !!item.meta && !!item.meta.title
    )

    return [...home, ...matched]
  }
}
onBeforeMount(() => {
  breadcrumbs.value = getBreadcrumbs(route.value)
  console.log(route.value)
})
watch(
    route,
    newRoute => {
      breadcrumbs.value = getBreadcrumbs(newRoute)
     // emit('on-breadcrumbs-change', breadcrumbs.value.length > 1)
    },
    {
      immediate: true,
    }
)
</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight" class="breadcrumb">
    <el-breadcrumb-item
        v-for="(item, index) in breadcrumbs"
        :key="index"
        :class="{ no_link: index === breadcrumbs.length - 1 }"
        :to="index < breadcrumbs.length - 1 ? item.path : ''"
    >
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped lang="scss">
.breadcrumb{
  margin-left: 20px;
}
</style>