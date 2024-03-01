<script setup>
import Header from '@/views/layout/header/index.vue'
import Content from '@/views/layout/content/index.vue'
</script>

<template>
    <el-container style="height: 100vh">

      <el-aside class="aside">
        <el-scrollbar>
          <div class="introduce">gex管理后台</div>
          <el-menu router
                   :default-openeds="['1']"
                   active-text-color="#3392ff"
                   background-color="#354e67"
                   default-active="1"
                   text-color="#fff"
          >
            <el-menu-item index="/home">
              <span>首页</span>
            </el-menu-item>
            <el-sub-menu index="2">
              <template #title>
                <el-icon>
                  <message/>
                </el-icon>
                交易管理
              </template>
              <el-menu-item-group>
                <el-menu-item index="/symbol">交易对管理</el-menu-item>
                <el-menu-item index="/coin">币种管理</el-menu-item>
                <el-menu-item index="/errorCode">错误码管理</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-main>
        <Header/>
        <Content/>

      </el-main>
    </el-container>
</template>

<style lang="scss" scoped>
.introduce{
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.main-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  border: 1px solid #e0e4ef;
  margin-bottom: 20px;
}

//.v-enter-active,
//.v-leave-active {
//  transition: opacity 0.5s ease;
//}
//
//.v-enter-from,
//.v-leave-to {
//  opacity: 0;
//}

.el-menu{
  border: none;
}
.aside {
  width: 12vw;
  height: 100%;
  background: #354e67;
  color: #bfcbd9;
}


:deep(.el-menu-item-group__title){
  padding: 0;
}


.el-main{
  background: #ffffff;
  padding: 0;
  height: 100%;

}

</style>