import request from '../utils/request'
export function getIndexSearchFields(){
    return request({
        // TODO 获取主页场地类型查询字段
        url: '/config/indexSearchFields',
        method: 'get',
    })
}