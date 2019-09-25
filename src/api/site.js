import request from "../utils/request";


export function siteList(pageNum,pageSize,data) {
    return request({
        url: '/site',
        method: 'post',
        data: {
            action:'siteList',
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