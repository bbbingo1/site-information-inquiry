/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 21:25:37
 * @LastEditTime: 2019-10-16 00:48:53
 * @LastEditors: Please set LastEditors
 */
'use strict'
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
// const proxy = require('http-proxy-middleware')
const request = require('request')

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
app.use(bodyParser.urlencoded({ extended: false }));

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

app.post('/user/logout', (req, res) => {
    console.log(req.body)
    let data = {
        code: 'S_OK'
    }
    res.jsonp(data)
})

app.get('/user/QRCode', (req, res) => {
    console.log(req.body)
    let data = {
        code: 'S_OK',
        data: {
            qrLink: 'http://127.0.0.1:9090/user/checkLoginStatus',
            sid: Math.random()
        }
    }
    res.jsonp(data)
})

app.get('/user/checkLoginStatus', (req, res) => {
    console.log(req.body.sid)
    let data = {
        code: 'S_OK',
        data: {
            qrLink: 'http://127.0.0.1:9090/user/checkLoginStatus',
            sid: Math.random()
        }
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
// 获取首页查询表单字段
app.get('/config/dynamicSiteFieldDefaultValues', (req, res) => {
    let data = base['dynamicSiteFieldDefaultValues']
    res.jsonp(data)
})

// 返回场地搜索信息
app.post('/site', (req, res) => {
    console.log(req.body)
    let action = req.body.action

    if (action === 'siteList') {
        //测试分页
        let data = JSON.parse(JSON.stringify(base['site'][action]))
        if (req.body.pageNum == 1) {
            res.jsonp(data)
        } else {
            data.data.result.sort(() => Math.random() - 0.5);
            res.jsonp(data)
        }
    } else if (action === 'add' || action === 'update' || action === 'delete') {
        res.jsonp({
            code: 'S_OK'
        })
    }
})

app.get('/site/:id', (req, res) => {
    let id = req.params.id
    if (id === 'downloadTemplate') {
        let file = fs.readFileSync(__dirname + '/public/images/captcha.png', 'binary')
        res.setHeader('Content-Type', "image/png")
        res.setHeader('Content-Length', file.length)
        res.setHeader('Content-Disposition', 'attachment; filename="1.png"')
        res.write(file, 'binary')
        res.end()
        return
    }

    let data = {
        code: 'S_OK',
        data: JSON.parse(JSON.stringify(base['site']['siteList'])).data.result.find(siteInfo => {
            return siteInfo.id === id
        })
    }
    console.log(data)
    res.jsonp(data)
})

app.post('/site/upload', (req, res) => {
    res.jsonp({ code: 'S_OK' })
})

// 单独创建一个场地信息
app.post('/config/singleSiteImformation', (req, res) => {
    let data = base['singleSiteImformation']
    res.jsonp(data)
})

//高德地图代理服务
// app.get('/gaode/rectangle', proxy({ target: 'https://restapi.amap.com/v3/traffic/status/rectangle', changeOrigin: true }))
app.get('/gaode/rectangle', function (req, res) {
    var rectangle = req.params.rectangle;
    var key = req.params.key
    var url = `https://restapi.amap.com/v3/traffic/status/rectangle?rectangle=${rectangle}&key=${key}`;
    console.log(url)
    req.pipe(request(url)).pipe(res);
})

// 绑定 9090 端口开启
app.listen(9090, function () {
    console.log('mock server is running in 9090!');
});