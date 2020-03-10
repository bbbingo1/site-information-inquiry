import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import 'font-awesome/css/font-awesome.css' // font-awesome ͼ��


import ElementUI from 'element-ui'
import './assets/styles/element-variables.scss' // custom element style

import './assets/styles/main.scss' // global css
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import App from './App.vue'
import router from './router'
import store from './store'

import '@/permission' // permission control


Vue.use(ElementUI, {locale})

Vue.config.productionTip = false

// 初始化请求路径
store.dispatch('setBaseUrl', process.env.NODE_ENV !== 'production' ? process.env.VUE_APP_API_BASE_URL : `${location.protocol}//${location.hostname}${window.location.port ? ':' + window.location.port : ''}/admin/api`)

// 初始化动态表单
store.dispatch('initDynamicSiteFields')

new Vue({
    router,
    store,
    render: createElement => createElement(App),
}).$mount('#app')


