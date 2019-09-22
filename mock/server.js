/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 21:25:37
 * @LastEditTime: 2019-09-22 17:16:56
 * @LastEditors: Please set LastEditors
 */
'use strict'
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();

// json demo
const _ = require('underscore')
const path = require('path')
const fs = require('fs')
const mockDir = path.join(__dirname, 'data')
const base = {}
const files = fs.readdirSync(mockDir)
files.forEach((file) => {
    _.extend(base, require(path.resolve(mockDir, file)))
})

// mock server must be use cors
app.use(cors())
// parser json data
app.use(bodyParser.json({ type: 'application/json' }))

app.use('/static', express.static(path.join(__dirname, 'public')))

// 处理登录逻辑
app.post('/user/login', (req, res) => {
    console.log(req.body)
    let data = {}
    if (req.body.imageCaptcha !== '' && req.body.imageCaptcha.toUpperCase() !== 'V9AM') {
        data = base['login_FA_IMAGE_CAPTCHA_ERROR']
    } else if (req.body.username === 'admin1') {
        data = base['login_FA_NEED_IMAGE_CAPTCHA']
    } else if (req.body.username === 'admin2') {
        data = base['login_FA_NEED_SMS_CAPTCHA']
    } else if (req.body.username === 'admin3') {
        data = base['login_FA_NEED_EMAIL_CAPTCHA']
    } else if (req.body.username === 'admin4') {
        data = base['login_FA_USERNAME_OR_PASSWORD_ERROR']
    } else {
        data = base['login_Success']
    }
    res.jsonp(data)
})

// 刷新验证码
app.post('/user/login/reloadImageCaptcha', (req, res) => {
    let data = base['login_reload_image_Captcha']
    res.jsonp(data)
})

// 发送验证码
app.post('user/login/seedSMSCaptcha', (req, res) => {
    console.log(req.body)
    res.jsonp({
        code: 'S_OK'
    })
})

// 处理登出逻辑
app.post('/user/logout', (req, res) => {
    res.jsonp({
        status: 200,
        message: ''
    })
})
// 获取首页查询表单字段
app.get('/config/dynamicSiteFields', (req, res) => {
    let data = base['dynamicSiteFields']
    res.jsonp(data)
})
// 返回场地搜索信息
app.post('/config/indexSearchResults', (req, res) => {
    let data = JSON.parse(JSON.stringify(base['indexSearchResults']))
    //测试分页
    if (req.body.pageNum == 1) {
        res.jsonp(data)
    } else {
        data.data.result.sort(() =>Math.random() - 0.5);
        res.jsonp(data)
    }
})
// 单独创建一个场地信息
app.post('/config/singleSiteImformation', (req, res) => {
    let data = base['singleSiteImformation']
    res.jsonp(data)
})
// 绑定 9090 端口开启
app.listen(9090, function () {
    console.log('mock server is running in 9090!');
});