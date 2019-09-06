import router from './router'

import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

const whiteList = ['/login', '/404', '/50X', '/about'] // 不重定向白名单
router.beforeEach((to, from, next) => {
    NProgress.start()
    const sid = router.app.$store.getters.sid
    const loggedIn = router.app.$store.getters.loggedIn
    window.document.title =  to.meta.title || 'WEB ADMIN'
    if (sid && loggedIn) {
        if (to.path === '/login') {
            next()
            NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
        } else if (to.path === '/') {
            next('/index')
        } else {
            next()
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
            NProgress.done()
        } else {
            next('/login')
            NProgress.done()
        }
    }

})
router.afterEach(() => {
    NProgress.done() // 结束Progress
})
