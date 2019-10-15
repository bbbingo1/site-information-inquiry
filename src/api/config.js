/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 21:25:37
 * @LastEditTime: 2019-09-22 17:08:13
 * @LastEditors: Please set LastEditors
 */
import request from '../utils/request'

export function dynamicSiteFields() {
    return request({
        url: '/config/dynamicSiteFields',
        method: 'get',
    })
}
