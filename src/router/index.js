import {createRouter, createWebHashHistory} from 'vue-router';
const Index = () => import('@/views/layout/index.vue')
const Home = () => import('@/views/layout/aside/home.vue')
const Symbol = () => import('@/views/layout/aside/symbol.vue')
const ErrorCode = () => import('@/views/layout/aside/errorCode.vue')
const Coin = () => import('@/views/layout/aside/coin.vue')
const Match = () => import('@/views/layout/aside/match.vue')
const Login = () => import('@/views/login/index.vue')

// 本地静态路由
export const constantRoutes = [
    {
        path: '/',
        name: 'index',
        component:Index,
        children: [
            {

                path: '/matchedOrderList',
                name: 'matchedOrderList',
                component: Match,
                meta: {
                    title: '撮合列表',
                },
            },
            {

            path: '/symbol',
            name: 'symbol',
            component: Symbol,
            meta: {
                title: '交易对管理',
            },
        },
            {
                // 当 /user/:id/profile 匹配成功
                // UserProfile 将被渲染到 User 的 <router-view> 内部
                path: '/errorCode',
                name: 'errorCode',
                component: ErrorCode,
                meta: {
                    title: '错误码管理',
                },
            }, {
                // 币种管理
                path: '/coin',
                name: 'coin',
                component: Coin,
                meta: {
                    title: '币种管理',
                },
            },{
                // 币种管理
                path: '/home',
                name: 'home',
                component: Home,
                meta: {
                    title: '首页',
                },
            },]
    },
    {
        path: '/login',
        name: 'login',
        component:Login,
        meta: {
            isParentView: true,
        },
    },
    {
        path: '/register',
        component: () => import('@/views/register/index.vue'),
        meta: {
            isParentView: true,
        },
    },
    {
        path: '/test',
        component: () => import('@/views/test/index.vue'),
    },
    {
        path: '/test1',
        component: () => import('@/views/test/test1.vue'),
    },
    {
        path: '/axios',
        component: () => import('@/views/test/axios.vue'),
    },
    {
        path: '/test-layout',
        component: () => import('@/views/test/index.vue'),
        // component: () => import('@/layout/index.vue'),
        // component: () => import('@/layout/parentView.vue'),
        meta: {
            isParentView: true,
            xxx: true,
        },
        children: [
            {
                path: 'xxx', // 加斜杠 全路径，不加的话会拼接父path eg：/test-layout/xxx
                component: () => import('@/views/test/index.vue'),
            },
        ],
    },
    {
        // path: '/404',
        path: '/:pathMatch(.*)*', // 防止浏览器刷新时路由未找到警告提示: vue-router.mjs:35 [Vue Router warn]: No match found for location with path "/xxx"
        component: () => import('@/views/error-page/404.vue'),
    },
];

// 创建路由
const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes,
});

export default router;
