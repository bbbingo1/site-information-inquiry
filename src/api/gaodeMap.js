import request from "../utils/request";

export function getTrafficInfo(key, rectangle) {
  return request({
    // url:`https://restapi.amap.com/v3/traffic/status/rectangle?rectangle=116.351147,39.966309;116.357134,39.968727&key=<用户的key>`
    url: `https://restapi.amap.com/v3/traffic/status/rectangle?rectangle=${rectangle}&key=${key}`,
    method: 'get'
  })
}