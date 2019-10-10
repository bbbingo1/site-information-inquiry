import request from "../utils/request";


export function siteList(pageNum, pageSize, data) {
    return request({
        url: '/site',
        method: 'post',
        data: {
            action: 'siteList',
            pageNum,
            pageSize,
            data,
        }
    })
}

export function getSiteInfo(id) {
    return request({
        url: '/site/' + id,
        method: 'get'
    })
}

export function addSite(data) {
    return request({
        url: '/site',
        method: 'post',
        data: {
            action: 'add',
            data,
        }
    })
}

export function updateSite(data) {
    return request({
        url: '/site',
        method: 'post',
        data: {
            action: 'update',
            data,
        }
    })
}

export function deleteSiteInfo(data) {
    return request({
        url: '/site',
        method: 'post',
        data: {
            action: 'delete',
            data,
        }
    })
}

export function upload(form) {
    return request({
        url: "/site/upload",
        method: 'post',
        data: form,
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}

export function downloadTemplate() {
    return request({
        url: "/site/downloadTemplate",
        method: 'get',
        responseType: 'blob'
    })
}