/* module.exports = {
  lintOnSave: false
} */
// 配置请求转发跨域
const proxyObj = {}
proxyObj['/'] = {
  // 目标地址
  target: 'http://localhost:8080',
  // 发送请求头host会被设置target
  changeOrigin: true,
  // 不重写请求地址
  pathRewrite: {
    '^/': '/'
  }
}
// 要去访问的默认路径
module.exports = {
  devServer: {
    host: 'localhost',
    port: 8081,
    // 代理, 通过nodejs代理转发到8080端口
    proxy: proxyObj
  }
}
