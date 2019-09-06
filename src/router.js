import Vue from 'vue'
import Router from 'vue-router'
import login from './views/login/Login.vue'
import home from './views/home/Home.vue'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'home',
        component: home,
        meta: {
            title: '后台管理系统',
        },
        children: [{
                path: '/index',
                name: 'index',
                meta: {
                    title: '首页',
                },
                component: () => import('./views/home/mains/Index.vue'),
            }, {
                path: '/site',
                name: 'site',
                meta: {
                    title: '场地信息',
                },
                component: () => import('./views/home/mains/Site.vue'),
            }, {
                path: '/addSite',
                name: 'addSite',
                meta: {
                    title: '添加场地信息',
                },
                component: () => import('./views/home/mains/AddSite.vue'),
            }, {
                path: '/editSite',
                name: 'editSite',
                meta: {
                    title: '编辑场地信息',
                },
                component: () => import('./views/home/mains/EditSite.vue'),
            }, {
                path: '/user',
                name: 'user',
                meta: {
                    title: '用户信息',
                },
                component: () => import('./views/home/mains/User.vue'),
            }, {
                path: '/operateLog',
                name: 'operateLog',
                meta: {
                    title: '用户操作日志',
                },
                component: () => import('./views/home/mains/OperateLog.vue'),
            }
        ],
    }, {
        path: '/login',
        name: 'login',
        component: login,
        meta: {
            title: '后台管理系统 - 登录',
        },
    }, {
        path: '/404',
        name: '404',
        component: () => import('./views/error/404.vue'),
        meta: {
            title: '页面没找到',
        },
    }, {
        path: '/50X',
        name: '50X',
        component: () => import('./views/error/50X.vue'),
        meta: {
            title: '服务错误',
        },
    }, {
        path: '/about',
        name: 'about',
        component: () => import('./views/about/About.vue'),
        meta: {
            title: '关于系统',
        },
    }, {
        path: '*',
        redirect: '/'
    }
    ]
})
