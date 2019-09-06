import request from '../utils/request'

export function login(sid, username, password, imageCaptcha) {
    return request({
        url: '/user/login',
        method: 'post',
        data: {
            sid,
            username,
            password,
            imageCaptcha,
        }
    })
}

export function reloadImageCaptcha(sid) {
    return request({
        url: '/user/login/reloadImageCaptcha',
        method: 'post',
        data: {
            sid,
        }
    })
}

export function getInfo() {
    return request({
        url: '/user/info',
        method: 'get',
    })
}

export function logout() {
    return request({
        url: '/user/logout',
        method: 'post',
    })
}

