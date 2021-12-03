const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, '../server/public'),
  transpileDependencies: ["vuetify"],
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8700/api',
        ws: true,
        changeOrigin: true,
        pathRewrite: { "^/api": "/" }
      }
    }
  },

  pwa: {
    name: 'Pickleball Schedule',
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon.png'
    }
  }

};
