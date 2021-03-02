const path = require('path')
const resolve = dir => path.join(__dirname, dir)
module.exports = {
  productionSourceMap: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/addons/crab_hot_video/' : './',
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
  },
  assetsDir: './static/food/',
  indexPath: './app/douyin/view/index_3.html',
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    host: '0.0.0.0',
    port: 8080,
    https: false,
    open: true,
    hotOnly: true
  }
}
