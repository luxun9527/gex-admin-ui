

<template>
  <el-dropdown trigger="click" @command="handleCommand" class="userInfo" >
    <div class="dropdown-select">
             <span class="el-dropdown-link">
          {{ username }}
          <el-icon class="el-icon--right">
            <arrow-down/>
          </el-icon>
        </span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup>
import {useUserStore} from '@/store/modules/user'
import {ArrowDown} from "@element-plus/icons-vue"

const userStore = useUserStore()
const username= $ref(userStore.userInfo.username)
const logoutCommand = 'logout'
const handleCommand = (command)=>{
  if (command === logoutCommand) {
    userStore.LoginOut()
  }
}
</script>
<style scoped lang="scss">
.userInfo{
  font-size: 20px;
  margin-right: 10px;
}
</style>