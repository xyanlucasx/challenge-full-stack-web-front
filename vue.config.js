const path = require('path')

process.env.VUE_APP_VERSION = require('./package.json').version
const version = process.env.VUE_APP_VERSION

module.exports = {
  lintOnSave: false,

  runtimeCompiler: true,

  configureWebpack: {
    devServer: {
      client: {
        webSocketTransport: 'ws',
        overlay: true
      },
      compress: true,
      host: '0.0.0.0',
      port: 1024
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },

    output: {
      filename: `[name].${version}.js`,
      chunkFilename: `js/[name].${version}.js`
    },

    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    }
  }
}
