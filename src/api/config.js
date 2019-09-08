/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 21:25:37
 * @LastEditTime: 2019-09-09 02:36:10
 * @LastEditors: Please set LastEditors
 */
import request from '../utils/request'
export function getIndexSearchFields() {
  return request({
    // TODO 获取主页场地类型查询字段
    url: '/config/indexSearchFields',
    method: 'get',
  })
}
export function getIndexSearchResults(datas) {
  return request({
    // TODO 获取主页搜索结果
    url: '/config/indexSearchResults',
    method: 'post',
    data: {
      datas,
    }
  })
}