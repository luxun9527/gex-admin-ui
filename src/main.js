import { createApp } from 'vue'

import 'element-plus/dist/index.css'
import './style/element_visiable.scss'


import App from './App.vue'
const app = createApp(App)



import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
app.use(ElementPlus, {
    locale: zhCn,
})


// pinia
import { createPinia } from 'pinia'
const pinia = createPinia()
// 持久化存储
import { createPersistedState } from 'pinia-plugin-persistedstate';
pinia.use(
    createPersistedState({
        auto: true, // 启用所有 Store 默认持久化
    }),
);

// 重写 $reset 方法 => 解决组合式api中无法使用问题
pinia.use(({ store }) => {
    const initialState = JSON.parse(JSON.stringify(store.$state));
    store.$reset = () => {
        store.$patch(initialState);
    }
})

app.use(pinia)



// 注册所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
// 混入 -- 抽取公用的实例（操作成功与失败消息提醒内容等）
import mixin from '@/utils/mixin';
app.mixin(mixin);

// 路由
import router from '@/router'
app.use(router)
// 动态路由权限
import '@/router/permission.js';





// // 全局组件注册
// import myComponent from '@/components/index';
// Object.keys(myComponent).forEach((key) => {
//     app.component(key, myComponent[key]);
// });

// 自定义样式
//import '@/style/index.scss';

app.mount('#app')