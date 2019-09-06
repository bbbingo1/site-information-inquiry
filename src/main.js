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

new Vue({
    router,
    store,
    render: createElement => createElement(App),
}).$mount('#app')
