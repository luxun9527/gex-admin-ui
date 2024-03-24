<template>
  <div class="login-container">
    <div class="login-content-out">
      <div class="login-content">
          <div class="login-content-main">
            <h3>管理后台登录</h3>
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
              <el-form-item prop="username">
                <el-input v-model="loginForm.username" prefix-icon="User" placeholder="请输入账号" maxlength="30" />
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="loginForm.password" prefix-icon="Lock" placeholder="请输入密码" show-password
                          maxlength="30"/>
              </el-form-item>
            </el-form>
            <div style="margin: 10px;">
              <span>用户名: admin</span>
              <span class="m-l-20"> 密码: 123456</span>
            </div>
            <el-button type="primary" style="width: 100%" @click="handleLogin" >登 录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useUserStore} from '@/store/modules/user'
import {ElMessage} from 'element-plus'


const userStore = useUserStore()
const loginFormRef = $ref({})
const loginForm = $ref({})


const loginRules = reactive({
  username: [{required: true, trigger: 'blur', message: '请输入账号'}],
  password: [{required: true, trigger: 'blur', validator: validatePassword}],
})

function validatePassword(rule, value, callback) {
  if (!value || value.length < 6) {
    callback(new Error('密码最少6位'));
  } else {
    callback();
  }
}

const login = async () => {
  return await userStore.LoginIn(loginForm)
}
const handleLogin = async () => {
  loginFormRef.validate(async (v) => {
    if (v) {
      await login(loginForm)
    } else {
      ElMessage({
        type: 'error',
        message: '请正确填写登录信息',
        showClose: true,
      })
    }
  })
}
</script>

<style lang="scss" scoped>
@import "@/style/newLogin.scss";

</style>
