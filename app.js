// app.js
// 按需导入 $http 对象
import { $http } from '@escook/request-miniprogram'
// 将按需导入的 $http 挂载到 wx 顶级对象之上，方便全局调用
wx.$http = $http
// 设置根路劲
$http.baseUrl = '<根域名>'
// 请求拦截器
$http.beforeRequest = function (options) {
  options.header = {
    "Content-Type":"application/json",
    "Authorization":"Bearer <APIkey>"
  }
}
App({

})
