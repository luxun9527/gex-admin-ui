import { defineStore } from 'pinia';
import { login } from '@/api/system/sys_user';
import { ElLoading, ElMessage } from 'element-plus'
import router from '@/router/index'
import {computed, ref} from "vue";


/*
* 存储token以及登录认证的相关函数。
* */
export const useUserStore = defineStore('user', () => {
  const loadingInstance = ref(null)

  const userInfo = ref({
    userID: '',
    username:''
  })
  const token = ref('')

  /* 登录*/
  const LoginIn = async(loginInfo) => {
    loadingInstance.value = ElLoading.service({
      fullscreen: true,
      text: '登录中，请稍候...',
    })
    try {
      const res = await login(loginInfo)
      if (res.code === 0) {
        token.value = res.data.token
        userInfo.value.userID=res.data.user_info.user_id
        userInfo.value.username=res.data.user_info.username
        await router.push({ name: 'home' })
        loadingInstance.value.close()
        return true
      }
    } catch (e) {
     loadingInstance.value.close()
    }
   loadingInstance.value.close()
  }



  async function  LoginOut(){
    this.$reset()
    // 最终真正清空storage数据
    window.localStorage.clear()
    window.sessionStorage.clear()
    await router.push({ name: 'login' })
  }
  const setToken = (val) => {
    token.value = val
  }

  // watch(() => token.value, () => {
  //   window.localStorage.setItem('token', token.value)
  // })
  return {
   // userInfo,
    token,
    //NeedInit,
    //ResetUserInfo,
    //GetUserInfo,
    LoginIn,
    LoginOut,
    //changeSideMode,
    //mode,
    //sideMode,
    setToken,
    //baseColor,
    //activeColor,
  //  loadingInstance,
   // ClearStorage
    userInfo
  }
})
