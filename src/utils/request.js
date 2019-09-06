'use strict'

import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'

console.log(process.env.NODE_ENV)
// 创建axios实例
const service = axios.create({
    // API 请求路径,生成开发环境和生产环境区分
    baseURL: process.env.NODE_ENV !== 'production' ? process.env.VUE_APP_API_BASE_URL : `${location.protocol}//${location.hostname}${window.location.port ? ':' + window.location.port : ''}/admin/api`,
    // 请求超时时间
    timeout: 3000,
    // 自定义 Header
    headers: { 'X-MALL-APPID' : process.env.VUE_APP_APPID}
})

// request 拦截器
service.interceptors.request.use(config => {
    // Cookie 需在 HttpOnly 保护下的,所以 js 无法获取,每次请求会自动通过浏览器请求携带
    config.headers['X-MALL-NONCE'] = new Date().getTime(); //减少伪造请求的可能
    return config
}, error => {
    console.log(error)  // for debug
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    response => {
        /**
         * code为非200是抛错 可结合自己业务进行修改
         */
        const res = response.data
        //S_OK 正常登录成功
        //FA_NEED_IMAGE_CAPTCHA 图形验证码, 防止暴力破解
        //FA_IMAGE_CAPTCHA_ERROR 图形验证码错误
        //FA_NEED_SMS_CAPTCHA 防止暴力破解, 有对接短信模块, 需验证码正确才触发下发短信验证码
        //FA_SMS_CAPTCHA_ERROR 短信验证码错误
        //FA_NEED_EMAIL_CAPTCHA 防止暴力破解, 有对接邮箱模块, 需验证码正确才触发下邮件验证码
        //FA_EMAIL_CAPTCHA 邮件验证码错误
        //FA_USERNAME_OR_PASSWORD_ERROR 账号或者密码错误, 不返回详细内容防止枚举用户
        if (![
            'S_OK',
            'FA_NEED_IMAGE_CAPTCHA',
            'FA_NEED_SMS_CAPTCHA',
            'FA_NEED_EMAIL_CAPTCHA',
            'FA_USERNAME_OR_PASSWORD_ERROR',
            'FA_IMAGE_CAPTCHA_ERROR',
            'FA_SMS_CAPTCHA_ERROR',
            'FA_EMAIL_CAPTCHA_ERROR',
        ].includes(res.code)) {
            Message({
                message: res.message,
                type: 'error',
                duration: 3 * 1000
            })
            // FA_SESSION_INVALID 会话过期
            if (res.code === 'FA_SESSION_INVALID') {
                MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('FedLogOut').then(() => {
                        location.reload()// 为了重新实例化vue-router对象 避免bug
                    })
                })
            }
            return Promise.reject('error')
        } else {
            return response.data
        }
    },
    error => {
        console.log('err' + error)// for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 3 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
