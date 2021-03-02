/**
 * 封装Request请求
 */
import axios from 'axios'

// 实例化axios
const service = axios.create({
  // 公共接口
  baseURL: process.env.BASE_API,

  // 超时时间： 3s
  time: 3 * 1000
})

// 请求拦截器
service.interceptors.rquest.use(
  config => {
    /*
    发送请求处理
      1.数据转化
      2.配置请求头
      3.设置token
      4.设置Loading
   */

    //  数据转化
    config.data = JSON.stringify(config.data)

    // 配置请求头
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    const token = getCookie('token')

    if (token) {
      config.params = { token: token }
      config.headers.token = token
    }

    return config
  },
  error => {
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 成功接收响应数据后，处理一些共有数据，关闭Loading
    return response
  },
  error => {
    // 处理异常响应数据
    if (error && error.response) {
      /*
      1.公共错误处理
      2.根据响应码处理数据
     */
      switch (error.response.status) {
        case 400:
          error.message = '错误请求'
          break
        case 401:
          error.message = '未授权，请重新登录'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = '未找到资源'
          window.location.href = '/NotFound'
          break
        case 405:
          error.message = '未允许的请求方法'
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务端未响应'
          break
        case 501:
          error.message = '网络未实现'
          break
        case 502:
          error.message = '网络错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网络超时'
          break
        case 505:
          error.message = 'http版本不支持该请求'
          break
        default:
          error.message = `连接错误${error.response.status}`
      }
    } else {
      if (JSON.stringify(error).includes('timeout')) {
        Message.error('服务器响应超时，请刷新')
      }
      error.message('连接服务器失败')
    }

    Message.error(error.message)
  }
)
// const request = (
//   url,
//   data = {},
//   method = 'GET',
//   contentType = 'application/json'
// ) => {
//   return new Promise(function(resolve, reject) {
//     var header = { 'Content-Type': contentType }
//     console.log('REQUEST_------' + method)
//     console.log(url)
//     console.log(data)
//   })
// }

// module.exports = {
//   request
// }
